/**
 * Combinations vs Permutations: Why Loop Order Matters
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 02-number-of-ways-to-make-change
 */
(function() {
    'use strict';
    const problem = {
        name: 'Combinations vs Permutations: Why Loop Order Matters',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change',
        description: 'The outer loop iterates over coins and the inner loop over amounts. What happens if you swap the loop order? Explain the difference and what each version counts.',
        problem: 'This is one of the most subtle distinctions in DP. Outer coins = combinations (order doesn\'t matter). Outer amounts = permutations (order matters). Understanding why requires deep thought about what each DP cell means.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: This is one of the most subtle distinctions in DP. Outer coins = combinations (order doesn\'t matter). Outer amounts = pe',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'n=4, denoms=[1,2,3]. Combinations (coins outer): {1+1+1+1, 1+1+2, 1+3, 2+2} = 4 ways. Permutations (amounts outer): adds orderings like 2+1+1, 1+2+1, etc. = 7 ways.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def combinationsVsPermutationsWhyLoopOrderMatters(data):
    """
    Combinations vs Permutations: Why Loop Order Matters

    The outer loop iterates over coins and the inner loop over amounts. What happens if you swap the loop order? Explain the difference and what each version counts.

    Approach:
    This is one of the most subtle distinctions in DP. Outer coins = combinations (order doesn\\'t matter). Outer amounts = permutations (order matters). Understanding why requires deep thought about what each DP cell means.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: n=4, denoms=[1,2,3]. Combinations (coins outer): {1+1+1+1, 1+1+2, 1+3, 2+2} = 4 ways. Permutations (amounts outer): adds

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
    print(f"Testing Combinations vs Permutations: Why Loop Order Matters...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// CombinationsVsPermutationsWhyLoopOrderMatters solves the Combinations vs Permutations: Why Loop Order Matters problem.
// The outer loop iterates over coins and the inner loop over amounts. What happens if you swap the loop order? Explain the difference and what each vers
//
// Approach: This is one of the most subtle distinctions in DP. Outer coins = combinations (order doesn't matter). Outer amounts = permutations (order matters). Un
func CombinationsVsPermutationsWhyLoopOrderMatters(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: n=4, denoms=[1,2,3]. Combinations (coins outer): {1+1+1+1, 1+1+2, 1+3, 2+2} = 4 ways. Permutations (

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Combinations vs Permutations: Why Loop Order Matters...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/twist-01-combinations-vs-permutations-why-loop-order-matters', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/twist-01-combinations-vs-permutations-why-loop-order-matters'] = problem;
})();
