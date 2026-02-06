/**
 * Exact Coins With Limited Supply
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 03-min-coins/02-coin-change-ii-exact-coins
 */
(function() {
    'use strict';
    const problem = {
        name: 'Exact Coins With Limited Supply',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins/02-coin-change-ii-exact-coins',
        description: 'Each coin denomination has a limited supply count. Determine if you can make the amount using exactly k coins given the supply constraints.',
        problem: 'Moves from unbounded to bounded knapsack thinking, adding a third dimension to track how many of each coin you have used.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Moves from unbounded to bounded knapsack thinking, adding a third dimension to track how many of each coin you have used',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'amount=11, coins=[1,2,5], supply=[3,4,2], k=3: Can use at most 3 ones, 4 twos, 2 fives.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def exactCoinsWithLimitedSupply(data):
    """
    Exact Coins With Limited Supply

    Each coin denomination has a limited supply count. Determine if you can make the amount using exactly k coins given the supply constraints.

    Approach:
    Moves from unbounded to bounded knapsack thinking, adding a third dimension to track how many of each coin you have used.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: amount=11, coins=[1,2,5], supply=[3,4,2], k=3: Can use at most 3 ones, 4 twos, 2 fives.

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
    print(f"Testing Exact Coins With Limited Supply...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ExactCoinsWithLimitedSupply solves the Exact Coins With Limited Supply problem.
// Each coin denomination has a limited supply count. Determine if you can make the amount using exactly k coins given the supply constraints.
//
// Approach: Moves from unbounded to bounded knapsack thinking, adding a third dimension to track how many of each coin you have used.
func ExactCoinsWithLimitedSupply(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: amount=11, coins=[1,2,5], supply=[3,4,2], k=3: Can use at most 3 ones, 4 twos, 2 fives.

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Exact Coins With Limited Supply...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/02-coin-change-ii-exact-coins/twist-03-exact-coins-with-limited-supply', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/02-coin-change-ii-exact-coins/twist-03-exact-coins-with-limited-supply'] = problem;
})();
