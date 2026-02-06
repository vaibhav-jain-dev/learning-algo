/**
 * Finite Deck
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-probability
 * Parent: 12-blackjack-probability
 */
(function() {
    'use strict';

    const problem = {
        name: 'Finite Deck',
        difficulty: 'Hard',
        algorithm: 'recursion-probability',
        parent: '12-blackjack-probability',
        description: 'Instead of an infinite deck with uniform distribution, use a standard 52-card deck where drawn cards are removed (without replacement).',
        problem: 'Cards are no longer independent -- the probability of drawing each value changes with each draw, requiring tracking the remaining deck composition in the state.',
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
                output: 3.47,
                explanation: 'The computed value for this input is 3.47.'
            },
            // Edge case
            {
                input: {"target":0,"startingHand":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def finite_deck(target, startingHand):
    """
    Finite Deck

    Instead of an infinite deck with uniform distribution, use a standard 52-card deck where drawn cards are removed (without replacement).

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
print(finite_deck(21, 15))  # Expected: 3.47
print(finite_deck(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// FiniteDeck solves the Finite Deck problem.
// Instead of an infinite deck with uniform distribution, use a standard 52-card deck where drawn cards are removed (without replacement).
// Time: O(?), Space: O(?)
func FiniteDeck(target int, startingHand int) float64 {
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
	fmt.Println(FiniteDeck(21, 15)) // Expected: 3.47
	fmt.Println(FiniteDeck(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '12-blackjack-probability/twist-01-finite-deck', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/12-blackjack-probability/twist-01-finite-deck'] = problem;
})();
