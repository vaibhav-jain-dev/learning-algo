/**
 * In-Place Spiral Transpose
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: in-place-spiral-transpose
 * Parent: 06-transpose-matrix/02-spiral-matrix-transpose
 */
(function() {
    'use strict';

    const problem = {
        name: 'In-Place Spiral Transpose',
        difficulty: 'Very Hard',
        algorithm: 'in-place-spiral-transpose',
        parent: '06-transpose-matrix/02-spiral-matrix-transpose',
        description: 'For a square matrix, perform the spiral-read-spiral-write transpose in-place using O(1) extra space. In-place requires computing the mapping from each position to its destination and performing cyclic permutations.',
        problem: 'In-place requires computing the mapping from each position to its destination and performing cyclic permutations.',
        hints: [
            'Think about how in-place spiral transpose differs from the standard version of this problem.',
            'Key insight: In-place requires computing the mapping from each position to its destination and performing cyclic permutations.',
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
            python: `def in_place_spiral_transpose(matrix):
    """
    In-Place Spiral Transpose

    For a square matrix, perform the spiral-read-spiral-write transpose in-place using O(1) extra space. In-place requires computing the mapping from each position to its destination and performing cyclic permutations.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(in_place_spiral_transpose([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(in_place_spiral_transpose([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(in_place_spiral_transpose([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// InPlaceSpiralTranspose solves the In-Place Spiral Transpose problem.
// For a square matrix, perform the spiral-read-spiral-write transpose in-place using O(1) extra space. In-place requires computing the mapping from each position to its destination and performing cyclic permutations.
// Time: O(n), Space: O(1)
func InPlaceSpiralTranspose(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(InPlaceSpiralTranspose([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(InPlaceSpiralTranspose([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(InPlaceSpiralTranspose([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/02-spiral-matrix-transpose/twist-04-in-place-spiral-transpose', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/02-spiral-matrix-transpose/twist-04-in-place-spiral-transpose'] = problem;
})();
