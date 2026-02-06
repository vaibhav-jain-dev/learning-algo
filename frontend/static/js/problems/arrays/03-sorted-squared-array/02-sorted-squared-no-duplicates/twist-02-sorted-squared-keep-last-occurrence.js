/**
 * Sorted Squared Keep Last Occurrence
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorted-squared-keep-last-occurrence
 * Parent: 03-sorted-squared-array/02-sorted-squared-no-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared Keep Last Occurrence',
        difficulty: 'Medium',
        algorithm: 'sorted-squared-keep-last-occurrence',
        parent: '03-sorted-squared-array/02-sorted-squared-no-duplicates',
        description: 'When duplicates exist, keep track of which original element (positive or negative) contributed to each unique square. Return pairs of (square, original_value) keeping the rightmost original. Requires tracking provenance alongside deduplication, adding metadata management to the merge step.',
        problem: 'Requires tracking provenance alongside deduplication, adding metadata management to the merge step.',
        hints: [
            'Think about how sorted squared keep last occurrence differs from the standard version of this problem.',
            'Key insight: Requires tracking provenance alongside deduplication, adding metadata management to the merge step.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: ''
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: ''
            }
        ],
        solutions: {
            python: `def sorted_squared_keep_last_occurrence(array):
    """
    Sorted Squared Keep Last Occurrence

    When duplicates exist, keep track of which original element (positive or negative) contributed to each unique square. Return pairs of (square, original_value) keeping the rightmost original. Requires tracking provenance alongside deduplication, adding metadata management to the merge step.

    Time: O(n)
    Space: O(n)
    """
    result = []
    n = len(array)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([array[i], array[j]])

    return result


# Test cases
print(sorted_squared_keep_last_occurrence([-3,-1,0,2,4]))  # Expected: [0,1,4,9,16]
print(sorted_squared_keep_last_occurrence([1,2,3]))  # Expected: [1,4,9]
print(sorted_squared_keep_last_occurrence([-5,-3,-1]))  # Expected: [1,9,25]
`,
            go: `package main

import "fmt"

// SortedSquaredKeepLastOccurrence solves the Sorted Squared Keep Last Occurrence problem.
// When duplicates exist, keep track of which original element (positive or negative) contributed to each unique square. Return pairs of (square, original_value) keeping the rightmost original. Requires tracking provenance alongside deduplication, adding metadata management to the merge step.
// Time: O(n), Space: O(n)
func SortedSquaredKeepLastOccurrence(array []int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(array); i++ {
		for j := i + 1; j < len(array); j++ {
			result = append(result, []int{array[i], array[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(SortedSquaredKeepLastOccurrence([]int{-3, -1, 0, 2, 4})) // Expected: [0,1,4,9,16]
	fmt.Println(SortedSquaredKeepLastOccurrence([]int{1, 2, 3})) // Expected: [1,4,9]
	fmt.Println(SortedSquaredKeepLastOccurrence([]int{-5, -3, -1})) // Expected: [1,9,25]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-02-sorted-squared-keep-last-occurrence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-02-sorted-squared-keep-last-occurrence'] = problem;
})();
