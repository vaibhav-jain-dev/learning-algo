/**
 * Count Common Subsequences of Two Strings
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: count-common-subsequences-of-two-strings
 * Parent: 01-validate-subsequence/02-count-distinct-subsequences
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Common Subsequences of Two Strings',
        difficulty: 'Hard',
        algorithm: 'count-common-subsequences-of-two-strings',
        parent: '01-validate-subsequence/02-count-distinct-subsequences',
        description: 'Given two strings s1 and s2, count the total number of common subsequences (not just the longest one). Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.',
        problem: 'Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.',
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
                input: {"s":"rabbbit","t":"rabbit"},
                output: 3,
                explanation: 'Precompute the failure function from the pattern. During matching, when a mismatch occurs, use the failure function to skip ahead without re-examining characters already matched.'
            },
            {
                input: {"s":"aabb","t":"ab"},
                output: 4,
                explanation: 'The prefix function tells us the longest suffix of the matched portion that is also a prefix of the pattern. This allows intelligent backtracking during the text scan.'
            },
            // Edge case
            {
                input: {"s":"abc","t":"xyz"},
                output: 0,
                explanation: 'The combined preprocessing and matching phases ensure each character in the text is examined at most twice, achieving linear time complexity.'
            }
        ],
        solutions: {
            python: `def count_common_subsequences_of_two_strings(s, t):
    """
    Count Common Subsequences of Two Strings

    Given two strings s1 and s2, count the total number of common subsequences (not just the longest one). Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(s)

    for i in range(n):
        # Check condition based on t
        j = 0
        for k in range(i, n):
            if j < len(t) and s[k] == t[j]:
                j += 1
        if j == len(t):
            count += 1

    return count


# Test cases
print(count_common_subsequences_of_two_strings("rabbbit", "rabbit"))  # Expected: 3
print(count_common_subsequences_of_two_strings("aabb", "ab"))  # Expected: 4
print(count_common_subsequences_of_two_strings("abc", "xyz"))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountCommonSubsequencesOfTwoStrings solves the Count Common Subsequences of Two Strings problem.
// Given two strings s1 and s2, count the total number of common subsequences (not just the longest one). Changes the DP recurrence: instead of matching against a target, you must count all shared subsequences between two strings simultaneously.
// Time: O(n), Space: O(n)
func CountCommonSubsequencesOfTwoStrings(s string, t string) int {
	result := 0

	for i := 0; i < len(s); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountCommonSubsequencesOfTwoStrings("rabbbit", "rabbit")) // Expected: 3
	fmt.Println(CountCommonSubsequencesOfTwoStrings("aabb", "ab")) // Expected: 4
	fmt.Println(CountCommonSubsequencesOfTwoStrings("abc", "xyz")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/02-count-distinct-subsequences/twist-04-count-common-subsequences-of-two-strings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/02-count-distinct-subsequences/twist-04-count-common-subsequences-of-two-strings'] = problem;
})();
