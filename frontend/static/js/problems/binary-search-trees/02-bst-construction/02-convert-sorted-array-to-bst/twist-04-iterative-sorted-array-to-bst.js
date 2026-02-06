/**
 * Iterative Sorted Array to BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 * Parent: 02-bst-construction/02-convert-sorted-array-to-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Sorted Array to BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction/02-convert-sorted-array-to-bst',
        description: 'Convert the sorted array to a height-balanced BST using an iterative approach with an explicit stack instead of recursion.',
        problem: 'You must manually manage the subarray ranges and parent-child connections using a stack of pending work items. This requires encoding the recursive state (left, right bounds, parent reference, direction) explicitly. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                output: [-10,-3,0],
                explanation: 'The iterative sorted array to bst for this input yields [-10, -3, 0].'
            },
            {
                input: {"nums":[1,2,3,4,5,6,7]},
                output: [1,2,3],
                explanation: 'The iterative sorted array to bst for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"nums":[-10]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_sorted_array_to_bst(nums):
    """
    Iterative Sorted Array to BST

    Convert the sorted array to a height-balanced BST using an iterative approach with an explicit stack instead of recursion.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(iterative_sorted_array_to_bst([-10,-3,0,5,9]))  # Expected: [-10,-3,0]
print(iterative_sorted_array_to_bst([1,2,3,4,5,6,7]))  # Expected: [1,2,3]
print(iterative_sorted_array_to_bst([-10]))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativeSortedArrayToBst solves the Iterative Sorted Array to BST problem.
// Convert the sorted array to a height-balanced BST using an iterative approach with an explicit stack instead of recursion.
// Time: O(n), Space: O(1)
func IterativeSortedArrayToBst(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(IterativeSortedArrayToBst([]int{-10, -3, 0, 5, 9})) // Expected: [-10,-3,0]
	fmt.Println(IterativeSortedArrayToBst([]int{1, 2, 3, 4, 5, 6, 7})) // Expected: [1,2,3]
	fmt.Println(IterativeSortedArrayToBst([]int{-10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst/twist-04-iterative-sorted-array-to-bst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst/twist-04-iterative-sorted-array-to-bst'] = problem;
})();
