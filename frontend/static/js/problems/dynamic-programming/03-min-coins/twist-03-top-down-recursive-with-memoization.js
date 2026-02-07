/**
 * Top-Down Recursive with Memoization
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 03-min-coins
 */
(function() {
    'use strict';

    const problem = {
        name: 'Top-Down Recursive with Memoization',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins',
        description: 'Rewrite the solution as a recursive function minCoins(amount) that tries each coin and memoizes results. Compare the recursion tree to the bottom-up table.',
        problem: 'Top-down naturally prunes unreachable states (only computes amounts actually needed), while bottom-up fills the entire table. The mental model is different: "what is the min coins for this amount?" vs "build up from 0".',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Top-down naturally prunes unreachable states (only computes amounts actually needed), while bottom-up fills the entire t',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n * L)',
            space: 'O(n * L)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":7,"denoms":[1,5,10]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"n":6,"denoms":[1,2,4]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"n":3,"denoms":[2]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"n":0,"denoms":[1]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def top_down_recursive_with_memoization(n, denoms):
    """
    Top-Down Recursive with Memoization

    Rewrite the solution as a recursive function minCoins(amount) that tries each coin and memoizes results. Compare the recursion tree to the bottom-up table.

    Time: O(n * L)
    Space: O(n * L)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on denoms
        j = 0
        for k in range(i, n):
            if j < len(denoms) and n[k] == denoms[j]:
                j += 1
        if j == len(denoms):
            count += 1

    return count


# Test cases
print(top_down_recursive_with_memoization(7, [1,5,10]))  # Expected: 1
print(top_down_recursive_with_memoization(6, [1,2,4]))  # Expected: 2
print(top_down_recursive_with_memoization(3, [2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// TopDownRecursiveWithMemoization solves the Top-Down Recursive with Memoization problem.
// Rewrite the solution as a recursive function minCoins(amount) that tries each coin and memoizes results. Compare the recursion tree to the bottom-up table.
// Time: O(n * L), Space: O(n * L)
func TopDownRecursiveWithMemoization(n int, denoms []int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TopDownRecursiveWithMemoization(7, []int{1, 5, 10})) // Expected: 1
	fmt.Println(TopDownRecursiveWithMemoization(6, []int{1, 2, 4})) // Expected: 2
	fmt.Println(TopDownRecursiveWithMemoization(3, []int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/twist-03-top-down-recursive-with-memoization', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/twist-03-top-down-recursive-with-memoization'] = problem;
})();
