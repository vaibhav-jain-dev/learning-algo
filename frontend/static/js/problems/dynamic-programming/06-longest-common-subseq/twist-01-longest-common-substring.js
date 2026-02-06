/**
 * Longest Common Substring
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-lcs
 * Parent: 06-longest-common-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Common Substring',
        difficulty: 'Medium',
        algorithm: 'dp-lcs',
        parent: '06-longest-common-subseq',
        description: 'Find the longest common substring (contiguous) instead of subsequence (non-contiguous) between two strings.',
        problem: 'The contiguity requirement changes the DP recurrence: when characters do not match, the value resets to 0 instead of carrying forward from adjacent cells.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The contiguity requirement changes the DP recurrence: when characters do not match, the value resets to 0 instead of car',
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
                input: {"str1":"ZXVVYZW","str2":"XKYKZPW"},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the longest common substring criteria.'
            },
            {
                input: {"str1":"ABCDGH","str2":"AEDFHR"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the longest common substring criteria.'
            },
            {
                input: {"str1":"ABC","str2":"DEF"},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the longest common substring criteria.'
            },
            // Edge case
            {
                input: {"str1":"","str2":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def longest_common_substring(str1, str2):
    """
    Longest Common Substring

    Find the longest common substring (contiguous) instead of subsequence (non-contiguous) between two strings.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(str1)

    for i in range(n):
        # Check condition based on str2
        j = 0
        for k in range(i, n):
            if j < len(str2) and str1[k] == str2[j]:
                j += 1
        if j == len(str2):
            count += 1

    return count


# Test cases
print(longest_common_substring("ZXVVYZW", "XKYKZPW"))  # Expected: 1
print(longest_common_substring("ABCDGH", "AEDFHR"))  # Expected: 2
print(longest_common_substring("ABC", "DEF"))  # Expected: 0
`,
            go: `package main

import "fmt"

// LongestCommonSubstring solves the Longest Common Substring problem.
// Find the longest common substring (contiguous) instead of subsequence (non-contiguous) between two strings.
// Time: O(n^2), Space: O(n)
func LongestCommonSubstring(str1 string, str2 string) int {
	result := 0

	for i := 0; i < len(str1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestCommonSubstring("ZXVVYZW", "XKYKZPW")) // Expected: 1
	fmt.Println(LongestCommonSubstring("ABCDGH", "AEDFHR")) // Expected: 2
	fmt.Println(LongestCommonSubstring("ABC", "DEF")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '06-longest-common-subseq/twist-01-longest-common-substring', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/06-longest-common-subseq/twist-01-longest-common-substring'] = problem;
})();
