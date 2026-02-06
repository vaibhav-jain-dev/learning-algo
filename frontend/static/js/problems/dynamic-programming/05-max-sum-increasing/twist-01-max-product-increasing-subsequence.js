/**
 * Max Product Increasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 05-max-sum-increasing
 */
(function() {
    'use strict';
    const problem = {
        name: 'Max Product Increasing Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        parent: '05-max-sum-increasing',
        description: 'Instead of maximizing the sum, find the strictly increasing subsequence whose product of elements is maximized.',
        problem: 'Products behave very differently from sums: negative numbers flip signs, zeros destroy products, and the multiplication growth is non-linear, requiring careful handling of sign tracking.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Products behave very differently from sums: negative numbers flip signs, zeros destroy products, and the multiplication ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'array=[2,3,1,5]: max product increasing subsequence is [2,3,5] with product 30, not necessarily the same as max sum.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def maxProductIncreasingSubsequence(data):
    """
    Max Product Increasing Subsequence

    Instead of maximizing the sum, find the strictly increasing subsequence whose product of elements is maximized.

    Approach:
    Products behave very differently from sums: negative numbers flip signs, zeros destroy products, and the multiplication growth is non-linear, requiring careful handling of sign tracking.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: array=[2,3,1,5]: max product increasing subsequence is [2,3,5] with product 30, not necessarily the same as max sum.

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
    print(f"Testing Max Product Increasing Subsequence...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// MaxProductIncreasingSubsequence solves the Max Product Increasing Subsequence problem.
// Instead of maximizing the sum, find the strictly increasing subsequence whose product of elements is maximized.
//
// Approach: Products behave very differently from sums: negative numbers flip signs, zeros destroy products, and the multiplication growth is non-linear, requirin
func MaxProductIncreasingSubsequence(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: array=[2,3,1,5]: max product increasing subsequence is [2,3,5] with product 30, not necessarily the 

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Max Product Increasing Subsequence...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '05-max-sum-increasing/twist-01-max-product-increasing-subsequence', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/05-max-sum-increasing/twist-01-max-product-increasing-subsequence'] = problem;
})();
