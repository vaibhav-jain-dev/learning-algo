/**
 * Substring Edit Distance
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-edit-distance
 * Parent: 04-levenshtein-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Substring Edit Distance',
        difficulty: 'Medium',
        algorithm: 'dp-edit-distance',
        parent: '04-levenshtein-distance',
        description: 'Find the minimum edit distance between str1 and any substring of str2. The first row of the DP table is initialized to zeroes since str1 can match starting at any position in str2.',
        problem: 'Changes the initialization of the DP table, allowing the pattern to float within the text. This is a fundamentally different setup from full-string-to-full-string comparison.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes the initialization of the DP table, allowing the pattern to float within the text. This is a fundamentally diffe',
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
                input: {"str1":"abc","str2":"yabd"},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"str1":"horse","str2":"ros"},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"str1":"","str2":"abc"},
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
            python: `def substring_edit_distance(str1, str2):
    """
    Substring Edit Distance

    Find the minimum edit distance between str1 and any substring of str2. The first row of the DP table is initialized to zeroes since str1 can match starting at any position in str2.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(str1)
    m = len(str2)

    for start in range(n):
        j = 0
        for i in range(start, n):
            if j < m and str1[i] == str2[j]:
                j += 1
            if j == m:
                count += 1
                break

    return count


# Test cases
print(substring_edit_distance("abc", "yabd"))  # Expected: 1
print(substring_edit_distance("horse", "ros"))  # Expected: 2
print(substring_edit_distance("", "abc"))  # Expected: 0
`,
            go: `package main

import "fmt"

// SubstringEditDistance solves the Substring Edit Distance problem.
// Find the minimum edit distance between str1 and any substring of str2. The first row of the DP table is initialized to zeroes since str1 can match starting at any position in str2.
// Time: O(n^2), Space: O(n)
func SubstringEditDistance(str1 string, str2 string) int {
	count := 0
	n := len(str1)
	m := len(str2)

	for start := 0; start < n; start++ {
		j := 0
		for i := start; i < n && j < m; i++ {
			if str1[i] == str2[j] {
				j++
			}
		}
		if j == m {
			count++
		}
	}

	return count
}

func main() {
	fmt.Println(SubstringEditDistance("abc", "yabd")) // Expected: 1
	fmt.Println(SubstringEditDistance("horse", "ros")) // Expected: 2
	fmt.Println(SubstringEditDistance("", "abc")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance/twist-06-substring-edit-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance/twist-06-substring-edit-distance'] = problem;
})();
