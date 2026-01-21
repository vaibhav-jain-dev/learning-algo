/**
 * Connecting Cities With Minimum Cost
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Connecting Cities With Minimum Cost',
        difficulty: 'Medium',
        algorithm: 'kruskals-algorithm',
        description: 'There are n cities numbered from 1 to n. You are given connections where connections[i] = [city1, city2, cost] represents a bidirectional road. Return the minimum cost to connect all cities, or -1 if impossible.',
        complexity: {
            time: 'O(E log E)',
            space: 'O(n)'
        },
        examples: [
    {
        input: {
        "n": 3,
        "connections": [
                [
                        1,
                        2,
                        5
                ],
                [
                        1,
                        3,
                        6
                ],
                [
                        2,
                        3,
                        1
                ]
        ]
},
        output: 6,
        explanation: 'Processing the input data produces the output. For input n=3, connections=[[1, 2, 5], [1, 3, 6], [2, 3, 1]], the result is 6.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/02-connecting-cities', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/02-connecting-cities'] = problem;

})();
