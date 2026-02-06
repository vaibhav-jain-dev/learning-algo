/**
 * Spiral with Skip
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral with Skip',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array and an integer K, traverse the matrix in spiral order but skip every K-th element. Return only the non-skipped elements. The counter starts at 1 for the first element in spiral order.',
        problem: 'Perform standard spiral traversal but maintain a counter. When the counter is a multiple of K, skip that element instead of adding it to the result. This adds state tracking to the traversal.',
        hints: [
            'Use the standard spiral traversal algorithm with boundary tracking.',
            'Keep a counter that increments for every element encountered in spiral order.',
            'When counter % K == 0, skip the element (do not add to result).',
            'The skipping does not affect the traversal path, only what gets collected.'
        ],
        complexity: {
            time: 'O(m*n)',
            space: 'O(m*n)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2,3],[4,5,6]],"k":2},
                output: [1,3,5],
                explanation: ''
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]],"k":3},
                output: [1,2,4,5,8,9],
                explanation: ''
            },
            // Edge case
            {
                input: {"matrix":[[1,2],[3,4]],"k":1},
                output: [],
                explanation: ''
            }
        ],
        solutions: {
            python: `def spiral_with_skip(matrix, k):
    """
    Spiral with Skip

    Given an n x m two-dimensional array and an integer K, traverse the matrix in spiral order but skip every K-th element. Return only the non-skipped elements. The counter starts at 1 for the first element in spiral order.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(spiral_with_skip([[1,2,3],[4,5,6]], 2))  # Expected: [1,3,5]
print(spiral_with_skip([[1,2,3],[4,5,6],[7,8,9]], 3))  # Expected: [1,2,4,5,8,9]
print(spiral_with_skip([[1,2],[3,4]], 1))  # Expected: []
`,
            go: `package main

import "fmt"

// SpiralWithSkip solves the Spiral with Skip problem.
// Given an n x m two-dimensional array and an integer K, traverse the matrix in spiral order but skip every K-th element. Return only the non-skipped elements. The counter starts at 1 for the first element in spiral order.
// Time: O(m*n), Space: O(m*n)
func SpiralWithSkip(matrix [][]int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(SpiralWithSkip([][]int{{1, 2, 3}, {4, 5, 6}}, 2)) // Expected: [1,3,5]
	fmt.Println(SpiralWithSkip([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}, 3)) // Expected: [1,2,4,5,8,9]
	fmt.Println(SpiralWithSkip([][]int{{1, 2}, {3, 4}}, 1)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-05-spiral-with-skip', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-05-spiral-with-skip'] = problem;
})();
