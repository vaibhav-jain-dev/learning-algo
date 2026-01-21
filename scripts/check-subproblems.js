#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const baseDir = '/home/user/learning-algo/frontend/static/js/problems';

function findSubProblems() {
    const files = [];
    const categories = fs.readdirSync(baseDir);

    for (const category of categories) {
        const categoryPath = path.join(baseDir, category);
        if (!fs.statSync(categoryPath).isDirectory()) continue;

        const problems = fs.readdirSync(categoryPath);
        for (const problem of problems) {
            const problemPath = path.join(categoryPath, problem);
            if (!fs.statSync(problemPath).isDirectory()) continue;

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

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const issues = [];

    // Check for raw input
    if (content.includes('"raw":')) {
        issues.push('raw-input');
    }

    return issues;
}

const files = findSubProblems();
console.log('Total sub-problems:', files.length);

let rawCount = 0;
const rawFiles = [];

for (const file of files) {
    const issues = checkFile(file);
    if (issues.includes('raw-input')) {
        rawCount++;
        rawFiles.push(file.replace(baseDir + '/', ''));
    }
}

console.log('Files with raw input:', rawCount);
if (rawCount > 0) {
    console.log('\nFiles needing fix:');
    rawFiles.forEach(f => console.log(' ', f));
}
