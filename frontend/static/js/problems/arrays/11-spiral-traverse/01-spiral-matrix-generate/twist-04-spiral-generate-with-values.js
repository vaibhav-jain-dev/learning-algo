/**
 * Spiral Generate with Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Generate with Values',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Given a list of values and an integer n, place the values into an n x n matrix following spiral order. If the list has fewer values than n^2 cells, remaining cells should be filled with 0.',
        problem: 'Use the standard spiral boundary approach but instead of filling with incrementing numbers, pull from the given values list. Stop filling from the list when it is exhausted.',
        hints: ["Iterate through the spiral path using boundary variables.", "Place values from the list in spiral order.", "When the values list is exhausted, fill remaining cells with 0.", "The matrix size is fixed at n x n regardless of values length."],
        complexity: { time: 'O(n^2)', space: 'O(n^2)' },
        examples: [
            {
                input: {"values": [5, 10, 15, 20], "n": 3},
                output: [[5, 10, 15], [0, 0, 20], [0, 0, 0]],
                explanation: 'Place 5,10,15 in top row, 20 in right column. Remaining cells are 0.'
            },
            {
                input: {"values": [1, 2, 3, 4, 5, 6, 7, 8, 9], "n": 3},
                output: [[1, 2, 3], [8, 9, 4], [7, 6, 5]],
                explanation: 'Exactly 9 values fill the entire 3x3 matrix.'
            },
            {
                input: {"values": [42], "n": 2},
                output: [[42, 0], [0, 0]],
                explanation: 'Only one value placed at (0,0).'
            }
        ],
        solutions: {
            python: `def spiral_generate_with_values(values, n):
    """Place values into n x n matrix in spiral order.
    Time: O(n^2), Space: O(n^2)"""
    matrix = [[0] * n for _ in range(n)]
    top, bottom = 0, n - 1
    left, right = 0, n - 1
    idx = 0

    while top <= bottom and left <= right and idx < len(values):
        for col in range(left, right + 1):
            if idx < len(values):
                matrix[top][col] = values[idx]
                idx += 1
        top += 1
        for row in range(top, bottom + 1):
            if idx < len(values):
                matrix[row][right] = values[idx]
                idx += 1
        right -= 1
        if top <= bottom:
            for col in range(right, left - 1, -1):
                if idx < len(values):
                    matrix[bottom][col] = values[idx]
                    idx += 1
            bottom -= 1
        if left <= right:
            for row in range(bottom, top - 1, -1):
                if idx < len(values):
                    matrix[row][left] = values[idx]
                    idx += 1
            left += 1

    return matrix

# Tests
if __name__ == "__main__":
    print(spiral_generate_with_values([5,10,15,20], 3))
    print(spiral_generate_with_values([1,2,3,4,5,6,7,8,9], 3))
    print(spiral_generate_with_values([42], 2))`,
            go: `package main

import "fmt"

func spiralGenerateWithValues(values []int, n int) [][]int {
    matrix := make([][]int, n)
    for i := range matrix {
        matrix[i] = make([]int, n)
    }
    top, bottom := 0, n-1
    left, right := 0, n-1
    idx := 0

    for top <= bottom && left <= right && idx < len(values) {
        for col := left; col <= right && idx < len(values); col++ {
            matrix[top][col] = values[idx]
            idx++
        }
        top++
        for row := top; row <= bottom && idx < len(values); row++ {
            matrix[row][right] = values[idx]
            idx++
        }
        right--
        if top <= bottom {
            for col := right; col >= left && idx < len(values); col-- {
                matrix[bottom][col] = values[idx]
                idx++
            }
            bottom--
        }
        if left <= right {
            for row := bottom; row >= top && idx < len(values); row-- {
                matrix[row][left] = values[idx]
                idx++
            }
            left++
        }
    }
    return matrix
}

func main() {
    fmt.Println(spiralGenerateWithValues([]int{5,10,15,20}, 3))
    fmt.Println(spiralGenerateWithValues([]int{1,2,3,4,5,6,7,8,9}, 3))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-04-spiral-generate-with-values', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-04-spiral-generate-with-values'] = problem;
})();
