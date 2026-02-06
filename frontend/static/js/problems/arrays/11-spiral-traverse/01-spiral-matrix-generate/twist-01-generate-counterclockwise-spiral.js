/**
 * Generate Counterclockwise Spiral
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generate Counterclockwise Spiral',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Generate an n x n matrix filled with 1 to n^2 in counterclockwise spiral order. Start from the top-left corner and fill downward first, then right, then up, then left, spiraling inward.',
        problem: 'Use boundary variables and fill in order: down the left column, right along the bottom, up the right column, left along the top. Shrink boundaries after each pass.',
        hints: ["Start by filling the left column from top to bottom.", "After filling down, fill the bottom row from left to right.", "Continue with right column bottom-to-top, then top row right-to-left.", "Shrink boundaries after completing each ring."],
        complexity: { time: 'O(n^2)', space: 'O(n^2)' },
        examples: [
            {
                input: {"n": 3},
                output: [[1, 8, 7], [2, 9, 6], [3, 4, 5]],
                explanation: 'Fill down: 1,2,3. Right: 4,5. Up: 6,7. Left: 8. Center: 9.'
            },
            {
                input: {"n": 2},
                output: [[1, 4], [2, 3]],
                explanation: 'Down: 1,2. Right: 3. Up: 4.'
            },
            {
                input: {"n": 1},
                output: [[1]],
                explanation: 'Single cell matrix.'
            }
        ],
        solutions: {
            python: `def generate_ccw_spiral(n):
    """Generate n x n matrix in counterclockwise spiral order.
    Time: O(n^2), Space: O(n^2)"""
    matrix = [[0] * n for _ in range(n)]
    top, bottom = 0, n - 1
    left, right = 0, n - 1
    num = 1

    while top <= bottom and left <= right:
        for row in range(top, bottom + 1):
            matrix[row][left] = num
            num += 1
        left += 1

        for col in range(left, right + 1):
            matrix[bottom][col] = num
            num += 1
        bottom -= 1

        if left <= right:
            for row in range(bottom, top - 1, -1):
                matrix[row][right] = num
                num += 1
            right -= 1

        if top <= bottom:
            for col in range(right, left - 1, -1):
                matrix[top][col] = num
                num += 1
            top += 1

    return matrix

# Tests
if __name__ == "__main__":
    for row in generate_ccw_spiral(3):
        print(row)  # [[1,8,7],[2,9,6],[3,4,5]]
    print(generate_ccw_spiral(2))  # [[1,4],[2,3]]`,
            go: `package main

import "fmt"

func generateCCWSpiral(n int) [][]int {
    matrix := make([][]int, n)
    for i := range matrix {
        matrix[i] = make([]int, n)
    }
    top, bottom := 0, n-1
    left, right := 0, n-1
    num := 1

    for top <= bottom && left <= right {
        for row := top; row <= bottom; row++ {
            matrix[row][left] = num
            num++
        }
        left++
        for col := left; col <= right; col++ {
            matrix[bottom][col] = num
            num++
        }
        bottom--
        if left <= right {
            for row := bottom; row >= top; row-- {
                matrix[row][right] = num
                num++
            }
            right--
        }
        if top <= bottom {
            for col := right; col >= left; col-- {
                matrix[top][col] = num
                num++
            }
            top++
        }
    }
    return matrix
}

func main() {
    for _, row := range generateCCWSpiral(3) {
        fmt.Println(row)
    }
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-01-generate-counterclockwise-spiral', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-01-generate-counterclockwise-spiral'] = problem;
})();
