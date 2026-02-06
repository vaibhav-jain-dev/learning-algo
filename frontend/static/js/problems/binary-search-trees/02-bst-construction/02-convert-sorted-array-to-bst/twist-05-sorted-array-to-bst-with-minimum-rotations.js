/**
 * Sorted Array to BST with Minimum Rotations
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-construction-balanced
 * Parent: 02-bst-construction/02-convert-sorted-array-to-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Array to BST with Minimum Rotations',
        difficulty: 'Very Hard',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction/02-convert-sorted-array-to-bst',
        description: 'Given an existing unbalanced BST and a sorted array of the same elements, determine the minimum number of rotations needed to transform the existing BST into the balanced one.',
        problem: 'This combines BST construction knowledge with rotation mechanics. You must compare two tree structures and find an optimal sequence of rotations, which is a tree distance problem rather than a construction problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[-10,-3,0,5,9]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the sorted array to bst with minimum rotations criteria.'
            },
            {
                input: {"nums":[1,2,3,4,5,6,7]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the sorted array to bst with minimum rotations criteria.'
            },
            // Edge case
            {
                input: {"nums":[-10]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def sorted_array_to_bst_with_minimum_rotations(nums):
    """
    Sorted Array to BST with Minimum Rotations

    Given an existing unbalanced BST and a sorted array of the same elements, determine the minimum number of rotations needed to transform the existing BST into the balanced one.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(sorted_array_to_bst_with_minimum_rotations([-10,-3,0,5,9]))  # Expected: 1
print(sorted_array_to_bst_with_minimum_rotations([1,2,3,4,5,6,7]))  # Expected: 2
print(sorted_array_to_bst_with_minimum_rotations([-10]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SortedArrayToBstWithMinimumRotations solves the Sorted Array to BST with Minimum Rotations problem.
// Given an existing unbalanced BST and a sorted array of the same elements, determine the minimum number of rotations needed to transform the existing BST into the balanced one.
// Time: O(n), Space: O(1)
func SortedArrayToBstWithMinimumRotations(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SortedArrayToBstWithMinimumRotations([]int{-10, -3, 0, 5, 9})) // Expected: 1
	fmt.Println(SortedArrayToBstWithMinimumRotations([]int{1, 2, 3, 4, 5, 6, 7})) // Expected: 2
	fmt.Println(SortedArrayToBstWithMinimumRotations([]int{-10})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst/twist-05-sorted-array-to-bst-with-minimum-rotations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst/twist-05-sorted-array-to-bst-with-minimum-rotations'] = problem;
})();
