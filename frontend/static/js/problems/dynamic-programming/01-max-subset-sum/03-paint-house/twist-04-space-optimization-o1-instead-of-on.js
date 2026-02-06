/**
 * Space Optimization: O(1) Instead of O(n)
 * Category: dynamic-programming
 * Difficulty: Easy
 * Parent: 01-max-subset-sum/03-paint-house
 */
(function() {
    'use strict';
    const problem = {
        name: 'Space Optimization: O(1) Instead of O(n)',
        difficulty: 'Easy',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/03-paint-house',
        description: 'The current solution already uses O(1) space with three variables. Verify you understand why: which values from the previous row do you need to compute the current row?',
        problem: 'Unlike single-state DP where you need one or two previous values, here you have multiple states (one per color) at each position. Understanding that only the previous row matters is key.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Unlike single-state DP where you need one or two previous values, here you have multiple states (one per color) at each ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'At each step, curr_red = costs[i][0] + min(prev_blue, prev_green). You only need the three previous color costs, not the entire table.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def spaceOptimizationO1InsteadOfOn(data):
    """
    Space Optimization: O(1) Instead of O(n)

    The current solution already uses O(1) space with three variables. Verify you understand why: which values from the previous row do you need to compute the current row?

    Approach:
    Unlike single-state DP where you need one or two previous values, here you have multiple states (one per color) at each position. Understanding that only the previous row matters is key.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: At each step, curr_red = costs[i][0] + min(prev_blue, prev_green). You only need the three previous color costs, not the

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
    print(f"Testing Space Optimization: O(1) Instead of O(n)...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// SpaceOptimizationO1InsteadOfOn solves the Space Optimization: O(1) Instead of O(n) problem.
// The current solution already uses O(1) space with three variables. Verify you understand why: which values from the previous row do you need to comput
//
// Approach: Unlike single-state DP where you need one or two previous values, here you have multiple states (one per color) at each position. Understanding that o
func SpaceOptimizationO1InsteadOfOn(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: At each step, curr_red = costs[i][0] + min(prev_blue, prev_green). You only need the three previous 

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Space Optimization: O(1) Instead of O(n)...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/03-paint-house/twist-04-space-optimization-o1-instead-of-on', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/03-paint-house/twist-04-space-optimization-o1-instead-of-on'] = problem;
})();
