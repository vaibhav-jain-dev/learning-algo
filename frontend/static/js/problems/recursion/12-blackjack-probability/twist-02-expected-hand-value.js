/**
 * Expected Hand Value
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-probability
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Expected Hand Value',
        difficulty: 'Medium',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Instead of bust probability, compute the expected (average) final hand value when drawing until reaching the target or busting.',
        problem: 'Changes the recursion from probability accumulation to expected value calculation, summing weighted hand values instead of just bust probabilities.',
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
                input: {"target":10,"startingHand":15},
                output: 5.31,
                explanation: 'The computed value for this input is 5.31.'
            },
            // Edge case
            {
                input: {"target":10,"startingHand":0},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def expected_hand_value(target, startingHand):
    """
    Expected Hand Value

    Instead of bust probability, compute the expected (average) final hand value when drawing until reaching the target or busting.

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
print(expected_hand_value(10, 15))  # Expected: 5.31
print(expected_hand_value(10, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ExpectedHandValue solves the Expected Hand Value problem.
// Instead of bust probability, compute the expected (average) final hand value when drawing until reaching the target or busting.
// Time: O(?), Space: O(?)
func ExpectedHandValue(target int, startingHand int) float64 {
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
	fmt.Println(ExpectedHandValue(10, 15)) // Expected: 5.31
	fmt.Println(ExpectedHandValue(10, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-02-expected-hand-value', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-02-expected-hand-value'] = problem;
})();
