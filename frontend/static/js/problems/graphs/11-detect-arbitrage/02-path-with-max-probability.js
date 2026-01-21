/**
 * Path with Maximum Probability
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: dijkstra-modified
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path with Maximum Probability',
        difficulty: 'Medium',
        algorithm: 'dijkstra-modified',
        description: 'You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting nodes a and b with a probability of success of traversing that edge succProb[i]. Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability. If there is no path from start to end, return 0.',
        complexity: {
            time: 'O(E log V)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "n": 3,
        "edges": [
                [
                        0,
                        1
                ],
                [
                        1,
                        2
                ],
                [
                        0,
                        2
                ]
        ],
        "succProb": [
                0.5,
                0.5,
                0.2
        ],
        "start": 0,
        "end": 2
},
        output: 0.25,
        explanation: 'Processing the input data produces the output. For input n=3, edges=[[0, 1], [1, 2], [0, 2]], succProb=[0.5, 0.5, 0.2], start=0, end=2, the result is 0.25.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '11-detect-arbitrage/02-path-with-max-probability', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/11-detect-arbitrage/02-path-with-max-probability'] = problem;

})();
