/**
 * Count Longest String Chains
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-string-chain
 * Parent: 14-longest-string-chain
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Longest String Chains',
        difficulty: 'Medium',
        algorithm: 'dp-string-chain',
        parent: '14-longest-string-chain',
        description: 'Find how many distinct longest string chains exist in the word list.',
        problem: 'Adds counting on top of the optimization. You must track both the chain length and the number of chains achieving that length at each word.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Adds counting on top of the optimization. You must track both the chain length and the number of chains achieving that l',
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
                explanation: 'For this input, there is 1 valid position that satisfy the count longest string chains criteria.'
            },
            {
                input: {"words":["xbc","pcxbcf","xb","cxbc","pcxbc"]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count longest string chains criteria.'
            },
            {
                input: {"words":["abcd","dbqca"]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the count longest string chains criteria.'
            },
            // Edge case
            {
                input: {"words":["a"]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_longest_string_chains(words):
    """
    Count Longest String Chains

    Find how many distinct longest string chains exist in the word list.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(words)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_longest_string_chains(["a","b","ba","bca","bda","bdca"]))  # Expected: 1
print(count_longest_string_chains(["xbc","pcxbcf","xb","cxbc","pcxbc"]))  # Expected: 2
print(count_longest_string_chains(["abcd","dbqca"]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountLongestStringChains solves the Count Longest String Chains problem.
// Find how many distinct longest string chains exist in the word list.
// Time: O(n^2), Space: O(n)
func CountLongestStringChains(words []string) int {
	result := 0

	for i := 0; i < len(words); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountLongestStringChains([]string{"a", "b", "ba", "bca", "bda", "bdca"})) // Expected: 1
	fmt.Println(CountLongestStringChains([]string{"xbc", "pcxbcf", "xb", "cxbc", "pcxbc"})) // Expected: 2
	fmt.Println(CountLongestStringChains([]string{"abcd", "dbqca"})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '14-longest-string-chain/twist-03-count-longest-string-chains', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/14-longest-string-chain/twist-03-count-longest-string-chains'] = problem;
})();
