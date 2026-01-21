/**
 * Path With Minimum Effort
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path With Minimum Effort',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        description: 'You are given a 2D array of heights representing a map. You need to travel from the top-left cell (0, 0) to the bottom-right cell (rows-1, cols-1). The **effort** of a path is the maximum absolute difference in heights between two consecutive cells. Return the minimum effort required to travel from the top-left to the bottom-right.',
        complexity: {
            time: 'O(M * N * log(M * N))',
            space: 'O(M * N)'
        },
        examples: [
    {
        input: {
        "heights": [
                [
                        1,
                        2,
                        2
                ],
                [
                        3,
                        8,
                        2
                ],
                [
                        5,
                        3,
                        5
                ]
        ]
},
        output: 2,
        explanation: 'Processing the input data produces the output. For input heights=[[1, 2, 2], [3, 8, 2], [5, 3, 5]], the result is 2.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/03-path-with-minimum-effort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/03-path-with-minimum-effort'] = problem;

})();
