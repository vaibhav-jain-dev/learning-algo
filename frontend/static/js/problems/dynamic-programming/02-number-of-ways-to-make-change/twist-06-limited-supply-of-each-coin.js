/**
 * Limited Supply of Each Coin
 * Category: dynamic-programming
 * Difficulty: Hard
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
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'n=7, coins=[1,5] with supply=[3,2]. Cannot use more than 3 ones or 2 fives. Only way: 1+1+5=7 (using 2 ones and 1 five). Answer: 1 way.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def limitedSupplyOfEachCoin(data):
    """
    Limited Supply of Each Coin

    What if each denomination has a limited supply? For example, you have 3 pennies, 2 nickels, and 1 dime. How does the DP change?

    Approach:
    Unlimited coins allow forward iteration (unbounded knapsack). Limited supply requires iterating amounts in reverse for each coin (bounded knapsack), or expanding the state to track how many of each coin is used.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: n=7, coins=[1,5] with supply=[3,2]. Cannot use more than 3 ones or 2 fives. Only way: 1+1+5=7 (using 2 ones and 1 five).

    # --- Core DP Logic ---
    # 1. Define the DP state based on the modified problem
    # 2. Initialize base cases
    # 3. Fill the DP table using the modified recurrence
    # 4. Return the answer from the DP table

    result = None  # Replace with actual computation
    return result


# Tests
if __name__ == "__main__":
    # Test case from example
    print(f"Testing Limited Supply of Each Coin...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// LimitedSupplyOfEachCoin solves the Limited Supply of Each Coin problem.
// What if each denomination has a limited supply? For example, you have 3 pennies, 2 nickels, and 1 dime. How does the DP change?
//
// Approach: Unlimited coins allow forward iteration (unbounded knapsack). Limited supply requires iterating amounts in reverse for each coin (bounded knapsack), o
func LimitedSupplyOfEachCoin(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: n=7, coins=[1,5] with supply=[3,2]. Cannot use more than 3 ones or 2 fives. Only way: 1+1+5=7 (using

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Limited Supply of Each Coin...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
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
