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
            { title: 'Count All Solutions', difficulty: 'Hard', description: 'Instead of returning one solved board, count the total number of valid solutions for the given Sudoku puzzle.', whyDifferent: 'Requires exhaustive search instead of stopping at the first solution, changing the backtracking to continue exploring after finding each valid completion.', example: 'A puzzle with 2 valid solutions returns 2. A well-formed puzzle returns 1. An invalid puzzle returns 0.' },
            { title: 'Minimum Clue Sudoku', difficulty: 'Very Hard', description: 'Given a solved Sudoku board, find the minimum number of clues (filled cells) needed so the puzzle has a unique solution.', whyDifferent: 'Inverts the problem entirely -- instead of filling cells, you remove cells while ensuring uniqueness, requiring solution-counting at each removal step.', example: 'A solved 9x9 board where removing any of the remaining 17 clues would create multiple solutions, proving 17 is the minimum.' },
            { title: 'Diagonal Sudoku', difficulty: 'Hard', description: 'Solve a Sudoku variant where, in addition to rows, columns, and 3x3 boxes, both main diagonals must also contain digits 1-9.', whyDifferent: 'Adds two extra constraints to the validity check, significantly reducing the valid states and requiring diagonal-aware constraint propagation.', example: 'A 9x9 board where the main diagonal (top-left to bottom-right) and anti-diagonal both must contain all digits 1-9.' },
            { title: 'Generate Valid Puzzle', difficulty: 'Very Hard', description: 'Generate a random valid Sudoku puzzle with exactly one solution and a specified difficulty level (number of empty cells).', whyDifferent: 'Shifts from solving to constructing -- requires generating a full valid board, then strategically removing cells while verifying uniqueness after each removal.', example: 'Generate a puzzle with 40 empty cells that has exactly one solution, suitable for a medium difficulty level.' },
            { title: 'Constraint Propagation Only', difficulty: 'Hard', description: 'Solve the Sudoku using only constraint propagation (naked singles, hidden singles) without any backtracking/guessing.', whyDifferent: 'Eliminates brute-force backtracking entirely, relying purely on logical deduction techniques that mimic how humans solve Sudoku.', example: 'For an easy puzzle, iteratively fill cells where only one digit is possible until the board is complete, without ever guessing.' }
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
