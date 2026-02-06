/**
 * Multi-Layer Spiral with Gaps
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multi-Layer Spiral with Gaps',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Generate a spiral matrix but leave every other layer empty (filled with 0), creating a ring pattern. Layer 0 (outermost) is filled, layer 1 is empty, layer 2 is filled, and so on.',
        problem: 'Track the current layer during spiral generation. If the layer number is odd, skip filling those cells (leave as 0). Continue the counter only for filled layers.',
        hints: ["Determine which layer each cell belongs to: min(row, col, n-1-row, n-1-col).", "Only fill cells in even-numbered layers.", "The counter for values continues across filled layers.", "Odd layers remain as zeros."],
        complexity: { time: 'O(n^2)', space: 'O(n^2)' },
        examples: [
            {
                input: {"n": 5},
                output: [[1, 2, 3, 4, 5], [16, 0, 0, 0, 6], [15, 0, 17, 0, 7], [14, 0, 0, 0, 8], [13, 12, 11, 10, 9]],
                explanation: 'Layer 0 filled with 1-16. Layer 1 all zeros. Layer 2 (center) filled with 17.'
            },
            {
                input: {"n": 3},
                output: [[1, 2, 3], [8, 0, 4], [7, 6, 5]],
                explanation: 'Layer 0 filled with 1-8. Layer 1 (center) is odd, so 0.'
            },
            {
                input: {"n": 4},
                output: [[1, 2, 3, 4], [12, 0, 0, 5], [11, 0, 0, 6], [10, 9, 8, 7]],
                explanation: 'Layer 0 filled 1-12. Layer 1 (inner 2x2) all zeros.'
            }
        ],
        solutions: {
            python: `def multi_layer_spiral_gaps(n):
    """Generate spiral matrix with alternating filled/empty layers.
    Time: O(n^2), Space: O(n^2)"""
    matrix = [[0] * n for _ in range(n)]
    num = 1
    num_layers = (n + 1) // 2

    for layer in range(num_layers):
        if layer % 2 != 0:
            continue  # Skip odd layers

        top, bottom = layer, n - 1 - layer
        left, right = layer, n - 1 - layer

        if top > bottom or left > right:
            break

        for col in range(left, right + 1):
            matrix[top][col] = num
            num += 1
        for row in range(top + 1, bottom + 1):
            matrix[row][right] = num
            num += 1
        if top < bottom:
            for col in range(right - 1, left - 1, -1):
                matrix[bottom][col] = num
                num += 1
        if left < right:
            for row in range(bottom - 1, top, -1):
                matrix[row][left] = num
                num += 1

    return matrix

# Tests
if __name__ == "__main__":
    for row in multi_layer_spiral_gaps(5):
        print(row)
    print()
    for row in multi_layer_spiral_gaps(3):
        print(row)`,
            go: `package main

import "fmt"

func multiLayerSpiralGaps(n int) [][]int {
    matrix := make([][]int, n)
    for i := range matrix {
        matrix[i] = make([]int, n)
    }
    num := 1
    numLayers := (n + 1) / 2

    for layer := 0; layer < numLayers; layer++ {
        if layer%2 != 0 {
            continue
        }
        top, bottom := layer, n-1-layer
        left, right := layer, n-1-layer
        if top > bottom || left > right {
            break
        }
        for col := left; col <= right; col++ {
            matrix[top][col] = num
            num++
        }
        for row := top + 1; row <= bottom; row++ {
            matrix[row][right] = num
            num++
        }
        if top < bottom {
            for col := right - 1; col >= left; col-- {
                matrix[bottom][col] = num
                num++
            }
        }
        if left < right {
            for row := bottom - 1; row > top; row-- {
                matrix[row][left] = num
                num++
            }
        }
    }
    return matrix
}

func main() {
    for _, row := range multiLayerSpiralGaps(5) {
        fmt.Println(row)
    }
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-05-multi-layer-spiral-with-gaps', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-05-multi-layer-spiral-with-gaps'] = problem;
})();
