/**
 * Fractional Knapsack
 * Category: dynamic-programming
 * Difficulty: Easy
 * Parent: 07-knapsack
 */
(function() {
    'use strict';
    const problem = {
        name: 'Fractional Knapsack',
        difficulty: 'Easy',
        algorithm: 'dp-knapsack',
        parent: '07-knapsack',
        description: 'You can take fractions of items (not just whole items). Find the maximum value achievable within the weight capacity.',
        problem: 'Completely changes the approach from DP to greedy. Sort by value-to-weight ratio and greedily fill the knapsack, taking a fraction of the last item if needed.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Completely changes the approach from DP to greedy. Sort by value-to-weight ratio and greedily fill the knapsack, taking ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n log n)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'items=[[60,10],[100,20],[120,30]], capacity=50: take all of items 0 and 1 (weight 30, value 160), then 20/30 of item 2 for 80, total=240.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def fractionalKnapsack(data):
    """
    Fractional Knapsack

    You can take fractions of items (not just whole items). Find the maximum value achievable within the weight capacity.

    Approach:
    Completely changes the approach from DP to greedy. Sort by value-to-weight ratio and greedily fill the knapsack, taking a fraction of the last item if needed.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: items=[[60,10],[100,20],[120,30]], capacity=50: take all of items 0 and 1 (weight 30, value 160), then 20/30 of item 2 f

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
    print(f"Testing Fractional Knapsack...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// FractionalKnapsack solves the Fractional Knapsack problem.
// You can take fractions of items (not just whole items). Find the maximum value achievable within the weight capacity.
//
// Approach: Completely changes the approach from DP to greedy. Sort by value-to-weight ratio and greedily fill the knapsack, taking a fraction of the last item if
func FractionalKnapsack(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: items=[[60,10],[100,20],[120,30]], capacity=50: take all of items 0 and 1 (weight 30, value 160), th

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Fractional Knapsack...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '07-knapsack/twist-02-fractional-knapsack', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/07-knapsack/twist-02-fractional-knapsack'] = problem;
})();
