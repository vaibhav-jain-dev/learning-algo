/**
 * Sliding Puzzle
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: a-star-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sliding Puzzle',
        difficulty: 'Hard',
        algorithm: 'a-star-bfs',
        description: 'On a 2x3 board, there are 5 tiles labeled 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping them. The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]]. Given the puzzle board, return the least number of moves required to solve the puzzle. If it is impossible to solve, return -1.',
        complexity: {
            time: 'O((mn)!)',
            space: 'O((mn)!)'
        },
        examples: [
    {
        input: {
        "board": [
                [
                        1,
                        2,
                        3
                ],
                [
                        4,
                        0,
                        5
                ]
        ]
},
        output: 1,
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input board=[[1, 2, 3], [4, 0, 5]], the result is 1.'
    }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-sliding-puzzle', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-sliding-puzzle'] = problem;

})();
