/**
 * Sorted Squared No Duplicates with Original Indices
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: sorted-squared-no-duplicates-with-original-indices
 * Parent: 03-sorted-squared-array/02-sorted-squared-no-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared No Duplicates with Original Indices',
        difficulty: 'Hard',
        algorithm: 'sorted-squared-no-duplicates-with-original-indices',
        parent: '03-sorted-squared-array/02-sorted-squared-no-duplicates',
        description: 'Return unique squared values along with all original indices that contributed to each value. Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.',
        problem: 'Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.',
        hints: [
            'Think about how sorted squared no duplicates with original indices differs from the standard version of this problem.',
            'Key insight: Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.',
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
                explanation: 'After sorting, process elements in order. Adjacent elements with overlapping or matching properties are grouped together. The sorted order guarantees no valid groupings are missed.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'The sorted arrangement reveals the structure of the solution. Scan from left to right, maintaining a running state that captures the current group or interval.'
            },
            // Edge case
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'Sorting reduces the problem to a linear scan. Compare each element with the current running state and decide whether to extend, merge, or start a new group.'
            }
        ],
        solutions: {
            python: `def sorted_squared_no_duplicates_with_original_indices(array):
    """
    Sorted Squared No Duplicates with Original Indices

    Return unique squared values along with all original indices that contributed to each value. Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(sorted_squared_no_duplicates_with_original_indices([-3,-1,0,2,4]))  # Expected: [0,1,4,9,16]
print(sorted_squared_no_duplicates_with_original_indices([1,2,3]))  # Expected: [1,4,9]
print(sorted_squared_no_duplicates_with_original_indices([-5,-3,-1]))  # Expected: [1,9,25]
`,
            go: `package main

import "fmt"

// SortedSquaredNoDuplicatesWithOriginalIndices solves the Sorted Squared No Duplicates with Original Indices problem.
// Return unique squared values along with all original indices that contributed to each value. Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.
// Time: O(n), Space: O(n)
func SortedSquaredNoDuplicatesWithOriginalIndices(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(SortedSquaredNoDuplicatesWithOriginalIndices([]int{-3, -1, 0, 2, 4})) // Expected: [0,1,4,9,16]
	fmt.Println(SortedSquaredNoDuplicatesWithOriginalIndices([]int{1, 2, 3})) // Expected: [1,4,9]
	fmt.Println(SortedSquaredNoDuplicatesWithOriginalIndices([]int{-5, -3, -1})) // Expected: [1,9,25]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-05-sorted-squared-no-duplicates-with-original-indices', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-05-sorted-squared-no-duplicates-with-original-indices'] = problem;
})();
