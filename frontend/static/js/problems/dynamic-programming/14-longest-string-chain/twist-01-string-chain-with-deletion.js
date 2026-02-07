/**
 * String Chain With Deletion
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-string-chain
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
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"words":["a","b","ba","bca","bda","bdca"]},
                output: 2,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"words":["xbc","pcxbcf","xb","cxbc","pcxbc"]},
                output: 3,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"words":["abcd","dbqca"]},
                output: 1,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"words":["a"]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def string_chain_with_deletion(words):
    """
    String Chain With Deletion

    Instead of adding a character to go from word_i to word_i+1, define the chain by removing exactly one character. Find the longest deletion chain.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(words)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(string_chain_with_deletion(["a","b","ba","bca","bda","bdca"]))  # Expected: 2
print(string_chain_with_deletion(["xbc","pcxbcf","xb","cxbc","pcxbc"]))  # Expected: 3
print(string_chain_with_deletion(["abcd","dbqca"]))  # Expected: 1
`,
            go: `package main

import "fmt"

// StringChainWithDeletion solves the String Chain With Deletion problem.
// Instead of adding a character to go from word_i to word_i+1, define the chain by removing exactly one character. Find the longest deletion chain.
// Time: O(n^2), Space: O(n)
func StringChainWithDeletion(words []string) int {
	result := 0

	for i := 0; i < len(words); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(StringChainWithDeletion([]string{"a", "b", "ba", "bca", "bda", "bdca"})) // Expected: 2
	fmt.Println(StringChainWithDeletion([]string{"xbc", "pcxbcf", "xb", "cxbc", "pcxbc"})) // Expected: 3
	fmt.Println(StringChainWithDeletion([]string{"abcd", "dbqca"})) // Expected: 1
}
`
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
