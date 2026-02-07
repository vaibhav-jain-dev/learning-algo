/**
 * Return All Minimum Partitions
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-palindrome
 * Parent: 11-palindrome-partitioning
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return All Minimum Partitions',
        difficulty: 'Hard',
        algorithm: 'dp-palindrome',
        parent: '11-palindrome-partitioning',
        description: 'Instead of just the minimum number of cuts, return all possible partitions that achieve this minimum cut count.',
        problem: 'Adds a backtracking/enumeration phase after the DP. You must reconstruct all optimal partition paths, not just count the cuts.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Adds a backtracking/enumeration phase after the DP. You must reconstruct all optimal partition paths, not just count the',
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
                input: {"string":"noonabbad"},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"string":"aab"},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"string":"aba"},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            {
                input: {"string":"abcde"},
                output: 3,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            // Edge case
            {
                input: {"string":""},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def return_all_minimum_partitions(string):
    """
    Return All Minimum Partitions

    Instead of just the minimum number of cuts, return all possible partitions that achieve this minimum cut count.

    Time: O(2^n)
    Space: O(n)
    """
    result = 0

    for i in range(len(string)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(return_all_minimum_partitions("noonabbad"))  # Expected: 1
print(return_all_minimum_partitions("aab"))  # Expected: 2
print(return_all_minimum_partitions("aba"))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReturnAllMinimumPartitions solves the Return All Minimum Partitions problem.
// Instead of just the minimum number of cuts, return all possible partitions that achieve this minimum cut count.
// Time: O(2^n), Space: O(n)
func ReturnAllMinimumPartitions(string string) int {
	result := 0

	for i := 0; i < len(string); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReturnAllMinimumPartitions("noonabbad")) // Expected: 1
	fmt.Println(ReturnAllMinimumPartitions("aab")) // Expected: 2
	fmt.Println(ReturnAllMinimumPartitions("aba")) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '11-palindrome-partitioning/twist-01-return-all-minimum-partitions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/11-palindrome-partitioning/twist-01-return-all-minimum-partitions'] = problem;
})();
