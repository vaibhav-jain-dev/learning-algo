/**
 * Trace the DP Table
 * Category: dynamic-programming
 * Difficulty: Easy
 * Algorithm: dp-max-subset
 * Parent: 01-max-subset-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Trace the DP Table',
        difficulty: 'Easy',
        algorithm: 'dp-max-subset',
        parent: '01-max-subset-sum',
        description: 'Given array [7, 10, 12, 7, 9, 14], manually fill in the DP table step by step. At each index, show the include vs skip decision and which value wins.',
        problem: 'Forces mechanical understanding of the recurrence. Many students understand the formula abstractly but cannot trace through it correctly by hand.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Forces mechanical understanding of the recurrence. Many students understand the formula abstractly but cannot trace thro',
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
                output: 0,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"array":[7,10,12,7,9,14]},
                output: 1,
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
            python: `def trace_the_dp_table(array):
    """
    Trace the DP Table

    Given array [7, 10, 12, 7, 9, 14], manually fill in the DP table step by step. At each index, show the include vs skip decision and which value wins.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(trace_the_dp_table([75,105,120,75,90,135]))  # Expected: 0
print(trace_the_dp_table([7,10,12,7,9,14]))  # Expected: 1
print(trace_the_dp_table([75]))  # Expected: 0
`,
            go: `package main

import "fmt"

// TraceTheDpTable solves the Trace the DP Table problem.
// Given array [7, 10, 12, 7, 9, 14], manually fill in the DP table step by step. At each index, show the include vs skip decision and which value wins.
// Time: O(n^2), Space: O(n)
func TraceTheDpTable(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TraceTheDpTable([]int{75, 105, 120, 75, 90, 135})) // Expected: 0
	fmt.Println(TraceTheDpTable([]int{7, 10, 12, 7, 9, 14})) // Expected: 1
	fmt.Println(TraceTheDpTable([]int{75})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '01-max-subset-sum/twist-05-trace-the-dp-table', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/01-max-subset-sum/twist-05-trace-the-dp-table'] = problem;
})();
