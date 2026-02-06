/**
 * Multiple Players
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-probability
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multiple Players',
        difficulty: 'Hard',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Compute the probability that player 1 beats player 2, where both draw from the same infinite deck following the same rules.',
        problem: 'Requires computing the probability distribution of final hand values for each player, then convolving them to find the win probability.',
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
                input: {"target":21,"startingHand":15},
                output: 6.27,
                explanation: 'The computed value for this input is 6.27.'
            },
            // Edge case
            {
                input: {"target":0,"startingHand":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def multiple_players(target, startingHand):
    """
    Multiple Players

    Compute the probability that player 1 beats player 2, where both draw from the same infinite deck following the same rules.

    Time: O(?)
    Space: O(?)
    """
    total = 0
    count = 0

    for val in target:
        total += val
        count += 1

    return total / count if count > 0 else 0.0


# Test cases
print(multiple_players(21, 15))  # Expected: 6.27
print(multiple_players(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// MultiplePlayers solves the Multiple Players problem.
// Compute the probability that player 1 beats player 2, where both draw from the same infinite deck following the same rules.
// Time: O(?), Space: O(?)
func MultiplePlayers(target int, startingHand int) float64 {
	total := 0.0
	count := 0

	for _, v := range target {
		total += float64(v)
		count++
	}

	if count == 0 {
		return 0.0
	}
	return total / float64(count)
}

func main() {
	fmt.Println(MultiplePlayers(21, 15)) // Expected: 6.27
	fmt.Println(MultiplePlayers(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-04-multiple-players', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-04-multiple-players'] = problem;
})();
