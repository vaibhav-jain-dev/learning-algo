/**
 * Spiral Matrix Transpose
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Matrix Transpose',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '06-transpose-matrix',
        description: 'Read a matrix in spiral order and write the values in spiral order to a transposed-dimension matrix.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {},
        output: null,
        explanation: 'See problem description'
    }
        ],
        solutions: {
            python: `def spiralMatrixTranspose(matrix):
    """
    Spiral Matrix Transpose

    Read matrix in spiral order, write to transposed-dimension matrix in spiral order.
    Input: m x n matrix -> Output: n x m matrix

    Time: O(m * n) - visit each element once
    Space: O(m * n) for the result matrix

    Args:
        matrix: m x n 2D list

    Returns:
        n x m matrix with spiral-read values written in spiral order
    """
    if not matrix or not matrix[0]:
        return []

    m, n = len(matrix), len(matrix[0])

    def spiral_read(mat):
        """Read matrix elements in spiral order (clockwise from top-left)"""
        result = []
        if not mat or not mat[0]:
            return result

        rows, cols = len(mat), len(mat[0])
        top, bottom, left, right = 0, rows - 1, 0, cols - 1

        while top <= bottom and left <= right:
            # Right
            for col in range(left, right + 1):
                result.append(mat[top][col])
            top += 1

            # Down
            for row in range(top, bottom + 1):
                result.append(mat[row][right])
            right -= 1

            # Left
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    result.append(mat[bottom][col])
                bottom -= 1

            # Up
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    result.append(mat[row][left])
                left += 1

        return result

    def spiral_write(values, rows, cols):
        """Write values in spiral order to a rows x cols matrix"""
        result = [[0] * cols for _ in range(rows)]
        if not values:
            return result

        top, bottom, left, right = 0, rows - 1, 0, cols - 1
        idx = 0

        while top <= bottom and left <= right and idx < len(values):
            # Right
            for col in range(left, right + 1):
                if idx < len(values):
                    result[top][col] = values[idx]
                    idx += 1
            top += 1

            # Down
            for row in range(top, bottom + 1):
                if idx < len(values):
                    result[row][right] = values[idx]
                    idx += 1
            right -= 1

            # Left
            if top <= bottom:
                for col in range(right, left - 1, -1):
                    if idx < len(values):
                        result[bottom][col] = values[idx]
                        idx += 1
                bottom -= 1

            # Up
            if left <= right:
                for row in range(bottom, top - 1, -1):
                    if idx < len(values):
                        result[row][left] = values[idx]
                        idx += 1
                left += 1

        return result

    # Read in spiral, write in spiral to transposed dimensions
    values = spiral_read(matrix)
    return spiral_write(values, n, m)


# Test
if __name__ == "__main__":
    matrix = [
        [1, 2, 3],
        [4, 5, 6]
    ]
    result = spiralMatrixTranspose(matrix)
    for row in result:
        print(row)`,
            go: `package main

import "fmt"

// SpiralMatrixTranspose reads matrix in spiral, writes to transposed matrix in spiral
// Time: O(m*n), Space: O(m*n)
func SpiralMatrixTranspose(matrix [][]int) [][]int {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return [][]int{}
    }

    m, n := len(matrix), len(matrix[0])

    // Read in spiral order
    values := spiralRead(matrix)

    // Write in spiral order to n x m matrix
    return spiralWrite(values, n, m)
}

func spiralRead(mat [][]int) []int {
    var result []int
    if len(mat) == 0 || len(mat[0]) == 0 {
        return result
    }

    rows, cols := len(mat), len(mat[0])
    top, bottom, left, right := 0, rows-1, 0, cols-1

    for top <= bottom && left <= right {
        // Right
        for col := left; col <= right; col++ {
            result = append(result, mat[top][col])
        }
        top++

        // Down
        for row := top; row <= bottom; row++ {
            result = append(result, mat[row][right])
        }
        right--

        // Left
        if top <= bottom {
            for col := right; col >= left; col-- {
                result = append(result, mat[bottom][col])
            }
            bottom--
        }

        // Up
        if left <= right {
            for row := bottom; row >= top; row-- {
                result = append(result, mat[row][left])
            }
            left++
        }
    }

    return result
}

func spiralWrite(values []int, rows, cols int) [][]int {
    result := make([][]int, rows)
    for i := range result {
        result[i] = make([]int, cols)
    }

    if len(values) == 0 {
        return result
    }

    top, bottom, left, right := 0, rows-1, 0, cols-1
    idx := 0

    for top <= bottom && left <= right && idx < len(values) {
        for col := left; col <= right && idx < len(values); col++ {
            result[top][col] = values[idx]
            idx++
        }
        top++

        for row := top; row <= bottom && idx < len(values); row++ {
            result[row][right] = values[idx]
            idx++
        }
        right--

        if top <= bottom {
            for col := right; col >= left && idx < len(values); col-- {
                result[bottom][col] = values[idx]
                idx++
            }
            bottom--
        }

        if left <= right {
            for row := bottom; row >= top && idx < len(values); row-- {
                result[row][left] = values[idx]
                idx++
            }
            left++
        }
    }

    return result
}

func main() {
    matrix := [][]int{
        {1, 2, 3},
        {4, 5, 6},
    }
    result := SpiralMatrixTranspose(matrix)
    for _, row := range result {
        fmt.Println(row)
    }
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 06-transpose-matrix
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/02-spiral-matrix-transpose', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/02-spiral-matrix-transpose'] = problem;

})();
