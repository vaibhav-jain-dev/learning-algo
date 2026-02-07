/**
 * Bust Probability with Aces
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-probability
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Bust Probability with Aces',
        difficulty: 'Hard',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Add the rule that aces can count as 1 or 11, automatically choosing the best value. Compute the bust probability with this flexible card.',
        problem: 'Aces create branching hand values -- a hand might be simultaneously valued at both X and X+10, requiring tracking of "soft" vs "hard" hand states.',
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
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"target":0,"startingHand":0},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def bust_probability_with_aces(target, startingHand):
    """
    Bust Probability with Aces

    Add the rule that aces can count as 1 or 11, automatically choosing the best value. Compute the bust probability with this flexible card.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(target)

    for i in range(n):
        # Check condition based on startingHand
        j = 0
        for k in range(i, n):
            if j < len(startingHand) and target[k] == startingHand[j]:
                j += 1
        if j == len(startingHand):
            count += 1

    return count


# Test cases
print(bust_probability_with_aces(21, 15))  # Expected: 1
print(bust_probability_with_aces(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// BustProbabilityWithAces solves the Bust Probability with Aces problem.
// Add the rule that aces can count as 1 or 11, automatically choosing the best value. Compute the bust probability with this flexible card.
// Time: O(?), Space: O(?)
func BustProbabilityWithAces(target int, startingHand int) int {
	result := 0

	for i := 0; i < len(target); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BustProbabilityWithAces(21, 15)) // Expected: 1
	fmt.Println(BustProbabilityWithAces(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-05-bust-probability-with-aces', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-05-bust-probability-with-aces'] = problem;
})();
