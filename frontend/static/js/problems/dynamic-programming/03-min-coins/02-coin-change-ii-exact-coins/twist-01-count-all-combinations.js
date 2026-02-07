/**
 * Count All Combinations
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 03-min-coins/02-coin-change-ii-exact-coins
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count All Combinations',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins/02-coin-change-ii-exact-coins',
        description: 'Instead of returning whether it is possible, count the total number of distinct ways to make the amount using exactly k coins.',
        problem: 'Shifts from boolean feasibility to counting, requiring you to accumulate counts rather than short-circuit on the first True.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Shifts from boolean feasibility to counting, requiring you to accumulate counts rather than short-circuit on the first T',
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
                input: {"amount":10,"coins":[2,5],"k":2},
                output: 1,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"amount":7,"coins":[2,4],"k":3},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"amount":0,"coins":[1],"k":0},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def count_all_combinations(amount, coins, k):
    """
    Count All Combinations

    Instead of returning whether it is possible, count the total number of distinct ways to make the amount using exactly k coins.

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
print(count_all_combinations(11, [1,2,5], 3))  # Expected: 1
print(count_all_combinations(10, [2,5], 2))  # Expected: 1
print(count_all_combinations(7, [2,4], 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountAllCombinations solves the Count All Combinations problem.
// Instead of returning whether it is possible, count the total number of distinct ways to make the amount using exactly k coins.
// Time: O(n^2), Space: O(n)
func CountAllCombinations(amount int, coins []int, k int) int {
	result := 0

	for i := 0; i < len(amount); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountAllCombinations(11, []int{1, 2, 5}, 3)) // Expected: 1
	fmt.Println(CountAllCombinations(10, []int{2, 5}, 2)) // Expected: 1
	fmt.Println(CountAllCombinations(7, []int{2, 4}, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/02-coin-change-ii-exact-coins/twist-01-count-all-combinations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/02-coin-change-ii-exact-coins/twist-01-count-all-combinations'] = problem;
})();
