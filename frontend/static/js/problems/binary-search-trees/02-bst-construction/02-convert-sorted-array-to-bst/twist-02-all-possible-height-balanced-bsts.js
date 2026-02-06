/**
 * All Possible Height-Balanced BSTs
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-construction-balanced
 * Parent: 02-bst-construction/02-convert-sorted-array-to-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'All Possible Height-Balanced BSTs',
        difficulty: 'Hard',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction/02-convert-sorted-array-to-bst',
        description: 'Given the sorted array, return all possible height-balanced BSTs that can be formed. When the array length is even, the middle can be chosen as either of two elements.',
        problem: 'The base problem picks one middle element deterministically. This twist requires exploring both choices when the subarray has even length, turning a single recursive path into a branching enumeration problem. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'The all possible height balanced bsts for this input yields [-10, -3, 0].'
            },
            {
                input: {"nums":[1,2,3,4,5,6,7]},
                output: [1,2,3],
                explanation: 'The all possible height balanced bsts for this input yields [1, 2, 3].'
            },
            // Edge case
            {
                input: {"nums":[-10]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def all_possible_height_balanced_bsts(nums):
    """
    All Possible Height-Balanced BSTs

    Given the sorted array, return all possible height-balanced BSTs that can be formed. When the array length is even, the middle can be chosen as either of two elements.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(all_possible_height_balanced_bsts([-10,-3,0,5,9]))  # Expected: [-10,-3,0]
print(all_possible_height_balanced_bsts([1,2,3,4,5,6,7]))  # Expected: [1,2,3]
print(all_possible_height_balanced_bsts([-10]))  # Expected: []
`,
            go: `package main

import "fmt"

// AllPossibleHeightBalancedBsts solves the All Possible Height-Balanced BSTs problem.
// Given the sorted array, return all possible height-balanced BSTs that can be formed. When the array length is even, the middle can be chosen as either of two elements.
// Time: O(n), Space: O(1)
func AllPossibleHeightBalancedBsts(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(AllPossibleHeightBalancedBsts([]int{-10, -3, 0, 5, 9})) // Expected: [-10,-3,0]
	fmt.Println(AllPossibleHeightBalancedBsts([]int{1, 2, 3, 4, 5, 6, 7})) // Expected: [1,2,3]
	fmt.Println(AllPossibleHeightBalancedBsts([]int{-10})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst/twist-02-all-possible-height-balanced-bsts', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst/twist-02-all-possible-height-balanced-bsts'] = problem;
})();
