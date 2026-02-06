/**
 * Minimum Window Subsequence in Circular String
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: minimum-window-subsequence-in-circular-string
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Window Subsequence in Circular String',
        difficulty: 'Very Hard',
        algorithm: 'minimum-window-subsequence-in-circular-string',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'The string s1 is circular. Find the minimum window where s2 is a subsequence, allowing wrap-around. The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.',
        problem: 'The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.',
        hints: [
            'Think about how this twist differs from the standard version: The string s1 is circular. Find the minimum window where s2 is a subsequence, al.',
            'The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.',
            'For circular structures, consider concatenating the data with itself or using modular arithmetic.',
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
                output: "bcde",
                explanation: ''
            },
            {
                input: {"s1":"abcdef","s2":"ace"},
                output: "abcde",
                explanation: ''
            },
            // Edge case
            {
                input: {"s1":"xyz","s2":"abc"},
                output: "",
                explanation: ''
            }
        ],
        solutions: {
            python: `def minimum_window_subsequence_in_circular_string(s1, s2):
    """
    Minimum Window Subsequence in Circular String

    The string s1 is circular. Find the minimum window where s2 is a subsequence, allowing wrap-around. The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.

    Time: O(n)
    Space: O(n)
    """
    n = len(s1)
    m = len(s2)
    doubled = s1 + s1
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == s2[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(minimum_window_subsequence_in_circular_string("abcdebdde", "bde"))  # Expected: "bcde"
print(minimum_window_subsequence_in_circular_string("abcdef", "ace"))  # Expected: "abcde"
print(minimum_window_subsequence_in_circular_string("xyz", "abc"))  # Expected: ""
`,
            go: `package main

import "fmt"

// MinimumWindowSubsequenceInCircularString solves the Minimum Window Subsequence in Circular String problem.
// The string s1 is circular. Find the minimum window where s2 is a subsequence, allowing wrap-around. The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.
// Time: O(n), Space: O(n)
func MinimumWindowSubsequenceInCircularString(s1 string, s2 string) int {
	n := len(s1)
	m := len(s2)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if s1[i%n] == s2[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(MinimumWindowSubsequenceInCircularString("abcdebdde", "bde")) // Expected: "bcde"
	fmt.Println(MinimumWindowSubsequenceInCircularString("abcdef", "ace")) // Expected: "abcde"
	fmt.Println(MinimumWindowSubsequenceInCircularString("xyz", "abc")) // Expected: ""
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-03-minimum-window-subsequence-in-circular-string', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-03-minimum-window-subsequence-in-circular-string'] = problem;
})();
