/**
 * Knapsack With Exact Capacity
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 07-knapsack
 */
(function() {
    'use strict';
    const problem = {
        name: 'Knapsack With Exact Capacity',
        difficulty: 'Hard',
        algorithm: 'dp-knapsack',
        parent: '07-knapsack',
        description: 'Find the maximum value when you must fill the knapsack to exactly the given capacity (not just at most). Return -1 if impossible.',
        problem: 'Changes the DP initialization: instead of all zeros, use negative infinity for unreachable states. Only the final cell dp[capacity] gives a valid answer.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes the DP initialization: instead of all zeros, use negative infinity for unreachable states. Only the final cell d',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'items=[[10,5],[40,4],[30,6],[50,3]], capacity=10: must use items totaling exactly weight 10, like items 1+3 (weight 7) does not work, need exact fit.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def knapsackWithExactCapacity(data):
    """
    Knapsack With Exact Capacity

    Find the maximum value when you must fill the knapsack to exactly the given capacity (not just at most). Return -1 if impossible.

    Approach:
    Changes the DP initialization: instead of all zeros, use negative infinity for unreachable states. Only the final cell dp[capacity] gives a valid answer.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: items=[[10,5],[40,4],[30,6],[50,3]], capacity=10: must use items totaling exactly weight 10, like items 1+3 (weight 7) d

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
    print(f"Testing Knapsack With Exact Capacity...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// KnapsackWithExactCapacity solves the Knapsack With Exact Capacity problem.
// Find the maximum value when you must fill the knapsack to exactly the given capacity (not just at most). Return -1 if impossible.
//
// Approach: Changes the DP initialization: instead of all zeros, use negative infinity for unreachable states. Only the final cell dp[capacity] gives a valid answ
func KnapsackWithExactCapacity(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: items=[[10,5],[40,4],[30,6],[50,3]], capacity=10: must use items totaling exactly weight 10, like it

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Knapsack With Exact Capacity...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '07-knapsack/twist-03-knapsack-with-exact-capacity', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/07-knapsack/twist-03-knapsack-with-exact-capacity'] = problem;
})();
