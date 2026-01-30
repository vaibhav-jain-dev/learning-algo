/**
 * Problem Renderer
 *
 * Generic function to render problems from JS configuration.
 * All problem JS files call this to register and display their content.
 */
(function() {
    'use strict';

    // Store all registered problems
    const PROBLEMS = {};
    const CATEGORIES = {};

    /**
     * Register a problem with its configuration
     * @param {string} category - Category (arrays, graphs, etc.)
     * @param {string} problemId - Unique problem ID (e.g., "01-validate-subsequence")
     * @param {Object} config - Problem configuration
     */
    function registerProblem(category, problemId, config) {
        if (!CATEGORIES[category]) {
            CATEGORIES[category] = [];
        }

        const fullId = category + '/' + problemId;
        PROBLEMS[fullId] = {
            id: problemId,
            category: category,
            ...config
        };
        CATEGORIES[category].push(problemId);

        console.log('[ProblemRenderer] Registered: ' + fullId);
    }

    /**
     * Get a problem by its full ID
     * @param {string} fullId - Full problem ID (category/problemId)
     * @returns {Object} Problem configuration
     */
    function getProblem(fullId) {
        return PROBLEMS[fullId];
    }

    /**
     * Get all problems in a category
     * @param {string} category - Category name
     * @returns {Array} Array of problem configs
     */
    function getProblemsInCategory(category) {
        const problemIds = CATEGORIES[category] || [];
        return problemIds.map(id => PROBLEMS[category + '/' + id]);
    }

    /**
     * Get all categories
     * @returns {Object} Categories with problem counts
     */
    function getAllCategories() {
        const result = {};
        for (const cat in CATEGORIES) {
            result[cat] = CATEGORIES[cat].length;
        }
        return result;
    }

    /**
     * Get total problem count
     * @returns {number} Total number of registered problems
     */
    function getTotalCount() {
        return Object.keys(PROBLEMS).length;
    }

    /**
     * Format input for display
     * @param {Object} input - Input object
     * @returns {string} Formatted input string
     */
    function formatInput(input) {
        if (typeof input === 'string') return input;
        if (Array.isArray(input)) return '[' + input.join(', ') + ']';

        const parts = [];
        for (const key in input) {
            const val = input[key];
            if (Array.isArray(val)) {
                parts.push(key + '=[' + val.join(', ') + ']');
            } else if (typeof val === 'object' && val !== null) {
                parts.push(key + '=' + JSON.stringify(val));
            } else {
                parts.push(key + '=' + val);
            }
        }
        return parts.join(', ');
    }

    /**
     * Format output for display
     * @param {*} output - Output value
     * @returns {string} Formatted output string
     */
    function formatOutput(output) {
        if (typeof output === 'boolean') return output ? 'true' : 'false';
        if (typeof output === 'string') return output;
        if (Array.isArray(output)) {
            if (output.length > 0 && Array.isArray(output[0])) {
                return '[' + output.map(arr => '[' + arr.join(', ') + ']').join(', ') + ']';
            }
            return '[' + output.join(', ') + ']';
        }
        return JSON.stringify(output);
    }

    /**
     * Generate viz-config JSON for compatibility with existing visualization system
     * @param {Object} problem - Problem configuration
     * @returns {Object} Viz config object
     */
    function generateVizConfig(problem) {
        return {
            name: problem.name,
            algorithm: problem.algorithm,
            complexity: problem.complexity,
            examples: problem.examples.map(ex => ({
                input: ex.input,
                output: ex.output,
                inputRaw: formatInput(ex.input),
                outputRaw: formatOutput(ex.output)
            }))
        };
    }

    /**
     * Render a problem to HTML
     * @param {Object} problem - Problem configuration
     * @returns {string} HTML string
     */
    function renderProblemHTML(problem) {
        const vizConfig = generateVizConfig(problem);

        let html = '';

        // Viz config for visualization system
        html += '<div id="viz-config" style="display:none">';
        html += JSON.stringify(vizConfig);
        html += '</div>\n\n';

        // ========== PROBLEM TAB CONTENT ==========
        html += '<div class="tab-content-problem">\n';

        // Problem title and difficulty
        html += '<h1 style="color:#0f172a;margin-bottom:0.5rem;font-weight:700;">' + problem.name + '</h1>\n\n';

        // Difficulty badge
        const diffColors = {
            'Easy': { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' },
            'Medium': { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },
            'Hard': { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444' },
            'Very Hard': { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6' }
        };
        const diffStyle = diffColors[problem.difficulty] || { bg: '#f1f5f9', text: '#64748b' };
        html += '<p style="color:#475569;margin-bottom:1.5rem;"><strong>Difficulty:</strong> <span style="background:' + diffStyle.bg + ';color:' + diffStyle.text + ';padding:0.25rem 0.75rem;border-radius:1rem;font-size:0.85rem;font-weight:600;">' + problem.difficulty + '</span></p>\n\n';

        // Problem description
        html += '<h2 style="color:#3b82f6;margin-top:1.5rem;margin-bottom:0.75rem;font-size:1.25rem;font-weight:700;">Problem Statement</h2>\n';
        html += '<p style="color:#1e293b;line-height:1.8;margin-bottom:1.5rem;font-size:1rem;">' + problem.description + '</p>\n\n';

        // Examples section
        html += '<h2 style="color:#3b82f6;margin-top:1.5rem;margin-bottom:1rem;font-size:1.25rem;">Examples</h2>\n';
        problem.examples.forEach((ex, i) => {
            html += '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem 1.25rem;margin-bottom:1rem;">\n';
            html += '<p style="color:#3b82f6;font-weight:600;margin-bottom:0.75rem;font-size:1rem;">Example ' + (i + 1) + ':</p>\n';

            // Input/Output in a code-like box
            html += '<div style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:6px;padding:0.875rem 1rem;font-family:\'SF Mono\',\'Fira Code\',\'Consolas\',monospace;font-size:0.9rem;margin-bottom:0.75rem;">\n';
            html += '<div style="margin-bottom:0.5rem;"><span style="color:#10b981;font-weight:500;">Input:</span> <span style="color:#334155;">' + formatInput(ex.input) + '</span></div>\n';
            html += '<div><span style="color:#ef4444;font-weight:500;">Output:</span> <span style="color:#334155;">' + formatOutput(ex.output) + '</span></div>\n';
            html += '</div>\n';

            // Input to Output explanation
            if (ex.explanation) {
                html += '<p style="color:#475569;line-height:1.6;margin:0;font-size:0.9rem;"><strong style="color:#8b5cf6;">Explanation:</strong> ' + ex.explanation + '</p>\n';
            }
            html += '</div>\n\n';
        });

        // Complexity (on Problem tab)
        html += '<h2 style="color:#3b82f6;margin-top:1.5rem;margin-bottom:0.75rem;font-size:1.25rem;">Complexity</h2>\n';
        html += '<div style="display:flex;gap:1.5rem;flex-wrap:wrap;">\n';
        html += '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:0.75rem 1.25rem;"><span style="color:#64748b;">Time:</span> <span style="color:#10b981;font-family:monospace;font-weight:600;">' + problem.complexity.time + '</span></div>\n';
        html += '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:0.75rem 1.25rem;"><span style="color:#64748b;">Space:</span> <span style="color:#ef4444;font-family:monospace;font-weight:600;">' + problem.complexity.space + '</span></div>\n';
        html += '</div>\n\n';

        // Back to parent problem link (for sub-problems) - on Problem tab
        if (problem.parent) {
            const category = problem.category || 'arrays';
            html += '<div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e2e8f0;">\n';
            html += '<button onclick="window.openProblem(\'' + category + '\', \'' + problem.parent + '\')" style="background:linear-gradient(135deg,#8b5cf6,#a78bfa);color:#ffffff;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(139,92,246,0.4)\'" onmouseout="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'none\'">\n';
            html += '<span>←</span> Back to Parent Problem\n';
            html += '</button>\n';
            html += '</div>\n\n';
        }

        // Similar/Related Problems Button (on Problem tab)
        if (problem.similar && problem.similar.length > 0) {
            const category = problem.category || 'arrays';

            html += '<div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e2e8f0;">\n';
            html += '<button onclick="toggleSimilarProblems(this)" style="background:linear-gradient(135deg,#10b981,#34d399);color:#ffffff;border:none;padding:0.75rem 1.5rem;border-radius:8px;font-size:0.95rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:0.5rem;transition:all 0.2s;" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 4px 12px rgba(16,185,129,0.4)\'" onmouseout="this.style.transform=\'translateY(0)\';this.style.boxShadow=\'none\'">\n';
            html += '<span>🔗</span> Show ' + problem.similar.length + ' Related Problems\n';
            html += '</button>\n';

            html += '<div id="similar-problems-container" style="display:none;margin-top:1rem;">\n';
            html += '<h3 style="color:#3b82f6;margin-bottom:1rem;font-size:1.1rem;">Related Harder Problems</h3>\n';
            html += '<p style="color:#64748b;margin-bottom:1rem;font-size:0.85rem;">These problems use similar thinking patterns but are more challenging. Click to open.</p>\n';
            html += '<div style="display:flex;flex-direction:column;gap:0.75rem;">\n';

            problem.similar.forEach((sim, idx) => {
                const simDiff = diffColors[sim.difficulty] || { bg: '#f1f5f9', text: '#64748b' };
                html += '<div onclick="window.openProblem(\'' + category + '\', \'' + sim.id + '\')" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.borderColor=\'#3b82f6\';this.style.background=\'#f1f5f9\'" onmouseout="this.style.borderColor=\'#e2e8f0\';this.style.background=\'#f8fafc\'">';
                html += '<div style="display:flex;align-items:center;gap:0.75rem;">';
                html += '<span style="color:#64748b;font-size:0.9rem;font-weight:500;">' + (idx + 1) + '.</span>';
                html += '<span style="color:#334155;font-weight:500;">' + sim.name + '</span>';
                html += '</div>';
                html += '<div style="display:flex;align-items:center;gap:0.75rem;">';
                html += '<span style="background:' + simDiff.bg + ';color:' + simDiff.text + ';padding:0.25rem 0.625rem;border-radius:0.75rem;font-size:0.75rem;font-weight:600;">' + sim.difficulty + '</span>';
                html += '</div>';
                html += '</div>\n';
            });

            html += '</div>\n';
            html += '</div>\n';
            html += '</div>\n';
        }

        html += '</div>\n'; // End .tab-content-problem

        // ========== HINTS TAB CONTENT (hidden by default) ==========
        if (problem.hints && problem.hints.length > 0) {
            html += '<div class="tab-content-hints" style="display:none;">\n';
            html += '<h2 style="color:#3b82f6;margin-bottom:1rem;font-size:1.25rem;">Hints</h2>\n';
            html += '<div class="hints-container">\n';
            problem.hints.forEach((hint, i) => {
                html += '<details class="hint" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;margin-bottom:0.5rem;padding:0.75rem 1rem;">\n';
                html += '<summary style="color:#334155;font-weight:500;cursor:pointer;"><strong style="color:#3b82f6;">Hint ' + (i + 1) + '</strong></summary>\n';
                html += '<p style="color:#475569;margin-top:0.75rem;margin-bottom:0;line-height:1.6;">' + hint + '</p>\n';
                html += '</details>\n';
            });
            html += '</div>\n';

            // Approach (on Hints tab)
            if (problem.problem) {
                html += '<h2 style="color:#3b82f6;margin-top:1.5rem;margin-bottom:0.75rem;font-size:1.25rem;">Approach</h2>\n';
                html += '<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:1rem 1.25rem;">\n';
                html += '<p style="color:#475569;margin:0;line-height:1.7;">' + problem.problem + '</p>\n';
                html += '</div>\n\n';
            }

            html += '</div>\n'; // End .tab-content-hints
        }

        // ========== SOLUTIONS TAB CONTENT (hidden by default) ==========
        if (problem.solutions) {
            html += '<div class="tab-content-solutions" style="display:none;">\n';
            html += '<h2 style="color:#3b82f6;margin-bottom:1rem;font-size:1.25rem;">Solutions</h2>\n';

            // Tab buttons
            html += '<div style="display:flex;gap:0.5rem;margin-bottom:1rem;">\n';
            if (problem.solutions.python) {
                html += '<button id="sol-tab-python" onclick="showSolutionTab(\'python\')" style="background:#3b82f6;color:#fff;border:none;padding:0.5rem 1rem;border-radius:6px;font-size:0.85rem;font-weight:600;cursor:pointer;">Python</button>\n';
            }
            if (problem.solutions.go) {
                html += '<button id="sol-tab-go" onclick="showSolutionTab(\'go\')" style="background:#e2e8f0;color:#64748b;border:none;padding:0.5rem 1rem;border-radius:6px;font-size:0.85rem;font-weight:600;cursor:pointer;">Go</button>\n';
            }
            html += '</div>\n';

            // Solution content
            if (problem.solutions.python) {
                html += '<div id="sol-content-python" style="display:block;">\n';
                html += '<pre style="background:#1e293b;border:1px solid #334155;border-radius:8px;padding:1rem;overflow-x:auto;margin:0;"><code class="language-python" style="color:#e2e8f0;">' + escapeHtml(problem.solutions.python) + '</code></pre>\n';
                html += '</div>\n';
            }
            if (problem.solutions.go) {
                html += '<div id="sol-content-go" style="display:none;">\n';
                html += '<pre style="background:#1e293b;border:1px solid #334155;border-radius:8px;padding:1rem;overflow-x:auto;margin:0;"><code class="language-go" style="color:#e2e8f0;">' + escapeHtml(problem.solutions.go) + '</code></pre>\n';
                html += '</div>\n';
            }
            html += '</div>\n'; // End .tab-content-solutions
        }

        return html;
    }

    /**
     * Get problem data for the 200 problems dashboard
     * @returns {Object} Dashboard data by category
     */
    function getDashboardData() {
        const data = {};

        for (const category in CATEGORIES) {
            data[category] = {
                name: formatCategoryName(category),
                problems: []
            };

            const problems = getProblemsInCategory(category);
            problems.forEach(prob => {
                data[category].problems.push({
                    id: prob.id,
                    name: prob.name,
                    difficulty: prob.difficulty,
                    algorithm: prob.algorithm,
                    vizConfig: generateVizConfig(prob),
                    similar: prob.similar || []
                });
            });
        }

        return data;
    }

    /**
     * Format category name for display
     * @param {string} category - Raw category name
     * @returns {string} Formatted category name
     */
    function formatCategoryName(category) {
        return category
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    /**
     * Search problems by name or description
     * @param {string} query - Search query
     * @returns {Array} Matching problems
     */
    function searchProblems(query) {
        const q = query.toLowerCase();
        const results = [];

        for (const fullId in PROBLEMS) {
            const prob = PROBLEMS[fullId];
            if (prob.name.toLowerCase().includes(q) ||
                prob.description.toLowerCase().includes(q) ||
                prob.algorithm.toLowerCase().includes(q)) {
                results.push(prob);
            }
        }

        return results;
    }

    // Helper function to escape HTML
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    /**
     * Convert JS value to Python literal
     * @param {*} val - Value to convert
     * @returns {string} Python literal string
     */
    function toPythonLiteral(val) {
        if (val === null || val === undefined) return 'None';
        if (typeof val === 'boolean') return val ? 'True' : 'False';
        if (typeof val === 'string') return JSON.stringify(val);
        if (typeof val === 'number') return String(val);
        if (Array.isArray(val)) {
            return '[' + val.map(toPythonLiteral).join(', ') + ']';
        }
        if (typeof val === 'object') {
            const pairs = Object.entries(val).map(([k, v]) => JSON.stringify(k) + ': ' + toPythonLiteral(v));
            return '{' + pairs.join(', ') + '}';
        }
        return String(val);
    }

    /**
     * Convert JS value to Go literal
     * @param {*} val - Value to convert
     * @param {string} hint - Type hint (optional)
     * @returns {string} Go literal string
     */
    function toGoLiteral(val, hint) {
        if (val === null || val === undefined) return 'nil';
        if (typeof val === 'boolean') return val ? 'true' : 'false';
        if (typeof val === 'string') return JSON.stringify(val);
        if (typeof val === 'number') {
            if (Number.isInteger(val)) return String(val);
            return String(val);
        }
        if (Array.isArray(val)) {
            if (val.length === 0) return '[]interface{}{}';
            // Detect element type
            const first = val[0];
            if (typeof first === 'number' && Number.isInteger(first)) {
                return '[]int{' + val.join(', ') + '}';
            }
            if (typeof first === 'string') {
                return '[]string{' + val.map(v => JSON.stringify(v)).join(', ') + '}';
            }
            if (Array.isArray(first)) {
                // 2D array
                const inner = val.map(arr => '{' + arr.join(', ') + '}').join(', ');
                return '[][]int{' + inner + '}';
            }
            return '[]interface{}{' + val.map(v => toGoLiteral(v)).join(', ') + '}';
        }
        if (typeof val === 'object') {
            const pairs = Object.entries(val).map(([k, v]) => JSON.stringify(k) + ': ' + toGoLiteral(v));
            return 'map[string]interface{}{' + pairs.join(', ') + '}';
        }
        return String(val);
    }

    /**
     * Get the function name from the problem ID
     * @param {string} problemId - Problem ID (e.g., "02-two-number-sum")
     * @param {string} lang - Language ("python" or "go")
     * @returns {string} Function name
     */
    function getFunctionName(problemId, lang) {
        // Remove leading numbers and convert to appropriate case
        const base = problemId.replace(/^\d+-/, '').replace(/-/g, '_');
        if (lang === 'python') {
            return base;
        } else {
            // Go uses PascalCase
            return base.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
        }
    }

    /**
     * Generate test cases data from problem examples
     * @param {Object} problem - Problem configuration
     * @returns {Array} Test cases array
     */
    function getTestCases(problem) {
        if (!problem || !problem.examples) return [];
        return problem.examples.map((ex, i) => ({
            id: i,
            name: 'Test Case ' + (i + 1),
            input: ex.input,
            expectedOutput: ex.output,
            explanation: ex.explanation || ''
        }));
    }

    /**
     * Generate Python test code that runs all test cases
     * @param {Object} problem - Problem configuration
     * @returns {string} Python code with test runner
     */
    function generatePythonTestCode(problem) {
        const funcName = getFunctionName(problem.id, 'python');
        const testCases = getTestCases(problem);

        if (testCases.length === 0) {
            return `def ${funcName}():
    """
    ${problem.name}

    Write your solution here.
    """
    pass

if __name__ == "__main__":
    result = ${funcName}()
    print(result)
`;
        }

        // Extract parameter names from first test case
        const firstInput = testCases[0].input;
        const paramNames = Object.keys(firstInput);
        const paramList = paramNames.join(', ');

        let code = `def ${funcName}(${paramList}):
    """
    ${problem.name}

    ${problem.description ? problem.description.substring(0, 200) + '...' : ''}

    Write your solution here.
    """
    # TODO: Implement your solution
    pass


# ============ TEST RUNNER (DO NOT MODIFY BELOW) ============
import json

def compare_output(actual, expected):
    """Compare actual output with expected output."""
    # Handle array comparisons (order may not matter for some problems)
    if isinstance(actual, list) and isinstance(expected, list):
        # For arrays of primitives, sort and compare
        if len(actual) == len(expected):
            try:
                if sorted(actual) == sorted(expected):
                    return True
            except TypeError:
                pass
        return actual == expected
    return actual == expected

def run_tests():
    test_cases = ${toPythonLiteral(testCases.map(tc => ({ input: tc.input, expected: tc.expectedOutput, name: tc.name })))}

    results = []
    passed = 0
    failed = 0

    for i, tc in enumerate(test_cases):
        try:
            # Unpack input parameters
            input_args = tc['input']
            ${paramNames.map(p => `${p} = input_args['${p}']`).join('\n            ')}

            # Run solution
            actual = ${funcName}(${paramList})
            expected = tc['expected']

            # Compare results
            is_pass = compare_output(actual, expected)

            if is_pass:
                passed += 1
                status = "PASS"
            else:
                failed += 1
                status = "FAIL"

            results.append({
                'name': tc['name'],
                'status': status,
                'expected': expected,
                'actual': actual
            })

        except Exception as e:
            failed += 1
            results.append({
                'name': tc['name'],
                'status': 'ERROR',
                'error': str(e)
            })

    # Output results in JSON format for parsing
    output = {
        'total': len(test_cases),
        'passed': passed,
        'failed': failed,
        'results': results
    }
    print("__TEST_RESULTS__")
    print(json.dumps(output, default=str))
    print("__END_TEST_RESULTS__")

    return output

if __name__ == "__main__":
    run_tests()
`;
        return code;
    }

    /**
     * Generate Go test code that runs all test cases
     * @param {Object} problem - Problem configuration
     * @returns {string} Go code with test runner
     */
    function generateGoTestCode(problem) {
        const funcName = getFunctionName(problem.id, 'go');
        const testCases = getTestCases(problem);

        if (testCases.length === 0) {
            return `package main

import "fmt"

func ${funcName}() interface{} {
	// ${problem.name}
	// Write your solution here
	return nil
}

func main() {
	result := ${funcName}()
	fmt.Println(result)
}
`;
        }

        // Extract parameter info from first test case
        const firstInput = testCases[0].input;
        const params = Object.entries(firstInput).map(([name, val]) => {
            let goType = 'interface{}';
            if (typeof val === 'number') {
                goType = Number.isInteger(val) ? 'int' : 'float64';
            } else if (typeof val === 'string') {
                goType = 'string';
            } else if (typeof val === 'boolean') {
                goType = 'bool';
            } else if (Array.isArray(val)) {
                if (val.length > 0) {
                    const first = val[0];
                    if (typeof first === 'number') {
                        goType = '[]int';
                    } else if (typeof first === 'string') {
                        goType = '[]string';
                    } else if (Array.isArray(first)) {
                        goType = '[][]int';
                    } else {
                        goType = '[]interface{}';
                    }
                } else {
                    goType = '[]int';
                }
            }
            return { name: name, type: goType };
        });

        const paramDecl = params.map(p => p.name + ' ' + p.type).join(', ');
        const paramNames = params.map(p => p.name).join(', ');

        // Determine return type from expected output
        const expectedOutput = testCases[0].expectedOutput;
        let returnType = 'interface{}';
        if (typeof expectedOutput === 'number') {
            returnType = Number.isInteger(expectedOutput) ? 'int' : 'float64';
        } else if (typeof expectedOutput === 'string') {
            returnType = 'string';
        } else if (typeof expectedOutput === 'boolean') {
            returnType = 'bool';
        } else if (Array.isArray(expectedOutput)) {
            if (expectedOutput.length > 0 && typeof expectedOutput[0] === 'number') {
                returnType = '[]int';
            } else if (expectedOutput.length > 0 && typeof expectedOutput[0] === 'string') {
                returnType = '[]string';
            } else {
                returnType = '[]interface{}';
            }
        }

        // Generate type-specific comparison code
        let compareFunc = '';
        if (returnType === '[]int') {
            compareFunc = `func intSlicesEqual(a, b []int) bool {
	if len(a) != len(b) { return false }
	for i := range a {
		if a[i] != b[i] { return false }
	}
	return true
}

func compareOutput(actual, expected []int) bool {
	if len(actual) != len(expected) { return false }
	if intSlicesEqual(actual, expected) { return true }
	aCopy := make([]int, len(actual))
	eCopy := make([]int, len(expected))
	copy(aCopy, actual)
	copy(eCopy, expected)
	sort.Ints(aCopy)
	sort.Ints(eCopy)
	return intSlicesEqual(aCopy, eCopy)
}`;
        } else if (returnType === 'bool' || returnType === 'int' || returnType === 'float64' || returnType === 'string') {
            compareFunc = `func compareOutput(actual, expected ${returnType}) bool {
	return actual == expected
}`;
        } else {
            compareFunc = `func compareOutput(actual, expected interface{}) bool {
	aJSON, _ := json.Marshal(actual)
	eJSON, _ := json.Marshal(expected)
	return string(aJSON) == string(eJSON)
}`;
        }

        let code = `package main

import (
	"encoding/json"
	"fmt"
	"sort"
)

func ${funcName}(${paramDecl}) ${returnType} {
	// ${problem.name}
	// Write your solution here

	// TODO: Implement your solution
	return ${returnType === 'int' ? '0' : returnType === 'float64' ? '0.0' : returnType === 'string' ? '""' : returnType === 'bool' ? 'false' : 'nil'}
}

// ============ TEST RUNNER (DO NOT MODIFY BELOW) ============

type TestResult struct {
	Name     string      \`json:"name"\`
	Status   string      \`json:"status"\`
	Expected interface{} \`json:"expected"\`
	Actual   interface{} \`json:"actual"\`
	Error    string      \`json:"error,omitempty"\`
}

type TestOutput struct {
	Total   int          \`json:"total"\`
	Passed  int          \`json:"passed"\`
	Failed  int          \`json:"failed"\`
	Results []TestResult \`json:"results"\`
}

${compareFunc}

func main() {
	testCases := []struct {
		name     string
		${params.map(p => p.name + ' ' + p.type).join('\n\t\t')}
		expected ${returnType}
	}{
${testCases.map((tc, i) => {
    const inputVals = params.map(p => toGoLiteral(tc.input[p.name])).join(', ');
    const expectedVal = toGoLiteral(tc.expectedOutput);
    return `\t\t{"${tc.name}", ${inputVals}, ${expectedVal}},`;
}).join('\n')}
	}

	output := TestOutput{
		Total:   len(testCases),
		Results: make([]TestResult, 0, len(testCases)),
	}

	for _, tc := range testCases {
		result := TestResult{Name: tc.name}

		// Run the solution
		actual := ${funcName}(${paramNames.split(', ').map(n => 'tc.' + n).join(', ')})
		result.Expected = tc.expected
		result.Actual = actual

		if compareOutput(actual, tc.expected) {
			result.Status = "PASS"
			output.Passed++
		} else {
			result.Status = "FAIL"
			output.Failed++
		}

		output.Results = append(output.Results, result)
	}

	fmt.Println("__TEST_RESULTS__")
	jsonOutput, _ := json.Marshal(output)
	fmt.Println(string(jsonOutput))
	fmt.Println("__END_TEST_RESULTS__")
}
`;
        return code;
    }

    /**
     * Generate test code for a problem
     * @param {Object} problem - Problem configuration
     * @param {string} lang - Language ("python" or "go")
     * @returns {string} Test code
     */
    function generateTestCode(problem, lang) {
        if (lang === 'python') {
            return generatePythonTestCode(problem);
        } else if (lang === 'go' || lang === 'golang') {
            return generateGoTestCode(problem);
        }
        return '';
    }

    /**
     * Parse test results from execution output
     * @param {string} output - Execution output
     * @returns {Object|null} Parsed test results or null if not found
     */
    function parseTestResults(output) {
        const startMarker = '__TEST_RESULTS__';
        const endMarker = '__END_TEST_RESULTS__';

        if (!output || typeof output !== 'string') {
            console.warn('[ProblemRenderer] parseTestResults: invalid output', typeof output);
            return null;
        }

        // Strip HTML tags first (server may wrap output in HTML)
        let cleanOutput = output.replace(/<[^>]*>/g, ' ');

        // Decode common HTML entities
        cleanOutput = cleanOutput
            .replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, ' ')
            .replace(/&#x27;/g, "'")
            .replace(/&#x2F;/g, '/');

        const startIdx = cleanOutput.indexOf(startMarker);
        const endIdx = cleanOutput.indexOf(endMarker);

        console.log('[ProblemRenderer] Markers found:', startIdx !== -1, endIdx !== -1);

        if (startIdx === -1 || endIdx === -1) {
            console.warn('[ProblemRenderer] Test result markers not found in output');
            return null;
        }

        let jsonStr = cleanOutput.substring(startIdx + startMarker.length, endIdx).trim();

        // Handle case where JSON might have newlines or extra whitespace
        jsonStr = jsonStr.replace(/[\r\n]+/g, '').trim();

        console.log('[ProblemRenderer] JSON string length:', jsonStr.length);
        console.log('[ProblemRenderer] JSON preview:', jsonStr.substring(0, 100));

        try {
            const result = JSON.parse(jsonStr);
            console.log('[ProblemRenderer] Successfully parsed test results:', result.total, 'tests');
            return result;
        } catch (e) {
            console.error('[ProblemRenderer] Failed to parse test results:', e.message);
            console.error('[ProblemRenderer] JSON string was:', jsonStr.substring(0, 500));
            return null;
        }
    }

    /**
     * Validate a single output against expected
     * @param {*} actual - Actual output
     * @param {*} expected - Expected output
     * @returns {boolean} Whether they match
     */
    function validateOutput(actual, expected) {
        // Handle null/undefined
        if (actual === expected) return true;
        if (actual === null || expected === null) return false;
        if (actual === undefined || expected === undefined) return false;

        // Handle arrays
        if (Array.isArray(actual) && Array.isArray(expected)) {
            if (actual.length !== expected.length) return false;
            // Try exact match first
            if (JSON.stringify(actual) === JSON.stringify(expected)) return true;
            // Try sorted match for simple arrays
            try {
                const sortedActual = [...actual].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
                const sortedExpected = [...expected].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
                return JSON.stringify(sortedActual) === JSON.stringify(sortedExpected);
            } catch (e) {
                return false;
            }
        }

        // Handle objects
        if (typeof actual === 'object' && typeof expected === 'object') {
            return JSON.stringify(actual) === JSON.stringify(expected);
        }

        // Handle primitives
        return actual === expected;
    }

    // Global function to switch between solution tabs
    window.showSolutionTab = function(lang) {
        // Update tab buttons
        var pythonTab = document.getElementById('sol-tab-python');
        var goTab = document.getElementById('sol-tab-go');
        if (pythonTab) {
            pythonTab.style.background = lang === 'python' ? '#3b82f6' : '#e2e8f0';
            pythonTab.style.color = lang === 'python' ? '#fff' : '#64748b';
        }
        if (goTab) {
            goTab.style.background = lang === 'go' ? '#3b82f6' : '#e2e8f0';
            goTab.style.color = lang === 'go' ? '#fff' : '#64748b';
        }

        // Update content visibility
        var pythonContent = document.getElementById('sol-content-python');
        var goContent = document.getElementById('sol-content-go');
        if (pythonContent) pythonContent.style.display = lang === 'python' ? 'block' : 'none';
        if (goContent) goContent.style.display = lang === 'go' ? 'block' : 'none';

        // Highlight code if not already done
        if (typeof hljs !== 'undefined') {
            var container = document.getElementById('sol-content-' + lang);
            if (container) {
                container.querySelectorAll('pre code:not(.hljs)').forEach(function(block) {
                    hljs.highlightElement(block);
                });
            }
        }
    };

    // Global toggle function for similar problems (must be global for onclick handlers in dynamic content)
    window.toggleSimilarProblems = function(btn) {
        var container = document.getElementById('similar-problems-container');
        if (!container) return;

        if (container.style.display === 'none') {
            container.style.display = 'block';
            var count = container.querySelectorAll('[onclick]').length;
            btn.innerHTML = '<span>🔗</span> Hide Related Problems';
            btn.style.background = 'linear-gradient(135deg,#3b82f6,#60a5fa)';
        } else {
            container.style.display = 'none';
            var count = container.querySelectorAll('[onclick]').length;
            btn.innerHTML = '<span>🔗</span> Show ' + count + ' Related Problems';
            btn.style.background = 'linear-gradient(135deg,#10b981,#34d399)';
        }
    };

    // Export API
    window.ProblemRenderer = {
        register: registerProblem,
        get: getProblem,
        getByCategory: getProblemsInCategory,
        getCategories: getAllCategories,
        getTotal: getTotalCount,
        formatInput: formatInput,
        formatOutput: formatOutput,
        generateVizConfig: generateVizConfig,
        renderHTML: renderProblemHTML,
        getDashboardData: getDashboardData,
        search: searchProblems,
        // Test runner functions
        getTestCases: getTestCases,
        generateTestCode: generateTestCode,
        parseTestResults: parseTestResults,
        validateOutput: validateOutput,
        getFunctionName: getFunctionName,
        _problems: PROBLEMS,
        _categories: CATEGORIES
    };

    console.log('[ProblemRenderer] Problem renderer loaded');

})();
