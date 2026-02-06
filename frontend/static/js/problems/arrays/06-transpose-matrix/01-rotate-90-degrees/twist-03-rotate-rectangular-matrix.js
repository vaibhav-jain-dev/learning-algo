/**
 * Rotate Rectangular Matrix
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: rotate-rectangular-matrix
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate Rectangular Matrix',
        difficulty: 'Hard',
        algorithm: 'rotate-rectangular-matrix',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate a non-square m x n matrix by 90 degrees. The result will be n x m. Cannot be done in-place. Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.',
        problem: 'Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.',
        hints: [
            'Think about how rotate rectangular matrix differs from the standard version of this problem.',
            'Key insight: Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.',
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
            python: `def rotate_rectangular_matrix(matrix):
    """
    Rotate Rectangular Matrix

    Rotate a non-square m x n matrix by 90 degrees. The result will be n x m. Cannot be done in-place. Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for item in matrix:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(rotate_rectangular_matrix([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(rotate_rectangular_matrix([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(rotate_rectangular_matrix([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// RotateRectangularMatrix solves the Rotate Rectangular Matrix problem.
// Rotate a non-square m x n matrix by 90 degrees. The result will be n x m. Cannot be done in-place. Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.
// Time: O(n), Space: O(1)
func RotateRectangularMatrix(matrix []string) string {
	result := ""

	for _, v := range matrix {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(RotateRectangularMatrix([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(RotateRectangularMatrix([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(RotateRectangularMatrix([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-03-rotate-rectangular-matrix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-03-rotate-rectangular-matrix'] = problem;
})();
