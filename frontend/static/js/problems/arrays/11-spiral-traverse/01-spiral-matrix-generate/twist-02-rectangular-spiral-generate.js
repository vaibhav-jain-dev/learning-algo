/**
 * Rectangular Spiral Generate
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rectangular Spiral Generate',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Generate an m x n rectangular matrix (not necessarily square) filled with values 1 to m*n in clockwise spiral order. Handle cases where rows and columns exhaust at different times.',
        problem: 'Use the same boundary approach as square spiral but with separate row and column counts. The key difference is handling the case where one dimension is exhausted before the other.',
        hints: ["Initialize an m x n matrix with zeros.", "Use top, bottom, left, right boundaries.", "After each direction pass, check if boundaries still valid before continuing.", "Non-square means some passes may only traverse a single row or column."],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            {
                input: {"rows": 3, "cols": 4},
                output: [[1, 2, 3, 4], [10, 11, 12, 5], [9, 8, 7, 6]],
                explanation: '3x4 matrix filled in spiral: right 1-4, down 5, left 6-9, down 10, right 11-12.'
            },
            {
                input: {"rows": 2, "cols": 3},
                output: [[1, 2, 3], [6, 5, 4]],
                explanation: '2x3 matrix filled in spiral order.'
            },
            {
                input: {"rows": 1, "cols": 5},
                output: [[1, 2, 3, 4, 5]],
                explanation: 'Single row filled left to right.'
            }
        ],
        solutions: {
            python: `def rectangular_spiral_generate(rows, cols):
    """Generate m x n matrix in spiral order.
    Time: O(m*n), Space: O(m*n)"""
    matrix = [[0] * cols for _ in range(rows)]
    top, bottom = 0, rows - 1
    left, right = 0, cols - 1
    num = 1

    while top <= bottom and left <= right:
        for col in range(left, right + 1):
            matrix[top][col] = num
            num += 1
        top += 1
        for row in range(top, bottom + 1):
            matrix[row][right] = num
            num += 1
        right -= 1
        if top <= bottom:
            for col in range(right, left - 1, -1):
                matrix[bottom][col] = num
                num += 1
            bottom -= 1
        if left <= right:
            for row in range(bottom, top - 1, -1):
                matrix[row][left] = num
                num += 1
            left += 1

    return matrix

# Tests
if __name__ == "__main__":
    for row in rectangular_spiral_generate(3, 4):
        print(row)
    print(rectangular_spiral_generate(2, 3))
    print(rectangular_spiral_generate(1, 5))`,
            go: `package main

import "fmt"

func rectangularSpiralGenerate(rows, cols int) [][]int {
    matrix := make([][]int, rows)
    for i := range matrix {
        matrix[i] = make([]int, cols)
    }
    top, bottom := 0, rows-1
    left, right := 0, cols-1
    num := 1

    for top <= bottom && left <= right {
        for col := left; col <= right; col++ {
            matrix[top][col] = num
            num++
        }
        top++
        for row := top; row <= bottom; row++ {
            matrix[row][right] = num
            num++
        }
        right--
        if top <= bottom {
            for col := right; col >= left; col-- {
                matrix[bottom][col] = num
                num++
            }
            bottom--
        }
        if left <= right {
            for row := bottom; row >= top; row-- {
                matrix[row][left] = num
                num++
            }
            left++
        }
    }
    return matrix
}

func main() {
    for _, row := range rectangularSpiralGenerate(3, 4) {
        fmt.Println(row)
    }
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-02-rectangular-spiral-generate', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-02-rectangular-spiral-generate'] = problem;
})();
