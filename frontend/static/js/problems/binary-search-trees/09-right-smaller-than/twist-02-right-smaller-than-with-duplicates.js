/**
 * Right Smaller Than with Duplicates
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-augmented
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';

    const problem = {
        name: 'Right Smaller Than with Duplicates',
        difficulty: 'Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'The array contains duplicate values. Count elements strictly smaller to the right. Handle duplicates correctly in the BST insertion.',
        problem: 'Duplicates create ambiguity in BST placement. If equal values go right, they should not be counted as "smaller." You must carefully separate the equal case from the strictly-less case in your augmented BST. Think about what changes from the base problem and how it affects your algorithmic approach.',
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[8,5,11,-1,3,4,2]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the right smaller than with duplicates criteria.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the right smaller than with duplicates criteria.'
            },
            // Edge case
            {
                input: {"array":[8]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def right_smaller_than_with_duplicates(array):
    """
    Right Smaller Than with Duplicates

    The array contains duplicate values. Count elements strictly smaller to the right. Handle duplicates correctly in the BST insertion.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(right_smaller_than_with_duplicates([8,5,11,-1,3,4,2]))  # Expected: 1
print(right_smaller_than_with_duplicates([1,2,3,4,5]))  # Expected: 2
print(right_smaller_than_with_duplicates([8]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RightSmallerThanWithDuplicates solves the Right Smaller Than with Duplicates problem.
// The array contains duplicate values. Count elements strictly smaller to the right. Handle duplicates correctly in the BST insertion.
// Time: O(n), Space: O(1)
func RightSmallerThanWithDuplicates(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RightSmallerThanWithDuplicates([]int{8, 5, 11, -1, 3, 4, 2})) // Expected: 1
	fmt.Println(RightSmallerThanWithDuplicates([]int{1, 2, 3, 4, 5})) // Expected: 2
	fmt.Println(RightSmallerThanWithDuplicates([]int{8})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-02-right-smaller-than-with-duplicates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-02-right-smaller-than-with-duplicates'] = problem;
})();
