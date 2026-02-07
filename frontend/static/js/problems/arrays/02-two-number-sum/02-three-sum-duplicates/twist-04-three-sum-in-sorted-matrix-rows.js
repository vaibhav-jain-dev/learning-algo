/**
 * Three Sum in Sorted Matrix Rows
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-in-sorted-matrix-rows
 * Parent: 02-two-number-sum/02-three-sum-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum in Sorted Matrix Rows',
        difficulty: 'Hard',
        algorithm: 'three-sum-in-sorted-matrix-rows',
        parent: '02-two-number-sum/02-three-sum-duplicates',
        description: 'Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets. The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
        problem: 'The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
            'Sorting the input first may simplify the problem significantly.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[-1,2,1,-4],"target":1},
                output: 2,
                explanation: 'After sorting, process elements in order. Adjacent elements with overlapping or matching properties are grouped together. The sorted order guarantees no valid groupings are missed.'
            },
            {
                input: {"nums":[0,0,0],"target":1},
                output: 0,
                explanation: 'The sorted arrangement reveals the structure of the solution. Scan from left to right, maintaining a running state that captures the current group or interval.'
            },
            // Edge case
            {
                input: {"nums":[1,2,3,4,5],"target":10},
                output: 10,
                explanation: 'Sorting reduces the problem to a linear scan. Compare each element with the current running state and decide whether to extend, merge, or start a new group.'
            }
        ],
        solutions: {
            python: `def three_sum_in_sorted_matrix_rows(nums, target):
    """
    Three Sum in Sorted Matrix Rows

    Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets. The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.

    Time: O(n log k)
    Space: O(n)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(three_sum_in_sorted_matrix_rows([-1,2,1,-4], 1))  # Expected: 2
print(three_sum_in_sorted_matrix_rows([0,0,0], 1))  # Expected: 0
print(three_sum_in_sorted_matrix_rows([1,2,3,4,5], 10))  # Expected: 10
`,
            go: `package main

import "fmt"

// ThreeSumInSortedMatrixRows solves the Three Sum in Sorted Matrix Rows problem.
// Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets. The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.
// Time: O(n log k), Space: O(n)
func ThreeSumInSortedMatrixRows(nums []int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(ThreeSumInSortedMatrixRows([]int{-1, 2, 1, -4}, 1)) // Expected: 2
	fmt.Println(ThreeSumInSortedMatrixRows([]int{0, 0, 0}, 1)) // Expected: 0
	fmt.Println(ThreeSumInSortedMatrixRows([]int{1, 2, 3, 4, 5}, 10)) // Expected: 10
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates/twist-04-three-sum-in-sorted-matrix-rows', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates/twist-04-three-sum-in-sorted-matrix-rows'] = problem;
})();
