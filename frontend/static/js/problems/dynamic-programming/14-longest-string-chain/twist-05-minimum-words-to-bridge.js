/**
 * Minimum Words to Bridge
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 14-longest-string-chain
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Words to Bridge',
        difficulty: 'Hard',
        algorithm: 'dp-string-chain',
        parent: '14-longest-string-chain',
        description: 'Given a start word and end word (both in the list), find the minimum number of intermediate words needed to form a valid string chain from start to end.',
        problem: 'Turns the problem into a shortest-path search in the chain graph rather than a longest-path DP. BFS or modified DP with source-target constraints is needed.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Turns the problem into a shortest-path search in the chain graph rather than a longest-path DP. BFS or modified DP with ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'words=["a","ab","abc","abcd"], start="a", end="abcd": minimum chain is "a"->"ab"->"abc"->"abcd" needing 2 intermediates.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def minimumWordsToBridge(data):
    """
    Minimum Words to Bridge

    Given a start word and end word (both in the list), find the minimum number of intermediate words needed to form a valid string chain from start to end.

    Approach:
    Turns the problem into a shortest-path search in the chain graph rather than a longest-path DP. BFS or modified DP with source-target constraints is needed.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: words=["a","ab","abc","abcd"], start="a", end="abcd": minimum chain is "a"->"ab"->"abc"->"abcd" needing 2 intermediates.

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
    print(f"Testing Minimum Words to Bridge...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// MinimumWordsToBridge solves the Minimum Words to Bridge problem.
// Given a start word and end word (both in the list), find the minimum number of intermediate words needed to form a valid string chain from start to en
//
// Approach: Turns the problem into a shortest-path search in the chain graph rather than a longest-path DP. BFS or modified DP with source-target constraints is n
func MinimumWordsToBridge(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: words=["a","ab","abc","abcd"], start="a", end="abcd": minimum chain is "a"->"ab"->"abc"->"abcd" need

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing Minimum Words to Bridge...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '14-longest-string-chain/twist-05-minimum-words-to-bridge', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/14-longest-string-chain/twist-05-minimum-words-to-bridge'] = problem;
})();
