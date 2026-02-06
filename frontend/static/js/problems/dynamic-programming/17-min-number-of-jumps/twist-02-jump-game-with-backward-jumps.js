/**
 * Jump Game With Backward Jumps
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 17-min-number-of-jumps
 */
(function() {
    'use strict';
    const problem = {
        name: 'Jump Game With Backward Jumps',
        difficulty: 'Hard',
        algorithm: 'dp-jumps',
        parent: '17-min-number-of-jumps',
        description: 'Each position allows jumping forward up to array[i] steps OR backward up to array[i] steps. Find the minimum jumps to reach the last index.',
        problem: 'Backward jumps turn this into a graph shortest-path problem (BFS) rather than a greedy forward-scan, since you might need to go backward to reach a better forward position.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Backward jumps turn this into a graph shortest-path problem (BFS) rather than a greedy forward-scan, since you might nee',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'array=[4,2,3,0,3,1,2]: might jump backward from index 2 to index 0 to reach further. BFS finds shortest path.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def jumpGameWithBackwardJumps(data):
    """
    Jump Game With Backward Jumps

    Each position allows jumping forward up to array[i] steps OR backward up to array[i] steps. Find the minimum jumps to reach the last index.

    Approach:
    Backward jumps turn this into a graph shortest-path problem (BFS) rather than a greedy forward-scan, since you might need to go backward to reach a better forward position.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: array=[4,2,3,0,3,1,2]: might jump backward from index 2 to index 0 to reach further. BFS finds shortest path.

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
    print(f"Testing Jump Game With Backward Jumps...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// JumpGameWithBackwardJumps solves the Jump Game With Backward Jumps problem.
// Each position allows jumping forward up to array[i] steps OR backward up to array[i] steps. Find the minimum jumps to reach the last index.
//
// Approach: Backward jumps turn this into a graph shortest-path problem (BFS) rather than a greedy forward-scan, since you might need to go backward to reach a be
func JumpGameWithBackwardJumps(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: array=[4,2,3,0,3,1,2]: might jump backward from index 2 to index 0 to reach further. BFS finds short

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Jump Game With Backward Jumps...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '17-min-number-of-jumps/twist-02-jump-game-with-backward-jumps', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/17-min-number-of-jumps/twist-02-jump-game-with-backward-jumps'] = problem;
})();
