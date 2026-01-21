/**
 * Recursion Algorithm Visualizations
 */
(function() {
    'use strict';

    if (!window.VizUtils) {
        console.error('[RecursionViz] VizUtils not loaded yet!');
        return;
    }

    function runRecursionFibonacci(example, config, complexity) {
        const steps = [];
        const n = example.input.n || example.input;
        const expected = example.output;

        steps.push({
            vizType: 'recursion-tree',
            n: n,
            callStack: [],
            memoized: {},
            status: 'Fibonacci(' + n + ')',
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Input:</strong> n = ' + n + '<br>' +
                '<strong>Expected:</strong> ' + expected + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Show recursive calls
        const calls = [];
        const memoized = { 0: 0, 1: 1 };
        for (let i = 2; i <= Math.min(n, 8); i++) {
            memoized[i] = memoized[i-1] + memoized[i-2];
            calls.push('fib(' + i + ') = fib(' + (i-1) + ') + fib(' + (i-2) + ') = ' + memoized[i]);
            steps.push({
                vizType: 'recursion-tree',
                n: n,
                currentCall: i,
                callStack: calls.slice(),
                memoized: {...memoized},
                status: 'fib(' + i + ') = ' + memoized[i],
                explanation: '<strong>Computing fib(' + i + ')</strong><br>' +
                    'fib(' + (i-1) + ') + fib(' + (i-2) + ') = ' + memoized[i-1] + ' + ' + memoized[i-2] + ' = ' + memoized[i]
            });
        }

        steps.push({
            vizType: 'recursion-tree',
            n: n,
            memoized: memoized,
            status: 'Result: fib(' + n + ') = ' + expected,
            explanation: '<strong>Result:</strong> fib(' + n + ') = ' + expected
        });

        return steps;
    }

    function runRecursionGeneric(example, config, complexity) {
        const steps = [];
        const inputStr = JSON.stringify(example.input, null, 2);
        const outputStr = JSON.stringify(example.output);

        steps.push({
            vizType: 'recursion-tree',
            status: config.name,
            explanation: '<strong>' + config.name + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                '<strong>Input:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;">' + inputStr + '</pre>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || outputStr) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        steps.push({
            vizType: 'recursion-tree',
            status: 'Building recursive tree...',
            explanation: '<strong>Recursion in progress...</strong><br>Building solution tree through recursive calls.'
        });

        steps.push({
            vizType: 'recursion-tree',
            status: 'Backtracking...',
            explanation: '<strong>Backtracking...</strong><br>Collecting results from recursive branches.'
        });

        steps.push({
            vizType: 'recursion-tree',
            status: 'Result: ' + (example.outputRaw || outputStr),
            explanation: '<strong>Result:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;">' + (example.outputRaw || outputStr) + '</pre>'
        });

        return steps;
    }

    // Register recursion visualizations
    window.VizUtils.register('recursion-fibonacci', runRecursionFibonacci);
    window.VizUtils.register('recursion-permutations', runRecursionGeneric);
    window.VizUtils.register('recursion-powerset', runRecursionGeneric);
    window.VizUtils.register('recursion-sudoku', runRecursionGeneric);
    window.VizUtils.register('recursion-backtrack', runRecursionGeneric);
    window.VizUtils.register('recursion-divide', runRecursionGeneric);
    window.VizUtils.register('recursion-product-sum', runRecursionGeneric);
    window.VizUtils.register('recursion-phone', runRecursionGeneric);
    window.VizUtils.register('recursion-staircase', runRecursionGeneric);
    window.VizUtils.register('recursion-divtags', runRecursionGeneric);
    window.VizUtils.register('recursion-measurements', runRecursionGeneric);
    window.VizUtils.register('recursion-interweaving', runRecursionGeneric);
    window.VizUtils.register('recursion-count-bst', runRecursionGeneric);
    window.VizUtils.register('recursion-probability', runRecursionGeneric);
    window.VizUtils.register('recursion-manager', runRecursionGeneric);
    window.VizUtils.register('recursion-minesweeper', runRecursionGeneric);

    window.RecursionViz = { runRecursionFibonacci, runRecursionGeneric };
    console.log('[RecursionViz] Recursion visualization handlers loaded');
})();
