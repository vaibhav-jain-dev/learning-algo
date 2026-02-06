/**
 * Spiral Matrix Generate
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Matrix Generate',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given a positive integer n, generate an n x n matrix filled with elements from 1 to n^2 in spiral order.',
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
          "n": 3
        },
        output: "[\n    [1, 2, 3],\n    [8, 9, 4],\n    [7, 6, 5]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [1, 2, 3],\n    [8, 9, 4],\n    [7, 6, 5]\n]'
    },
    {
        input: {
          "n": 4
        },
        output: "[\n    [1,  2,  3,  4],\n    [12, 13, 14, 5],\n    [11, 16, 15, 6],\n    [10, 9,  8,  7]\n]",
        explanation: 'Given the input, the algorithm processes it to produce [\n    [1,  2,  3,  4],\n    [12, 13, 14, 5],\n    [11, 16, 15, 6],\n    [10, 9,  8,  7]\n]'
    },
    {
        input: {
          "n": 1
        },
        output: "[[1]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1]]'
    }
        ],
        solutions: {
            python: `def spiralMatrixGenerate(n):
    """
    Spiral Matrix Generate - Generate n x n matrix filled with 1 to n^2 in spiral order.

    Time: O(n^2) - Fill all n^2 cells
    Space: O(n^2) - Store the matrix (O(1) extra space)
    """
    # Initialize matrix with zeros
    matrix = [[0] * n for _ in range(n)]

    # Boundaries
    top, bottom = 0, n - 1
    left, right = 0, n - 1
    num = 1

    while top <= bottom and left <= right:
        # Fill top row (left to right)
        for col in range(left, right + 1):
            matrix[top][col] = num
            num += 1
        top += 1

        # Fill right column (top to bottom)
        for row in range(top, bottom + 1):
            matrix[row][right] = num
            num += 1
        right -= 1

        # Fill bottom row (right to left)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                matrix[bottom][col] = num
                num += 1
            bottom -= 1

        # Fill left column (bottom to top)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                matrix[row][left] = num
                num += 1
            left += 1

    return matrix


# Test
if __name__ == "__main__":
    for row in spiralMatrixGenerate(3):
        print(row)
    # Output: [1, 2, 3], [8, 9, 4], [7, 6, 5]
    print()
    for row in spiralMatrixGenerate(4):
        print(row)`,
            go: `package main

import "fmt"

// SpiralMatrixGenerate generates n x n matrix filled with 1 to n^2 in spiral order.
// Time: O(n^2), Space: O(n^2)
func SpiralMatrixGenerate(n int) [][]int {
    // Initialize matrix
    matrix := make([][]int, n)
    for i := range matrix {
        matrix[i] = make([]int, n)
    }

    // Boundaries
    top, bottom := 0, n-1
    left, right := 0, n-1
    num := 1

    for top <= bottom && left <= right {
        // Fill top row (left to right)
        for col := left; col <= right; col++ {
            matrix[top][col] = num
            num++
        }
        top++

        // Fill right column (top to bottom)
        for row := top; row <= bottom; row++ {
            matrix[row][right] = num
            num++
        }
        right--

        // Fill bottom row (right to left)
        if top <= bottom {
            for col := right; col >= left; col-- {
                matrix[bottom][col] = num
                num++
            }
            bottom--
        }

        // Fill left column (bottom to top)
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
    result := SpiralMatrixGenerate(3)
    for _, row := range result {
        fmt.Println(row)
    }
    // Output: [1 2 3], [8 9 4], [7 6 5]
    fmt.Println()
    result = SpiralMatrixGenerate(4)
    for _, row := range result {
        fmt.Println(row)
    }
}`
        },
        twists: [
            { title: 'Generate Counterclockwise Spiral', difficulty: 'Medium', description: 'Generate an n x n matrix filled with 1 to n^2 in counterclockwise spiral order (down first, then right, then up, then left).', whyDifferent: 'The fill direction changes from right-down-left-up to down-right-up-left, altering the boundary update sequence.', example: 'n = 3. Result: [[1,8,7],[2,9,6],[3,4,5]] (fills down first from top-left).' },
            { title: 'Rectangular Spiral Generate', difficulty: 'Medium', description: 'Generate an m x n rectangular matrix (not just square) filled in spiral order.', whyDifferent: 'Non-square matrices require careful handling when rows and columns exhaust at different times.', example: 'rows = 3, cols = 4. Result: [[1,2,3,4],[10,11,12,5],[9,8,7,6]].' },
            { title: 'Generate with Custom Start', difficulty: 'Hard', description: 'Fill an n x n matrix in spiral order but starting from a given cell (r, c) instead of (0, 0).', whyDifferent: 'The starting point is not a corner, so the spiral expansion pattern must handle arbitrary origins and boundary collisions.', example: 'n = 3, start = (1,1). Fill from center: [[6,7,8],[5,1,2],[4,3,9]] or similar.' },
            { title: 'Spiral Generate with Values', difficulty: 'Medium', description: 'Given a list of values, place them into an n x n matrix following spiral order. The list may have fewer values than cells.', whyDifferent: 'The fill stops when values are exhausted, requiring an early termination condition in the spiral logic.', example: 'values = [5,10,15,20], n = 3. Result: [[5,10,15],[0,0,20],[0,0,0]].' },
            { title: 'Multi-Layer Spiral with Gaps', difficulty: 'Hard', description: 'Generate a spiral matrix but leave every other layer empty (filled with 0), creating a ring pattern.', whyDifferent: 'Must track which layer is being filled and conditionally skip layers, adding layer-counting state to the generation.', example: 'n = 5. Layer 0 filled 1-16, layer 1 all zeros, layer 2 (center) filled 17.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 11-spiral-traverse
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate'] = problem;

})();
