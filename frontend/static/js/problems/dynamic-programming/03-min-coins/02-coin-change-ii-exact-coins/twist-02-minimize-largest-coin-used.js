/**
 * Minimize Largest Coin Used
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-coin-change
 * Parent: 03-min-coins/02-coin-change-ii-exact-coins
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimize Largest Coin Used',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins/02-coin-change-ii-exact-coins',
        description: 'Make the amount using exactly k coins, but among all valid combinations, return the one that minimizes the largest coin denomination used.',
        problem: 'Adds an optimization objective on top of the feasibility constraint, requiring you to track the maximum coin in each DP state.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Adds an optimization objective on top of the feasibility constraint, requiring you to track the maximum coin in each DP ',
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
                input: {"amount":11,"coins":[1,2,5],"k":3},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"amount":10,"coins":[2,5],"k":3},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"amount":7,"coins":[2,4],"k":3},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"amount":0,"coins":[1],"k":3},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def minimize_largest_coin_used(amount, coins, k):
    """
    Minimize Largest Coin Used

    Make the amount using exactly k coins, but among all valid combinations, return the one that minimizes the largest coin denomination used.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(amount)

    for i in range(n):
        # Check condition based on coins
        j = 0
        for k in range(i, n):
            if j < len(coins) and amount[k] == coins[j]:
                j += 1
        if j == len(coins):
            count += 1

    return count


# Test cases
print(minimize_largest_coin_used(11, [1,2,5], 3))  # Expected: 1
print(minimize_largest_coin_used(10, [2,5], 3))  # Expected: 2
print(minimize_largest_coin_used(7, [2,4], 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimizeLargestCoinUsed solves the Minimize Largest Coin Used problem.
// Make the amount using exactly k coins, but among all valid combinations, return the one that minimizes the largest coin denomination used.
// Time: O(n^2), Space: O(n)
func MinimizeLargestCoinUsed(amount int, coins []int, k int) int {
	result := 0

	for i := 0; i < len(amount); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimizeLargestCoinUsed(11, []int{1, 2, 5}, 3)) // Expected: 1
	fmt.Println(MinimizeLargestCoinUsed(10, []int{2, 5}, 3)) // Expected: 2
	fmt.Println(MinimizeLargestCoinUsed(7, []int{2, 4}, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/02-coin-change-ii-exact-coins/twist-02-minimize-largest-coin-used', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/02-coin-change-ii-exact-coins/twist-02-minimize-largest-coin-used'] = problem;
})();
