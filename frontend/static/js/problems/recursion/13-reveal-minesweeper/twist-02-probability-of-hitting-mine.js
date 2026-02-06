/**
 * Probability of Hitting Mine
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-minesweeper
 * Parent: 13-reveal-minesweeper
 */
(function() {
    'use strict';

    const problem = {
        name: 'Probability of Hitting Mine',
        difficulty: 'Hard',
        algorithm: 'recursion-minesweeper',
        parent: '13-reveal-minesweeper',
        description: 'Given a partially revealed board, compute the probability that a random click on an unrevealed cell hits a mine.',
        problem: 'Shifts from board manipulation to probabilistic reasoning, requiring analysis of which unrevealed cells could contain mines based on number constraints.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"board":[["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]],"click":[3,0]},
                output: 7.59,
                explanation: 'The computed value for this input is 7.59.'
            },
            // Edge case
            {
                input: {"board":[["E","E","E","E","E"]],"click":[3]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def probability_of_hitting_mine(board, click):
    """
    Probability of Hitting Mine

    Given a partially revealed board, compute the probability that a random click on an unrevealed cell hits a mine.

    Time: O(?)
    Space: O(?)
    """
    total = 0
    count = 0

    for val in board:
        total += val
        count += 1

    return total / count if count > 0 else 0.0


# Test cases
print(probability_of_hitting_mine([["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]], [3,0]))  # Expected: 7.59
print(probability_of_hitting_mine([["E","E","E","E","E"]], [3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ProbabilityOfHittingMine solves the Probability of Hitting Mine problem.
// Given a partially revealed board, compute the probability that a random click on an unrevealed cell hits a mine.
// Time: O(?), Space: O(?)
func ProbabilityOfHittingMine(board [][]int, click []int) float64 {
	total := 0.0
	count := 0

	for _, v := range board {
		total += float64(v)
		count++
	}

	if count == 0 {
		return 0.0
	}
	return total / float64(count)
}

func main() {
	fmt.Println(ProbabilityOfHittingMine([][]int{{E, E, E, E, E}, {E, E, M, E, E}, {E, E, E, E, E}, {E, E, E, E, E}}, []int{3, 0})) // Expected: 7.59
	fmt.Println(ProbabilityOfHittingMine([][]int{{E, E, E, E, E}}, []int{3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '13-reveal-minesweeper/twist-02-probability-of-hitting-mine', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/13-reveal-minesweeper/twist-02-probability-of-hitting-mine'] = problem;
})();
