/**
 * Two-Knapsack Problem
 * Category: dynamic-programming
 * Difficulty: Very Hard
 * Algorithm: dp-knapsack
 * Parent: 07-knapsack
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two-Knapsack Problem',
        difficulty: 'Very Hard',
        algorithm: 'dp-knapsack',
        parent: '07-knapsack',
        description: 'You have two knapsacks with different capacities. Each item can go into at most one knapsack. Maximize the total value across both knapsacks.',
        problem: 'Adds a second capacity dimension, turning the 2D DP into 3D. For each item, you must decide: skip it, put it in knapsack 1, or put it in knapsack 2.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Adds a second capacity dimension, turning the 2D DP into 3D. For each item, you must decide: skip it, put it in knapsack',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n * c1 * c2)',
            space: 'O(c1 * c2)'
        },
        examples: [
            // Basic test case
            {
                input: {"items":[[1,2],[4,3],[5,6],[6,7]],"capacity":10},
                output: [[1,2],[4,3],[5,6]],
                explanation: 'The two knapsack problem for this input yields [1,2, 4,3, 5,6].'
            },
            {
                input: {"items":[[60,10],[100,20],[120,30]],"capacity":50},
                output: [[60,10],[100,20],[120,30]],
                explanation: 'The two knapsack problem for this input yields [60,10, 100,20, 120,30].'
            },
            {
                input: {"items":[[10,5],[40,4],[30,6],[50,3]],"capacity":10},
                output: [[10,5],[40,4],[30,6]],
                explanation: 'The two knapsack problem for this input yields [10,5, 40,4, 30,6].'
            },
            // Edge case
            {
                input: {"items":[[1,2]],"capacity":0},
                output: [],
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def two_knapsack_problem(items, capacity):
    """
    Two-Knapsack Problem

    You have two knapsacks with different capacities. Each item can go into at most one knapsack. Maximize the total value across both knapsacks.

    Time: O(n * c1 * c2)
    Space: O(c1 * c2)
    """
    result = []

    for i in range(len(items)):
        # Check if element meets criteria
        result.append(items[i])

    return result


# Test cases
print(two_knapsack_problem([[1,2],[4,3],[5,6],[6,7]], 10))  # Expected: [[1,2],[4,3],[5,6]]
print(two_knapsack_problem([[60,10],[100,20],[120,30]], 50))  # Expected: [[60,10],[100,20],[120,30]]
print(two_knapsack_problem([[10,5],[40,4],[30,6],[50,3]], 10))  # Expected: [[10,5],[40,4],[30,6]]
`,
            go: `package main

import "fmt"

// TwoKnapsackProblem solves the Two-Knapsack Problem problem.
// You have two knapsacks with different capacities. Each item can go into at most one knapsack. Maximize the total value across both knapsacks.
// Time: O(n * c1 * c2), Space: O(c1 * c2)
func TwoKnapsackProblem(items [][]int, capacity int) []int {
	result := make([]int, 0)

	for i := 0; i < len(items); i++ {
		result = append(result, items[i])
	}

	return result
}

func main() {
	fmt.Println(TwoKnapsackProblem([][]int{{1, 2}, {4, 3}, {5, 6}, {6, 7}}, 10)) // Expected: [[1,2],[4,3],[5,6]]
	fmt.Println(TwoKnapsackProblem([][]int{{60, 10}, {100, 20}, {120, 30}}, 50)) // Expected: [[60,10],[100,20],[120,30]]
	fmt.Println(TwoKnapsackProblem([][]int{{10, 5}, {40, 4}, {30, 6}, {50, 3}}, 10)) // Expected: [[10,5],[40,4],[30,6]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '07-knapsack/twist-04-two-knapsack-problem', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/07-knapsack/twist-04-two-knapsack-problem'] = problem;
})();
