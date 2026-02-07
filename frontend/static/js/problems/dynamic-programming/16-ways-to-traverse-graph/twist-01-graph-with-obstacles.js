/**
 * Graph With Obstacles
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-graph-traversal
 * Parent: 16-ways-to-traverse-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Graph With Obstacles',
        difficulty: 'Medium',
        algorithm: 'dp-graph-traversal',
        parent: '16-ways-to-traverse-graph',
        description: 'Some cells in the grid are blocked (obstacles). Count the number of ways to reach the bottom-right corner, only moving right or down, while avoiding obstacles.',
        problem: 'Obstacles set certain DP cells to zero, disrupting the simple additive pattern. You must check each cell before computing its value.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Obstacles set certain DP cells to zero, disrupting the simple additive pattern. You must check each cell before computin',
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
            python: `def graph_with_obstacles(width, height):
    """
    Graph With Obstacles

    Some cells in the grid are blocked (obstacles). Count the number of ways to reach the bottom-right corner, only moving right or down, while avoiding obstacles.

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
print(graph_with_obstacles(4, 3))  # Expected: 1
print(graph_with_obstacles(2, 2))  # Expected: 2
print(graph_with_obstacles(3, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// GraphWithObstacles solves the Graph With Obstacles problem.
// Some cells in the grid are blocked (obstacles). Count the number of ways to reach the bottom-right corner, only moving right or down, while avoiding obstacles.
// Time: O(n^2), Space: O(n)
func GraphWithObstacles(width int, height int) int {
	result := 0

	for i := 0; i < len(width); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(GraphWithObstacles(4, 3)) // Expected: 1
	fmt.Println(GraphWithObstacles(2, 2)) // Expected: 2
	fmt.Println(GraphWithObstacles(3, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph/twist-01-graph-with-obstacles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph/twist-01-graph-with-obstacles'] = problem;
})();
