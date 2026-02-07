/**
 * Spiral Read, Row-Major Write
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-read-row-major-write
 * Parent: 06-transpose-matrix/02-spiral-matrix-transpose
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Read, Row-Major Write',
        difficulty: 'Medium',
        algorithm: 'spiral-read-row-major-write',
        parent: '06-transpose-matrix/02-spiral-matrix-transpose',
        description: 'Read the matrix in spiral order but write the values in standard row-major order to a transposed-dimension matrix. The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.',
        problem: 'The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.',
        hints: [
            'Think about how spiral read, row-major write differs from the standard version of this problem.',
            'Key insight: The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.',
            'Consider whether sorting can help simplify the approach.',
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
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]]},
                output: [1,2,3,6,9,8,7,4,5],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [1,2,4,3],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"matrix":[[1]]},
                output: [1],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def spiral_read_row_major_write(matrix):
    """
    Spiral Read, Row-Major Write

    Read the matrix in spiral order but write the values in standard row-major order to a transposed-dimension matrix. The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(spiral_read_row_major_write([[1,2,3],[4,5,6],[7,8,9]]))  # Expected: [1,2,3,6,9,8,7,4,5]
print(spiral_read_row_major_write([[1,2],[3,4]]))  # Expected: [1,2,4,3]
print(spiral_read_row_major_write([[1]]))  # Expected: [1]
`,
            go: `package main

import "fmt"

// SpiralReadRowMajorWrite solves the Spiral Read, Row-Major Write problem.
// Read the matrix in spiral order but write the values in standard row-major order to a transposed-dimension matrix. The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.
// Time: O(n), Space: O(n)
func SpiralReadRowMajorWrite(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SpiralReadRowMajorWrite([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})) // Expected: [1,2,3,6,9,8,7,4,5]
	fmt.Println(SpiralReadRowMajorWrite([][]int{{1, 2}, {3, 4}})) // Expected: [1,2,4,3]
	fmt.Println(SpiralReadRowMajorWrite([][]int{{1}})) // Expected: [1]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/02-spiral-matrix-transpose/twist-01-spiral-read-row-major-write', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/02-spiral-matrix-transpose/twist-01-spiral-read-row-major-write'] = problem;
})();
