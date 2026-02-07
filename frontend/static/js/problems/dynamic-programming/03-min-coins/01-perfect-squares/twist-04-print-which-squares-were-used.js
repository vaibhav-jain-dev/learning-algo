/**
 * Print Which Squares Were Used
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 03-min-coins/01-perfect-squares
 */
(function() {
    'use strict';

    const problem = {
        name: 'Print Which Squares Were Used',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins/01-perfect-squares',
        description: 'Return not just the count but the actual list of perfect squares. Track which square was chosen at each step to enable backtracking.',
        problem: 'Solution reconstruction requires maintaining a parent/choice array alongside the DP array, then tracing back from dp[n] to dp[0].',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Solution reconstruction requires maintaining a parent/choice array alongside the DP array, then tracing back from dp[n] ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(2^n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":12},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"n":13},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"n":0},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def print_which_squares_were_used(n):
    """
    Print Which Squares Were Used

    Return not just the count but the actual list of perfect squares. Track which square was chosen at each step to enable backtracking.

    Time: O(2^n)
    Space: O(n)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(print_which_squares_were_used(12))  # Expected: 1
print(print_which_squares_were_used(13))  # Expected: 2
print(print_which_squares_were_used(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// PrintWhichSquaresWereUsed solves the Print Which Squares Were Used problem.
// Return not just the count but the actual list of perfect squares. Track which square was chosen at each step to enable backtracking.
// Time: O(2^n), Space: O(n)
func PrintWhichSquaresWereUsed(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PrintWhichSquaresWereUsed(12)) // Expected: 1
	fmt.Println(PrintWhichSquaresWereUsed(13)) // Expected: 2
	fmt.Println(PrintWhichSquaresWereUsed(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/01-perfect-squares/twist-04-print-which-squares-were-used', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/01-perfect-squares/twist-04-print-which-squares-were-used'] = problem;
})();
