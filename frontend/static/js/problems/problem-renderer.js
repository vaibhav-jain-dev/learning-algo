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
        html += '<h1>' + problem.name + '</h1>\n\n';
        html += '<p><strong>Difficulty:</strong> ' + problem.difficulty + '</p>\n\n';

        // Problem description
        html += '<h2>Problem Statement</h2>\n';
        html += '<p>' + problem.description + '</p>\n\n';

        // Examples
        html += '<h2>Examples</h2>\n';
        problem.examples.forEach((ex, i) => {
            html += '<div class="example">\n';
            html += '<p><strong>Example ' + (i + 1) + ':</strong></p>\n';
            html += '<pre>Input: ' + formatInput(ex.input) + '\n';
            html += 'Output: ' + formatOutput(ex.output) + '</pre>\n';

            // Input to Output explanation
            if (ex.explanation) {
                html += '<p class="explanation"><strong>Explanation:</strong> ' + ex.explanation + '</p>\n';
            }
            html += '</div>\n\n';
        });

        // Complexity
        html += '<h2>Complexity</h2>\n';
        html += '<ul>\n';
        html += '<li><strong>Time:</strong> ' + problem.complexity.time + '</li>\n';
        html += '<li><strong>Space:</strong> ' + problem.complexity.space + '</li>\n';
        html += '</ul>\n\n';

        // Similar problems (if any)
        if (problem.similar && problem.similar.length > 0) {
            html += '<h2>Similar Problems</h2>\n';
            html += '<ul>\n';
            problem.similar.forEach(sim => {
                html += '<li><strong>' + sim.name + '</strong> (' + sim.difficulty + ')</li>\n';
            });
            html += '</ul>\n';
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
