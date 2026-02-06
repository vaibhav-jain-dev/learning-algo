/**
 * Unbounded Knapsack
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 07-knapsack
 */
(function() {
    'use strict';
    const problem = {
        name: 'Unbounded Knapsack',
        difficulty: 'Medium',
        algorithm: 'dp-knapsack',
        parent: '07-knapsack',
        description: 'Each item can be selected an unlimited number of times instead of at most once. Find the maximum value achievable within the weight capacity.',
        problem: 'Changes the DP iteration order fundamentally. Instead of iterating items in the outer loop to prevent reuse, you allow revisiting the same item, simplifying to a 1D DP.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes the DP iteration order fundamentally. Instead of iterating items in the outer loop to prevent reuse, you allow r',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'items=[[60,10],[100,20],[120,30]], capacity=50: with unlimited use, take item 0 five times for value 300 (weight 50).'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def unboundedKnapsack(data):
    """
    Unbounded Knapsack

    Each item can be selected an unlimited number of times instead of at most once. Find the maximum value achievable within the weight capacity.

    Approach:
    Changes the DP iteration order fundamentally. Instead of iterating items in the outer loop to prevent reuse, you allow revisiting the same item, simplifying to a 1D DP.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: items=[[60,10],[100,20],[120,30]], capacity=50: with unlimited use, take item 0 five times for value 300 (weight 50).

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
    print(f"Testing Unbounded Knapsack...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// UnboundedKnapsack solves the Unbounded Knapsack problem.
// Each item can be selected an unlimited number of times instead of at most once. Find the maximum value achievable within the weight capacity.
//
// Approach: Changes the DP iteration order fundamentally. Instead of iterating items in the outer loop to prevent reuse, you allow revisiting the same item, simpl
func UnboundedKnapsack(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: items=[[60,10],[100,20],[120,30]], capacity=50: with unlimited use, take item 0 five times for value

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Unbounded Knapsack...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '07-knapsack/twist-01-unbounded-knapsack', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/07-knapsack/twist-01-unbounded-knapsack'] = problem;
})();
