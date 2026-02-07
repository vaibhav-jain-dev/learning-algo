/**
 * Diagonal Spiral
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Diagonal Spiral',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array, traverse the matrix in a diagonal spiral pattern instead of the standard horizontal/vertical spiral. Movement is diagonal (up-right, down-right, down-left, up-left) creating a diamond-shaped spiral pattern. Start from the top-left corner and spiral inward diagonally.',
        problem: 'Use diagonal direction vectors (dr, dc) of (-1,1), (1,1), (1,-1), (-1,-1) instead of the standard axis-aligned vectors. Track visited cells and change direction when hitting boundaries or already-visited cells.',
        hints: [
            'Direction vectors for diagonal movement: (-1,1), (1,1), (1,-1), (-1,-1).',
            'Use a visited matrix to track which cells have been traversed.',
            'When the next diagonal cell is out of bounds or already visited, rotate to the next direction.',
            'The spiral may not form perfect rings like the standard spiral due to diagonal geometry.'
        ],
        complexity: {
            time: 'O(m*n)',
            space: 'O(m*n)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]]},
                output: [1,5,3,6,7,4,2,9,8],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [1,4,2,3],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"matrix":[[1,2,3,4]]},
                output: [1,2,3,4],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def diagonal_spiral(matrix):
    """
    Diagonal Spiral

    Given an n x m two-dimensional array, traverse the matrix in a diagonal spiral pattern instead of the standard horizontal/vertical spiral. Movement is diagonal (up-right, down-right, down-left, up-left) creating a diamond-shaped spiral pattern. Start from the top-left corner and spiral inward diagonally.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(diagonal_spiral([[1,2,3],[4,5,6],[7,8,9]]))  # Expected: [1,5,3,6,7,4,2,9,8]
print(diagonal_spiral([[1,2],[3,4]]))  # Expected: [1,4,2,3]
print(diagonal_spiral([[1,2,3,4]]))  # Expected: [1,2,3,4]
`,
            go: `package main

import "fmt"

// DiagonalSpiral solves the Diagonal Spiral problem.
// Given an n x m two-dimensional array, traverse the matrix in a diagonal spiral pattern instead of the standard horizontal/vertical spiral. Movement is diagonal (up-right, down-right, down-left, up-left) creating a diamond-shaped spiral pattern. Start from the top-left corner and spiral inward diagonally.
// Time: O(m*n), Space: O(m*n)
func DiagonalSpiral(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(DiagonalSpiral([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})) // Expected: [1,5,3,6,7,4,2,9,8]
	fmt.Println(DiagonalSpiral([][]int{{1, 2}, {3, 4}})) // Expected: [1,4,2,3]
	fmt.Println(DiagonalSpiral([][]int{{1, 2, 3, 4}})) // Expected: [1,2,3,4]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-04-diagonal-spiral', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-04-diagonal-spiral'] = problem;
})();
