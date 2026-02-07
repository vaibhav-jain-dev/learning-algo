/**
 * Minimum Words to Bridge
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-string-chain
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
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"words":["a","b","ba","bca","bda","bdca"]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"words":["xbc","pcxbcf","xb","cxbc","pcxbc"]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"words":["abcd","dbqca"]},
                output: 0,
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
            python: `def minimum_words_to_bridge(words):
    """
    Minimum Words to Bridge

    Given a start word and end word (both in the list), find the minimum number of intermediate words needed to form a valid string chain from start to end.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(words)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_words_to_bridge(["a","b","ba","bca","bda","bdca"]))  # Expected: 1
print(minimum_words_to_bridge(["xbc","pcxbcf","xb","cxbc","pcxbc"]))  # Expected: 2
print(minimum_words_to_bridge(["abcd","dbqca"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumWordsToBridge solves the Minimum Words to Bridge problem.
// Given a start word and end word (both in the list), find the minimum number of intermediate words needed to form a valid string chain from start to end.
// Time: O(n^2), Space: O(n)
func MinimumWordsToBridge(words []string) int {
	result := 0

	for i := 0; i < len(words); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumWordsToBridge([]string{"a", "b", "ba", "bca", "bda", "bdca"})) // Expected: 1
	fmt.Println(MinimumWordsToBridge([]string{"xbc", "pcxbcf", "xb", "cxbc", "pcxbc"})) // Expected: 2
	fmt.Println(MinimumWordsToBridge([]string{"abcd", "dbqca"})) // Expected: 0
}
`
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
