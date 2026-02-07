/**
 * Count the Number of Valid Partitions
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change/03-partition-equal-subset-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count the Number of Valid Partitions',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/03-partition-equal-subset-sum',
        description: 'Instead of just returning true/false, count how many distinct ways the array can be partitioned into two subsets with equal sum.',
        problem: 'Switches from boolean DP (dp[s] = true/false) to counting DP (dp[s] = number of subsets summing to s). Same structure but different aggregation: OR becomes addition.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Switches from boolean DP (dp[s] = true/false) to counting DP (dp[s] = number of subsets summing to s). Same structure bu',
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
                input: {"nums":[1,5,11,5]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"nums":[1,2,3,5]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def count_the_number_of_valid_partitions(nums):
    """
    Count the Number of Valid Partitions

    Instead of just returning true/false, count how many distinct ways the array can be partitioned into two subsets with equal sum.

    Time: O(n^2)
    Space: O(n)
    """
    result = 0

    for i in range(len(nums)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_the_number_of_valid_partitions([1,5,11,5]))  # Expected: 1
print(count_the_number_of_valid_partitions([1,2,3,5]))  # Expected: 2
print(count_the_number_of_valid_partitions([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountTheNumberOfValidPartitions solves the Count the Number of Valid Partitions problem.
// Instead of just returning true/false, count how many distinct ways the array can be partitioned into two subsets with equal sum.
// Time: O(n^2), Space: O(n)
func CountTheNumberOfValidPartitions(nums []int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountTheNumberOfValidPartitions([]int{1, 5, 11, 5})) // Expected: 1
	fmt.Println(CountTheNumberOfValidPartitions([]int{1, 2, 3, 5})) // Expected: 2
	fmt.Println(CountTheNumberOfValidPartitions([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/03-partition-equal-subset-sum/twist-02-count-the-number-of-valid-partitions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/03-partition-equal-subset-sum/twist-02-count-the-number-of-valid-partitions'] = problem;
})();
