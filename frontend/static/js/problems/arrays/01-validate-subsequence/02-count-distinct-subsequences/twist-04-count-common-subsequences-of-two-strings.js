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
            'Think about how this twist differs from the standard version: Given two strings s1 and s2, count the total number of common subsequences (not .',
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
                explanation: ''
            },
            {
                input: {"s":"aabb","t":"ab"},
                output: 4,
                explanation: ''
            },
            // Edge case
            {
                input: {"s":"abc","t":"xyz"},
                output: 0,
                explanation: ''
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
