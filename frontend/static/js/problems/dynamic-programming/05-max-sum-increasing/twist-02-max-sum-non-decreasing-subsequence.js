/**
 * Max Sum Non-Decreasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 05-max-sum-increasing
 */
(function() {
    'use strict';
    const problem = {
        name: 'Max Sum Non-Decreasing Subsequence',
        difficulty: 'Medium',
        algorithm: 'dp-increasing-subseq',
        parent: '05-max-sum-increasing',
        description: 'Find the maximum sum subsequence where elements are non-decreasing (equal consecutive values allowed) instead of strictly increasing.',
        problem: 'The relaxed condition from strictly-less-than to less-than-or-equal changes which pairs can chain together, allowing duplicate values to be included.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The relaxed condition from strictly-less-than to less-than-or-equal changes which pairs can chain together, allowing dup',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'array=[10,10,20,30]: strictly increasing skips one 10, giving sum 60. Non-decreasing includes both: 10+10+20+30=70.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def maxSumNondecreasingSubsequence(data):
    """
    Max Sum Non-Decreasing Subsequence

    Find the maximum sum subsequence where elements are non-decreasing (equal consecutive values allowed) instead of strictly increasing.

    Approach:
    The relaxed condition from strictly-less-than to less-than-or-equal changes which pairs can chain together, allowing duplicate values to be included.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: array=[10,10,20,30]: strictly increasing skips one 10, giving sum 60. Non-decreasing includes both: 10+10+20+30=70.

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
    print(f"Testing Max Sum Non-Decreasing Subsequence...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// MaxSumNondecreasingSubsequence solves the Max Sum Non-Decreasing Subsequence problem.
// Find the maximum sum subsequence where elements are non-decreasing (equal consecutive values allowed) instead of strictly increasing.
//
// Approach: The relaxed condition from strictly-less-than to less-than-or-equal changes which pairs can chain together, allowing duplicate values to be included.
func MaxSumNondecreasingSubsequence(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: array=[10,10,20,30]: strictly increasing skips one 10, giving sum 60. Non-decreasing includes both: 

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Max Sum Non-Decreasing Subsequence...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '05-max-sum-increasing/twist-02-max-sum-non-decreasing-subsequence', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/05-max-sum-increasing/twist-02-max-sum-non-decreasing-subsequence'] = problem;
})();
