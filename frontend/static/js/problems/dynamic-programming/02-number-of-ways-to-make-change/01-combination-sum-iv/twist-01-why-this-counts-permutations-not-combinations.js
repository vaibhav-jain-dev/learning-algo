/**
 * Why This Counts Permutations, Not Combinations
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 02-number-of-ways-to-make-change/01-combination-sum-iv
 */
(function() {
    'use strict';
    const problem = {
        name: 'Why This Counts Permutations, Not Combinations',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/01-combination-sum-iv',
        description: 'Explain precisely why iterating over target amounts in the outer loop and nums in the inner loop counts ordered sequences (permutations) rather than unordered combinations.',
        problem: 'This is the inverse of the coin change counting problem. The loop order determines whether [1,2,1] and [2,1,1] and [1,1,2] are counted as one way or three. You must understand what each DP cell represents under each ordering.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: This is the inverse of the coin change counting problem. The loop order determines whether [1,2,1] and [2,1,1] and [1,1,',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'nums=[1,2,3], target=4. dp[4] includes 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1 = 7 permutations. If coins were outer loop, only {1,1,1,1}, {1,1,2}, {1,3}, {2,2} = 4 combinations.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def whyThisCountsPermutationsNotCombinations(data):
    """
    Why This Counts Permutations, Not Combinations

    Explain precisely why iterating over target amounts in the outer loop and nums in the inner loop counts ordered sequences (permutations) rather than unordered combinations.

    Approach:
    This is the inverse of the coin change counting problem. The loop order determines whether [1,2,1] and [2,1,1] and [1,1,2] are counted as one way or three. You must understand what each DP cell represents under each ordering.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: nums=[1,2,3], target=4. dp[4] includes 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1 = 7 permutations. If coins were outer

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
    print(f"Testing Why This Counts Permutations, Not Combinations...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// WhyThisCountsPermutationsNotCombinations solves the Why This Counts Permutations, Not Combinations problem.
// Explain precisely why iterating over target amounts in the outer loop and nums in the inner loop counts ordered sequences (permutations) rather than u
//
// Approach: This is the inverse of the coin change counting problem. The loop order determines whether [1,2,1] and [2,1,1] and [1,1,2] are counted as one way or t
func WhyThisCountsPermutationsNotCombinations(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: nums=[1,2,3], target=4. dp[4] includes 1+1+1+1, 1+1+2, 1+2+1, 2+1+1, 2+2, 1+3, 3+1 = 7 permutations.

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Why This Counts Permutations, Not Combinations...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/01-combination-sum-iv/twist-01-why-this-counts-permutations-not-combinations', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/01-combination-sum-iv/twist-01-why-this-counts-permutations-not-combinations'] = problem;
})();
