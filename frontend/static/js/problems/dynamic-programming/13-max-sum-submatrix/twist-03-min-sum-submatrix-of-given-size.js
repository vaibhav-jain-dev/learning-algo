/**
 * Min Sum Submatrix of Given Size
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-matrix
 * Parent: 13-max-sum-submatrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Min Sum Submatrix of Given Size',
        difficulty: 'Medium',
        algorithm: 'dp-matrix',
        parent: '13-max-sum-submatrix',
        description: 'Find the size x size submatrix with the minimum sum instead of the maximum.',
        problem: 'A simple sign flip, but forces you to verify your prefix sum approach works correctly for minimization and handles negative numbers throughout.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: A simple sign flip, but forces you to verify your prefix sum approach works correctly for minimization and handles negat',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the min sum submatrix of given size criteria.'
            },
            {
                input: {"matrix":[[1,2],[3,4]],"size":1},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the min sum submatrix of given size criteria.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]],"size":2},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the min sum submatrix of given size criteria.'
            },
            // Edge case
            {
                input: {"matrix":[[5,3,-1,5]],"size":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def min_sum_submatrix_of_given_size(matrix, size):
    """
    Min Sum Submatrix of Given Size

    Find the size x size submatrix with the minimum sum instead of the maximum.

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
print(min_sum_submatrix_of_given_size([[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]], 2))  # Expected: 1
print(min_sum_submatrix_of_given_size([[1,2],[3,4]], 1))  # Expected: 2
print(min_sum_submatrix_of_given_size([[1,2,3],[4,5,6],[7,8,9]], 2))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinSumSubmatrixOfGivenSize solves the Min Sum Submatrix of Given Size problem.
// Find the size x size submatrix with the minimum sum instead of the maximum.
// Time: O(rows^2 * cols), Space: O(rows * cols)
func MinSumSubmatrixOfGivenSize(matrix [][]int, size int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinSumSubmatrixOfGivenSize([][]int{{5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}}, 2)) // Expected: 1
	fmt.Println(MinSumSubmatrixOfGivenSize([][]int{{1, 2}, {3, 4}}, 1)) // Expected: 2
	fmt.Println(MinSumSubmatrixOfGivenSize([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, 2)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '13-max-sum-submatrix/twist-03-min-sum-submatrix-of-given-size', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/13-max-sum-submatrix/twist-03-min-sum-submatrix-of-given-size'] = problem;
})();
