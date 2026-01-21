#!/usr/bin/env node
/**
 * Fix sub-problem input formats
 * Converts { "raw": "array = [1,2,3], target = 5" } to { "array": [1,2,3], "target": 5 }
 */

const fs = require('fs');
const path = require('path');

// Parse raw input string and convert to structured data
function parseRawInput(rawStr) {
    if (!rawStr || typeof rawStr !== 'string') return null;

    const result = {};

    // Common patterns to match
    // Pattern: varName = [array] or varName = value
    const patterns = [
        // Array patterns
        /(\w+)\s*=\s*\[([\s\S]*?)\](?=\s*,\s*\w+\s*=|\s*$)/g,
        // Number patterns
        /(\w+)\s*=\s*(-?\d+(?:\.\d+)?)\b(?!\s*\])/g,
        // Boolean patterns
        /(\w+)\s*=\s*(true|false)\b/gi,
        // String patterns (quoted)
        /(\w+)\s*=\s*["']([^"']+)["']/g,
    ];

    // Extract arrays
    let match;
    const arrayPattern = /(\w+)\s*=\s*\[([\s\S]*?)\](?=\s*,\s*\w+\s*=|\s*$)/g;
    while ((match = arrayPattern.exec(rawStr)) !== null) {
        const name = match[1];
        const arrStr = match[2].trim();
        try {
            // Try to parse as JSON array
            const arr = JSON.parse('[' + arrStr + ']');
            result[name] = arr;
        } catch (e) {
            // Try parsing as array of strings/numbers
            const items = arrStr.split(',').map(s => {
                s = s.trim();
                if (s.startsWith('"') || s.startsWith("'")) {
                    return s.replace(/^['"]|['"]$/g, '');
                }
                const num = Number(s);
                return isNaN(num) ? s : num;
            });
            result[name] = items;
        }
    }

    // Extract numbers (avoiding array contents)
    const numPattern = /(\w+)\s*=\s*(-?\d+(?:\.\d+)?)\s*(?=[,\s]|$)/g;
    const cleanedStr = rawStr.replace(/\[[\s\S]*?\]/g, '[]'); // Remove array contents
    while ((match = numPattern.exec(cleanedStr)) !== null) {
        const name = match[1];
        if (!result[name]) {
            result[name] = Number(match[2]);
        }
    }

    // Extract booleans
    const boolPattern = /(\w+)\s*=\s*(true|false)\b/gi;
    while ((match = boolPattern.exec(rawStr)) !== null) {
        const name = match[1];
        if (!result[name]) {
            result[name] = match[2].toLowerCase() === 'true';
        }
    }

    return Object.keys(result).length > 0 ? result : null;
}

// Process a single JS file
function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Find examples array and process each example
    const examplesMatch = content.match(/examples:\s*\[([\s\S]*?)\n\s{8}\]/);
    if (!examplesMatch) return false;

    const examplesSection = examplesMatch[0];
    let newExamplesSection = examplesSection;

    // Find all input objects with "raw" field
    const rawInputPattern = /input:\s*\{\s*"raw":\s*"([^"]+)"\s*\}/g;
    let inputMatch;

    while ((inputMatch = rawInputPattern.exec(examplesSection)) !== null) {
        const fullMatch = inputMatch[0];
        const rawStr = inputMatch[1];

        const parsed = parseRawInput(rawStr);
        if (parsed) {
            // Convert to properly formatted JSON
            const jsonStr = JSON.stringify(parsed, null, 2)
                .split('\n')
                .map((line, i) => i === 0 ? line : '        ' + line)
                .join('\n');

            const newInput = 'input: ' + jsonStr;
            newExamplesSection = newExamplesSection.replace(fullMatch, newInput);
            modified = true;
        }
    }

    if (modified) {
        content = content.replace(examplesSection, newExamplesSection);
        fs.writeFileSync(filePath, content);
        return true;
    }

    return false;
}

// Find all sub-problem JS files
function findSubProblemFiles(baseDir) {
    const files = [];
    const categories = fs.readdirSync(baseDir);

    for (const category of categories) {
        const categoryPath = path.join(baseDir, category);
        if (!fs.statSync(categoryPath).isDirectory()) continue;

        const problems = fs.readdirSync(categoryPath);
        for (const problem of problems) {
            const problemPath = path.join(categoryPath, problem);
            if (!fs.statSync(problemPath).isDirectory()) continue;

            // This is a problem folder with sub-problems
            const subProblems = fs.readdirSync(problemPath);
            for (const subProblem of subProblems) {
                if (subProblem.endsWith('.js') && !subProblem.startsWith('_')) {
                    files.push(path.join(problemPath, subProblem));
                }
            }
        }
    }

    return files;
}

// Main
const baseDir = '/home/user/learning-algo/frontend/static/js/problems';
const files = findSubProblemFiles(baseDir);
let updated = 0;

console.log(`Found ${files.length} sub-problem files`);

for (const file of files) {
    try {
        if (processFile(file)) {
            updated++;
            console.log(`Updated: ${file}`);
        }
    } catch (e) {
        console.error(`Error processing ${file}: ${e.message}`);
    }
}

console.log(`\nUpdated ${updated} files`);
