/**
 * Same BSTs with O(1) Extra Space
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-comparison
 * Parent: 08-same-bsts
 */
(function() {
    'use strict';

    const problem = {
        name: 'Same BSTs with O(1) Extra Space',
        difficulty: 'Hard',
        algorithm: 'bst-comparison',
        parent: '08-same-bsts',
        description: 'Determine if two arrays produce the same BST without creating any subarrays. Use only O(1) extra space beyond the input arrays.',
        problem: 'The standard recursive approach creates O(n^2) subarrays. The O(1) space version requires passing index bounds and using the original arrays, tracking min/max ranges to simulate the recursive partitioning in-place. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The same bsts with o1 extra space condition is satisfied for this input.'
            },
            {
                input: {"arrayOne":[10,15,8,12,94,81,5,2,11],"arrayTwo":[10,8,5,15,2,12,94,81,11]},
                output: false,
                explanation: 'The same bsts with o1 extra space condition is not satisfied for this input.'
            },
            // Edge case
            {
                input: {"arrayOne":[10],"arrayTwo":[10]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def same_bsts_with_o1_extra_space(arrayOne, arrayTwo):
    """
    Same BSTs with O(1) Extra Space

    Determine if two arrays produce the same BST without creating any subarrays. Use only O(1) extra space beyond the input arrays.

    Time: O(n)
    Space: O(1)
    """
    j = 0

    for i in range(len(arrayOne)):
        if j < len(arrayTwo) and arrayOne[i] == arrayTwo[j]:
            j += 1

    return j == len(arrayTwo)


# Test cases
print(same_bsts_with_o1_extra_space([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,11,94,81]))  # Expected: True
print(same_bsts_with_o1_extra_space([10,15,8,12,94,81,5,2,11], [10,8,5,15,2,12,94,81,11]))  # Expected: False
print(same_bsts_with_o1_extra_space([10], [10]))  # Expected: False
`,
            go: `package main

import "fmt"

// SameBstsWithO1ExtraSpace solves the Same BSTs with O(1) Extra Space problem.
// Determine if two arrays produce the same BST without creating any subarrays. Use only O(1) extra space beyond the input arrays.
// Time: O(n), Space: O(1)
func SameBstsWithO1ExtraSpace(arrayOne []int, arrayTwo []int) bool {
	j := 0

	for i := 0; i < len(arrayOne) && j < len(arrayTwo); i++ {
		if arrayOne[i] == arrayTwo[j] {
			j++
		}
	}

	return j == len(arrayTwo)
}

func main() {
	fmt.Println(SameBstsWithO1ExtraSpace([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 11, 94, 81})) // Expected: true
	fmt.Println(SameBstsWithO1ExtraSpace([]int{10, 15, 8, 12, 94, 81, 5, 2, 11}, []int{10, 8, 5, 15, 2, 12, 94, 81, 11})) // Expected: false
	fmt.Println(SameBstsWithO1ExtraSpace([]int{10}, []int{10})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '08-same-bsts/twist-02-same-bsts-with-o1-extra-space', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/08-same-bsts/twist-02-same-bsts-with-o1-extra-space'] = problem;
})();
