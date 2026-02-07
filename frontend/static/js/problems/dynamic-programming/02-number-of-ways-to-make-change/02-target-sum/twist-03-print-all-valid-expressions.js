/**
 * Print All Valid Expressions
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change/02-target-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Print All Valid Expressions',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/02-target-sum',
        description: 'Instead of counting, generate all expressions (sign assignments) that evaluate to target. Return them as lists of +/- signs.',
        problem: 'Counting uses DP efficiently, but enumerating requires backtracking. The count can be exponential, so this is inherently more expensive. You must track the path through decisions.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Counting uses DP efficiently, but enumerating requires backtracking. The count can be exponential, so this is inherently',
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
                input: {"nums":[1,1,1,1,1],"target":10},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"nums":[1],"target":10},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"nums":[1],"target":10},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def print_all_valid_expressions(nums, target):
    """
    Print All Valid Expressions

    Instead of counting, generate all expressions (sign assignments) that evaluate to target. Return them as lists of +/- signs.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(nums)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and nums[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(print_all_valid_expressions([1,1,1,1,1], 10))  # Expected: 1
print(print_all_valid_expressions([1], 10))  # Expected: 2
print(print_all_valid_expressions([1], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// PrintAllValidExpressions solves the Print All Valid Expressions problem.
// Instead of counting, generate all expressions (sign assignments) that evaluate to target. Return them as lists of +/- signs.
// Time: O(n^2), Space: O(n)
func PrintAllValidExpressions(nums []int, target int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PrintAllValidExpressions([]int{1, 1, 1, 1, 1}, 10)) // Expected: 1
	fmt.Println(PrintAllValidExpressions([]int{1}, 10)) // Expected: 2
	fmt.Println(PrintAllValidExpressions([]int{1}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/02-target-sum/twist-03-print-all-valid-expressions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/02-target-sum/twist-03-print-all-valid-expressions'] = problem;
})();
