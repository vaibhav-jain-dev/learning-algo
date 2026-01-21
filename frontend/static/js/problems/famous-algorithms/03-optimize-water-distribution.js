/**
 * Optimize Water Distribution in a Village
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Optimize Water Distribution in a Village',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        description: 'There are n houses. For each house, you can either build a well inside it (costs wells[i]) or lay a pipe from another house (costs given in pipes). Return the minimum cost to supply water to all houses.',
        complexity: {
            time: 'O((n + E) log(n + E))',
            space: 'O(n + E)'
        },
        examples: [
    {
        input: {
        "n": 3,
        "wells": [
                1,
                2,
                2
        ],
        "pipes": [
                [
                        1,
                        2,
                        1
                ],
                [
                        2,
                        3,
                        1
                ]
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input n=3, wells=[1, 2, 2], pipes=[[1, 2, 1], [2, 3, 1]], the result is 3.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-optimize-water-distribution', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-optimize-water-distribution'] = problem;

})();
