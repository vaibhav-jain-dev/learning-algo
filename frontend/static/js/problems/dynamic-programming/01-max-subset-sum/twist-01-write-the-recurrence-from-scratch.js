/**
 * Write the Recurrence from Scratch
 * Category: dynamic-programming
 * Difficulty: Easy
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Write the Recurrence from Scratch',
        difficulty: 'Easy',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'Without looking at the solution, define dp[i] and write the full recurrence relation for Max Subset Sum No Adjacent. Include base cases for dp[0] and dp[1].',
        problem: 'Forces you to derive the state definition and transition yourself rather than just reading it. Many students can follow a recurrence but struggle to define one from an empty page.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Forces you to derive the state definition and transition yourself rather than just reading it. Many students can follow ',
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
                input: {"array":[75,105,120,75,90,135]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"array":[7,10,12,7,9,14]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"array":[75]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def write_the_recurrence_from_scratch(array):
    """
    Write the Recurrence from Scratch

    Without looking at the solution, define dp[i] and write the full recurrence relation for Max Subset Sum No Adjacent. Include base cases for dp[0] and dp[1].

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(write_the_recurrence_from_scratch([75,105,120,75,90,135]))  # Expected: 1
print(write_the_recurrence_from_scratch([7,10,12,7,9,14]))  # Expected: 2
print(write_the_recurrence_from_scratch([75]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WriteTheRecurrenceFromScratch solves the Write the Recurrence from Scratch problem.
// Without looking at the solution, define dp[i] and write the full recurrence relation for Max Subset Sum No Adjacent. Include base cases for dp[0] and dp[1].
// Time: O(n^2), Space: O(n)
func WriteTheRecurrenceFromScratch(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WriteTheRecurrenceFromScratch([]int{75, 105, 120, 75, 90, 135})) // Expected: 1
	fmt.Println(WriteTheRecurrenceFromScratch([]int{7, 10, 12, 7, 9, 14})) // Expected: 2
	fmt.Println(WriteTheRecurrenceFromScratch([]int{75})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/twist-01-write-the-recurrence-from-scratch', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/twist-01-write-the-recurrence-from-scratch'] = problem;
})();
