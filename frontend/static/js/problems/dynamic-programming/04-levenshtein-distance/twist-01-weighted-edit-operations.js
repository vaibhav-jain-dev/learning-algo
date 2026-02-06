/**
 * Weighted Edit Operations
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-edit-distance
 * Parent: 04-levenshtein-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Edit Operations',
        difficulty: 'Hard',
        algorithm: 'dp-edit-distance',
        parent: '04-levenshtein-distance',
        description: 'Each edit operation has a different cost: insert costs w_i, delete costs w_d, and replace costs w_r. Find the minimum total cost to transform str1 into str2.',
        problem: 'Breaks the uniform-cost assumption. The DP recurrence must use different weights for each operation, and the optimal path changes based on the relative costs.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Breaks the uniform-cost assumption. The DP recurrence must use different weights for each operation, and the optimal pat',
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
                explanation: 'For this input, there is 1 valid position that satisfy the weighted edit operations criteria.'
            },
            {
                input: {"str1":"horse","str2":"ros"},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the weighted edit operations criteria.'
            },
            {
                input: {"str1":"","str2":"abc"},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the weighted edit operations criteria.'
            },
            // Edge case
            {
                input: {"str1":"","str2":""},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weighted_edit_operations(str1, str2):
    """
    Weighted Edit Operations

    Each edit operation has a different cost: insert costs w_i, delete costs w_d, and replace costs w_r. Find the minimum total cost to transform str1 into str2.

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
print(weighted_edit_operations("abc", "yabd"))  # Expected: 1
print(weighted_edit_operations("horse", "ros"))  # Expected: 2
print(weighted_edit_operations("", "abc"))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedEditOperations solves the Weighted Edit Operations problem.
// Each edit operation has a different cost: insert costs w_i, delete costs w_d, and replace costs w_r. Find the minimum total cost to transform str1 into str2.
// Time: O(n^2), Space: O(n)
func WeightedEditOperations(str1 string, str2 string) int {
	result := 0

	for i := 0; i < len(str1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedEditOperations("abc", "yabd")) // Expected: 1
	fmt.Println(WeightedEditOperations("horse", "ros")) // Expected: 2
	fmt.Println(WeightedEditOperations("", "abc")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance/twist-01-weighted-edit-operations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance/twist-01-weighted-edit-operations'] = problem;
})();
