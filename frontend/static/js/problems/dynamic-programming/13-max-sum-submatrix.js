/**
 * Maximum Sum Submatrix
 * Category: dynamic-programming
 * Difficulty: Very
 * Algorithm: dp-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum Submatrix',
        difficulty: 'Very',
        algorithm: 'dp-matrix',
        description: 'Given a 2D matrix of integers and a positive integer size, write a function that returns the maximum sum of any size x size submatrix within the given matrix.',
        complexity: {
            time: 'O(rows * cols)',
            space: 'O(rows * cols)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        5,
                        3,
                        -1,
                        5
                ],
                [
                        -7,
                        3,
                        7,
                        4
                ],
                [
                        12,
                        8,
                        0,
                        0
                ],
                [
                        1,
                        -8,
                        -8,
                        2
                ]
        ],
        "size": 2
},
        output: 18,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input matrix=[[5, 3, -1, 5], [-7, 3, 7, 4], [12, 8, 0, 0], [1, -8, -8, 2]], size=2, the result is 18.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        2
                ],
                [
                        3,
                        4
                ]
        ],
        "size": 1
},
        output: 4,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input matrix=[[1, 2], [3, 4]], size=1, the result is 4.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        2,
                        3
                ],
                [
                        4,
                        5,
                        6
                ],
                [
                        7,
                        8,
                        9
                ]
        ],
        "size": 2
},
        output: 28,
        explanation: 'Using dynamic programming, we build up the solution from smaller subproblems. For input matrix=[[1, 2, 3], [4, 5, 6], [7, 8, 9]], size=2, the result is 28.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '13-max-sum-submatrix', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/13-max-sum-submatrix'] = problem;

})();
