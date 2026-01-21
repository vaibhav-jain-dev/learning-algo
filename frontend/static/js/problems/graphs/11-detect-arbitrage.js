/**
 * Detect Arbitrage
 * Category: graphs
 * Difficulty: Very
 * Algorithm: graph-arbitrage
 */
(function() {
    'use strict';

    const problem = {
        name: 'Detect Arbitrage',
        difficulty: 'Very',
        algorithm: 'graph-arbitrage',
        description: 'You\'re given a two-dimensional array that represents an exchange rates table. The array contains rates for converting one currency into another. For example, exchangeRates[i][j] represents the rate for converting currency i into currency j. Write a function that returns a boolean indicating whether or not an arbitrage opportunity exists with these exchange rates. An arbitrage occurs when you can start with one currency, exchange it for others through a series of transactions, and end up with mor',
        complexity: {
            time: 'O(N^3)',
            space: 'O(N^2)'
        },
        examples: [
    {
        input: {
        "exchangeRates": [
                [
                        1.0,
                        0.8631,
                        0.5903
                ],
                [
                        1.1586,
                        1.0,
                        0.6849
                ],
                [
                        1.6939,
                        1.46,
                        1.0
                ]
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input exchangeRates=[[1.0, 0.8631, 0.5903], [1.1586, 1.0, 0.6849], [1.6939, 1.46, 1.0]], the result is true.'
    },
    {
        input: {
        "exchangeRates": [
                [
                        1.0,
                        0.5,
                        0.25
                ],
                [
                        2.0,
                        1.0,
                        0.5
                ],
                [
                        4.0,
                        2.0,
                        1.0
                ]
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input exchangeRates=[[1.0, 0.5, 0.25], [2.0, 1.0, 0.5], [4.0, 2.0, 1.0]], the result is false.'
    }
        ],
        similar: [
    { id: '01-cheapest-flights-k-stops', name: 'Cheapest Flights Within K Stops', difficulty: 'Medium' },
    { id: '02-path-with-max-probability', name: 'Path with Maximum Probability', difficulty: 'Medium' },
    { id: '03-negative-cycle-detection', name: 'Negative Cycle Detection', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage'] = problem;

})();
