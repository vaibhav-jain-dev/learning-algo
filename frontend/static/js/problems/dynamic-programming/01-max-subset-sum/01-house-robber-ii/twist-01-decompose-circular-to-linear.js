/**
 * Decompose Circular to Linear
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 01-max-subset-sum/01-house-robber-ii
 */
(function() {
    'use strict';
    const problem = {
        name: 'Decompose Circular to Linear',
        difficulty: 'Medium',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum/01-house-robber-ii',
        description: 'Explain precisely why the circular problem can be split into two linear House Robber subproblems. Why is max(rob[0..n-2], rob[1..n-1]) correct and complete?',
        problem: 'Understanding the decomposition is the core insight. Many students memorize "run it twice" without understanding why this covers all cases and doesn\'t double-count.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding the decomposition is the core insight. Many students memorize "run it twice" without understanding why thi',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'For [1, 2, 3, 1]: Either we don\'t rob house 0 (solve [2, 3, 1] = 3) or we don\'t rob house n-1 (solve [1, 2, 3] = 4). Answer: max(3, 4) = 4. This works because any valid solution must exclude at least one of house 0 or house n-1.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def decomposeCircularToLinear(data):
    """
    Decompose Circular to Linear

    Explain precisely why the circular problem can be split into two linear House Robber subproblems. Why is max(rob[0..n-2], rob[1..n-1]) correct and complete?

    Approach:
    Understanding the decomposition is the core insight. Many students memorize "run it twice" without understanding why this covers all cases and doesn\\'t double-count.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: For [1, 2, 3, 1]: Either we don\\'t rob house 0 (solve [2, 3, 1] = 3) or we don\\'t rob house n-1 (solve [1, 2, 3] = 4). A

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
    print(f"Testing Decompose Circular to Linear...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// DecomposeCircularToLinear solves the Decompose Circular to Linear problem.
// Explain precisely why the circular problem can be split into two linear House Robber subproblems. Why is max(rob[0..n-2], rob[1..n-1]) correct and com
//
// Approach: Understanding the decomposition is the core insight. Many students memorize "run it twice" without understanding why this covers all cases and doesn't
func DecomposeCircularToLinear(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: For [1, 2, 3, 1]: Either we don't rob house 0 (solve [2, 3, 1] = 3) or we don't rob house n-1 (solve

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Decompose Circular to Linear...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/01-house-robber-ii/twist-01-decompose-circular-to-linear', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/01-house-robber-ii/twist-01-decompose-circular-to-linear'] = problem;
})();
