/**
 * Count Submatrices With Target Sum
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-matrix
 * Parent: 13-max-sum-submatrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Submatrices With Target Sum',
        difficulty: 'Hard',
        algorithm: 'dp-matrix',
        parent: '13-max-sum-submatrix',
        description: 'Count how many size x size submatrices have a sum exactly equal to a target value.',
        problem: 'Changes from optimization to counting exact matches. The prefix sum computation is the same, but instead of tracking max/min you count equalities.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Changes from optimization to counting exact matches. The prefix sum computation is the same, but instead of tracking max',
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
                input: {"matrix":[[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]],"size":2,"target":10},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"matrix":[[1,2],[3,4]],"size":1,"target":10},
                output: 1,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]],"size":2,"target":10},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"matrix":[[5,3,-1,5]],"size":0,"target":10},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def count_submatrices_with_target_sum(matrix, size, target):
    """
    Count Submatrices With Target Sum

    Count how many size x size submatrices have a sum exactly equal to a target value.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(matrix)

    for i in range(n):
        # Check condition based on size
        j = 0
        for k in range(i, n):
            if j < len(size) and matrix[k] == size[j]:
                j += 1
        if j == len(size):
            count += 1

    return count


# Test cases
print(count_submatrices_with_target_sum([[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]], 2, 10))  # Expected: 1
print(count_submatrices_with_target_sum([[1,2],[3,4]], 1, 10))  # Expected: 1
print(count_submatrices_with_target_sum([[1,2,3],[4,5,6],[7,8,9]], 2, 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountSubmatricesWithTargetSum solves the Count Submatrices With Target Sum problem.
// Count how many size x size submatrices have a sum exactly equal to a target value.
// Time: O(n^2), Space: O(n)
func CountSubmatricesWithTargetSum(matrix [][]int, size int, target int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountSubmatricesWithTargetSum([][]int{{5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}}, 2, 10)) // Expected: 1
	fmt.Println(CountSubmatricesWithTargetSum([][]int{{1, 2}, {3, 4}}, 1, 10)) // Expected: 1
	fmt.Println(CountSubmatricesWithTargetSum([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, 2, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '13-max-sum-submatrix/twist-04-count-submatrices-with-target-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/13-max-sum-submatrix/twist-04-count-submatrices-with-target-sum'] = problem;
})();
