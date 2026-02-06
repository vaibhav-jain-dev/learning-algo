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
        complexity: { time: 'O(m*n)', space: 'O(min(m,n))' },
        examples: [
            {
                input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
                output: [40, 5],
                explanation: 'Layer 0: 1+2+3+6+9+8+7+4 = 40. Layer 1: 5.'
            },
            {
                input: { matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]] },
                output: [102, 34],
                explanation: 'Layer 0: 1+2+3+4+8+12+16+15+14+13+9+5 = 102. Layer 1: 6+7+11+10 = 34.'
            },
            {
                input: { matrix: [[1,2,3]] },
                output: [6],
                explanation: 'Single row matrix has one layer with sum 1+2+3 = 6.'
            }
        ],
        solutions: {
            python: `def spiral_layer_values(matrix):
    """
    Return sum of elements in each spiral layer.
    Time: O(m*n), Space: O(min(m,n))
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    result = []
    top, bottom = 0, rows - 1
    left, right = 0, cols - 1

    while top <= bottom and left <= right:
        layer_sum = 0

        # Top row
        for col in range(left, right + 1):
            layer_sum += matrix[top][col]

        # Right column (excluding top corner)
        for row in range(top + 1, bottom + 1):
            layer_sum += matrix[row][right]

        # Bottom row (excluding right corner)
        if top < bottom:
            for col in range(right - 1, left - 1, -1):
                layer_sum += matrix[bottom][col]

        # Left column (excluding both corners)
        if left < right:
            for row in range(bottom - 1, top, -1):
                layer_sum += matrix[row][left]

        result.append(layer_sum)
        top += 1
        bottom -= 1
        left += 1
        right -= 1

    return result


# Tests
if __name__ == "__main__":
    print(spiral_layer_values([[1,2,3],[4,5,6],[7,8,9]]))
    # [40, 5]
    print(spiral_layer_values([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]))
    # [102, 34]
    print(spiral_layer_values([[1,2,3]]))
    # [6]`,
            go: `package main

import "fmt"

func spiralLayerValues(matrix [][]int) []int {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return []int{}
    }

    rows, cols := len(matrix), len(matrix[0])
    result := []int{}
    top, bottom := 0, rows-1
    left, right := 0, cols-1

    for top <= bottom && left <= right {
        layerSum := 0

        for col := left; col <= right; col++ {
            layerSum += matrix[top][col]
        }
        for row := top + 1; row <= bottom; row++ {
            layerSum += matrix[row][right]
        }
        if top < bottom {
            for col := right - 1; col >= left; col-- {
                layerSum += matrix[bottom][col]
            }
        }
        if left < right {
            for row := bottom - 1; row > top; row-- {
                layerSum += matrix[row][left]
            }
        }

        result = append(result, layerSum)
        top++
        bottom--
        left++
        right--
    }

    return result
}

func main() {
    fmt.Println(spiralLayerValues([][]int{{1,2,3},{4,5,6},{7,8,9}}))
    // [40 5]
    fmt.Println(spiralLayerValues([][]int{{1,2,3,4},{5,6,7,8},{9,10,11,12},{13,14,15,16}}))
    // [102 34]
}`
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
