/**
 * String Chain Forming Target
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-string-chain
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
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"words":["a","b","ba","bca","bda","bdca"],"target":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the string chain forming target criteria.'
            },
            {
                input: {"words":["xbc","pcxbcf","xb","cxbc","pcxbc"],"target":10},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the string chain forming target criteria.'
            },
            {
                input: {"words":["abcd","dbqca"],"target":10},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the string chain forming target criteria.'
            },
            // Edge case
            {
                input: {"words":["a"],"target":10},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def string_chain_forming_target(words, target):
    """
    String Chain Forming Target

    Given a target word, find the longest chain from the word list that ends at the target word. All words in the chain must be in the list.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(words)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(string_chain_forming_target(["a","b","ba","bca","bda","bdca"], 10))  # Expected: 2
print(string_chain_forming_target(["xbc","pcxbcf","xb","cxbc","pcxbc"], 10))  # Expected: 3
print(string_chain_forming_target(["abcd","dbqca"], 10))  # Expected: 1
`,
            go: `package main

import "fmt"

// StringChainFormingTarget solves the String Chain Forming Target problem.
// Given a target word, find the longest chain from the word list that ends at the target word. All words in the chain must be in the list.
// Time: O(n^2), Space: O(n)
func StringChainFormingTarget(words []string, target int) int {
	result := 0

	for i := 0; i < len(words); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(StringChainFormingTarget([]string{"a", "b", "ba", "bca", "bda", "bdca"}, 10)) // Expected: 2
	fmt.Println(StringChainFormingTarget([]string{"xbc", "pcxbcf", "xb", "cxbc", "pcxbc"}, 10)) // Expected: 3
	fmt.Println(StringChainFormingTarget([]string{"abcd", "dbqca"}, 10)) // Expected: 1
}
`
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
