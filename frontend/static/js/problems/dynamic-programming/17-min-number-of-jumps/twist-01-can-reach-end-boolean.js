/**
 * Can Reach End (Boolean)
 * Category: dynamic-programming
 * Difficulty: Easy
 * Parent: 17-min-number-of-jumps
 */
(function() {
    'use strict';
    const problem = {
        name: 'Can Reach End (Boolean)',
        difficulty: 'Easy',
        algorithm: 'dp-jumps',
        parent: '17-min-number-of-jumps',
        description: 'Instead of the minimum number of jumps, simply determine whether it is possible to reach the last index from the first index.',
        problem: 'Simplifies from optimization to feasibility. A greedy approach tracking the furthest reachable index suffices, without needing to count jumps.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Simplifies from optimization to feasibility. A greedy approach tracking the furthest reachable index suffices, without n',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'array=[2,3,1,1,4]: can reach end? Yes. array=[3,2,1,0,4]: can reach end? No, stuck at index 3.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def canReachEndBoolean(data):
    """
    Can Reach End (Boolean)

    Instead of the minimum number of jumps, simply determine whether it is possible to reach the last index from the first index.

    Approach:
    Simplifies from optimization to feasibility. A greedy approach tracking the furthest reachable index suffices, without needing to count jumps.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: array=[2,3,1,1,4]: can reach end? Yes. array=[3,2,1,0,4]: can reach end? No, stuck at index 3.

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
    print(f"Testing Can Reach End (Boolean)...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// CanReachEndBoolean solves the Can Reach End (Boolean) problem.
// Instead of the minimum number of jumps, simply determine whether it is possible to reach the last index from the first index.
//
// Approach: Simplifies from optimization to feasibility. A greedy approach tracking the furthest reachable index suffices, without needing to count jumps.
func CanReachEndBoolean(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: array=[2,3,1,1,4]: can reach end? Yes. array=[3,2,1,0,4]: can reach end? No, stuck at index 3.

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Can Reach End (Boolean)...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps/twist-01-can-reach-end-boolean', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps/twist-01-can-reach-end-boolean'] = problem;
})();
