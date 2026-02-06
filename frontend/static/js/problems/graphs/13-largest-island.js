/**
 * Largest Island
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-largest-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Island',
        difficulty: 'Hard',
        algorithm: 'graph-largest-island',
        description: 'You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1. Return the size of the largest island in grid after applying this operation. An island is a 4-directionally connected group of 1s.',
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
    {
        input: {
        "grid": [
                [
                        1,
                        0
                ],
                [
                        0,
                        1
                ]
        ]
},
        output: 3,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 0], [0, 1]], the result is 3.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        0
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 0]], the result is 4.'
    },
    {
        input: {
        "grid": [
                [
                        1,
                        1
                ],
                [
                        1,
                        1
                ]
        ]
},
        output: 4,
        explanation: 'Exploring the graph structure, we find the required path or value. For input grid=[[1, 1], [1, 1]], the result is 4.'
    }
        ],
        twists: [
            { title: 'Multiple Flips Allowed', difficulty: 'Very Hard', description: 'You can flip up to K zeros to ones. Find the largest island achievable with at most K flips.', whyDifferent: 'With K flips, you cannot just check each zero independently. You need to consider combinations of flips, potentially using BFS expansion from existing island boundaries.', example: 'Grid with two islands of size 5 separated by 3 zeros. K=3 gives island of size 13 (5+3+5).' },
            { title: 'No Flip Allowed', difficulty: 'Easy', description: 'Find the largest island without any modifications. Standard connected component problem.', whyDifferent: 'Without the flip, the two-pass island labeling approach is unnecessary. Simple DFS/BFS to find connected component sizes and take the maximum.', example: 'Grid [[1,0,1],[0,0,0],[1,0,1]]. Four islands each of size 1. Answer: 1.' },
            { title: 'Flip One to Zero', difficulty: 'Hard', description: 'Instead of flipping a 0 to 1, flip a 1 to 0. Find the largest remaining island after optimally removing one land cell.', whyDifferent: 'Removing a cell can split an island. You must find the cell whose removal causes the least damage, requiring articulation point analysis within each island.', example: 'Linear island [1,1,1,1,1]. Removing an endpoint gives size 4. Removing the middle gives two islands of size 2. Best removal: an endpoint.' },
            { title: 'Diagonal Connections', difficulty: 'Medium', description: 'Islands are 8-directionally connected (including diagonals). Find the largest island after flipping one 0 to 1.', whyDifferent: '8-directional connectivity creates larger initial islands and more potential merges per flip. The labeling and adjacency checks must use 8 neighbors.', example: 'Grid [[1,0],[0,1]]. With 4-dir: two islands of size 1, flip gives 3. With 8-dir: already one island of size 2, flip gives 3.' },
            { title: 'Weighted Island', difficulty: 'Medium', description: 'Each land cell has a positive weight. Maximize total island weight after flipping one zero to a cell with weight 1.', whyDifferent: 'Island size becomes island weight. The labeling pass sums weights instead of counting cells, and the flip contributes weight 1 specifically.', example: 'Two adjacent islands with weights [10, 5] and [3, 8] separated by a zero. Flip connects them: total 10+5+1+3+8=27.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '13-largest-island', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/13-largest-island'] = problem;

})();
