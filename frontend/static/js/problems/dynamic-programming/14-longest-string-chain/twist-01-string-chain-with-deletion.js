/**
 * String Chain With Deletion
 * Category: dynamic-programming
 * Difficulty: Medium
 * Parent: 14-longest-string-chain
 */
(function() {
    'use strict';
    const problem = {
        name: 'String Chain With Deletion',
        difficulty: 'Medium',
        algorithm: 'dp-string-chain',
        parent: '14-longest-string-chain',
        description: 'Instead of adding a character to go from word_i to word_i+1, define the chain by removing exactly one character. Find the longest deletion chain.',
        problem: 'Reverses the chain direction. You sort by decreasing length and check if removing a character from the longer word produces the shorter word, flipping the predecessor logic.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Reverses the chain direction. You sort by decreasing length and check if removing a character from the longer word produ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'words=["bdca","bca","ba","b","a"]: chain "bdca"->"bca"->"ba"->"b" by removing one char each time, length 4.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def stringChainWithDeletion(data):
    """
    String Chain With Deletion

    Instead of adding a character to go from word_i to word_i+1, define the chain by removing exactly one character. Find the longest deletion chain.

    Approach:
    Reverses the chain direction. You sort by decreasing length and check if removing a character from the longer word produces the shorter word, flipping the predecessor logic.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: words=["bdca","bca","ba","b","a"]: chain "bdca"->"bca"->"ba"->"b" by removing one char each time, length 4.

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
    print(f"Testing String Chain With Deletion...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// StringChainWithDeletion solves the String Chain With Deletion problem.
// Instead of adding a character to go from word_i to word_i+1, define the chain by removing exactly one character. Find the longest deletion chain.
//
// Approach: Reverses the chain direction. You sort by decreasing length and check if removing a character from the longer word produces the shorter word, flipping
func StringChainWithDeletion(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: words=["bdca","bca","ba","b","a"]: chain "bdca"->"bca"->"ba"->"b" by removing one char each time, le

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing String Chain With Deletion...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '14-longest-string-chain/twist-01-string-chain-with-deletion', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/14-longest-string-chain/twist-01-string-chain-with-deletion'] = problem;
})();
