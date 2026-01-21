/**
 * Anti Spiral Traverse
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti Spiral Traverse',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an m x n matrix, traverse it in anti-spiral order (counterclockwise from center outward or counterclockwise from outside inward, depending on interpretation). For this problem, we define anti-spiral as: Start from the center and move counterclockwise outward (left first, then down, right, up).',
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
        input: {
          "matrix": [
            "\\n    [1",
            2,
            "3]",
            "\\n    [4",
            5,
            "6]",
            "\\n    [7",
            8,
            "9]\\n"
          ]
        },
        output: "[5, 4, 7, 8, 9, 6, 3, 2, 1]\n(Center out, counterclockwise: 5->left->down->right->up)",
        explanation: 'Given the input, the algorithm processes it to produce [5, 4, 7, 8, 9, 6, 3, 2, 1]\n(Center out, counterclockwise: 5->left->down->right->up)'
    },
    {
        input: {
          "matrix": [
            "\\n    [1",
            2,
            3,
            "4]",
            "\\n    [5",
            6,
            7,
            "8]",
            "\\n    [9",
            10,
            11,
            "12]\\n"
          ]
        },
        output: "[6, 5, 9, 10, 11, 7, 3, 2, 1, 4, 8, 12]",
        explanation: 'Given the input, the algorithm processes it to produce [6, 5, 9, 10, 11, 7, 3, 2, 1, 4, 8, 12]'
    }
        ],
        solutions: {
            python: `def antiSpiralTraverse(matrix):
    """
    Anti Spiral Traverse - Traverse matrix counterclockwise starting from center.
    Direction order: left, down, right, up (counterclockwise from center outward).

    Time: O(m * n) - Visit all cells
    Space: O(m * n) - Store result
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    result = []

    # Find center (for odd dimensions, exact center; for even, upper-left of center 4)
    centerR = (rows - 1) // 2
    centerC = (cols - 1) // 2

    # Directions: left, down, right, up (counterclockwise)
    dr = [0, 1, 0, -1]
    dc = [-1, 0, 1, 0]

    # Track visited cells
    visited = [[False] * cols for _ in range(rows)]

    r, c = centerR, centerC
    direction = 0  # Start moving left
    steps = 1
    stepsTaken = 0
    turnCount = 0

    while len(result) < rows * cols:
        if 0 <= r < rows and 0 <= c < cols and not visited[r][c]:
            visited[r][c] = True
            result.append(matrix[r][c])

        # Move in current direction
        r += dr[direction]
        c += dc[direction]
        stepsTaken += 1

        # Check if we need to turn
        if stepsTaken == steps:
            stepsTaken = 0
            direction = (direction + 1) % 4
            turnCount += 1
            if turnCount % 2 == 0:
                steps += 1

    return result


# Test
if __name__ == "__main__":
    matrix1 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print(antiSpiralTraverse(matrix1))
    # Output: [5, 4, 7, 8, 9, 6, 3, 2, 1]

    matrix2 = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    print(antiSpiralTraverse(matrix2))`,
            go: `package main

import "fmt"

// AntiSpiralTraverse traverses matrix counterclockwise starting from center.
// Time: O(m * n), Space: O(m * n)
func AntiSpiralTraverse(matrix [][]int) []int {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return []int{}
    }

    rows, cols := len(matrix), len(matrix[0])
    result := []int{}

    // Find center
    centerR := (rows - 1) / 2
    centerC := (cols - 1) / 2

    // Directions: left, down, right, up (counterclockwise)
    dr := []int{0, 1, 0, -1}
    dc := []int{-1, 0, 1, 0}

    // Track visited cells
    visited := make([][]bool, rows)
    for i := range visited {
        visited[i] = make([]bool, cols)
    }

    r, c := centerR, centerC
    direction := 0 // Start moving left
    steps := 1
    stepsTaken := 0
    turnCount := 0

    for len(result) < rows*cols {
        if r >= 0 && r < rows && c >= 0 && c < cols && !visited[r][c] {
            visited[r][c] = true
            result = append(result, matrix[r][c])
        }

        // Move in current direction
        r += dr[direction]
        c += dc[direction]
        stepsTaken++

        // Check if we need to turn
        if stepsTaken == steps {
            stepsTaken = 0
            direction = (direction + 1) % 4
            turnCount++
            if turnCount%2 == 0 {
                steps++
            }
        }
    }

    return result
}

func main() {
    matrix1 := [][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}}
    fmt.Println(AntiSpiralTraverse(matrix1))
    // Output: [5 4 7 8 9 6 3 2 1]

    matrix2 := [][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}}
    fmt.Println(AntiSpiralTraverse(matrix2))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 11-spiral-traverse
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/03-anti-spiral-traverse', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/03-anti-spiral-traverse'] = problem;

})();
