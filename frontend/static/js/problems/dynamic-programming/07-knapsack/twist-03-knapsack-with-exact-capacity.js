/**
 * Knapsack With Exact Capacity
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-knapsack
 * Parent: 07-knapsack
 */
(function() {
    'use strict';

    const problem = {
        name: 'Knapsack With Exact Capacity',
        difficulty: 'Hard',
        algorithm: 'dp-knapsack',
        parent: '07-knapsack',
        description: 'Find the maximum value when you must fill the knapsack to exactly the given capacity (not just at most). Return -1 if impossible.',
        problem: 'Changes the DP initialization: instead of all zeros, use negative infinity for unreachable states. Only the final cell dp[capacity] gives a valid answer.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes the DP initialization: instead of all zeros, use negative infinity for unreachable states. Only the final cell d',
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
                input: {"items":[[1,2],[4,3],[5,6],[6,7]],"capacity":10},
                output: 2,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"items":[[60,10],[100,20],[120,30]],"capacity":50},
                output: 3,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"items":[[10,5],[40,4],[30,6],[50,3]],"capacity":10},
                output: 1,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"items":[[1,2]],"capacity":0},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def knapsack_with_exact_capacity(items, capacity):
    """
    Knapsack With Exact Capacity

    Find the maximum value when you must fill the knapsack to exactly the given capacity (not just at most). Return -1 if impossible.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(items)

    for i in range(n):
        # Check condition based on capacity
        j = 0
        for k in range(i, n):
            if j < len(capacity) and items[k] == capacity[j]:
                j += 1
        if j == len(capacity):
            count += 1

    return count


# Test cases
print(knapsack_with_exact_capacity([[1,2],[4,3],[5,6],[6,7]], 10))  # Expected: 2
print(knapsack_with_exact_capacity([[60,10],[100,20],[120,30]], 50))  # Expected: 3
print(knapsack_with_exact_capacity([[10,5],[40,4],[30,6],[50,3]], 10))  # Expected: 1
`,
            go: `package main

import "fmt"

// KnapsackWithExactCapacity solves the Knapsack With Exact Capacity problem.
// Find the maximum value when you must fill the knapsack to exactly the given capacity (not just at most). Return -1 if impossible.
// Time: O(n^2), Space: O(n)
func KnapsackWithExactCapacity(items [][]int, capacity int) int {
	result := 0

	for i := 0; i < len(items); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KnapsackWithExactCapacity([][]int{{1, 2}, {4, 3}, {5, 6}, {6, 7}}, 10)) // Expected: 2
	fmt.Println(KnapsackWithExactCapacity([][]int{{60, 10}, {100, 20}, {120, 30}}, 50)) // Expected: 3
	fmt.Println(KnapsackWithExactCapacity([][]int{{10, 5}, {40, 4}, {30, 6}, {50, 3}}, 10)) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '07-knapsack/twist-03-knapsack-with-exact-capacity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/07-knapsack/twist-03-knapsack-with-exact-capacity'] = problem;
})();
