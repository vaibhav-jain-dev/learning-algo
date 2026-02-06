/**
 * In-Place Transpose of Square Matrix
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: in-place-transpose-of-square-matrix
 * Parent: 06-transpose-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'In-Place Transpose of Square Matrix',
        difficulty: 'Medium',
        algorithm: 'in-place-transpose-of-square-matrix',
        parent: '06-transpose-matrix',
        description: 'Transpose the matrix in-place without using extra space. Only works for square matrices. Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.',
        problem: 'Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.',
        hints: [
            'Think about how in-place transpose of square matrix differs from the standard version of this problem.',
            'Key insight: Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [[1,3],[2,4]],
                explanation: ''
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6]]},
                output: [[1,4],[2,5],[3,6]],
                explanation: ''
            },
            // Edge case
            {
                input: {"matrix":[[1]]},
                output: [[1]],
                explanation: ''
            }
        ],
        solutions: {
            python: `def in_place_transpose_of_square_matrix(matrix):
    """
    In-Place Transpose of Square Matrix

    Transpose the matrix in-place without using extra space. Only works for square matrices. Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(in_place_transpose_of_square_matrix([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(in_place_transpose_of_square_matrix([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(in_place_transpose_of_square_matrix([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// InPlaceTransposeOfSquareMatrix solves the In-Place Transpose of Square Matrix problem.
// Transpose the matrix in-place without using extra space. Only works for square matrices. Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.
// Time: O(n), Space: O(1)
func InPlaceTransposeOfSquareMatrix(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(InPlaceTransposeOfSquareMatrix([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(InPlaceTransposeOfSquareMatrix([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(InPlaceTransposeOfSquareMatrix([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/twist-01-in-place-transpose-of-square-matrix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/twist-01-in-place-transpose-of-square-matrix'] = problem;
})();
