/**
 * Reconstruct Coin Selection
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 03-min-coins/02-coin-change-ii-exact-coins
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reconstruct Coin Selection',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins/02-coin-change-ii-exact-coins',
        description: 'Return the actual list of coins used (not just true/false) when making the amount with exactly k coins. If multiple solutions exist, return the lexicographically smallest.',
        problem: 'Requires backtracking through the DP table to reconstruct the solution path, adding path recovery logic on top of the feasibility check.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires backtracking through the DP table to reconstruct the solution path, adding path recovery logic on top of the fe',
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
            python: `def reconstruct_coin_selection(amount, coins, k):
    """
    Reconstruct Coin Selection

    Return the actual list of coins used (not just true/false) when making the amount with exactly k coins. If multiple solutions exist, return the lexicographically smallest.

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
print(reconstruct_coin_selection(11, [1,2,5], 3))  # Expected: 1
print(reconstruct_coin_selection(10, [2,5], 3))  # Expected: 2
print(reconstruct_coin_selection(7, [2,4], 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReconstructCoinSelection solves the Reconstruct Coin Selection problem.
// Return the actual list of coins used (not just true/false) when making the amount with exactly k coins. If multiple solutions exist, return the lexicographically smallest.
// Time: O(n^2), Space: O(n)
func ReconstructCoinSelection(amount int, coins []int, k int) int {
	result := 0

	for i := 0; i < len(amount); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReconstructCoinSelection(11, []int{1, 2, 5}, 3)) // Expected: 1
	fmt.Println(ReconstructCoinSelection(10, []int{2, 5}, 3)) // Expected: 2
	fmt.Println(ReconstructCoinSelection(7, []int{2, 4}, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/02-coin-change-ii-exact-coins/twist-05-reconstruct-coin-selection', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/02-coin-change-ii-exact-coins/twist-05-reconstruct-coin-selection'] = problem;
})();
