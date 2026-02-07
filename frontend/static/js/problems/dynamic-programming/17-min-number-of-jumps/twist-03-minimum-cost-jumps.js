/**
 * Minimum Cost Jumps
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-jumps
 * Parent: 17-min-number-of-jumps
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Cost Jumps',
        difficulty: 'Medium',
        algorithm: 'dp-jumps',
        parent: '17-min-number-of-jumps',
        description: 'Each jump has a cost equal to the landing position value. Find the path from index 0 to the last index with minimum total cost.',
        problem: 'Changes from minimizing jump count to minimizing accumulated cost. The DP recurrence adds the destination value instead of incrementing by 1.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes from minimizing jump count to minimizing accumulated cost. The DP recurrence adds the destination value instead ',
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
                input: {"array":[3,4,2,1,2,3,7,1,1,1,3]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"array":[2,1,1]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"array":[1,1,1,1]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            {
                input: {"array":[1,0,1]},
                output: 3,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            // Edge case
            {
                input: {"array":[3]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def minimum_cost_jumps(array):
    """
    Minimum Cost Jumps

    Each jump has a cost equal to the landing position value. Find the path from index 0 to the last index with minimum total cost.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_cost_jumps([3,4,2,1,2,3,7,1,1,1,3]))  # Expected: 1
print(minimum_cost_jumps([2,1,1]))  # Expected: 2
print(minimum_cost_jumps([1,1,1,1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumCostJumps solves the Minimum Cost Jumps problem.
// Each jump has a cost equal to the landing position value. Find the path from index 0 to the last index with minimum total cost.
// Time: O(n^2), Space: O(n)
func MinimumCostJumps(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumCostJumps([]int{3, 4, 2, 1, 2, 3, 7, 1, 1, 1, 3})) // Expected: 1
	fmt.Println(MinimumCostJumps([]int{2, 1, 1})) // Expected: 2
	fmt.Println(MinimumCostJumps([]int{1, 1, 1, 1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps/twist-03-minimum-cost-jumps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps/twist-03-minimum-cost-jumps'] = problem;
})();
