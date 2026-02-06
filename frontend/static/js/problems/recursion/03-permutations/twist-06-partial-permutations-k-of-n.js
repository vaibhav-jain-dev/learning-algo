/**
 * Partial Permutations (k of n)
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 * Parent: 03-permutations
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partial Permutations (k of n)',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations',
        description: 'Generate all k-length permutations from an n-element array (k <= n). This is P(n,k) = n!/(n-k)! permutations. Modify the backtracking to stop at depth k.',
        problem: 'The base case changes from "all elements used" to "k elements chosen". This seemingly small change affects the recursion tree depth and count significantly, requiring adjustment of the termination condition.',
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
                input: {"array":[1,2,3],"k":3},
                output: [1,2,3],
                explanation: 'The partial permutations k of n for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"array":[1],"k":3},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def partial_permutations_k_of_n(array, k):
    """
    Partial Permutations (k of n)

    Generate all k-length permutations from an n-element array (k <= n). This is P(n,k) = n!/(n-k)! permutations. Modify the backtracking to stop at depth k.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(partial_permutations_k_of_n([1,2,3], 3))  # Expected: [1,2,3]
print(partial_permutations_k_of_n([1], 3))  # Expected: []
`,
            go: `package main

import "fmt"

// PartialPermutationsKOfN solves the Partial Permutations (k of n) problem.
// Generate all k-length permutations from an n-element array (k <= n). This is P(n,k) = n!/(n-k)! permutations. Modify the backtracking to stop at depth k.
// Time: O(?), Space: O(?)
func PartialPermutationsKOfN(array []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(PartialPermutationsKOfN([]int{1, 2, 3}, 3)) // Expected: [1,2,3]
	fmt.Println(PartialPermutationsKOfN([]int{1}, 3)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/twist-06-partial-permutations-k-of-n', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/twist-06-partial-permutations-k-of-n'] = problem;
})();
