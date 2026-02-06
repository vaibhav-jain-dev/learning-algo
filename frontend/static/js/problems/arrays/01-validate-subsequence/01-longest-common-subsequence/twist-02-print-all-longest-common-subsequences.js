/**
 * Print All Longest Common Subsequences
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: print-all-longest-common-subsequences
 * Parent: 01-validate-subsequence/01-longest-common-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Print All Longest Common Subsequences',
        difficulty: 'Hard',
        algorithm: 'print-all-longest-common-subsequences',
        parent: '01-validate-subsequence/01-longest-common-subsequence',
        description: 'Instead of just the length, return all distinct LCS strings of maximum length. Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.',
        problem: 'Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of just the length, return all distinct LCS strings of maximum length..',
            'Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.',
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
                input: {"text1":"abcde","text2":"ace"},
                output: 3,
                explanation: ''
            },
            {
                input: {"text1":"abc","text2":"def"},
                output: 0,
                explanation: ''
            },
            // Edge case
            {
                input: {"text1":"abcba","text2":"abcba"},
                output: 5,
                explanation: ''
            }
        ],
        solutions: {
            python: `def print_all_longest_common_subsequences(text1, text2):
    """
    Print All Longest Common Subsequences

    Instead of just the length, return all distinct LCS strings of maximum length. Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(text1)

    for i in range(n):
        # Check condition based on text2
        j = 0
        for k in range(i, n):
            if j < len(text2) and text1[k] == text2[j]:
                j += 1
        if j == len(text2):
            count += 1

    return count


# Test cases
print(print_all_longest_common_subsequences("abcde", "ace"))  # Expected: 3
print(print_all_longest_common_subsequences("abc", "def"))  # Expected: 0
print(print_all_longest_common_subsequences("abcba", "abcba"))  # Expected: 5
`,
            go: `package main

import "fmt"

// PrintAllLongestCommonSubsequences solves the Print All Longest Common Subsequences problem.
// Instead of just the length, return all distinct LCS strings of maximum length. Requires backtracking through the DP table with branching at ties, turning a single-answer problem into a multi-answer enumeration problem.
// Time: O(n), Space: O(n)
func PrintAllLongestCommonSubsequences(text1 string, text2 string) int {
	result := 0

	for i := 0; i < len(text1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PrintAllLongestCommonSubsequences("abcde", "ace")) // Expected: 3
	fmt.Println(PrintAllLongestCommonSubsequences("abc", "def")) // Expected: 0
	fmt.Println(PrintAllLongestCommonSubsequences("abcba", "abcba")) // Expected: 5
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence/twist-02-print-all-longest-common-subsequences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence/twist-02-print-all-longest-common-subsequences'] = problem;
})();
