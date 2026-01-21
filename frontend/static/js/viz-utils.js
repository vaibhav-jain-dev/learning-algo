/**
 * Visualization Utilities - Generic Framework for 200 Problems
 *
 * This module provides a flexible, generic visualization framework that can be
 * customized per-problem while maintaining consistency across the platform.
 *
 * Usage:
 * 1. Each problem can have its own _viz.js file that defines visualization logic
 * 2. The _viz.js file exports a visualization handler function
 * 3. Custom visualizations override the generic behavior
 */
(function() {
    'use strict';

    // ===========================================
    // Visualization Registry
    // ===========================================

    // Registry to store all visualization handlers by algorithm type
    const vizRegistry = {};

    // Registry to store problem-specific handlers (by problem path)
    const problemVizRegistry = {};

    // ===========================================
    // Generic Visualization Types
    // ===========================================

    const VIZ_TYPES = {
        ARRAY: 'array',
        ARRAY_HASH: 'array-hash',
        TWO_ARRAYS: 'two-arrays',
        TWO_POINTER: 'two-pointer',
        TWO_POINTER_RESULT: 'two-pointer-result',
        THREE_POINTER: 'three-pointer',
        HASH_TABLE: 'hash-table',
        LINKED_LIST: 'linked-list',
        TREE: 'tree',
        GRAPH: 'graph',
        MATRIX: 'matrix',
        SPIRAL_MATRIX: 'spiral-matrix',
        DP_TABLE: 'dp-table',
        GENERIC: 'generic'
    };

    // ===========================================
    // Generic Step Builder
    // ===========================================

    /**
     * Creates a step object for visualization
     * @param {Object} options - Step configuration
     * @returns {Object} Step object
     */
    function createStep(options) {
        return {
            vizType: options.vizType || VIZ_TYPES.GENERIC,
            status: options.status || '',
            explanation: options.explanation || '',
            ...options
        };
    }

    /**
     * Creates an intro step with problem info
     * @param {Object} config - Problem configuration
     * @param {Object} example - Current example
     * @param {Object} complexity - Time/space complexity
     * @returns {Object} Intro step
     */
    function createIntroStep(config, example, complexity) {
        const inputStr = JSON.stringify(example.input, null, 2);
        return createStep({
            vizType: VIZ_TYPES.GENERIC,
            status: 'Initialize: ' + config.name,
            explanation: formatExplanation([
                '<strong>' + config.name + '</strong>',
                '',
                '<strong>Algorithm:</strong> ' + config.algorithm,
                '',
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">',
                '<strong>Input:</strong><br><pre style="margin:0.5rem 0;">' + (example.inputRaw || inputStr) + '</pre>',
                '<strong>Complexity:</strong> Time: <code>' + complexity.time + '</code>, Space: <code>' + complexity.space + '</code>',
                '</div>'
            ])
        });
    }

    /**
     * Creates a result/completion step
     * @param {Object} config - Problem configuration
     * @param {*} result - The result value
     * @param {String} additionalInfo - Extra explanation
     * @returns {Object} Result step
     */
    function createResultStep(config, result, additionalInfo) {
        const resultStr = JSON.stringify(result);
        return createStep({
            vizType: VIZ_TYPES.GENERIC,
            status: 'Result: ' + resultStr,
            explanation: formatExplanation([
                '<strong>Complete!</strong>',
                '',
                '<strong>Output:</strong> <code>' + resultStr + '</code>',
                additionalInfo || ''
            ])
        });
    }

    // ===========================================
    // Format Helpers
    // ===========================================

    function formatExplanation(lines) {
        return lines.filter(l => l !== undefined).join('<br>');
    }

    function formatArray(arr, highlightIndices, pointers) {
        if (!arr) return '[]';
        return '[' + arr.map((val, i) => {
            let formatted = String(val);
            if (highlightIndices && highlightIndices.includes(i)) {
                formatted = '<strong style="color:#3fb950;">' + formatted + '</strong>';
            }
            if (pointers) {
                if (pointers.left === i) formatted = '(' + formatted + ')L';
                if (pointers.right === i) formatted = '(' + formatted + ')R';
            }
            return formatted;
        }).join(', ') + ']';
    }

    // ===========================================
    // Generic Visualization Runners
    // ===========================================

    /**
     * Generic array visualization
     * Shows step-by-step array transformations
     */
    function runArrayVisualization(example, config, complexity, options = {}) {
        const steps = [];
        const arr = example.input.array || example.input;
        const expected = example.output;

        // Intro step
        steps.push(createIntroStep(config, example, complexity));

        // Show input
        steps.push(createStep({
            vizType: VIZ_TYPES.ARRAY,
            array: Array.isArray(arr) ? arr.slice() : arr,
            status: 'Input array',
            explanation: '<strong>Input:</strong> ' + formatArray(arr)
        }));

        // Show output
        steps.push(createStep({
            vizType: VIZ_TYPES.ARRAY,
            array: Array.isArray(expected) ? expected : arr,
            status: 'Expected output',
            explanation: '<strong>Expected:</strong> ' + JSON.stringify(expected)
        }));

        return steps;
    }

    /**
     * Two-pointer array visualization
     */
    function runTwoPointerVisualization(example, config, complexity, options = {}) {
        const steps = [];
        const arr = example.input.array;
        const expected = example.output;

        steps.push(createIntroStep(config, example, complexity));

        // Initial state with pointers
        steps.push(createStep({
            vizType: VIZ_TYPES.TWO_POINTER,
            array: arr.slice(),
            left: 0,
            right: arr.length - 1,
            status: 'Initialize pointers: left=0, right=' + (arr.length - 1),
            explanation: formatExplanation([
                '<strong>Two Pointer Technique</strong>',
                '',
                'Left pointer starts at beginning',
                'Right pointer starts at end',
                '',
                'Array: ' + formatArray(arr, [], { left: 0, right: arr.length - 1 })
            ])
        }));

        steps.push(createResultStep(config, expected, 'Using two-pointer technique'));
        return steps;
    }

    /**
     * Hash table visualization
     */
    function runHashTableVisualization(example, config, complexity, options = {}) {
        const steps = [];
        const arr = example.input.array;
        const expected = example.output;

        steps.push(createIntroStep(config, example, complexity));

        // Show hash table building
        steps.push(createStep({
            vizType: VIZ_TYPES.ARRAY_HASH,
            array: arr.slice(),
            hashTable: [],
            status: 'Build hash table',
            explanation: formatExplanation([
                '<strong>Hash Table Approach</strong>',
                '',
                'We use a hash table/set for O(1) lookups',
                '',
                'Array: ' + formatArray(arr)
            ])
        }));

        steps.push(createResultStep(config, expected, 'Using hash table for efficient lookups'));
        return steps;
    }

    /**
     * Generic fallback visualization
     */
    function runGenericVisualization(example, config, complexity) {
        const steps = [];
        const inputStr = JSON.stringify(example.input, null, 2);
        const outputStr = JSON.stringify(example.output);

        steps.push(createStep({
            vizType: VIZ_TYPES.GENERIC,
            status: 'Problem: ' + config.name,
            explanation: formatExplanation([
                '<strong>' + config.name + '</strong>',
                '',
                '<strong>Algorithm:</strong> ' + config.algorithm,
                '',
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">',
                '<strong>Complexity:</strong><br>Time: <code>' + complexity.time + '</code><br>Space: <code>' + complexity.space + '</code>',
                '</div>'
            ])
        }));

        steps.push(createStep({
            vizType: VIZ_TYPES.GENERIC,
            input: example.input,
            status: 'Input',
            explanation: '<strong>Input:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;overflow-x:auto;">' +
                (example.inputRaw || inputStr) + '</pre>'
        }));

        steps.push(createStep({
            vizType: VIZ_TYPES.GENERIC,
            output: example.output,
            status: 'Processing...',
            explanation: '<strong>Algorithm executing...</strong><br><br>' +
                'The algorithm processes the input according to the ' + config.algorithm + ' pattern.'
        }));

        steps.push(createStep({
            vizType: VIZ_TYPES.GENERIC,
            output: example.output,
            status: 'Output: ' + (example.outputRaw || outputStr),
            explanation: '<strong>Output:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;overflow-x:auto;">' +
                (example.outputRaw || outputStr) + '</pre><br><br>' +
                '<strong>Complete!</strong>'
        }));

        return steps;
    }

    // ===========================================
    // Registration Functions
    // ===========================================

    /**
     * Register a visualization handler for an algorithm type
     * @param {String} algorithmType - The algorithm identifier (e.g., 'two-pointer-subsequence')
     * @param {Function} handler - The visualization handler function
     */
    function registerVisualization(algorithmType, handler) {
        vizRegistry[algorithmType] = handler;
        console.log('[VizUtils] Registered visualization for algorithm:', algorithmType);
    }

    /**
     * Register a problem-specific visualization handler
     * @param {String} problemPath - The problem path (e.g., 'arrays/01-validate-subsequence')
     * @param {Function} handler - The visualization handler function
     */
    function registerProblemVisualization(problemPath, handler) {
        problemVizRegistry[problemPath] = handler;
        console.log('[VizUtils] Registered problem-specific visualization for:', problemPath);
    }

    /**
     * Get the visualization handler for a given config
     * @param {String} algorithmType - The algorithm type
     * @param {String} problemPath - Optional problem path for specific overrides
     * @returns {Function} The visualization handler
     */
    function getVisualizationHandler(algorithmType, problemPath) {
        // First check for problem-specific handler
        if (problemPath && problemVizRegistry[problemPath]) {
            return problemVizRegistry[problemPath];
        }
        // Then check for algorithm-type handler
        if (vizRegistry[algorithmType]) {
            return vizRegistry[algorithmType];
        }
        // Fallback to generic
        return runGenericVisualization;
    }

    /**
     * Generate visualization steps from config
     * @param {Object} config - The viz-config from problem.md
     * @param {Number} exampleIndex - Which example to visualize
     * @param {String} problemPath - Optional problem path
     * @returns {Array} Array of step objects
     */
    function generateSteps(config, exampleIndex, problemPath) {
        if (!config || !config.examples || !config.examples[exampleIndex]) {
            console.log('[VizUtils] No config or example found');
            return null;
        }

        const example = config.examples[exampleIndex];
        const algorithm = config.algorithm || 'generic';
        const complexity = config.complexity || { time: 'O(n)', space: 'O(1)' };

        console.log('[VizUtils] Generating steps for algorithm:', algorithm, 'problemPath:', problemPath);

        const handler = getVisualizationHandler(algorithm, problemPath);
        return handler(example, config, complexity);
    }

    // ===========================================
    // Index Functions
    // ===========================================

    /**
     * Get all registered visualizations
     * @returns {Object} Object with algorithm and problem registries
     */
    function getRegisteredVisualizations() {
        return {
            algorithms: Object.keys(vizRegistry),
            problems: Object.keys(problemVizRegistry)
        };
    }

    /**
     * Check if a visualization exists for an algorithm
     * @param {String} algorithmType - The algorithm type
     * @returns {Boolean}
     */
    function hasVisualization(algorithmType) {
        return !!vizRegistry[algorithmType];
    }

    // ===========================================
    // Export Public API
    // ===========================================

    window.VizUtils = {
        // Types
        VIZ_TYPES: VIZ_TYPES,

        // Step creation
        createStep: createStep,
        createIntroStep: createIntroStep,
        createResultStep: createResultStep,

        // Format helpers
        formatExplanation: formatExplanation,
        formatArray: formatArray,

        // Generic runners
        runArrayVisualization: runArrayVisualization,
        runTwoPointerVisualization: runTwoPointerVisualization,
        runHashTableVisualization: runHashTableVisualization,
        runGenericVisualization: runGenericVisualization,

        // Registration
        register: registerVisualization,
        registerProblem: registerProblemVisualization,
        getHandler: getVisualizationHandler,

        // Generation
        generateSteps: generateSteps,

        // Index
        getRegistered: getRegisteredVisualizations,
        hasVisualization: hasVisualization
    };

    console.log('[VizUtils] Visualization utilities loaded');

})();
