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
        twists: [
            { title: 'Max Sum Rectangle (Any Size)', difficulty: 'Hard', description: 'Instead of a fixed size x size submatrix, find the rectangle of any dimensions within the matrix that has the maximum sum.', whyDifferent: 'Variable dimensions make this much harder. Requires prefix sums combined with Kadane\'s algorithm on compressed columns, a fundamentally different O(cols^2 * rows) approach.', example: 'matrix=[[1,-2,3],[4,5,-6],[-7,8,9]]: max sum rectangle might be [[4,5],[_,8,9]] or another shape. Must check all possible rectangles.' },
            { title: 'Max Sum Submatrix No Larger Than K', difficulty: 'Very Hard', description: 'Find the maximum sum submatrix of any dimensions whose sum is no larger than a given value K.', whyDifferent: 'Adds an upper-bound constraint that prevents simple maximization. Requires combining prefix sums with a sorted set (TreeSet) to binary-search for the best valid sum.', example: 'matrix=[[1,0,1],[0,-2,3]], K=2: max sum no larger than 2 is 2, from submatrix [[0,1],[-2,3]] with sum 2.' },
            { title: 'Min Sum Submatrix of Given Size', difficulty: 'Medium', description: 'Find the size x size submatrix with the minimum sum instead of the maximum.', whyDifferent: 'A simple sign flip, but forces you to verify your prefix sum approach works correctly for minimization and handles negative numbers throughout.', example: 'matrix=[[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]], size=2: min sum submatrix could be [[-8,-8],[?,?]] area.' },
            { title: 'Count Submatrices With Target Sum', difficulty: 'Hard', description: 'Count how many size x size submatrices have a sum exactly equal to a target value.', whyDifferent: 'Changes from optimization to counting exact matches. The prefix sum computation is the same, but instead of tracking max/min you count equalities.', example: 'matrix=[[1,2],[3,4]], size=1, target=3: exactly 1 submatrix (the cell with value 3). size=1, target=5: 0 submatrices.' },
            { title: 'Max Sum Submatrix With Obstacles', difficulty: 'Hard', description: 'Certain cells in the matrix are obstacles (marked -infinity or forbidden). Find the maximum sum size x size submatrix that contains no obstacles.', whyDifferent: 'Requires filtering out invalid submatrices. You need an additional prefix sum or boolean matrix to track obstacle presence within each candidate submatrix.', example: 'matrix=[[5,3,-1],[X,3,7],[12,8,0]], size=2: the top-left 2x2 is invalid due to obstacle X. Must check other positions.' }
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
