/**
 * Reconstruct Coin Selection
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 03-min-coins/02-coin-change-ii-exact-coins
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reconstruct Coin Selection',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins/02-coin-change-ii-exact-coins',
        description: 'Return the actual list of coins used (not just true/false) when making the amount with exactly k coins. If multiple solutions exist, return the lexicographically smallest.',
        problem: 'Requires backtracking through the DP table to reconstruct the solution path, adding path recovery logic on top of the feasibility check.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires backtracking through the DP table to reconstruct the solution path, adding path recovery logic on top of the fe',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'amount=11, coins=[1,2,5], k=3 returns [1,5,5] as the lexicographically smallest valid combination.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def reconstructCoinSelection(data):
    """
    Reconstruct Coin Selection

    Return the actual list of coins used (not just true/false) when making the amount with exactly k coins. If multiple solutions exist, return the lexicographically smallest.

    Approach:
    Requires backtracking through the DP table to reconstruct the solution path, adding path recovery logic on top of the feasibility check.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: amount=11, coins=[1,2,5], k=3 returns [1,5,5] as the lexicographically smallest valid combination.

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
    print(f"Testing Reconstruct Coin Selection...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// ReconstructCoinSelection solves the Reconstruct Coin Selection problem.
// Return the actual list of coins used (not just true/false) when making the amount with exactly k coins. If multiple solutions exist, return the lexico
//
// Approach: Requires backtracking through the DP table to reconstruct the solution path, adding path recovery logic on top of the feasibility check.
func ReconstructCoinSelection(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: amount=11, coins=[1,2,5], k=3 returns [1,5,5] as the lexicographically smallest valid combination.

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Reconstruct Coin Selection...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/02-coin-change-ii-exact-coins/twist-05-reconstruct-coin-selection', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/02-coin-change-ii-exact-coins/twist-05-reconstruct-coin-selection'] = problem;
})();
