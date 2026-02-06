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
            { title: 'Largest Square of Zeroes', difficulty: 'Very Hard', description: 'Instead of just checking existence, find the size of the largest square whose borders are all zeroes.', whyDifferent: 'Requires not just detection but optimization across all possible square sizes, iterating from largest to smallest or tracking maximum during the search.', example: 'A 6x6 matrix might contain both a 2x2 and a 4x4 zero-bordered square. Return 4 as the largest size.' },
            { title: 'Rectangle of Zeroes', difficulty: 'Very Hard', description: 'Find whether there exists a rectangle (not necessarily square) whose borders are all zeroes.', whyDifferent: 'Generalizing from square to rectangle adds a second dimension to the search: you must check all width-height combinations, not just a single size parameter.', example: 'matrix with a 2x3 rectangle of zero borders but no square of zero borders: the square check returns false but rectangle check returns true.' },
            { title: 'Square of Ones', difficulty: 'Hard', description: 'Find the largest square submatrix filled entirely with 1s (not just borders, the entire interior must be 1s).', whyDifferent: 'Checking the entire square rather than just borders requires a fundamentally different DP: dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1 if cell is 1.', example: 'matrix=[[1,1,0],[1,1,1],[0,1,1]]: largest all-1s square is 2x2 (bottom-right corner).' },
            { title: 'Count All Zero-Bordered Squares', difficulty: 'Hard', description: 'Count the total number of zero-bordered squares of all sizes in the matrix.', whyDifferent: 'Changes from existence checking to exhaustive counting. You must enumerate every valid square at every position and size, summing the total count.', example: 'A matrix might have 5 valid 1x1 zero cells, 2 valid 2x2 zero-bordered squares, and 1 valid 3x3. Total count = 8.' },
            { title: 'Zero-Bordered Square With Interior Sum', difficulty: 'Very Hard', description: 'Find the zero-bordered square whose interior (excluding borders) has the maximum sum. Return the sum and position.', whyDifferent: 'Combines the border constraint with an interior optimization. You need prefix sums for efficient interior sum calculation on top of the border validation.', example: 'A 4x4 zero-bordered square has a 2x2 interior. If the interior values are [5,3,2,8], the interior sum is 18.' }
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
