/**
 * Kth Permutation in Reverse Order
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-permutations
 * Parent: 03-permutations/03-kth-permutation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Permutation in Reverse Order',
        difficulty: 'Medium',
        algorithm: 'recursion-permutations',
        parent: '03-permutations/03-kth-permutation',
        description: 'Find the kth permutation when permutations are listed in reverse lexicographic order (largest first).',
        problem: 'Requires flipping the selection logic -- instead of picking the smallest available digit, you pick from the largest, or equivalently compute the (total-k+1)th forward permutation.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the kth permutation in reverse order criteria.'
            },
            // Edge case
            {
                input: {"n":0,"k":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def kth_permutation_in_reverse_order(n, k):
    """
    Kth Permutation in Reverse Order

    Find the kth permutation when permutations are listed in reverse lexicographic order (largest first).

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and n[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(kth_permutation_in_reverse_order(3, 3))  # Expected: 1
print(kth_permutation_in_reverse_order(0, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// KthPermutationInReverseOrder solves the Kth Permutation in Reverse Order problem.
// Find the kth permutation when permutations are listed in reverse lexicographic order (largest first).
// Time: O(?), Space: O(?)
func KthPermutationInReverseOrder(n int, k int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KthPermutationInReverseOrder(3, 3)) // Expected: 1
	fmt.Println(KthPermutationInReverseOrder(0, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '03-permutations/03-kth-permutation/twist-03-kth-permutation-in-reverse-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/03-permutations/03-kth-permutation/twist-03-kth-permutation-in-reverse-order'] = problem;
})();
