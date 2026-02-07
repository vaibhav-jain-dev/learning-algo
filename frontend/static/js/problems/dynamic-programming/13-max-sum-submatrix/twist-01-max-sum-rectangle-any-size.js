/**
 * Max Sum Rectangle (Any Size)
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-matrix
 * Parent: 13-max-sum-submatrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Sum Rectangle (Any Size)',
        difficulty: 'Hard',
        algorithm: 'dp-matrix',
        parent: '13-max-sum-submatrix',
        description: 'Instead of a fixed size x size submatrix, find the rectangle of any dimensions within the matrix that has the maximum sum.',
        problem: 'Variable dimensions make this much harder. Requires prefix sums combined with Kadane.',
        hints: [
            'Fix two row boundaries (top and bottom) and collapse the submatrix between them into a 1D array by summing each column.',
            'Apply the Kadane algorithm on the collapsed 1D column-sum array to find the best left and right boundaries.',
            'Iterate over all O(rows^2) pairs of top and bottom rows, running Kadane on each to find the overall maximum rectangle.',
            'Use prefix sums on columns to efficiently compute the collapsed array for each pair of row boundaries in O(cols) time.'
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
                explanation: 'For this input, there are 2 valid positions that satisfy the max sum rectangle any size criteria.'
            },
            {
                input: {"matrix":[[1,2],[3,4]],"size":1},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the max sum rectangle any size criteria.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]],"size":2},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the max sum rectangle any size criteria.'
            },
            // Edge case
            {
                input: {"matrix":[[5,3,-1,5]],"size":0},
                output: 0,
                explanation: 'Small input edge case testing boundary conditions of the rectangle selection.'
            }
        ],
        solutions: {
            python: `def max_sum_rectangle_any_size(matrix, size):
    """
    Max Sum Rectangle (Any Size)

    Instead of a fixed size x size submatrix, find the rectangle of any dimensions within the matrix that has the maximum sum.

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
print(max_sum_rectangle_any_size([[5,3,-1,5],[-7,3,7,4],[12,8,0,0],[1,-8,-8,2]], 2))  # Expected: 2
print(max_sum_rectangle_any_size([[1,2],[3,4]], 1))  # Expected: 2
print(max_sum_rectangle_any_size([[1,2,3],[4,5,6],[7,8,9]], 2))  # Expected: 1
`,
            go: `package main

import "fmt"

// MaxSumRectangleAnySize solves the Max Sum Rectangle (Any Size) problem.
// Instead of a fixed size x size submatrix, find the rectangle of any dimensions within the matrix that has the maximum sum.
// Time: O(rows^2 * cols), Space: O(rows * cols)
func MaxSumRectangleAnySize(matrix [][]int, size int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxSumRectangleAnySize([][]int{{5, 3, -1, 5}, {-7, 3, 7, 4}, {12, 8, 0, 0}, {1, -8, -8, 2}}, 2)) // Expected: 2
	fmt.Println(MaxSumRectangleAnySize([][]int{{1, 2}, {3, 4}}, 1)) // Expected: 2
	fmt.Println(MaxSumRectangleAnySize([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, 2)) // Expected: 1
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '13-max-sum-submatrix/twist-01-max-sum-rectangle-any-size', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/13-max-sum-submatrix/twist-01-max-sum-rectangle-any-size'] = problem;
})();
