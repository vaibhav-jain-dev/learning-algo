/**
 * Edit Distance With Only Insert and Delete
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-edit-distance
 * Parent: 04-levenshtein-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Edit Distance With Only Insert and Delete',
        difficulty: 'Medium',
        algorithm: 'dp-edit-distance',
        parent: '04-levenshtein-distance',
        description: 'Find the minimum number of edit operations when only insertions and deletions are allowed (no replacements).',
        problem: 'Removing replace forces a fundamentally different approach. A replacement must now be simulated as delete+insert, linking this problem to Longest Common Subsequence.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Removing replace forces a fundamentally different approach. A replacement must now be simulated as delete+insert, linkin',
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
                explanation: 'For this input, there is 1 valid position that satisfy the edit distance with only insert and delete criteria.'
            },
            {
                input: {"str1":"horse","str2":"ros"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the edit distance with only insert and delete criteria.'
            },
            {
                input: {"str1":"","str2":"abc"},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the edit distance with only insert and delete criteria.'
            },
            // Edge case
            {
                input: {"str1":"","str2":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def edit_distance_with_only_insert_and_delete(str1, str2):
    """
    Edit Distance With Only Insert and Delete

    Find the minimum number of edit operations when only insertions and deletions are allowed (no replacements).

    Time: O(n^2)
    Space: O(n)
    """
    n = len(str1)
    m = len(str2)
    j = 0

    for i in range(n):
        if j < m and str1[i] == str2[j]:
            j += 1

    if j < m:
        return -1  # Not possible

    return n - m


# Test cases
print(edit_distance_with_only_insert_and_delete("abc", "yabd"))  # Expected: 1
print(edit_distance_with_only_insert_and_delete("horse", "ros"))  # Expected: 2
print(edit_distance_with_only_insert_and_delete("", "abc"))  # Expected: 0
`,
            go: `package main

import "fmt"

// EditDistanceWithOnlyInsertAndDelete solves the Edit Distance With Only Insert and Delete problem.
// Find the minimum number of edit operations when only insertions and deletions are allowed (no replacements).
// Time: O(n^2), Space: O(n)
func EditDistanceWithOnlyInsertAndDelete(str1 string, str2 string) int {
	n := len(str1)
	m := len(str2)
	j := 0

	for i := 0; i < n && j < m; i++ {
		if str1[i] == str2[j] {
			j++
		}
	}

	if j < m {
		return -1
	}

	return n - m
}

func main() {
	fmt.Println(EditDistanceWithOnlyInsertAndDelete("abc", "yabd")) // Expected: 1
	fmt.Println(EditDistanceWithOnlyInsertAndDelete("horse", "ros")) // Expected: 2
	fmt.Println(EditDistanceWithOnlyInsertAndDelete("", "abc")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance/twist-04-edit-distance-with-only-insert-and-delete', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance/twist-04-edit-distance-with-only-insert-and-delete'] = problem;
})();
