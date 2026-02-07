/**
 * Solve Sudoku
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-sudoku
 */
(function() {
    'use strict';

    const problem = {
        name: 'Solve Sudoku',
        difficulty: 'Hard',
        algorithm: 'recursion-sudoku',
        description: 'Write a function that takes in a 9x9 two-dimensional array representing a partially filled Sudoku board and returns the solved Sudoku board. Sudoku is a puzzle where you need to fill a 9x9 grid with digits 1-9 such that each column, each row, and each of the nine 3x3 sub-boxes contains all digits from 1 to 9. The input board will always have exactly one solution.',
        problem: 'Break the problem into smaller subproblems recursively. Define clear base cases and recursive cases. At each step, assume the recursive call returns the correct result for smaller inputs, and combine them. This achieves O(9^m) time with O(m) space.',
        hints: [
            'Define your base case clearly. When should the recursion stop?',
            'For the recursive case, assume the function works for smaller inputs. How do you use that?',
            'Think about whether you need to pass additional state through parameters.',
            'Consider memoization if the same subproblems are being computed multiple times.'
        ],

        complexity: {
            time: 'O(9^m)',
            space: 'O(m)'
        },
        examples: [
    {
        input: {
        "board": [
                [
                        7,
                        8,
                        0,
                        4,
                        0,
                        0,
                        1,
                        2,
                        0
                ],
                [
                        6,
                        0,
                        0,
                        0,
                        7,
                        5,
                        0,
                        0,
                        9
                ],
                [
                        0,
                        0,
                        0,
                        6,
                        0,
                        1,
                        0,
                        7,
                        8
                ],
                [
                        0,
                        0,
                        7,
                        0,
                        4,
                        0,
                        2,
                        6,
                        0
                ],
                [
                        0,
                        0,
                        1,
                        0,
                        5,
                        0,
                        9,
                        3,
                        0
                ],
                [
                        9,
                        0,
                        4,
                        0,
                        6,
                        0,
                        0,
                        0,
                        5
                ],
                [
                        0,
                        7,
                        0,
                        3,
                        0,
                        0,
                        0,
                        1,
                        2
                ],
                [
                        1,
                        2,
                        0,
                        0,
                        0,
                        7,
                        4,
                        0,
                        0
                ],
                [
                        0,
                        4,
                        9,
                        2,
                        0,
                        6,
                        0,
                        0,
                        7
                ]
        ]
},
        output: [[7, 8, 5, 4, 3, 9, 1, 2, 6], [6, 1, 2, 8, 7, 5, 3, 4, 9], [4, 9, 3, 6, 2, 1, 5, 7, 8], [8, 5, 7, 9, 4, 3, 2, 6, 1], [2, 6, 1, 7, 5, 8, 9, 3, 4], [9, 3, 4, 1, 6, 2, 7, 8, 5], [5, 7, 8, 3, 9, 4, 6, 1, 2], [1, 2, 6, 5, 8, 7, 4, 9, 3], [3, 4, 9, 2, 1, 6, 8, 5, 7]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input board=[[7, 8, 0, 4, 0, 0, 1, 2, 0], [6, 0, 0, 0, 7, 5, 0, 0, 9], ..., [0, 4, 9, 2, 0, 6, 0, 0, 7]] (length 9), the result is [[7, 8, 5, 4, 3, 9, 1, 2, 6], ..., [3, 4, 9, 2, 1, 6, 8, 5, 7]] (length 9).'
    }
        ],
        twists: [
            { id: '08-solve-sudoku/twist-01-count-all-solutions', name: 'Count All Solutions', difficulty: 'Hard' },
            { id: '08-solve-sudoku/twist-02-minimum-clue-sudoku', name: 'Minimum Clue Sudoku', difficulty: 'Very Hard' },
            { id: '08-solve-sudoku/twist-03-diagonal-sudoku', name: 'Diagonal Sudoku', difficulty: 'Hard' },
            { id: '08-solve-sudoku/twist-04-generate-valid-puzzle', name: 'Generate Valid Puzzle', difficulty: 'Very Hard' },
            { id: '08-solve-sudoku/twist-05-constraint-propagation-only', name: 'Constraint Propagation Only', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '08-solve-sudoku', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/08-solve-sudoku'] = problem;

})();
