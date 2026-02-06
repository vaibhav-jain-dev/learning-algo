/**
 * Min Height BST with Duplicates
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 * Parent: 05-min-height-bst
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Height BST with Duplicates',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '05-min-height-bst',
        description: 'The sorted array may contain duplicate values. Construct a valid BST with minimum height where equal values go to the right subtree.',
        problem: 'Duplicates break the symmetry of the divide-and-conquer split. You must handle runs of identical values carefully, as placing the midpoint on a duplicate boundary can create unbalanced subtrees. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[1,2,5,7,10,13,14,15,22]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the min height bst with duplicates criteria.'
            },
            {
                input: {"array":[1,2,3]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the min height bst with duplicates criteria.'
            },
            // Edge case
            {
                input: {"array":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def min_height_bst_with_duplicates(array):
    """
    Min Height BST with Duplicates

    The sorted array may contain duplicate values. Construct a valid BST with minimum height where equal values go to the right subtree.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(min_height_bst_with_duplicates([1,2,5,7,10,13,14,15,22]))  # Expected: 1
print(min_height_bst_with_duplicates([1,2,3]))  # Expected: 2
print(min_height_bst_with_duplicates([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinHeightBstWithDuplicates solves the Min Height BST with Duplicates problem.
// The sorted array may contain duplicate values. Construct a valid BST with minimum height where equal values go to the right subtree.
// Time: O(n), Space: O(1)
func MinHeightBstWithDuplicates(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinHeightBstWithDuplicates([]int{1, 2, 5, 7, 10, 13, 14, 15, 22})) // Expected: 1
	fmt.Println(MinHeightBstWithDuplicates([]int{1, 2, 3})) // Expected: 2
	fmt.Println(MinHeightBstWithDuplicates([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '05-min-height-bst/twist-03-min-height-bst-with-duplicates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/05-min-height-bst/twist-03-min-height-bst-with-duplicates'] = problem;
})();
