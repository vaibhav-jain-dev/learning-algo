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

        // Problem title and difficulty
        html += '<h1 style="color:#c9d1d9;margin-bottom:0.5rem;">' + problem.name + '</h1>\n\n';

        // Difficulty badge
        const diffColors = {
            'Easy': { bg: '#238636', text: '#ffffff' },
            'Medium': { bg: '#1f6feb', text: '#ffffff' },
            'Hard': { bg: '#da3633', text: '#ffffff' },
            'Very Hard': { bg: '#6e40c9', text: '#ffffff' }
        };
        const diffStyle = diffColors[problem.difficulty] || { bg: '#6e7681', text: '#ffffff' };
        html += '<p style="color:#8b949e;margin-bottom:1.5rem;"><strong>Difficulty:</strong> <span style="background:' + diffStyle.bg + ';color:' + diffStyle.text + ';padding:0.25rem 0.75rem;border-radius:1rem;font-size:0.85rem;font-weight:600;">' + problem.difficulty + '</span></p>\n\n';

        // Problem description
        html += '<h2 style="color:#58a6ff;margin-top:1.5rem;margin-bottom:0.75rem;font-size:1.25rem;">Problem Statement</h2>\n';
        html += '<p style="color:#c9d1d9;line-height:1.7;margin-bottom:1.5rem;">' + problem.description + '</p>\n\n';

        // Examples section
        html += '<h2 style="color:#58a6ff;margin-top:1.5rem;margin-bottom:1rem;font-size:1.25rem;">Examples</h2>\n';
        problem.examples.forEach((ex, i) => {
            html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1rem 1.25rem;margin-bottom:1rem;">\n';
            html += '<p style="color:#58a6ff;font-weight:600;margin-bottom:0.75rem;font-size:1rem;">Example ' + (i + 1) + ':</p>\n';

            // Input/Output in a code-like box
            html += '<div style="background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:0.875rem 1rem;font-family:\'SF Mono\',\'Fira Code\',\'Consolas\',monospace;font-size:0.9rem;margin-bottom:0.75rem;">\n';
            html += '<div style="margin-bottom:0.5rem;"><span style="color:#7ee787;font-weight:500;">Input:</span> <span style="color:#c9d1d9;">' + formatInput(ex.input) + '</span></div>\n';
            html += '<div><span style="color:#ff7b72;font-weight:500;">Output:</span> <span style="color:#c9d1d9;">' + formatOutput(ex.output) + '</span></div>\n';
            html += '</div>\n';

            // Input to Output explanation
            if (ex.explanation) {
                html += '<p style="color:#8b949e;line-height:1.6;margin:0;font-size:0.9rem;"><strong style="color:#d2a8ff;">Explanation:</strong> ' + ex.explanation + '</p>\n';
            }
            html += '</div>\n\n';
        });

        // Hints section (collapsible)
        if (problem.hints && problem.hints.length > 0) {
            html += '<h2 style="color:#58a6ff;margin-top:1.5rem;margin-bottom:1rem;font-size:1.25rem;">Hints</h2>\n';
            html += '<div class="hints-container">\n';
            problem.hints.forEach((hint, i) => {
                html += '<details class="hint" style="background:#161b22;border:1px solid #30363d;border-radius:6px;margin-bottom:0.5rem;padding:0.75rem 1rem;">\n';
                html += '<summary style="color:#c9d1d9;cursor:pointer;font-weight:500;"><strong style="color:#58a6ff;">Hint ' + (i + 1) + '</strong></summary>\n';
                html += '<p style="color:#8b949e;margin-top:0.75rem;margin-bottom:0;line-height:1.6;">' + hint + '</p>\n';
                html += '</details>\n';
            });
            html += '</div>\n\n';
        }

        // Problem approach/solution insights
        if (problem.problem) {
            html += '<h2 style="color:#58a6ff;margin-top:1.5rem;margin-bottom:0.75rem;font-size:1.25rem;">Approach</h2>\n';
            html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1rem 1.25rem;">\n';
            html += '<p style="color:#c9d1d9;margin:0;line-height:1.7;">' + problem.problem + '</p>\n';
            html += '</div>\n\n';
        }

        // Complexity
        html += '<h2 style="color:#58a6ff;margin-top:1.5rem;margin-bottom:0.75rem;font-size:1.25rem;">Complexity</h2>\n';
        html += '<div style="display:flex;gap:1.5rem;flex-wrap:wrap;">\n';
        html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:0.75rem 1.25rem;"><span style="color:#8b949e;">Time:</span> <span style="color:#7ee787;font-family:monospace;font-weight:600;">' + problem.complexity.time + '</span></div>\n';
        html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:8px;padding:0.75rem 1.25rem;"><span style="color:#8b949e;">Space:</span> <span style="color:#ff7b72;font-family:monospace;font-weight:600;">' + problem.complexity.space + '</span></div>\n';
        html += '</div>\n\n';

        // Similar problems (if any)
        if (problem.similar && problem.similar.length > 0) {
            html += '<h2 style="color:#58a6ff;margin-top:1.5rem;margin-bottom:0.75rem;font-size:1.25rem;">Similar Problems</h2>\n';
            html += '<div style="display:flex;flex-wrap:wrap;gap:0.5rem;">\n';
            problem.similar.forEach(sim => {
                const simDiff = diffColors[sim.difficulty] || { bg: '#6e7681', text: '#ffffff' };
                html += '<div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:0.5rem 0.875rem;display:flex;align-items:center;gap:0.5rem;">';
                html += '<span style="color:#c9d1d9;font-weight:500;">' + sim.name + '</span>';
                html += '<span style="background:' + simDiff.bg + ';color:' + simDiff.text + ';padding:0.125rem 0.5rem;border-radius:0.75rem;font-size:0.75rem;font-weight:500;">' + sim.difficulty + '</span>';
                html += '</div>\n';
            });
            html += '</div>\n';
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
        _problems: PROBLEMS,
        _categories: CATEGORIES
    };

    console.log('[ProblemRenderer] Problem renderer loaded');

})();
