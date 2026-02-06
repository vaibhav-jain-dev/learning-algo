/**
 * Minimum Passes of Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Passes of Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        description: 'Write a function that takes in an integer matrix and returns the minimum number of passes required to convert all negative integers to positive integers. A negative integer in the matrix can only be converted to a positive integer if one or more of its adjacent elements (horizontally or vertically adjacent, not diagonally) is positive. A pass consists of converting all negative integers that can be converted at that time. Note that 0 is neither positive nor negative, meaning it cannot convert an',
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        0,
                        -1,
                        -3,
                        2,
                        0
                ],
                [
                        1,
                        -2,
                        -5,
                        -1,
                        -3
                ],
                [
                        3,
                        0,
                        0,
                        -4,
                        -1
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[0, -1, -3, 2, 0], [1, -2, -5, -1, -3], [3, 0, 0, -4, -1]], the result is 3.'
    },
    {
        input: {
        "matrix": [
                [
                        1,
                        0,
                        0,
                        -2,
                        -3
                ],
                [
                        -4,
                        -5,
                        -6,
                        -2,
                        -1
                ],
                [
                        0,
                        0,
                        0,
                        0,
                        -1
                ],
                [
                        1,
                        2,
                        3,
                        0,
                        -2
                ]
        ]
},
        output: -1,
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 0, 0, -2, -3], [-4, -5, -6, -2, -1], [0, 0, 0, 0, -1], [1, 2, 3, 0, -2]], the result is -1.'
    }
        ],
        twists: [
            { title: 'Count Unconvertible Negatives', difficulty: 'Easy', description: 'Instead of returning passes count, return how many negative values remain unconvertible (surrounded by zeros or other negatives with no positive path).', whyDifferent: 'You shift focus from the BFS level count to the remaining unconverted cells after BFS completes, requiring a final scan of the matrix.', example: 'Matrix [[−1,0,0],[0,−2,0],[0,0,−3]]. No positives exist, so all 3 negatives are unconvertible.' },
            { title: 'Zeros Can Also Convert', difficulty: 'Medium', description: 'Zeros act as neutral but can be converted to positive by adjacent positives. Once positive, they can convert adjacent negatives.', whyDifferent: 'Zeros are no longer inert barriers. They participate in the propagation chain, changing the BFS wavefront behavior and potentially converting previously unreachable negatives.', example: 'Matrix [[1,0,0,−1]]. Pass 1: 0->1. Pass 2: 0->1. Pass 3: −1->1. Total: 3 passes.' },
            { title: 'Positive Decay', difficulty: 'Hard', description: 'After converting a negative to positive, the new positive has strength 1. Original positives have strength equal to their value. A positive can only convert adjacent negatives if its strength exceeds the absolute value of the negative.', whyDifferent: 'Simple BFS propagation no longer works uniformly. Each conversion depends on value comparison, requiring priority-based processing.', example: 'Matrix [[5,−3],[−10,2]]. Cell (0,0)=5 can convert (0,1)=−3 (5>3). But neither 5 nor 2 can convert (1,0)=−10.' },
            { title: 'Simultaneous Negative Spread', difficulty: 'Very Hard', description: 'Negatives also spread: they can convert adjacent positives to negative. Both spread simultaneously each pass. Determine the final state.', whyDifferent: 'This becomes a competitive BFS where two wavefronts expand simultaneously. The outcome depends on which wavefront reaches each cell first.', example: 'Matrix [[1,0,−1]]. Pass 1: nothing spreads through the 0 barrier. Final state unchanged.' },
            { title: 'Minimum Passes for Submatrix', difficulty: 'Medium', description: 'Only convert negatives within a given submatrix [r1,c1] to [r2,c2]. Positives outside the submatrix can still influence conversions at the boundary.', whyDifferent: 'You must handle boundary conditions where external positives initiate conversions but only cells within the submatrix are targets for conversion.', example: 'Matrix 5x5, submatrix rows 1-3, cols 1-3. Positives at row 0 can convert negatives at row 1 boundary.' }
        ],
        similar: [
    { id: '08-minimum-passes/01-rotting-oranges', name: 'Rotting Oranges', difficulty: 'Medium' },
    { id: '08-minimum-passes/02-walls-and-gates', name: 'Walls and Gates', difficulty: 'Medium' },
    { id: '08-minimum-passes/03-shortest-path-all-keys', name: 'Shortest Path to Get All Keys', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes'] = problem;

})();
