/**
 * Possible Bipartition
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-coloring
 */
(function() {
    'use strict';

    const problem = {
        name: 'Possible Bipartition',
        difficulty: 'Medium',
        algorithm: 'graph-coloring',
        description: 'We want to split a group of n people into two groups. Given dislikes[i] = [ai, bi] where person ai dislikes person bi, return true if it\'s possible to split everyone into two groups such that no two people who dislike each other are in the same group.',
        complexity: {
            time: 'O(V + E)',
            space: 'O(V + E)'
        },
        examples: [
    {
        input: {
        "n": 4,
        "dislikes": [
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        4
                ]
        ]
},
        output: true,
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=4, dislikes=[[1, 2], [1, 3], [2, 4]], the result is true.'
    },
    {
        input: {
        "n": 3,
        "dislikes": [
                [
                        1,
                        2
                ],
                [
                        1,
                        3
                ],
                [
                        2,
                        3
                ]
        ]
},
        output: false,
        explanation: 'Exploring the graph structure, we find the required path or value. For input n=3, dislikes=[[1, 2], [1, 3], [2, 3]], the result is false.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '09-two-colorable/02-possible-bipartition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/09-two-colorable/02-possible-bipartition'] = problem;

})();
