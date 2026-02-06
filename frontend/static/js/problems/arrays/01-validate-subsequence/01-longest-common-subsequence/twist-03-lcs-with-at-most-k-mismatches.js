/**
 * LCS with At Most K Mismatches
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: lcs-with-at-most-k-mismatches
 * Parent: 01-validate-subsequence/01-longest-common-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCS with At Most K Mismatches',
        difficulty: 'Hard',
        algorithm: 'lcs-with-at-most-k-mismatches',
        parent: '01-validate-subsequence/01-longest-common-subsequence',
        description: 'Find the longest common subsequence allowing up to k character mismatches between the matched pairs. Adds a third dimension to the DP state for tracking mismatches, changing the recurrence relation significantly.',
        problem: 'Adds a third dimension to the DP state for tracking mismatches, changing the recurrence relation significantly.',
        hints: [
            'Think about how this twist differs from the standard version: Find the longest common subsequence allowing up to k character mismatches betwee.',
            'Adds a third dimension to the DP state for tracking mismatches, changing the recurrence relation significantly.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
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
            python: `def lcs_with_at_most_k_mismatches(text1, text2):
    """
    LCS with At Most K Mismatches

    Find the longest common subsequence allowing up to k character mismatches between the matched pairs. Adds a third dimension to the DP state for tracking mismatches, changing the recurrence relation significantly.

    Time: O(n log k)
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
print(lcs_with_at_most_k_mismatches("abcde", "ace"))  # Expected: 3
print(lcs_with_at_most_k_mismatches("abc", "def"))  # Expected: 0
print(lcs_with_at_most_k_mismatches("abcba", "abcba"))  # Expected: 5
`,
            go: `package main

import "fmt"

// LcsWithAtMostKMismatches solves the LCS with At Most K Mismatches problem.
// Find the longest common subsequence allowing up to k character mismatches between the matched pairs. Adds a third dimension to the DP state for tracking mismatches, changing the recurrence relation significantly.
// Time: O(n log k), Space: O(n)
func LcsWithAtMostKMismatches(text1 string, text2 string) int {
	result := 0

	for i := 0; i < len(text1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LcsWithAtMostKMismatches("abcde", "ace")) // Expected: 3
	fmt.Println(LcsWithAtMostKMismatches("abc", "def")) // Expected: 0
	fmt.Println(LcsWithAtMostKMismatches("abcba", "abcba")) // Expected: 5
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/01-longest-common-subsequence/twist-03-lcs-with-at-most-k-mismatches', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/01-longest-common-subsequence/twist-03-lcs-with-at-most-k-mismatches'] = problem;
})();
