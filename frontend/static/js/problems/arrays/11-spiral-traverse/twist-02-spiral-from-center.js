/**
 * Spiral from Center
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral from Center',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array, return a one-dimensional array of all elements starting from the center of the matrix and expanding outward in a clockwise spiral. Direction lengths grow as 1,1,2,2,3,3,... as you expand. For even dimensions, start from the upper-left cell of the center 2x2 block.',
        problem: 'Find the center cell, then spiral outward using an expanding step pattern. Track direction changes: after every two turns, increase the step count by one. Filter out positions that fall outside the matrix boundaries.',
        hints: [
            'The center of the matrix is at ((rows-1)//2, (cols-1)//2).',
            'Use direction vectors for right, down, left, up and cycle through them.',
            'The step pattern is 1,1,2,2,3,3,... - increase steps after every two direction changes.',
            'Check bounds before adding each cell to the result.'
        ],
        complexity: {
            time: 'O(m*n)',
            space: 'O(m*n)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]]},
                output: [5,6,9,8,7,4,1,2,3],
                explanation: ''
            },
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [1,2,4,3],
                explanation: ''
            },
            // Edge case
            {
                input: {"matrix":[[1,2,3,4],[5,6,7,8],[9,10,11,12]]},
                output: [6,7,11,10,9,5,1,2,3,4,8,12],
                explanation: ''
            }
        ],
        solutions: {
            python: `def spiral_from_center(matrix):
    """
    Spiral from Center

    Given an n x m two-dimensional array, return a one-dimensional array of all elements starting from the center of the matrix and expanding outward in a clockwise spiral. Direction lengths grow as 1,1,2,2,3,3,... as you expand. For even dimensions, start from the upper-left cell of the center 2x2 block.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(spiral_from_center([[1,2,3],[4,5,6],[7,8,9]]))  # Expected: [5,6,9,8,7,4,1,2,3]
print(spiral_from_center([[1,2],[3,4]]))  # Expected: [1,2,4,3]
print(spiral_from_center([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))  # Expected: [6,7,11,10,9,5,1,2,3,4,8,12]
`,
            go: `package main

import "fmt"

// SpiralFromCenter solves the Spiral from Center problem.
// Given an n x m two-dimensional array, return a one-dimensional array of all elements starting from the center of the matrix and expanding outward in a clockwise spiral. Direction lengths grow as 1,1,2,2,3,3,... as you expand. For even dimensions, start from the upper-left cell of the center 2x2 block.
// Time: O(m*n), Space: O(m*n)
func SpiralFromCenter(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(SpiralFromCenter([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})) // Expected: [5,6,9,8,7,4,1,2,3]
	fmt.Println(SpiralFromCenter([][]int{{1, 2}, {3, 4}})) // Expected: [1,2,4,3]
	fmt.Println(SpiralFromCenter([][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}})) // Expected: [6,7,11,10,9,5,1,2,3,4,8,12]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-02-spiral-from-center', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-02-spiral-from-center'] = problem;
})();
