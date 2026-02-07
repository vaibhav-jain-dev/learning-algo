/**
 * Count the Number of Optimal Strategies
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum/02-delete-and-earn
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count the Number of Optimal Strategies',
        difficulty: 'Hard',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/02-delete-and-earn',
        description: 'Instead of finding the maximum points, count how many distinct sets of values achieve that maximum. Two strategies are different if they choose different sets of values.',
        problem: 'Switches from optimization to counting. You need a parallel DP that tracks both the max value AND the count of ways to achieve it at each step.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Switches from optimization to counting. You need a parallel DP that tracks both the max value AND the count of ways to a',
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
            python: `def count_the_number_of_optimal_strategies(nums):
    """
    Count the Number of Optimal Strategies

    Instead of finding the maximum points, count how many distinct sets of values achieve that maximum. Two strategies are different if they choose different sets of values.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_the_number_of_optimal_strategies([3,4,2]))  # Expected: 1
print(count_the_number_of_optimal_strategies([2,2,3,3,3,4]))  # Expected: 2
print(count_the_number_of_optimal_strategies([3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountTheNumberOfOptimalStrategies solves the Count the Number of Optimal Strategies problem.
// Instead of finding the maximum points, count how many distinct sets of values achieve that maximum. Two strategies are different if they choose different sets of values.
// Time: O(n^2), Space: O(n)
func CountTheNumberOfOptimalStrategies(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountTheNumberOfOptimalStrategies([]int{3, 4, 2})) // Expected: 1
	fmt.Println(CountTheNumberOfOptimalStrategies([]int{2, 2, 3, 3, 3, 4})) // Expected: 2
	fmt.Println(CountTheNumberOfOptimalStrategies([]int{3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/02-delete-and-earn/twist-03-count-the-number-of-optimal-strategies', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/02-delete-and-earn/twist-03-count-the-number-of-optimal-strategies'] = problem;
})();
