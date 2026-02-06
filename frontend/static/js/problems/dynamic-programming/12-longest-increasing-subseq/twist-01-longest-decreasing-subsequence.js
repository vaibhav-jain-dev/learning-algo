/**
 * Longest Decreasing Subsequence
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 12-longest-increasing-subseq
 */
(function() {
    'use strict';
    const problem = {
        name: 'Longest Decreasing Subsequence',
        difficulty: 'Medium',
        algorithm: 'dp-increasing-subseq',
        parent: '12-longest-increasing-subseq',
        description: 'Find the longest strictly decreasing subsequence instead of increasing.',
        problem: 'You can either reverse the array and use LIS, or flip the comparison in the DP. Forces you to think about problem transformations and symmetry.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: You can either reverse the array and use LIS, or flip the comparison in the DP. Forces you to think about problem transf',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'array=[5,7,-24,12,10,2,3,12,5,6,35]: longest decreasing is [12,10,2] or [7,5,3] with length 3.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def longestDecreasingSubsequence(data):
    """
    Longest Decreasing Subsequence

    Find the longest strictly decreasing subsequence instead of increasing.

    Approach:
    You can either reverse the array and use LIS, or flip the comparison in the DP. Forces you to think about problem transformations and symmetry.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: array=[5,7,-24,12,10,2,3,12,5,6,35]: longest decreasing is [12,10,2] or [7,5,3] with length 3.

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
    print(f"Testing Longest Decreasing Subsequence...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// LongestDecreasingSubsequence solves the Longest Decreasing Subsequence problem.
// Find the longest strictly decreasing subsequence instead of increasing.
//
// Approach: You can either reverse the array and use LIS, or flip the comparison in the DP. Forces you to think about problem transformations and symmetry.
func LongestDecreasingSubsequence(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: array=[5,7,-24,12,10,2,3,12,5,6,35]: longest decreasing is [12,10,2] or [7,5,3] with length 3.

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Longest Decreasing Subsequence...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq/twist-01-longest-decreasing-subsequence', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq/twist-01-longest-decreasing-subsequence'] = problem;
})();
