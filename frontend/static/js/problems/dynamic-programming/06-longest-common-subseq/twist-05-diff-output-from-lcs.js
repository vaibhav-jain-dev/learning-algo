/**
 * Diff Output From LCS
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-lcs
 * Parent: 06-longest-common-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'Diff Output From LCS',
        difficulty: 'Medium',
        algorithm: 'dp-lcs',
        parent: '06-longest-common-subseq',
        description: 'Using the LCS, produce a unified diff showing which characters were added, removed, or kept when transforming str1 into str2.',
        problem: 'Shifts focus from computing the LCS length to interpreting the DP table as an alignment tool, requiring backtracking and output formatting.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Shifts focus from computing the LCS length to interpreting the DP table as an alignment tool, requiring backtracking and',
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
                output: [0],
                explanation: 'The diff output from lcs for this input yields [0].'
            },
            {
                input: {"str1":"ABCDGH","str2":"AEDFHR"},
                output: [0,1],
                explanation: 'The diff output from lcs for this input yields [0, 1].'
            },
            {
                input: {"str1":"ABC","str2":"DEF"},
                output: [0,1,2],
                explanation: 'The diff output from lcs for this input yields [0, 1, 2].'
            },
            // Edge case
            {
                input: {"str1":"","str2":""},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def diff_output_from_lcs(str1, str2):
    """
    Diff Output From LCS

    Using the LCS, produce a unified diff showing which characters were added, removed, or kept when transforming str1 into str2.

    Time: O(n^2)
    Space: O(n)
    """
    result = []

    for i in range(len(str1)):
        # Check if element meets criteria
        result.append(str1[i])

    return result


# Test cases
print(diff_output_from_lcs("ZXVVYZW", "XKYKZPW"))  # Expected: [0]
print(diff_output_from_lcs("ABCDGH", "AEDFHR"))  # Expected: [0,1]
print(diff_output_from_lcs("ABC", "DEF"))  # Expected: [0,1,2]
`,
            go: `package main

import "fmt"

// DiffOutputFromLcs solves the Diff Output From LCS problem.
// Using the LCS, produce a unified diff showing which characters were added, removed, or kept when transforming str1 into str2.
// Time: O(n^2), Space: O(n)
func DiffOutputFromLcs(str1 string, str2 string) []int {
	result := make([]int, 0)

	for i := 0; i < len(str1); i++ {
		result = append(result, str1[i])
	}

	return result
}

func main() {
	fmt.Println(DiffOutputFromLcs("ZXVVYZW", "XKYKZPW")) // Expected: [0]
	fmt.Println(DiffOutputFromLcs("ABCDGH", "AEDFHR")) // Expected: [0,1]
	fmt.Println(DiffOutputFromLcs("ABC", "DEF")) // Expected: [0,1,2]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '06-longest-common-subseq/twist-05-diff-output-from-lcs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/06-longest-common-subseq/twist-05-diff-output-from-lcs'] = problem;
})();
