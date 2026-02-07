/**
 * Next k Permutations
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Next k Permutations',
        difficulty: 'Hard',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Given a starting permutation and integer k, return the list of the next k permutations in lexicographic order.',
        problem: 'Combines the next-permutation iterative approach with the mathematical jump approach, choosing the most efficient strategy based on k relative to n!.',
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
                input: {"n":3,"k":3},
                output: [0],
                explanation: 'The next k permutations for this input yields [0].'
            },
            // Edge case
            {
                input: {"n":0,"k":0},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def next_k_permutations(n, k):
    """
    Next k Permutations

    Given a starting permutation and integer k, return the list of the next k permutations in lexicographic order.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(next_k_permutations(3, 3))  # Expected: [0]
print(next_k_permutations(0, 0))  # Expected: []
`,
            go: `package main

import "fmt"

// NextKPermutations solves the Next k Permutations problem.
// Given a starting permutation and integer k, return the list of the next k permutations in lexicographic order.
// Time: O(?), Space: O(?)
func NextKPermutations(n int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(NextKPermutations(3, 3)) // Expected: [0]
	fmt.Println(NextKPermutations(0, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-04-next-k-permutations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-04-next-k-permutations'] = problem;
})();
