/**
 * River Sizes
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 */
(function() {
    'use strict';

    const problem = {
        name: 'River Sizes',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        description: 'You\'re given a two-dimensional array (matrix) of potentially unequal height and width containing only 0s and 1s. Each 0 represents land, and each 1 represents part of a river. A river consists of any number of 1s that are either horizontally or vertically adjacent (but not diagonally adjacent). The number of adjacent 1s forming a river determines its size. Write a function that returns an array of the sizes of all rivers represented in the input matrix. The sizes don\'t need to be in any particul',
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
                        1,
                        0
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        0
                ],
                [
                        0,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        0,
                        1,
                        0,
                        1
                ],
                [
                        1,
                        0,
                        1,
                        1,
                        0
                ]
        ]
},
        output: [1, 2, 2, 2, 5],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 0, 0, 1, 0], [1, 0, 1, 0, 0], [0, 0, 1, 0, 1], [1, 0, 1, 0, 1], [1, 0, 1, 1, 0]], the result is [1, 2, 2, 2, 5].'
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
        output: [9],
        explanation: 'Exploring the graph structure, we find the required path or value. For input matrix=[[1, 1, 1], [1, 1, 1], [1, 1, 1]], the result is [9].'
    }
        ],
        twists: [
            { title: 'Diagonal Rivers', difficulty: 'Medium', description: 'Rivers can also flow diagonally. Count river sizes when cells are 8-directionally connected instead of 4.', whyDifferent: 'With 8 directions, components merge in unexpected ways. Two rivers separated by a diagonal gap in the 4-connected version become one river, changing the entire component structure.', example: 'Matrix [[1,0,1],[0,1,0],[1,0,1]]. With 4-dir: five rivers of size 1. With 8-dir: one river of size 5.' },
            { title: 'Sorted River Sizes', difficulty: 'Easy', description: 'Return river sizes in sorted order from smallest to largest.', whyDifferent: 'The core BFS/DFS is the same, but you must think about the output format and whether to sort in-place or use a data structure that maintains order.', example: 'Matrix with rivers of sizes [5, 2, 1, 2]. Return [1, 2, 2, 5].' },
            { title: 'K Largest Rivers', difficulty: 'Medium', description: 'Return only the K largest river sizes. Optimize so you do not need to sort all sizes.', whyDifferent: 'A min-heap of size K during traversal avoids sorting all components. You must think about the selection problem layered on top of flood fill.', example: 'Rivers of sizes [5, 2, 1, 2, 8, 3], K=3. Return [8, 5, 3].' },
            { title: 'River Perimeters', difficulty: 'Medium', description: 'Instead of counting river sizes, calculate the perimeter of each river (number of edges touching land or boundary).', whyDifferent: 'You must count boundary edges rather than cells. Each cell contributes 4 minus the number of water neighbors, requiring a different counting logic during traversal.', example: 'A 2x2 river block has area 4 but perimeter 8.' },
            { title: 'Dynamic River Updates', difficulty: 'Hard', description: 'After initial computation, cells can flip between 0 and 1. Efficiently update river sizes after each flip.', whyDifferent: 'Recomputing from scratch is wasteful. Union-Find allows incremental merges when a cell becomes 1, and split detection when a cell becomes 0 (much harder).', example: 'Flip cell (2,2) from 0 to 1. It merges two adjacent rivers of size 2 and 3 into one of size 6.' }
        ],
        similar: [
    { id: '05-river-sizes/01-max-area-of-island', name: 'Max Area of Island', difficulty: 'Medium' },
    { id: '05-river-sizes/02-count-sub-islands', name: 'Count Sub Islands', difficulty: 'Medium' },
    { id: '05-river-sizes/03-making-a-large-island', name: 'Making A Large Island', difficulty: 'Hard' }
        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes'] = problem;

})();
