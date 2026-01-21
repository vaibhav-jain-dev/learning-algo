/**
 * Cheapest Flights Within K Stops
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        algorithm: 'dijkstras-algorithm',
        description: 'There are n cities connected by m flights. Each flight starts from city u and arrives at v with a price w. Given all the cities and flights, find the cheapest price from src to dst with at most k stops.',
        complexity: {
            time: 'O(E * K)',
            space: 'O(N * K)'
        },
        examples: [
    {
        input: {
        "n": 4,
        "flights": [
                [
                        0,
                        1,
                        100
                ],
                [
                        1,
                        2,
                        100
                ],
                [
                        2,
                        0,
                        100
                ],
                [
                        1,
                        3,
                        600
                ],
                [
                        2,
                        3,
                        200
                ]
        ],
        "src": 0,
        "dst": 3,
        "k": 1
},
        output: 700,
        explanation: 'Processing the input data produces the output. For input n=4, flights=[[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], src=0, dst=3, k=1, the result is 700.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-cheapest-flights', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-cheapest-flights'] = problem;

})();
