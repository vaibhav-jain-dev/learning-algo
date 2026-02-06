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
        twists: [
            { title: 'Find the Arbitrage Path', difficulty: 'Hard', description: 'Not just detect arbitrage, but return the sequence of currencies that produces profit.', whyDifferent: 'Detection uses Bellman-Ford on log-transformed weights. Finding the path requires tracking predecessors during relaxation and backtracking from the negative cycle.', example: 'USD -> EUR -> GBP -> USD yields 1.02x starting amount. Return path: [USD, EUR, GBP, USD].' },
            { title: 'Maximum Arbitrage Profit', difficulty: 'Very Hard', description: 'Among all possible arbitrage cycles, find the one that yields the maximum profit ratio.', whyDifferent: 'Simply detecting any negative cycle is not enough. You must find the cycle with the most negative total weight (in log space), requiring cycle enumeration or optimization.', example: 'Cycle A gives 2% profit, Cycle B gives 5% profit. Return Cycle B with the path and 1.05 ratio.' },
            { title: 'Arbitrage with Fees', difficulty: 'Hard', description: 'Each currency exchange has a transaction fee (flat or percentage). Detect arbitrage considering fees.', whyDifferent: 'Fees reduce the effective exchange rate. The log-transform must account for fees: log(rate * (1 - fee_pct)) instead of log(rate), potentially eliminating marginal arbitrage.', example: 'Exchange rate 1.5 with 1% fee gives effective rate 1.485. An arbitrage opportunity at 1.5 may vanish with fees.' },
            { title: 'Time-Varying Rates', difficulty: 'Very Hard', description: 'Exchange rates change over time. Given rates at different timestamps, find if arbitrage exists at any point in time.', whyDifferent: 'You run the detection algorithm for each time snapshot, or more cleverly, track rate changes and only recheck affected cycles.', example: 'At time T1: no arbitrage. At T2: EUR/GBP rate changes, creating a profitable cycle. Detect the earliest time.' },
            { title: 'Limited Exchange Steps', difficulty: 'Medium', description: 'You can make at most K exchanges. Detect if arbitrage is possible within K steps.', whyDifferent: 'Standard Bellman-Ford runs N-1 iterations. With limit K, you run exactly K iterations and check if any diagonal element exceeds 1 (in original space).', example: 'With K=3 exchanges: USD->EUR->GBP->USD. If this cycle profits, arbitrage exists in 3 steps.' }
        ],
        similar: [
    { id: '11-detect-arbitrage/01-cheapest-flights-k-stops', name: 'Cheapest Flights Within K Stops', difficulty: 'Medium' },
    { id: '11-detect-arbitrage/02-path-with-max-probability', name: 'Path with Maximum Probability', difficulty: 'Medium' },
    { id: '11-detect-arbitrage/03-negative-cycle-detection', name: 'Negative Cycle Detection', difficulty: 'Medium' }
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
