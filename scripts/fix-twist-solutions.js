#!/usr/bin/env node
/**
 * Fix twist file solutions:
 * 1. Fix function names (use twist name, not parent/twist combined)
 * 2. Fix function parameters (use example input keys, not generic 'data')
 * 3. Fix return types in Go based on example output
 * 4. Replace stub implementations with proper templates
 */

const fs = require('fs');
const path = require('path');

const PROBLEMS_DIR = path.join(__dirname, '..', 'frontend', 'static', 'js', 'problems');

let totalFixed = 0;
let totalSkipped = 0;
let totalErrors = 0;

function findTwistFiles(dir) {
    const results = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findTwistFiles(fullPath));
        } else if (entry.name.startsWith('twist-') && entry.name.endsWith('.js')) {
            results.push(fullPath);
        }
    }
    return results;
}

function kebabToSnake(s) {
    return s.replace(/-/g, '_');
}

function kebabToPascal(s) {
    return s.replace(/-/g, '_').split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
}

function extractTwistName(filename) {
    // twist-01-circular-array-subsequence.js -> circular-array-subsequence
    return filename.replace(/\.js$/, '').replace(/^twist-\d+-/, '');
}

function inferGoType(val) {
    if (typeof val === 'number') return Number.isInteger(val) ? 'int' : 'float64';
    if (typeof val === 'string') return 'string';
    if (typeof val === 'boolean') return 'bool';
    if (Array.isArray(val)) {
        if (val.length === 0) return '[]int';
        const first = val[0];
        if (typeof first === 'number') return '[]int';
        if (typeof first === 'string') return '[]string';
        if (typeof first === 'boolean') return '[]bool';
        if (Array.isArray(first)) return '[][]int';
    }
    if (val && typeof val === 'object') return 'map[string]interface{}';
    return 'interface{}';
}

function inferGoReturnType(val) {
    return inferGoType(val);
}

function goDefaultReturn(goType) {
    if (goType === 'int') return '0';
    if (goType === 'float64') return '0.0';
    if (goType === 'string') return '""';
    if (goType === 'bool') return 'false';
    return 'nil';
}

function generatePythonSolution(twistName, funcNameSnake, params, problem) {
    const desc = problem.description || problem.name || twistName;
    const complexity = problem.complexity || { time: 'O(n)', space: 'O(1)' };
    const paramList = params.join(', ');

    let code = `def ${funcNameSnake}(${paramList}):\n`;
    code += `    """\n`;
    code += `    ${problem.name || twistName}\n`;
    code += `\n`;
    code += `    ${desc}\n`;
    code += `\n`;
    code += `    Time: ${complexity.time}\n`;
    code += `    Space: ${complexity.space}\n`;
    code += `    """\n`;
    code += `    # TODO: Implement your solution\n`;
    code += `    pass\n`;

    // Add test cases based on examples
    if (problem.examples && problem.examples.length > 0) {
        code += `\n\n# Test cases\n`;
        for (const ex of problem.examples) {
            const args = params.map(p => {
                const val = ex.input[p];
                return val !== undefined ? JSON.stringify(val) : 'None';
            }).join(', ');
            code += `print(${funcNameSnake}(${args}))  # Expected: ${JSON.stringify(ex.output)}\n`;
        }
    }

    return code;
}

function generateGoSolution(twistName, funcNamePascal, params, paramTypes, returnType, problem) {
    const desc = problem.description || problem.name || twistName;
    const complexity = problem.complexity || { time: 'O(n)', space: 'O(1)' };

    // Build param declarations
    const paramDecl = params.map((p, i) => {
        // Convert param name to camelCase for Go
        const goName = p.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
        return `${goName} ${paramTypes[i]}`;
    }).join(', ');

    let code = `package main\n\nimport "fmt"\n\n`;
    code += `// ${funcNamePascal} solves the ${problem.name || twistName} problem.\n`;
    code += `// ${desc}\n`;
    code += `// Time: ${complexity.time}, Space: ${complexity.space}\n`;
    code += `func ${funcNamePascal}(${paramDecl}) ${returnType} {\n`;
    code += `\t// TODO: Implement your solution\n`;
    code += `\treturn ${goDefaultReturn(returnType)}\n`;
    code += `}\n`;

    // Add main with test cases
    if (problem.examples && problem.examples.length > 0) {
        code += `\nfunc main() {\n`;
        for (const ex of problem.examples) {
            const args = params.map((p, i) => {
                const val = ex.input[p];
                return formatGoValue(val, paramTypes[i]);
            }).join(', ');
            code += `\tfmt.Println(${funcNamePascal}(${args})) // Expected: ${JSON.stringify(ex.output)}\n`;
        }
        code += `}\n`;
    }

    return code;
}

function formatGoValue(val, goType) {
    if (val === null || val === undefined) return 'nil';
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (typeof val === 'number') return String(val);
    if (typeof val === 'string') return `"${val}"`;
    if (Array.isArray(val)) {
        if (goType === '[]int' || goType === '[]string' || goType === '[]bool') {
            const elems = val.map(v => {
                if (typeof v === 'string') return `"${v}"`;
                return String(v);
            }).join(', ');
            return `${goType}{${elems}}`;
        }
        if (goType === '[][]int') {
            const rows = val.map(row => {
                if (Array.isArray(row)) return `{${row.join(', ')}}`;
                return String(row);
            }).join(', ');
            return `[][]int{${rows}}`;
        }
        return `[]int{${val.join(', ')}}`;
    }
    return JSON.stringify(val);
}

function processFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const filename = path.basename(filePath);
        const twistName = extractTwistName(filename);

        // Extract the problem object from the IIFE
        // We need to find the examples and other metadata

        // Quick check: does this file have the stub pattern?
        if (!content.includes('# Core algorithm implementation') &&
            !content.includes('return nil') &&
            !content.includes('def ') && !content.includes('func ')) {
            totalSkipped++;
            return;
        }

        // Parse the problem object to extract examples
        // Look for examples array
        const examplesMatch = content.match(/examples:\s*\[([\s\S]*?)\],\s*(?:solutions|twists|similar)/);
        if (!examplesMatch) {
            totalSkipped++;
            return;
        }

        // Try to extract input keys from first example
        const inputMatch = content.match(/input:\s*\{([^}]+)\}/);
        if (!inputMatch) {
            totalSkipped++;
            return;
        }

        // Extract param names from input keys
        const inputStr = inputMatch[1];
        const paramNames = [];
        const paramValues = {};
        const keyValuePairs = inputStr.match(/"?(\w+)"?\s*:/g);
        if (keyValuePairs) {
            for (const kv of keyValuePairs) {
                const key = kv.replace(/["':]/g, '').trim();
                paramNames.push(key);
            }
        }

        if (paramNames.length === 0) {
            totalSkipped++;
            return;
        }

        // Extract output to determine return type
        const outputMatch = content.match(/output:\s*([^,\n]+)/);
        let expectedOutput = null;
        if (outputMatch) {
            const outStr = outputMatch[1].trim();
            try {
                expectedOutput = JSON.parse(outStr);
            } catch(e) {
                if (outStr === 'true') expectedOutput = true;
                else if (outStr === 'false') expectedOutput = false;
                else if (!isNaN(Number(outStr))) expectedOutput = Number(outStr);
            }
        }

        // Extract problem name
        const nameMatch = content.match(/name:\s*'([^']+)'/);
        const problemName = nameMatch ? nameMatch[1] : twistName;

        // Extract description
        const descMatch = content.match(/description:\s*'([^']*(?:\\.[^']*)*)'/);
        const description = descMatch ? descMatch[1].replace(/\\'/g, "'") : problemName;

        // Extract complexity
        const timeMatch = content.match(/time:\s*'([^']+)'/);
        const spaceMatch = content.match(/space:\s*'([^']+)'/);
        const complexity = {
            time: timeMatch ? timeMatch[1] : 'O(n)',
            space: spaceMatch ? spaceMatch[1] : 'O(1)'
        };

        // Generate function names
        const funcNameSnake = kebabToSnake(twistName);
        const funcNamePascal = kebabToPascal(twistName);

        // Determine Go param types and return type
        // We need to parse the actual example values
        // For now, infer from the first example
        const paramTypes = paramNames.map(p => {
            // Try to find the value for this param in the first example
            const valMatch = content.match(new RegExp(`"${p}"\\s*:\\s*([^,}]+)`));
            if (valMatch) {
                const valStr = valMatch[1].trim();
                try {
                    const val = JSON.parse(valStr);
                    return inferGoType(val);
                } catch(e) {}
                // Check for array
                if (valStr.startsWith('[')) {
                    // Try to parse array portion
                    const arrMatch = content.match(new RegExp(`"${p}"\\s*:\\s*(\\[[^\\]]*\\])`));
                    if (arrMatch) {
                        try {
                            const arrVal = JSON.parse(arrMatch[1]);
                            return inferGoType(arrVal);
                        } catch(e) {}
                    }
                    return '[]int';
                }
                if (valStr === 'true' || valStr === 'false') return 'bool';
                if (!isNaN(Number(valStr))) return 'int';
                return 'interface{}';
            }
            return 'interface{}';
        });

        const goReturnType = expectedOutput !== null ? inferGoReturnType(expectedOutput) : 'interface{}';

        // Build the problem object for generation
        const problemData = {
            name: problemName,
            description: description,
            complexity: complexity,
            examples: [] // We'll just use the test case pattern from the file
        };

        // Parse actual examples for test generation
        try {
            // Extract example objects more carefully
            const exBlock = examplesMatch[1];
            const exItems = exBlock.split(/\}\s*,\s*\{/);
            for (const item of exItems) {
                const itemInputMatch = item.match(/input:\s*(\{[^}]+\})/);
                const itemOutputMatch = item.match(/output:\s*([^,\n]+)/);
                if (itemInputMatch && itemOutputMatch) {
                    try {
                        const inp = JSON.parse(itemInputMatch[1].replace(/(\w+):/g, '"$1":'));
                        let out = itemOutputMatch[1].trim();
                        try { out = JSON.parse(out); } catch(e) {
                            if (out === 'true') out = true;
                            else if (out === 'false') out = false;
                            else if (!isNaN(Number(out))) out = Number(out);
                        }
                        problemData.examples.push({ input: inp, output: out });
                    } catch(e) {}
                }
            }
        } catch(e) {}

        // If we couldn't parse examples, create them from the original match
        if (problemData.examples.length === 0) {
            problemData.examples = [{ input: {}, output: null }];
        }

        // Generate new solutions
        const newPython = generatePythonSolution(twistName, funcNameSnake, paramNames, problemData);
        const newGo = generateGoSolution(twistName, funcNamePascal, paramNames, paramTypes, goReturnType, problemData);

        // Replace the solutions in the file content
        // Find the solutions block and replace it
        const solutionsMatch = content.match(/(solutions:\s*\{[\s\S]*?python:\s*`)[\s\S]*?(`\s*,\s*go:\s*`)[\s\S]*?(`\s*\})/);
        if (!solutionsMatch) {
            totalSkipped++;
            return;
        }

        // Escape backticks in new solutions
        const escapedPython = newPython.replace(/`/g, '\\`').replace(/\$/g, '\\$');
        const escapedGo = newGo.replace(/`/g, '\\`').replace(/\$/g, '\\$');

        const newContent = content.replace(
            solutionsMatch[0],
            solutionsMatch[1] + escapedPython + solutionsMatch[2] + escapedGo + solutionsMatch[4]
        );

        fs.writeFileSync(filePath, newContent, 'utf8');
        totalFixed++;

    } catch (err) {
        console.error(`Error processing ${filePath}: ${err.message}`);
        totalErrors++;
    }
}

// Main
console.log('Scanning for twist files...');
const twistFiles = findTwistFiles(PROBLEMS_DIR);
console.log(`Found ${twistFiles.length} twist files`);

for (const file of twistFiles) {
    processFile(file);
}

console.log(`\nDone!`);
console.log(`  Fixed: ${totalFixed}`);
console.log(`  Skipped: ${totalSkipped}`);
console.log(`  Errors: ${totalErrors}`);
