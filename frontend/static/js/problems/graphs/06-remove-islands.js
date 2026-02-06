/**
 * Remove Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You\'re given a two-dimensional matrix of potentially unequal height and width containing only 0s and 1s. The matrix represents a two-toned image, where each 1 represents black and each 0 represents white. An island is defined as any number of 1s that are horizontally or vertically adjacent (but not diagonally adjacent) and that don\'t touch the border of the image. In other words, a group of horizontally or vertically adjacent 1s isn\'t an island if any of those 1s are in the first row, first colu',
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
    {
        input: {
        "matrix": [
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        0
                ],
                [
                        0,
                        1,
                        0,
                        1,
                        1,
                        1
                ],
                [
                        0,
                        0,
                        1,
                        0,
                        1,
                        0
                ],
                [
                        1,
                        1,
                        0,
                        0,
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0,
                        0
                ],
                [
                        1,
                        0,
                        0,
                        0,
                        0,
                        1
                ]
        ]
},
        output: [[1, 0, 0, 0, 0, 0], [0, 0, 0, 1, 1, 1], [0, 0, 0, 0, 1, 0], [1, 1, 0, 0, 1, 0], [1, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 1]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 0, 0, 0, 0, 0], [0, 1, 0, 1, 1, 1], ..., [1, 0, 0, 0, 0, 1]] (length 6), the result is [[1, 0, 0, 0, 0, 0], ..., [1, 0, 0, 0, 0, 1]] (length 6).'
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
        output: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 1, 1], [1, 0, 1], [1, 1, 1]], the result is [[1, 1, 1], [1, 0, 1], [1, 1, 1]].'
    }
        ],
        twists: [
            { title: 'Keep Only Islands', difficulty: 'Medium', description: 'Instead of removing islands (interior 1s not touching border), remove all border-connected 1s and keep only the islands.', whyDifferent: 'You invert the logic. After marking border-connected cells, you zero out the marked cells and keep the unmarked ones, flipping the removal target.', example: 'Matrix with border-connected 1s and interior 1s. Output has only interior groups remaining.' },
            { title: 'Count Removed Cells', difficulty: 'Easy', description: 'Instead of returning the modified matrix, return the total count of removed cells (island cells not touching border).', whyDifferent: 'You simplify the output but the traversal is identical. The twist forces you to realize the counting can happen during traversal without modifying the matrix.', example: 'Matrix 6x6 with 3 interior 1s that form an island. Answer: 3.' },
            { title: 'Preserve Original Matrix', difficulty: 'Medium', description: 'Solve without modifying the input matrix. Use a separate visited array.', whyDifferent: 'In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and careful coordination between the visited set and the result.', example: 'Input matrix remains unchanged. Return a new matrix with islands removed.' },
            { title: 'Islands with Diagonal Borders', difficulty: 'Hard', description: 'A cell touches the border if it or any of its 8-directional neighbors is on the grid edge. Remove groups not touching the border even diagonally.', whyDifferent: '8-directional connectivity changes which groups are considered border-touching. Fewer groups qualify as islands, fundamentally altering the result.', example: 'A corner 1 at (1,1) is now border-touching because its diagonal neighbor (0,0) is on the edge.' },
            { title: 'Remove Islands Iteratively', difficulty: 'Medium', description: 'After removing islands, the removal might create new islands (groups that were connected to border only through removed cells). Repeat until stable.', whyDifferent: 'A single pass is insufficient. You need a fixed-point iteration that keeps removing until no more islands exist, adding a convergence loop.', example: 'First pass removes group A. Group B was connected to border only through A, so second pass removes B too.' }
        ],
        similar: [
    { id: '06-remove-islands/01-surrounded-regions', name: 'Surrounded Regions', difficulty: 'Medium' },
    { id: '06-remove-islands/02-number-of-enclaves', name: 'Number of Enclaves', difficulty: 'Medium' },
    { id: '06-remove-islands/03-count-closed-islands', name: 'Number of Closed Islands', difficulty: 'Medium' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands'] = problem;

})();
