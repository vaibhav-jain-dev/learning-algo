/**
 * Reveal Minesweeper
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-minesweeper
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reveal Minesweeper',
        difficulty: 'Hard',
        algorithm: 'recursion-minesweeper',
        description: 'You are given a 2D grid representing a Minesweeper board. Implement the "click" functionality that reveals cells when a player clicks on them. The board is represented as follows: - \'M\' - An unrevealed mine - \'E\' - An unrevealed empty cell - \'B\' - A revealed blank cell with no adjacent mines - \'1\' to \'8\' - A revealed cell with 1-8 adjacent mines - \'X\' - A revealed mine (game over) When a cell is clicked: 1. If a mine (\'M\') is clicked, change it to \'X\' (game over) 2. If an empty cell (\'E\') with *',
        complexity: {
            time: 'O(m * n)',
            space: 'O(m * n)'
        },
        examples: [
    {
        input: {
        "board": [
                [
                        "E",
                        "E",
                        "E",
                        "E",
                        "E"
                ],
                [
                        "E",
                        "E",
                        "M",
                        "E",
                        "E"
                ],
                [
                        "E",
                        "E",
                        "E",
                        "E",
                        "E"
                ],
                [
                        "E",
                        "E",
                        "E",
                        "E",
                        "E"
                ]
        ],
        "click": [
                3,
                0
        ]
},
        output: [["B", "1", "E", "1", "B"], ["B", "1", "M", "1", "B"], ["B", "1", "1", "1", "B"], ["B", "B", "B", "B", "B"]],
        explanation: 'Using recursion, we break down the problem into smaller subproblems. For input board=[[\'E\', \'E\', \'E\', \'E\', \'E\'], [\'E\', \'E\', \'M\', \'E\', \'E\'], [\'E\', \'E\', \'E\', \'E\', \'E\'], [\'E\', \'E\', \'E\', \'E\', \'E\']], click=[3, 0], the result is [[\'B\', \'1\', \'E\', \'1\', \'B\'], [\'B\', \'1\', \'M\', \'1\', \'B\'], [\'B\', \'1\', \'1\', \'1\', \'B\'], [\'B\', \'B\', \'B\', \'B\', \'B\']].'
    }
        ],
        twists: [
            { id: '13-reveal-minesweeper/twist-01-iterative-flood-fill', name: 'Iterative Flood Fill', difficulty: 'Medium' },
            { id: '13-reveal-minesweeper/twist-02-probability-of-hitting-mine', name: 'Probability of Hitting Mine', difficulty: 'Hard' },
            { id: '13-reveal-minesweeper/twist-03-mine-placement-validation', name: 'Mine Placement Validation', difficulty: 'Hard' },
            { id: '13-reveal-minesweeper/twist-04-safe-first-click', name: 'Safe First Click', difficulty: 'Medium' },
            { id: '13-reveal-minesweeper/twist-05-chord-reveal', name: 'Chord Reveal', difficulty: 'Medium' },
            { id: '13-reveal-minesweeper/twist-06-board-generation', name: 'Board Generation', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '13-reveal-minesweeper', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['recursion/13-reveal-minesweeper'] = problem;

})();
