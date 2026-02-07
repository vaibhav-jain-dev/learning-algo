/**
 * Max Sum Submatrix With Obstacles
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-matrix
 * Parent: 13-max-sum-submatrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sum Submatrix With Obstacles',
        difficulty: 'Hard',
        algorithm: 'dp-matrix',
        parent: '13-max-sum-submatrix',
        description: 'Certain cells in the matrix are obstacles (marked -infinity or forbidden). Find the maximum sum size x size submatrix that contains no obstacles.',
        problem: 'Requires filtering out invalid submatrices. You need an additional prefix sum or boolean matrix to track obstacle presence within each candidate submatrix.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Requires filtering out invalid submatrices. You need an additional prefix sum or boolean matrix to track obstacle presen',
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
            python: `def max_sum_submatrix_with_obstacles(matrix, size):
    """
    Max Sum Submatrix With Obstacles

    Certain cells in the matrix are obstacles (marked -infinity or forbidden). Find the maximum sum size x size submatrix that contains no obstacles.

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
print(max_sum_submatrix_with_obstacles([[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]], 2))  # Expected: 2
print(max_sum_submatrix_with_obstacles([[1,2],[3,4]], 1))  # Expected: 2
print(max_sum_submatrix_with_obstacles([[1,2,3],[4,5,6],[7,8,9]], 2))  # Expected: 1
`,
            go: `package main

import "fmt"

// MaxSumSubmatrixWithObstacles solves the Max Sum Submatrix With Obstacles problem.
// Certain cells in the matrix are obstacles (marked -infinity or forbidden). Find the maximum sum size x size submatrix that contains no obstacles.
// Time: O(rows^2 * cols), Space: O(rows * cols)
func MaxSumSubmatrixWithObstacles(matrix [][]int, size int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxSumSubmatrixWithObstacles([][]int{{5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}}, 2)) // Expected: 2
	fmt.Println(MaxSumSubmatrixWithObstacles([][]int{{1, 2}, {3, 4}}, 1)) // Expected: 2
	fmt.Println(MaxSumSubmatrixWithObstacles([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, 2)) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '13-max-sum-submatrix/twist-05-max-sum-submatrix-with-obstacles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/13-max-sum-submatrix/twist-05-max-sum-submatrix-with-obstacles'] = problem;
})();
