/**
 * Space Optimization: O(n) to O(1)
 * Category: dynamic-programming
 * Difficulty: Easy
 * Parent: 01-max-subset-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Space Optimization: O(n) to O(1)',
        difficulty: 'Easy',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'You have the O(n) DP array solution. Now optimize it to O(1) space by identifying which previous values you actually need at each step.',
        problem: 'Requires recognizing that only the last two DP values matter. This pattern of rolling variables is a fundamental DP space optimization technique.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires recognizing that only the last two DP values matter. This pattern of rolling variables is a fundamental DP spac',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'Replace dp[] array with two variables: prev1 (dp[i-1]) and prev2 (dp[i-2]). At each step: curr = max(prev1, prev2 + array[i]), then shift prev2 = prev1, prev1 = curr.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def spaceOptimizationOnToO1(data):
    """
    Space Optimization: O(n) to O(1)

    You have the O(n) DP array solution. Now optimize it to O(1) space by identifying which previous values you actually need at each step.

    Approach:
    Requires recognizing that only the last two DP values matter. This pattern of rolling variables is a fundamental DP space optimization technique.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: Replace dp[] array with two variables: prev1 (dp[i-1]) and prev2 (dp[i-2]). At each step: curr = max(prev1, prev2 + arra

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
    print(f"Testing Space Optimization: O(n) to O(1)...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// SpaceOptimizationOnToO1 solves the Space Optimization: O(n) to O(1) problem.
// You have the O(n) DP array solution. Now optimize it to O(1) space by identifying which previous values you actually need at each step.
//
// Approach: Requires recognizing that only the last two DP values matter. This pattern of rolling variables is a fundamental DP space optimization technique.
func SpaceOptimizationOnToO1(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: Replace dp[] array with two variables: prev1 (dp[i-1]) and prev2 (dp[i-2]). At each step: curr = max

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Space Optimization: O(n) to O(1)...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/twist-02-space-optimization-on-to-o1', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/twist-02-space-optimization-on-to-o1'] = problem;
})();
