/**
 * Famous Algorithm Visualizations
 */
(function() {
    'use strict';

    if (!window.VizUtils) {
        console.error('[FamousViz] VizUtils not loaded yet!');
        return;
    }

    function runFamousAlgorithm(example, config, complexity) {
        const steps = [];
        const algorithm = config.algorithm || 'famous';
        const inputStr = JSON.stringify(example.input, null, 2);

        // Determine algorithm-specific visualization
        let vizType = 'graph';
        let algorithmName = config.name;

        if (algorithm.includes('dijkstra')) {
            algorithmName = "Dijkstra's Shortest Path";
            vizType = 'graph';
        } else if (algorithm.includes('kruskal')) {
            algorithmName = "Kruskal's MST";
            vizType = 'graph';
        } else if (algorithm.includes('prim')) {
            algorithmName = "Prim's MST";
            vizType = 'graph';
        } else if (algorithm.includes('a-star') || algorithm.includes('bfs-astar')) {
            algorithmName = 'A* Pathfinding';
            vizType = 'matrix';
        } else if (algorithm.includes('topological')) {
            algorithmName = 'Topological Sort';
            vizType = 'graph';
        } else if (algorithm.includes('kadane')) {
            algorithmName = "Kadane's Algorithm";
            vizType = 'array';
        } else if (algorithm.includes('kmp')) {
            algorithmName = 'KMP String Matching';
            vizType = 'array';
        } else if (algorithm.includes('union-find')) {
            algorithmName = 'Union-Find';
            vizType = 'graph';
        }

        steps.push({
            vizType: vizType,
            status: algorithmName,
            explanation: '<strong>' + algorithmName + '</strong><br><br>' +
                '<strong>Algorithm:</strong> ' + config.algorithm + '<br>' +
                '<strong>Input:</strong><br><pre style="background:#161b22;padding:0.5rem;border-radius:4px;font-size:0.85em;">' + inputStr.substring(0, 300) + '</pre>' +
                '<strong>Expected:</strong> ' + (example.outputRaw || JSON.stringify(example.output)) + '<br><br>' +
                '<div style="background:#1f6feb22;padding:0.75rem;border-radius:6px;border-left:3px solid #58a6ff;">' +
                '<strong>Complexity:</strong> Time: ' + complexity.time + ', Space: ' + complexity.space + '</div>'
        });

        // Algorithm-specific steps
        if (algorithm.includes('kadane')) {
            const arr = example.input.array || example.input;
            if (Array.isArray(arr)) {
                let maxSum = arr[0];
                let currentSum = arr[0];
                for (let i = 1; i < Math.min(arr.length, 8); i++) {
                    currentSum = Math.max(arr[i], currentSum + arr[i]);
                    maxSum = Math.max(maxSum, currentSum);
                    steps.push({
                        vizType: 'array',
                        array: arr,
                        currentIndex: i,
                        currentSum: currentSum,
                        maxSum: maxSum,
                        status: 'idx=' + i + ': currentSum=' + currentSum + ', maxSum=' + maxSum,
                        explanation: '<strong>Index ' + i + ':</strong> value=' + arr[i] + '<br>currentSum = max(' + arr[i] + ', ' + (currentSum - arr[i] + arr[i]) + ') = ' + currentSum + '<br>maxSum = ' + maxSum
                    });
                }
            }
        } else {
            steps.push({
                vizType: vizType,
                status: 'Processing...',
                explanation: '<strong>Algorithm executing...</strong><br>Processing input with ' + algorithmName + '.'
            });

            steps.push({
                vizType: vizType,
                status: 'Building solution...',
                explanation: '<strong>Building optimal solution...</strong>'
            });
        }

        steps.push({
            vizType: vizType,
            status: 'Result: ' + (example.outputRaw || JSON.stringify(example.output)),
            explanation: '<strong>Result:</strong> ' + (example.outputRaw || JSON.stringify(example.output))
        });

        return steps;
    }

    // Register famous algorithm visualizations
    window.VizUtils.register('dijkstra', runFamousAlgorithm);
    window.VizUtils.register('dijkstras-algorithm', runFamousAlgorithm);
    window.VizUtils.register('kruskal', runFamousAlgorithm);
    window.VizUtils.register('kruskals-algorithm', runFamousAlgorithm);
    window.VizUtils.register('prim', runFamousAlgorithm);
    window.VizUtils.register('prims-algorithm', runFamousAlgorithm);
    window.VizUtils.register('a-star', runFamousAlgorithm);
    window.VizUtils.register('bfs-astar', runFamousAlgorithm);
    window.VizUtils.register('a-star-bfs', runFamousAlgorithm);
    window.VizUtils.register('topological-sort', runFamousAlgorithm);
    window.VizUtils.register('union-find', runFamousAlgorithm);
    window.VizUtils.register('kadane', runFamousAlgorithm);
    window.VizUtils.register('kadanes-algorithm', runFamousAlgorithm);
    window.VizUtils.register('kmp', runFamousAlgorithm);
    window.VizUtils.register('kmp-algorithm', runFamousAlgorithm);

    window.FamousViz = { runFamousAlgorithm };
    console.log('[FamousViz] Famous algorithm visualization handlers loaded');
})();
