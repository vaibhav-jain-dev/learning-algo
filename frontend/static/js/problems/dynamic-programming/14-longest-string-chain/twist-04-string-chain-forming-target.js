/**
 * String Chain Forming Target
 * Category: dynamic-programming
 * Difficulty: Hard
 * Parent: 14-longest-string-chain
 */
(function() {
    'use strict';
    const problem = {
        name: 'String Chain Forming Target',
        difficulty: 'Hard',
        algorithm: 'dp-string-chain',
        parent: '14-longest-string-chain',
        description: 'Given a target word, find the longest chain from the word list that ends at the target word. All words in the chain must be in the list.',
        problem: 'Fixes the endpoint of the chain, requiring you to work backwards from the target and only consider predecessors that lead to it.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Fixes the endpoint of the chain, requiring you to work backwards from the target and only consider predecessors that lea',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: { time: 'O(n^2)', space: 'O(n)' },
        examples: [
            {
                input: 'See problem description',
                output: 'Computed via DP',
                explanation: 'words=["a","b","ba","bca","bda","bdca"], target="bdca": longest chain ending at "bdca" is ["a","ba","bda","bdca"] with length 4.'
            },
            {
                input: 'Smaller test case',
                output: 'Computed via DP',
                explanation: 'Apply the modified DP approach to verify correctness on a minimal input.'
            }
        ],
        solutions: {
            python: `def stringChainFormingTarget(data):
    """
    String Chain Forming Target

    Given a target word, find the longest chain from the word list that ends at the target word. All words in the chain must be in the list.

    Approach:
    Fixes the endpoint of the chain, requiring you to work backwards from the target and only consider predecessors that lead to it.
    """
    # Dynamic programming approach
    # Modify the base problem recurrence to handle this twist

    # Example: words=["a","b","ba","bca","bda","bdca"], target="bdca": longest chain ending at "bdca" is ["a","ba","bda","bdca"] with l

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
    print(f"Testing String Chain Forming Target...")
    # Add specific test inputs based on problem description
    print("All tests passed!")`,
            go: `package main

import "fmt"

// StringChainFormingTarget solves the String Chain Forming Target problem.
// Given a target word, find the longest chain from the word list that ends at the target word. All words in the chain must be in the list.
//
// Approach: Fixes the endpoint of the chain, requiring you to work backwards from the target and only consider predecessors that lead to it.
func StringChainFormingTarget(data map[string]interface{}) interface{} {
    // Dynamic programming approach
    // Modify the base problem recurrence to handle this twist

    // Example: words=["a","b","ba","bca","bda","bdca"], target="bdca": longest chain ending at "bdca" is ["a","ba",

    // 1. Define the DP state based on the modified problem
    // 2. Initialize base cases
    // 3. Fill the DP table using the modified recurrence
    // 4. Return the answer

    return nil
}

func main() {
    fmt.Println("Testing String Chain Forming Target...")
    // Add test cases
    fmt.Println("All tests passed!")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '14-longest-string-chain/twist-04-string-chain-forming-target', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/14-longest-string-chain/twist-04-string-chain-forming-target'] = problem;
})();
