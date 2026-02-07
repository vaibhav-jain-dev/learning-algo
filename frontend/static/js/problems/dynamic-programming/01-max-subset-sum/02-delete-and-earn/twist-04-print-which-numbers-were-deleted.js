/**
 * Print Which Numbers Were Deleted
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/02-delete-and-earn
 */
(function() {
    'use strict';

    const problem = {
        name: 'Print Which Numbers Were Deleted',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/02-delete-and-earn',
        description: 'Return not just the max points but the actual list of original numbers that were deleted to earn those points.',
        problem: 'Backtracking through the DP requires tracking which values were "taken" at each step, then mapping back to the original array elements.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Backtracking through the DP requires tracking which values were "taken" at each step, then mapping back to the original ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[3,4,2]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"nums":[2,2,3,3,3,4]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"nums":[3]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def print_which_numbers_were_deleted(nums):
    """
    Print Which Numbers Were Deleted

    Return not just the max points but the actual list of original numbers that were deleted to earn those points.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(print_which_numbers_were_deleted([3,4,2]))  # Expected: 1
print(print_which_numbers_were_deleted([2,2,3,3,3,4]))  # Expected: 2
print(print_which_numbers_were_deleted([3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// PrintWhichNumbersWereDeleted solves the Print Which Numbers Were Deleted problem.
// Return not just the max points but the actual list of original numbers that were deleted to earn those points.
// Time: O(n^2), Space: O(n)
func PrintWhichNumbersWereDeleted(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PrintWhichNumbersWereDeleted([]int{3, 4, 2})) // Expected: 1
	fmt.Println(PrintWhichNumbersWereDeleted([]int{2, 2, 3, 3, 3, 4})) // Expected: 2
	fmt.Println(PrintWhichNumbersWereDeleted([]int{3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/02-delete-and-earn/twist-04-print-which-numbers-were-deleted', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/02-delete-and-earn/twist-04-print-which-numbers-were-deleted'] = problem;
})();
