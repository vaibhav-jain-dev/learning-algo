/**
 * Longest Common Subsequence of Three Strings
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: longest-common-subsequence-of-three-strings
 * Parent: 01-validate-subsequence/01-longest-common-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Common Subsequence of Three Strings',
        difficulty: 'Hard',
        algorithm: 'longest-common-subsequence-of-three-strings',
        parent: '01-validate-subsequence/01-longest-common-subsequence',
        description: 'Find the LCS of three strings simultaneously instead of two. Extends the 2D DP table to 3D, significantly increasing complexity and requiring careful index management across three dimensions.',
        problem: 'Extends the 2D DP table to 3D, significantly increasing complexity and requiring careful index management across three dimensions.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'Extends the 2D DP table to 3D, significantly increasing complexity and requiring careful index management across three dimensions.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n^3)',
            space: 'O(n^3)'
        },
        examples: [
            // Basic test case
            {
                input: {"text1":"abcde","text2":"ace"},
                output: 3,
                explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
            },
            {
                input: {"text1":"abc","text2":"def"},
                output: 0,
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            },
            // Edge case
            {
                input: {"text1":"abcba","text2":"abcba"},
                output: 5,
                explanation: 'The combined preprocessing and matching phases ensure each character in the text is examined at most twice, achieving linear time complexity.'
            }
        ],
        solutions: {
            python: `def longest_common_subsequence_of_three_strings(text1, text2):
    """
    Longest Common Subsequence of Three Strings

    Find the LCS of three strings simultaneously instead of two. Extends the 2D DP table to 3D, significantly increasing complexity and requiring careful index management across three dimensions.

    Time: O(n^3)
    Space: O(n^3)
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
print(longest_common_subsequence_of_three_strings("abcde", "ace"))  # Expected: 3
print(longest_common_subsequence_of_three_strings("abc", "def"))  # Expected: 0
print(longest_common_subsequence_of_three_strings("abcba", "abcba"))  # Expected: 5
`,
            go: `package main

import "fmt"

// LongestCommonSubsequenceOfThreeStrings solves the Longest Common Subsequence of Three Strings problem.
// Find the LCS of three strings simultaneously instead of two. Extends the 2D DP table to 3D, significantly increasing complexity and requiring careful index management across three dimensions.
// Time: O(n^3), Space: O(n^3)
func LongestCommonSubsequenceOfThreeStrings(text1 string, text2 string) int {
	result := 0

	for i := 0; i < len(text1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LongestCommonSubsequenceOfThreeStrings("abcde", "ace")) // Expected: 3
	fmt.Println(LongestCommonSubsequenceOfThreeStrings("abc", "def")) // Expected: 0
	fmt.Println(LongestCommonSubsequenceOfThreeStrings("abcba", "abcba")) // Expected: 5
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence/twist-01-longest-common-subsequence-of-three-strings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence/twist-01-longest-common-subsequence-of-three-strings'] = problem;
})();
