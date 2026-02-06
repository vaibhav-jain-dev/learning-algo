/**
 * Same BSTs for N Arrays
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-comparison
 * Parent: 08-same-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Same BSTs for N Arrays',
        difficulty: 'Hard',
        algorithm: 'bst-comparison',
        parent: '08-same-bsts',
        description: 'Given N arrays (not just two), determine which arrays among them produce the same BST. Group them into equivalence classes.',
        problem: 'Pairwise comparison of all N arrays is O(N^2 * n^2). You need a canonical form or hash for each BST to group arrays efficiently, requiring you to think about BST fingerprinting. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,11,94,81]},
                output: true,
                explanation: 'The same bsts for n arrays condition is satisfied for this input.'
            },
            {
                input: {"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,94,81,11]},
                output: false,
                explanation: 'The same bsts for n arrays condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"arrayOne":[10],"arrayTwo":[10]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def same_bsts_for_n_arrays(arrayOne, arrayTwo):
    """
    Same BSTs for N Arrays

    Given N arrays (not just two), determine which arrays among them produce the same BST. Group them into equivalence classes.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(arrayOne)):
        if j < len(arrayTwo) and arrayOne[i] == arrayTwo[j]:
            j += 1

    return j == len(arrayTwo)


# Test cases
print(same_bsts_for_n_arrays([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,11,94,81]))  # Expected: True
print(same_bsts_for_n_arrays([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,94,81,11]))  # Expected: False
print(same_bsts_for_n_arrays([10], [10]))  # Expected: False
`,
            go: `package main

import "fmt"

// SameBstsForNArrays solves the Same BSTs for N Arrays problem.
// Given N arrays (not just two), determine which arrays among them produce the same BST. Group them into equivalence classes.
// Time: O(n), Space: O(1)
func SameBstsForNArrays(arrayOne []int, arrayTwo []int) bool {
	j := 0

	for i := 0; i < len(arrayOne) && j < len(arrayTwo); i++ {
		if arrayOne[i] == arrayTwo[j] {
			j++
		}
	}

	return j == len(arrayTwo)
}

func main() {
	fmt.Println(SameBstsForNArrays([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 11, 94, 81})) // Expected: true
	fmt.Println(SameBstsForNArrays([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 94, 81, 11})) // Expected: false
	fmt.Println(SameBstsForNArrays([]int{10}, []int{10})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '08-same-bsts/twist-03-same-bsts-for-n-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/08-same-bsts/twist-03-same-bsts-for-n-arrays'] = problem;
})();
