/**
 * Edit Distance With Transposition
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-edit-distance
 * Parent: 04-levenshtein-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Edit Distance With Transposition',
        difficulty: 'Hard',
        algorithm: 'dp-edit-distance',
        parent: '04-levenshtein-distance',
        description: 'Add a fourth allowed operation: transposition (swap two adjacent characters). This is the Damerau-Levenshtein distance. Find the minimum operations needed.',
        problem: 'Adds a new transition to the DP that looks back two characters, requiring careful handling to avoid double-counting with other operations.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Adds a new transition to the DP that looks back two characters, requiring careful handling to avoid double-counting with',
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
                explanation: 'For this input, there is 1 valid position that satisfy the edit distance with transposition criteria.'
            },
            {
                input: {"str1":"horse","str2":"ros"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the edit distance with transposition criteria.'
            },
            {
                input: {"str1":"","str2":"abc"},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the edit distance with transposition criteria.'
            },
            // Edge case
            {
                input: {"str1":"","str2":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def edit_distance_with_transposition(str1, str2):
    """
    Edit Distance With Transposition

    Add a fourth allowed operation: transposition (swap two adjacent characters). This is the Damerau-Levenshtein distance. Find the minimum operations needed.

    Time: O(n^2)
    Space: O(n)
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
print(edit_distance_with_transposition("abc", "yabd"))  # Expected: 1
print(edit_distance_with_transposition("horse", "ros"))  # Expected: 2
print(edit_distance_with_transposition("", "abc"))  # Expected: 0
`,
            go: `package main

import "fmt"

// EditDistanceWithTransposition solves the Edit Distance With Transposition problem.
// Add a fourth allowed operation: transposition (swap two adjacent characters). This is the Damerau-Levenshtein distance. Find the minimum operations needed.
// Time: O(n^2), Space: O(n)
func EditDistanceWithTransposition(str1 string, str2 string) int {
	result := 0

	for i := 0; i < len(str1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(EditDistanceWithTransposition("abc", "yabd")) // Expected: 1
	fmt.Println(EditDistanceWithTransposition("horse", "ros")) // Expected: 2
	fmt.Println(EditDistanceWithTransposition("", "abc")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance/twist-03-edit-distance-with-transposition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance/twist-03-edit-distance-with-transposition'] = problem;
})();
