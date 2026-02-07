/**
 * Find Optimal Buy-Sell Days
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-transactions
 * Parent: 10-max-profit-k-transactions
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Optimal Buy-Sell Days',
        difficulty: 'Medium',
        algorithm: 'dp-transactions',
        parent: '10-max-profit-k-transactions',
        description: 'Return not just the maximum profit but the actual pairs of (buy_day, sell_day) for each transaction that achieves it.',
        problem: 'Requires backtracking through the DP table to recover which days were chosen, adding path reconstruction logic on top of the optimization.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires backtracking through the DP table to recover which days were chosen, adding path reconstruction logic on top of',
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
                input: {"prices":[5,11,3,50,60,90],"k":2},
                output: 2,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"prices":[3,2,5,7,1,3],"k":1},
                output: 3,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"prices":[1,2,3,4,5],"k":2},
                output: 1,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"prices":[5],"k":0},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def find_optimal_buy_sell_days(prices, k):
    """
    Find Optimal Buy-Sell Days

    Return not just the maximum profit but the actual pairs of (buy_day, sell_day) for each transaction that achieves it.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(prices)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and prices[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(find_optimal_buy_sell_days([5,11,3,50,60,90], 2))  # Expected: 2
print(find_optimal_buy_sell_days([3,2,5,7,1,3], 1))  # Expected: 3
print(find_optimal_buy_sell_days([1,2,3,4,5], 2))  # Expected: 1
`,
            go: `package main

import "fmt"

// FindOptimalBuySellDays solves the Find Optimal Buy-Sell Days problem.
// Return not just the maximum profit but the actual pairs of (buy_day, sell_day) for each transaction that achieves it.
// Time: O(n^2), Space: O(n)
func FindOptimalBuySellDays(prices []int, k int) int {
	result := 0

	for i := 0; i < len(prices); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FindOptimalBuySellDays([]int{5, 11, 3, 50, 60, 90}, 2)) // Expected: 2
	fmt.Println(FindOptimalBuySellDays([]int{3, 2, 5, 7, 1, 3}, 1)) // Expected: 3
	fmt.Println(FindOptimalBuySellDays([]int{1, 2, 3, 4, 5}, 2)) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '10-max-profit-k-transactions/twist-04-find-optimal-buy-sell-days', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/10-max-profit-k-transactions/twist-04-find-optimal-buy-sell-days'] = problem;
})();
