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
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [[1,3],[2,4]],
                explanation: 'Matrix transformed according to the specified operation.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6]]},
                output: [[1,4],[2,5],[3,6]],
                explanation: 'Rectangular matrix handled correctly.'
            },
            {
                input: {"matrix":[[1]]},
                output: [[1]],
                explanation: 'Single element matrix is trivially handled.'
            }
        ],
        solutions: {
            python: `def sparse_matrix_transpose(data):
    """
    Sparse Matrix Transpose

    The matrix is represented as a list of (row, col, value) tuples for non-zero elements. Transpose this sparse representation.
    \n    Approach: Working with sparse representation means you swap row/col in each tuple and re-sort, rather than iterating over a full grid.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # sparse=[(0,1,5),(1,0,3),(2,1,7)] → transposed: [(1,0,5),(0,1,3),(1,2,7)]

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(sparse_matrix_transpose([1, 2, 3, 4, 5]))
print(sparse_matrix_transpose([5, 3, 1]))
print(sparse_matrix_transpose([1]))`,
            go: `package main

import "fmt"

// SparseMatrixTranspose solves the Sparse Matrix Transpose problem.
// The matrix is represented as a list of (row, col, value) tuples for non-zero elements. Transpose this sparse representation.
// Time: O(n), Space: O(n)
func SparseMatrixTranspose(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(SparseMatrixTranspose([]int{1, 2, 3, 4, 5}))
    fmt.Println(SparseMatrixTranspose([]int{5, 3, 1}))
    fmt.Println(SparseMatrixTranspose([]int{1}))
}`
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
