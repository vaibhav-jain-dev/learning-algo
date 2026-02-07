/**
 * Sparse Matrix Transpose
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sparse-matrix-transpose
 * Parent: 06-transpose-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sparse Matrix Transpose',
        difficulty: 'Medium',
        algorithm: 'sparse-matrix-transpose',
        parent: '06-transpose-matrix',
        description: 'The matrix is represented as a list of (row, col, value) tuples for non-zero elements. Transpose this sparse representation. Working with sparse representation means you swap row/col in each tuple and re-sort, rather than iterating over a full grid.',
        problem: 'Working with sparse representation means you swap row/col in each tuple and re-sort, rather than iterating over a full grid.',
        hints: [
            'Think about how sparse matrix transpose differs from the standard version of this problem.',
            'Key insight: Working with sparse representation means you swap row/col in each tuple and re-sort, rather than iterating over a full grid.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [[1,3],[2,4]],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6]]},
                output: [[1,4],[2,5],[3,6]],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"matrix":[[1]]},
                output: [[1]],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def sparse_matrix_transpose(matrix):
    """
    Sparse Matrix Transpose

    The matrix is represented as a list of (row, col, value) tuples for non-zero elements. Transpose this sparse representation. Working with sparse representation means you swap row/col in each tuple and re-sort, rather than iterating over a full grid.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(sparse_matrix_transpose([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(sparse_matrix_transpose([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(sparse_matrix_transpose([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// SparseMatrixTranspose solves the Sparse Matrix Transpose problem.
// The matrix is represented as a list of (row, col, value) tuples for non-zero elements. Transpose this sparse representation. Working with sparse representation means you swap row/col in each tuple and re-sort, rather than iterating over a full grid.
// Time: O(n), Space: O(n)
func SparseMatrixTranspose(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(SparseMatrixTranspose([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(SparseMatrixTranspose([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(SparseMatrixTranspose([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/twist-04-sparse-matrix-transpose', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/twist-04-sparse-matrix-transpose'] = problem;
})();
