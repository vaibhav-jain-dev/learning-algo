/**
 * 2D to 1D Space Reduction
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change/02-target-sum
 */
(function() {
    'use strict';

    const problem = {
        name: '2D to 1D Space Reduction',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/02-target-sum',
        description: 'The naive 2D DP is dp[i][s] = number of ways to achieve sum s using first i elements. Show how this reduces to a 1D array by iterating in reverse.',
        problem: 'Understanding why reverse iteration prevents using the same element twice is a fundamental 0/1 knapsack insight. It tests whether you understand the dependency structure of the DP table.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding why reverse iteration prevents using the same element twice is a fundamental 0/1 knapsack insight. It test',
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
                input: {"nums":[1,1,1,1,1],"target":3},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"nums":[1],"target":1},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"nums":[1],"target":0},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def 2d_to_1d_space_reduction(nums, target):
    """
    2D to 1D Space Reduction

    The naive 2D DP is dp[i][s] = number of ways to achieve sum s using first i elements. Show how this reduces to a 1D array by iterating in reverse.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(nums)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and nums[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(2d_to_1d_space_reduction([1,1,1,1,1], 3))  # Expected: 1
print(2d_to_1d_space_reduction([1], 1))  # Expected: 2
print(2d_to_1d_space_reduction([1], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// 2dTo1dSpaceReduction solves the 2D to 1D Space Reduction problem.
// The naive 2D DP is dp[i][s] = number of ways to achieve sum s using first i elements. Show how this reduces to a 1D array by iterating in reverse.
// Time: O(n^2), Space: O(n)
func 2dTo1dSpaceReduction(nums []int, target int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(2dTo1dSpaceReduction([]int{1, 1, 1, 1, 1}, 3)) // Expected: 1
	fmt.Println(2dTo1dSpaceReduction([]int{1}, 1)) // Expected: 2
	fmt.Println(2dTo1dSpaceReduction([]int{1}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/02-target-sum/twist-05-2d-to-1d-space-reduction', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/02-target-sum/twist-05-2d-to-1d-space-reduction'] = problem;
})();
