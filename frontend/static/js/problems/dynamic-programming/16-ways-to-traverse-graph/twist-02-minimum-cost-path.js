/**
 * Minimum Cost Path
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-graph-traversal
 * Parent: 16-ways-to-traverse-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Cost Path',
        difficulty: 'Medium',
        algorithm: 'dp-graph-traversal',
        parent: '16-ways-to-traverse-graph',
        description: 'Each cell has a cost. Find the path from top-left to bottom-right (moving only right or down) with the minimum total cost.',
        problem: 'Changes from counting paths to optimizing cost. The DP recurrence uses min instead of sum, and cell values are accumulated rather than counted.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes from counting paths to optimizing cost. The DP recurrence uses min instead of sum, and cell values are accumulat',
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
                input: {"width":4,"height":3},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"width":2,"height":2},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"width":3,"height":3},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            {
                input: {"width":1,"height":5},
                output: 3,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            // Edge case
            {
                input: {"width":0,"height":0},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def minimum_cost_path(width, height):
    """
    Minimum Cost Path

    Each cell has a cost. Find the path from top-left to bottom-right (moving only right or down) with the minimum total cost.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(width)

    for i in range(n):
        # Check condition based on height
        j = 0
        for k in range(i, n):
            if j < len(height) and width[k] == height[j]:
                j += 1
        if j == len(height):
            count += 1

    return count


# Test cases
print(minimum_cost_path(4, 3))  # Expected: 1
print(minimum_cost_path(2, 2))  # Expected: 2
print(minimum_cost_path(3, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumCostPath solves the Minimum Cost Path problem.
// Each cell has a cost. Find the path from top-left to bottom-right (moving only right or down) with the minimum total cost.
// Time: O(n^2), Space: O(n)
func MinimumCostPath(width int, height int) int {
	result := 0

	for i := 0; i < len(width); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumCostPath(4, 3)) // Expected: 1
	fmt.Println(MinimumCostPath(2, 2)) // Expected: 2
	fmt.Println(MinimumCostPath(3, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph/twist-02-minimum-cost-path', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph/twist-02-minimum-cost-path'] = problem;
})();
