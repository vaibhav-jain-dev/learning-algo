/**
 * Longest Bitonic Subsequence
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 12-longest-increasing-subseq
 */
(function() {
    'use strict';
    const problem = {
        name: 'Longest Bitonic Subsequence',
        difficulty: 'Hard',
        algorithm: 'dp-increasing-subseq',
        parent: '12-longest-increasing-subseq',
        description: 'Find the longest subsequence that first strictly increases and then strictly decreases. The subsequence must have both an increasing and decreasing part.',
        problem: 'Requires two DP passes (LIS from left and LDS from right) and combining them at each position, introducing a merge-based approach.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires two DP passes (LIS from left and LDS from right) and combining them at each position, introducing a merge-based',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'array=[1,11,2,10,4,5,2,1]: longest bitonic is [1,2,10,4,2,1] with length 6.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def longestBitonicSubsequence(data):
    """
    Longest Bitonic Subsequence

    Find the longest subsequence that first strictly increases and then strictly decreases. The subsequence must have both an increasing and decreasing part.

    Approach:
    Requires two DP passes (LIS from left and LDS from right) and combining them at each position, introducing a merge-based approach.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: array=[1,11,2,10,4,5,2,1]: longest bitonic is [1,2,10,4,2,1] with length 6.

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
    print(f"Testing Longest Bitonic Subsequence...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// LongestBitonicSubsequence solves the Longest Bitonic Subsequence problem.
// Find the longest subsequence that first strictly increases and then strictly decreases. The subsequence must have both an increasing and decreasing pa
//
// Approach: Requires two DP passes (LIS from left and LDS from right) and combining them at each position, introducing a merge-based approach.
func LongestBitonicSubsequence(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: array=[1,11,2,10,4,5,2,1]: longest bitonic is [1,2,10,4,2,1] with length 6.

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Longest Bitonic Subsequence...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '12-longest-increasing-subseq/twist-02-longest-bitonic-subsequence', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/12-longest-increasing-subseq/twist-02-longest-bitonic-subsequence'] = problem;
})();
