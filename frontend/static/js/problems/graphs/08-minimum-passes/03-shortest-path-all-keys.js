/**
 * Shortest Path to Get All Keys
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path to Get All Keys',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        description: 'You are given an m x n grid grid where: - \'.\' is an empty cell - \'#\' is a wall - \'@\' is the starting point - Lowercase letters represent keys - Uppercase letters are locks that require the matching key Return the minimum number of moves to get all keys. If impossible, return -1.',
        complexity: {
            time: 'O(M * N * 2^K)',
            space: 'O(M * N * 2^K)'
        },
        examples: [
    {
        input: {
        "grid": [
                "@.a..",
                "###.#",
                "b.A.B"
        ]
},
        output: 8,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input grid=[@.a.., ###.#, b.A.B], the result is 8.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/03-shortest-path-all-keys', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/03-shortest-path-all-keys'] = problem;

})();
