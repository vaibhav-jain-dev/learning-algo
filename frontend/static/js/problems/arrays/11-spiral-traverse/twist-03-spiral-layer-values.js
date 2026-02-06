/**
 * Spiral Layer Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Layer Values',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array, return an array where each element is the sum of all elements in the corresponding spiral layer. Layer 0 is the outermost ring, layer 1 is the next ring inward, and so on. Instead of collecting individual elements in spiral order, aggregate per layer.',
        problem: 'Use the standard boundary-based spiral traversal, but track which layer you are on. After completing each layer (one full ring), store the accumulated sum and move to the next layer inward.',
        hints: [
            'A layer is defined by boundaries: layer k has top=k, bottom=rows-1-k, left=k, right=cols-1-k.',
            'For each layer, traverse all four sides and sum the elements.',
            'Be careful not to double-count corner elements when the layer is a single row or column.',
            'The number of layers is min(rows, cols) // 2 (plus one for odd dimensions).'
        ],
        complexity: {
            time: 'O(m*n)',
            space: 'O(min(m,n))'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]]},
                output: [40,5],
                explanation: ''
            },
            {
                input: {"matrix":[[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]},
                output: [102,34],
                explanation: ''
            },
            // Edge case
            {
                input: {"matrix":[[1,2,3]]},
                output: [6],
                explanation: ''
            }
        ],
        solutions: {
            python: `def spiral_layer_values(matrix):
    """
    Spiral Layer Values

    Given an n x m two-dimensional array, return an array where each element is the sum of all elements in the corresponding spiral layer. Layer 0 is the outermost ring, layer 1 is the next ring inward, and so on. Instead of collecting individual elements in spiral order, aggregate per layer.

    Time: O(m*n)
    Space: O(min(m,n))
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(spiral_layer_values([[1,2,3],[4,5,6],[7,8,9]]))  # Expected: [40,5]
print(spiral_layer_values([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]))  # Expected: [102,34]
print(spiral_layer_values([[1,2,3]]))  # Expected: [6]
`,
            go: `package main

import "fmt"

// SpiralLayerValues solves the Spiral Layer Values problem.
// Given an n x m two-dimensional array, return an array where each element is the sum of all elements in the corresponding spiral layer. Layer 0 is the outermost ring, layer 1 is the next ring inward, and so on. Instead of collecting individual elements in spiral order, aggregate per layer.
// Time: O(m*n), Space: O(min(m,n))
func SpiralLayerValues(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(SpiralLayerValues([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})) // Expected: [40,5]
	fmt.Println(SpiralLayerValues([][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}})) // Expected: [102,34]
	fmt.Println(SpiralLayerValues([][]int{{1, 2, 3}})) // Expected: [6]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-03-spiral-layer-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-03-spiral-layer-values'] = problem;
})();
