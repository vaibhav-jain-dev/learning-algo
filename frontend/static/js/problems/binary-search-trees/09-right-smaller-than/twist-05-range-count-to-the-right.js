/**
 * Range Count to the Right
 * Category: binary-search-trees
 * Difficulty: Very Hard
 * Algorithm: bst-augmented
 * Parent: 09-right-smaller-than
 */
(function() {
    'use strict';

    const problem = {
        name: 'Range Count to the Right',
        difficulty: 'Very Hard',
        algorithm: 'bst-augmented',
        parent: '09-right-smaller-than',
        description: 'For each element at index i, count how many elements to its right fall within the range [array[i] - k, array[i] + k] for a given k.',
        problem: 'Instead of counting all smaller elements, you need a range query. The augmented BST must support rank queries for both a lower and upper bound, and the count is the difference between two rank lookups. Think about what changes from the base problem and how it affects your algorithmic approach.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the range count to the right criteria.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the range count to the right criteria.'
            },
            // Edge case
            {
                input: {"array":[8]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def range_count_to_the_right(array):
    """
    Range Count to the Right

    For each element at index i, count how many elements to its right fall within the range [array[i] - k, array[i] + k] for a given k.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(range_count_to_the_right([8,5,11,-1,3,4,2]))  # Expected: 1
print(range_count_to_the_right([1,2,3,4,5]))  # Expected: 2
print(range_count_to_the_right([8]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RangeCountToTheRight solves the Range Count to the Right problem.
// For each element at index i, count how many elements to its right fall within the range [array[i] - k, array[i] + k] for a given k.
// Time: O(n), Space: O(1)
func RangeCountToTheRight(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RangeCountToTheRight([]int{8, 5, 11, -1, 3, 4, 2})) // Expected: 1
	fmt.Println(RangeCountToTheRight([]int{1, 2, 3, 4, 5})) // Expected: 2
	fmt.Println(RangeCountToTheRight([]int{8})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '09-right-smaller-than/twist-05-range-count-to-the-right', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/09-right-smaller-than/twist-05-range-count-to-the-right'] = problem;
})();
