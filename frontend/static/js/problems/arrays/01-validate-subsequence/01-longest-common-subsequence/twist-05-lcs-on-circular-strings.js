/**
 * LCS on Circular Strings
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: lcs-on-circular-strings
 * Parent: 01-validate-subsequence/01-longest-common-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCS on Circular Strings',
        difficulty: 'Very Hard',
        algorithm: 'lcs-on-circular-strings',
        parent: '01-validate-subsequence/01-longest-common-subsequence',
        description: 'Both strings are circular (the end wraps to the beginning). Find the LCS considering all rotations. You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.',
        problem: 'You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.',
        hints: [
            'What makes this variant different from the standard problem? Identify the key constraint that changes the approach.',
            'You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.',
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
                input: {"text1":"abcde","text2":"ace"},
                output: 3,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            {
                input: {"text1":"abc","text2":"def"},
                output: 0,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            // Edge case
            {
                input: {"text1":"abcba","text2":"abcba"},
                output: 5,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            }
        ],
        solutions: {
            python: `def lcs_on_circular_strings(text1, text2):
    """
    LCS on Circular Strings

    Both strings are circular (the end wraps to the beginning). Find the LCS considering all rotations. You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.

    Time: O(n)
    Space: O(n)
    """
    n = len(text1)
    m = len(text2)
    doubled = text1 + text1
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == text2[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(lcs_on_circular_strings("abcde", "ace"))  # Expected: 3
print(lcs_on_circular_strings("abc", "def"))  # Expected: 0
print(lcs_on_circular_strings("abcba", "abcba"))  # Expected: 5
`,
            go: `package main

import "fmt"

// LcsOnCircularStrings solves the LCS on Circular Strings problem.
// Both strings are circular (the end wraps to the beginning). Find the LCS considering all rotations. You must consider all rotational alignments, turning a single DP computation into potentially O(n) DP computations or requiring a clever concatenation trick.
// Time: O(n), Space: O(n)
func LcsOnCircularStrings(text1 string, text2 string) bool {
	n := len(text1)
	m := len(text2)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if text1[i%n] == text2[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(LcsOnCircularStrings("abcde", "ace")) // Expected: 3
	fmt.Println(LcsOnCircularStrings("abc", "def")) // Expected: 0
	fmt.Println(LcsOnCircularStrings("abcba", "abcba")) // Expected: 5
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence/twist-05-lcs-on-circular-strings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence/twist-05-lcs-on-circular-strings'] = problem;
})();
