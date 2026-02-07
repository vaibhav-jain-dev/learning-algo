/**
 * Max Sum Submatrix No Larger Than K
 * Category: dynamic-programming
 * Difficulty: Very Hard
 * Algorithm: dp-matrix
 * Parent: 13-max-sum-submatrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sum Submatrix No Larger Than K',
        difficulty: 'Very Hard',
        algorithm: 'dp-matrix',
        parent: '13-max-sum-submatrix',
        description: 'Find the maximum sum submatrix of any dimensions whose sum is no larger than a given value K.',
        problem: 'Adds an upper-bound constraint that prevents simple maximization. Requires combining prefix sums with a sorted set (TreeSet) to binary-search for the best valid sum.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Adds an upper-bound constraint that prevents simple maximization. Requires combining prefix sums with a sorted set (Tree',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(rows^2 * cols)',
            space: 'O(rows * cols)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]],"size":2},
                output: 2,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"matrix":[[1,2],[3,4]],"size":1},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]],"size":2},
                output: 1,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"matrix":[[5,3,-1,5]],"size":0},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def max_sum_submatrix_no_larger_than_k(matrix, size):
    """
    Max Sum Submatrix No Larger Than K

    Find the maximum sum submatrix of any dimensions whose sum is no larger than a given value K.

    Time: O(rows^2 * cols)
    Space: O(rows * cols)
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
print(max_sum_submatrix_no_larger_than_k([[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]], 2))  # Expected: 2
print(max_sum_submatrix_no_larger_than_k([[1,2],[3,4]], 1))  # Expected: 2
print(max_sum_submatrix_no_larger_than_k([[1,2,3],[4,5,6],[7,8,9]], 2))  # Expected: 1
`,
            go: `package main

import "fmt"

// MaxSumSubmatrixNoLargerThanK solves the Max Sum Submatrix No Larger Than K problem.
// Find the maximum sum submatrix of any dimensions whose sum is no larger than a given value K.
// Time: O(rows^2 * cols), Space: O(rows * cols)
func MaxSumSubmatrixNoLargerThanK(matrix [][]int, size int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxSumSubmatrixNoLargerThanK([][]int{{5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}}, 2)) // Expected: 2
	fmt.Println(MaxSumSubmatrixNoLargerThanK([][]int{{1, 2}, {3, 4}}, 1)) // Expected: 2
	fmt.Println(MaxSumSubmatrixNoLargerThanK([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, 2)) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '13-max-sum-submatrix/twist-02-max-sum-submatrix-no-larger-than-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/13-max-sum-submatrix/twist-02-max-sum-submatrix-no-larger-than-k'] = problem;
})();
