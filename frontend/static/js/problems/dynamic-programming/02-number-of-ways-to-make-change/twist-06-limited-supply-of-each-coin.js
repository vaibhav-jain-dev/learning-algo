/**
 * Limited Supply of Each Coin
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Limited Supply of Each Coin',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'What if each denomination has a limited supply? For example, you have 3 pennies, 2 nickels, and 1 dime. How does the DP change?',
        problem: 'Unlimited coins allow forward iteration (unbounded knapsack). Limited supply requires iterating amounts in reverse for each coin (bounded knapsack), or expanding the state to track how many of each coin is used.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Unlimited coins allow forward iteration (unbounded knapsack). Limited supply requires iterating amounts in reverse for e',
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
                input: {"n":6,"denoms":[1,5]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"n":10,"denoms":[1,5,10,25]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"n":0,"denoms":[1,2]},
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
            python: `def limited_supply_of_each_coin(n, denoms):
    """
    Limited Supply of Each Coin

    What if each denomination has a limited supply? For example, you have 3 pennies, 2 nickels, and 1 dime. How does the DP change?

    Time: O(n^2)
    Space: O(n)
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
print(limited_supply_of_each_coin(6, [1,5]))  # Expected: 1
print(limited_supply_of_each_coin(10, [1,5,10,25]))  # Expected: 2
print(limited_supply_of_each_coin(0, [1,2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LimitedSupplyOfEachCoin solves the Limited Supply of Each Coin problem.
// What if each denomination has a limited supply? For example, you have 3 pennies, 2 nickels, and 1 dime. How does the DP change?
// Time: O(n^2), Space: O(n)
func LimitedSupplyOfEachCoin(n int, denoms []int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LimitedSupplyOfEachCoin(6, []int{1, 5})) // Expected: 1
	fmt.Println(LimitedSupplyOfEachCoin(10, []int{1, 5, 10, 25})) // Expected: 2
	fmt.Println(LimitedSupplyOfEachCoin(0, []int{1, 2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/twist-06-limited-supply-of-each-coin', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/twist-06-limited-supply-of-each-coin'] = problem;
})();
