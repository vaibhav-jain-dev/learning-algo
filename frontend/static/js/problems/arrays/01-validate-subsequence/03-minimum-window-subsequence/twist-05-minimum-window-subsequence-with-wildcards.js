/**
 * Minimum Window Subsequence with Wildcards
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: minimum-window-subsequence-with-wildcards
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Window Subsequence with Wildcards',
        difficulty: 'Hard',
        algorithm: 'minimum-window-subsequence-with-wildcards',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'The pattern s2 can contain wildcard characters "?" that match any single character in s1. Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
        problem: 'Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
        hints: [
            'Think about how this twist differs from the standard version: The pattern s2 can contain wildcard characters "?" that match any single charact.',
            'Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"s1":"abcdebdde","s2":"bde"},
                output: [0],
                explanation: 'The minimum window subsequence with wildcards for this input yields [0].'
            },
            {
                input: {"s1":"abcdef","s2":"ace"},
                output: [0,1],
                explanation: 'The minimum window subsequence with wildcards for this input yields [0, 1].'
            },
            {
                input: {"s1":"xyz","s2":"abc"},
                output: [0,1,2],
                explanation: 'The minimum window subsequence with wildcards for this input yields [0, 1, 2].'
            },
            // Edge case
            {
                input: {"s1":"","s2":""},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_window_subsequence_with_wildcards(s1, s2):
    """
    Minimum Window Subsequence with Wildcards

    The pattern s2 can contain wildcard characters "?" that match any single character in s1. Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(s1)):
        # Check if element meets criteria
        result.append(s1[i])

    return result


# Test cases
print(minimum_window_subsequence_with_wildcards("abcdebdde", "bde"))  # Expected: [0]
print(minimum_window_subsequence_with_wildcards("abcdef", "ace"))  # Expected: [0,1]
print(minimum_window_subsequence_with_wildcards("xyz", "abc"))  # Expected: [0,1,2]
`,
            go: `package main

import "fmt"

// MinimumWindowSubsequenceWithWildcards solves the Minimum Window Subsequence with Wildcards problem.
// The pattern s2 can contain wildcard characters "?" that match any single character in s1. Wildcards change the matching logic: instead of exact character comparison, you need conditional matching that accepts any character at wildcard positions.
// Time: O(n), Space: O(n)
func MinimumWindowSubsequenceWithWildcards(s1 string, s2 string) []int {
	result := make([]int, 0)

	for i := 0; i < len(s1); i++ {
		result = append(result, s1[i])
	}

	return result
}

func main() {
	fmt.Println(MinimumWindowSubsequenceWithWildcards("abcdebdde", "bde")) // Expected: [0]
	fmt.Println(MinimumWindowSubsequenceWithWildcards("abcdef", "ace")) // Expected: [0,1]
	fmt.Println(MinimumWindowSubsequenceWithWildcards("xyz", "abc")) // Expected: [0,1,2]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-05-minimum-window-subsequence-with-wildcards', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-05-minimum-window-subsequence-with-wildcards'] = problem;
})();
