/**
 * Cheapest Flights Within K Stops
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: bellman-ford-dijkstra
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cheapest Flights Within K Stops',
        difficulty: 'Medium',
        algorithm: 'bellman-ford-dijkstra',
        description: 'There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.',
        complexity: {
            time: 'O(K * E)',
            space: 'O(V)'
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
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/01-cheapest-flights-k-stops', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/01-cheapest-flights-k-stops'] = problem;

})();
