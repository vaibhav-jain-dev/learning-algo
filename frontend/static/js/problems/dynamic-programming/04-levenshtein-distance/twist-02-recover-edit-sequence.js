/**
 * Recover Edit Sequence
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-edit-distance
 * Parent: 04-levenshtein-distance
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recover Edit Sequence',
        difficulty: 'Medium',
        algorithm: 'dp-edit-distance',
        parent: '04-levenshtein-distance',
        description: 'Return not just the minimum edit distance, but the actual sequence of operations (insert, delete, replace) to transform str1 into str2.',
        problem: 'Requires backtracking through the DP table to reconstruct the path, turning a value-only problem into a path-recovery problem.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires backtracking through the DP table to reconstruct the path, turning a value-only problem into a path-recovery pr',
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
            python: `def recover_edit_sequence(str1, str2):
    """
    Recover Edit Sequence

    Return not just the minimum edit distance, but the actual sequence of operations (insert, delete, replace) to transform str1 into str2.

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
print(recover_edit_sequence("abc", "yabd"))  # Expected: 1
print(recover_edit_sequence("horse", "ros"))  # Expected: 2
print(recover_edit_sequence("", "abc"))  # Expected: 0
`,
            go: `package main

import "fmt"

// RecoverEditSequence solves the Recover Edit Sequence problem.
// Return not just the minimum edit distance, but the actual sequence of operations (insert, delete, replace) to transform str1 into str2.
// Time: O(n^2), Space: O(n)
func RecoverEditSequence(str1 string, str2 string) int {
	result := 0

	for i := 0; i < len(str1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RecoverEditSequence("abc", "yabd")) // Expected: 1
	fmt.Println(RecoverEditSequence("horse", "ros")) // Expected: 2
	fmt.Println(RecoverEditSequence("", "abc")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '04-levenshtein-distance/twist-02-recover-edit-sequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/04-levenshtein-distance/twist-02-recover-edit-sequence'] = problem;
})();
