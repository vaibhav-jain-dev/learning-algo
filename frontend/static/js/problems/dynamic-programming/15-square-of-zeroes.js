/**
 * Square of Zeroes
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-square-zeroes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Square of Zeroes',
        difficulty: 'Very',
        algorithm: 'dp-square-zeroes',
        description: 'Write a function that takes in a square matrix of only 0s and 1s and returns a boolean representing whether the matrix contains a square whose borders are made up of only 0s. Note that a square can be of size 1x1 (single 0 counts as a valid square of zeroes).',
        complexity: {
            time: 'O(n^3)',
            space: 'O(n^2)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1,
                        0,
                        1,
                        0
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        1
                ],
                [
                        0,
                        1,
                        1,
                        1,
                        0,
                        1
                ],
                [
                        0,
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        0,
                        1,
                        1,
                        1,
                        0,
                        1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        0,
                        1
                ]
        ]
},
        output: true,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input matrix=[[1, 1, 1, 0, 1, 0], [0, 0, 0, 0, 0, 1], ..., [0, 0, 0, 0, 0, 1]] (length 6), the result is true.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        0,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: true,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input matrix=[[1, 1, 1], [1, 0, 1], [1, 1, 1]], the result is true.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        1,
                        1
                ],
                [
                        1,
                        1,
                        1
                ]
        ]
},
        output: false,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input matrix=[[1, 1, 1], [1, 1, 1], [1, 1, 1]], the result is false.'
    }
        ],
        twists: [
            { id: '15-square-of-zeroes/twist-01-largest-square-of-zeroes', title: 'Largest Square of Zeroes', difficulty: 'Very Hard' },
            { id: '15-square-of-zeroes/twist-02-rectangle-of-zeroes', title: 'Rectangle of Zeroes', difficulty: 'Very Hard' },
            { id: '15-square-of-zeroes/twist-03-square-of-ones', title: 'Square of Ones', difficulty: 'Hard' },
            { id: '15-square-of-zeroes/twist-04-count-all-zero-bordered-squares', title: 'Count All Zero-Bordered Squares', difficulty: 'Hard' },
            { id: '15-square-of-zeroes/twist-05-zero-bordered-square-with-interior-sum', title: 'Zero-Bordered Square With Interior Sum', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '15-square-of-zeroes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/15-square-of-zeroes'] = problem;

})();
