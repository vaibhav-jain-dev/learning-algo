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
            { title: 'Iterative Flood Fill', difficulty: 'Medium', description: 'Implement the reveal functionality using an iterative BFS/stack approach instead of recursion.', whyDifferent: 'Avoids potential stack overflow on very large boards by converting the recursive DFS into an explicit queue or stack-based iteration.', example: 'For a 100x100 board with a click on an empty region, use a queue to process each cell iteratively instead of recursive calls.' },
            { title: 'Probability of Hitting Mine', difficulty: 'Hard', description: 'Given a partially revealed board, compute the probability that a random click on an unrevealed cell hits a mine.', whyDifferent: 'Shifts from board manipulation to probabilistic reasoning, requiring analysis of which unrevealed cells could contain mines based on number constraints.', example: 'If 3 cells are unrevealed and exactly 1 mine remains, each unrevealed cell has a 1/3 probability -- but number constraints may make some cells certain.' },
            { title: 'Mine Placement Validation', difficulty: 'Hard', description: 'Given a fully revealed board with numbers but no mine markers, determine all valid mine placements that satisfy every number constraint.', whyDifferent: 'Inverts the problem from revealing to constraint satisfaction -- each number constrains its neighbors, forming a system of constraints solved via backtracking.', example: 'A 3x3 board with center showing "2" and corners showing "1" -- determine which cells must contain mines to satisfy all constraints.' },
            { title: 'Safe First Click', difficulty: 'Medium', description: 'Modify the game so the first click is always safe. If the clicked cell would be a mine, move that mine to another unrevealed empty cell and then reveal.', whyDifferent: 'Adds a mine-relocation step before the reveal, requiring finding a valid cell to move the mine to while maintaining board consistency.', example: 'Click on cell (1,2) which contains M. Move the mine to the first available E cell, recompute adjacent mine counts, then reveal (1,2) normally.' },
            { title: 'Chord Reveal', difficulty: 'Medium', description: 'Implement the chord action: if a revealed number cell has the correct number of adjacent flags, reveal all non-flagged adjacent cells simultaneously.', whyDifferent: 'Requires counting flags around a number cell and conditionally triggering multi-cell reveals, potentially cascading into further reveals.', example: 'Cell shows "1" with one adjacent flag. Chord-clicking reveals all other adjacent cells. If any is a mine (flag was wrong), game over.' },
            { title: 'Board Generation', difficulty: 'Hard', description: 'Generate a random Minesweeper board of size m x n with k mines, ensuring the starting click area (3x3 around start) is mine-free.', whyDifferent: 'Shifts from solving to creating, requiring random mine placement with exclusion zones and then computing all adjacent-mine numbers.', example: 'Generate a 10x10 board with 15 mines where the 3x3 area around cell (5,5) is guaranteed mine-free.' }
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
