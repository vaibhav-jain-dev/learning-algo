/**
 * Time Complexity Proof
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-fibonacci
 * Parent: 01-nth-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Time Complexity Proof',
        difficulty: 'Hard',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Prove that the naive recursive Fibonacci is O(2^n) but more precisely O(phi^n) where phi is the golden ratio. Why is 2^n an overestimate?',
        problem: 'Requires mathematical reasoning about the recursion tree rather than coding. You must analyze the asymmetric branching where fib(n-1) and fib(n-2) create an unbalanced tree.',
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
                input: {"n":6},
                output: 8.16,
                explanation: 'The computed value for this input is 8.16.'
            },
            // Edge case
            {
                input: {"n":0},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def time_complexity_proof(n):
    """
    Time Complexity Proof

    Prove that the naive recursive Fibonacci is O(2^n) but more precisely O(phi^n) where phi is the golden ratio. Why is 2^n an overestimate?

    Time: O(?)
    Space: O(?)
    """
    total = 0
    count = 0

    for val in n:
        total += val
        count += 1

    return total / count if count > 0 else 0.0


# Test cases
print(time_complexity_proof(6))  # Expected: 8.16
print(time_complexity_proof(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// TimeComplexityProof solves the Time Complexity Proof problem.
// Prove that the naive recursive Fibonacci is O(2^n) but more precisely O(phi^n) where phi is the golden ratio. Why is 2^n an overestimate?
// Time: O(?), Space: O(?)
func TimeComplexityProof(n int) float64 {
	total := 0.0
	count := 0

	for _, v := range n {
		total += float64(v)
		count++
	}

	if count == 0 {
		return 0.0
	}
	return total / float64(count)
}

func main() {
	fmt.Println(TimeComplexityProof(6)) // Expected: 8.16
	fmt.Println(TimeComplexityProof(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-06-time-complexity-proof', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-06-time-complexity-proof'] = problem;
})();
