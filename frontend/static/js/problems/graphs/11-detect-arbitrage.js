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
        description: 'You\'re given a two-dimensional array that represents an exchange rates table. The array contains rates for converting one currency into another. For example, exchangeRates[i][j] represents the rate for converting currency i into currency j. Write a function that returns a boolean indicating whether or not an arbitrage opportunity exists with these exchange rates. An arbitrage occurs when you can start with one currency, exchange it for others through a series of transactions, and end up with mor.',
        problem: 'Model the problem as a graph traversal. Choose the appropriate traversal strategy (DFS/BFS) based on whether you need depth exploration or shortest paths. Track visited nodes to handle cycles. This achieves O(N^3) time with O(N^2) space.',
        hints: [
            'Choose the right graph representation: adjacency list vs adjacency matrix.',
            'Consider whether the graph is directed or undirected, weighted or unweighted.',
            'Track visited nodes to handle cycles and avoid infinite loops.',
            'Think about which graph traversal algorithm best fits this problem: DFS, BFS, or something else.'
        ],

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
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
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
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        twists: [
            { id: '11-detect-arbitrage/twist-01-find-the-arbitrage-path', name: 'Find the Arbitrage Path', difficulty: 'Hard' },
            { id: '11-detect-arbitrage/twist-02-maximum-arbitrage-profit', name: 'Maximum Arbitrage Profit', difficulty: 'Very Hard' },
            { id: '11-detect-arbitrage/twist-03-arbitrage-with-fees', name: 'Arbitrage with Fees', difficulty: 'Hard' },
            { id: '11-detect-arbitrage/twist-04-time-varying-rates', name: 'Time-Varying Rates', difficulty: 'Very Hard' },
            { id: '11-detect-arbitrage/twist-05-limited-exchange-steps', name: 'Limited Exchange Steps', difficulty: 'Medium' }
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
