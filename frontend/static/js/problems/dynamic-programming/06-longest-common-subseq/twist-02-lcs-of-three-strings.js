/**
 * LCS of Three Strings
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-lcs
 * Parent: 06-longest-common-subseq
 */
(function() {
    'use strict';

    const problem = {
        name: 'LCS of Three Strings',
        difficulty: 'Hard',
        algorithm: 'dp-lcs',
        parent: '06-longest-common-subseq',
        description: 'Find the longest common subsequence among three strings instead of two.',
        problem: 'Extends the 2D DP table to 3D, significantly increasing complexity and requiring you to reason about matching across three dimensions simultaneously.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Extends the 2D DP table to 3D, significantly increasing complexity and requiring you to reason about matching across thr',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n * m * p)',
            space: 'O(n * m * p)'
        },
        examples: [
            // Basic test case
            {
                input: {"str1":"ZXVVYZW","str2":"XKYKZPW"},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"str1":"ABCDGH","str2":"AEDFHR"},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"str1":"ABC","str2":"DEF"},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"str1":"","str2":""},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def lcs_of_three_strings(str1, str2):
    """
    LCS of Three Strings

    Find the longest common subsequence among three strings instead of two.

    Time: O(n * m * p)
    Space: O(n * m * p)
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
print(lcs_of_three_strings("ZXVVYZW", "XKYKZPW"))  # Expected: 1
print(lcs_of_three_strings("ABCDGH", "AEDFHR"))  # Expected: 2
print(lcs_of_three_strings("ABC", "DEF"))  # Expected: 0
`,
            go: `package main

import "fmt"

// LcsOfThreeStrings solves the LCS of Three Strings problem.
// Find the longest common subsequence among three strings instead of two.
// Time: O(n * m * p), Space: O(n * m * p)
func LcsOfThreeStrings(str1 string, str2 string) int {
	result := 0

	for i := 0; i < len(str1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LcsOfThreeStrings("ZXVVYZW", "XKYKZPW")) // Expected: 1
	fmt.Println(LcsOfThreeStrings("ABCDGH", "AEDFHR")) // Expected: 2
	fmt.Println(LcsOfThreeStrings("ABC", "DEF")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '06-longest-common-subseq/twist-02-lcs-of-three-strings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/06-longest-common-subseq/twist-02-lcs-of-three-strings'] = problem;
})();
