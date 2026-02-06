/**
 * Counterclockwise Spiral
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Counterclockwise Spiral',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array, return a one-dimensional array of all elements in counterclockwise spiral order. Instead of the standard clockwise direction (right, down, left, up), traverse the matrix counterclockwise: down first, then right, then up, then left. Continue this pattern spiraling inward until every element has been visited.',
        problem: 'Reverse the direction order of the standard spiral traversal. Use boundary variables (top, bottom, left, right) and traverse in the order: down the left column, right along the bottom row, up the right column, left along the top row, shrinking boundaries after each pass.',
        hints: [
            'Use four boundary variables: top, bottom, left, right to track the unvisited region.',
            'The direction order is: down (left col), right (bottom row), up (right col), left (top row).',
            'After traversing each direction, shrink the corresponding boundary inward.',
            'Handle edge cases where the matrix has only one row or one column.'
        ],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            {
                input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
                output: [1, 4, 7, 8, 9, 6, 3, 2, 5],
                explanation: 'Starting top-left, go down: 1,4,7. Then right: 8,9. Then up: 6,3. Then left: 2. Then center: 5.'
            },
            {
                input: { matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
                output: [1, 5, 9, 10, 11, 12, 8, 4, 3, 2, 6, 7],
                explanation: 'Down left col: 1,5,9. Right bottom: 10,11,12. Up right col: 8,4. Left top: 3,2. Remaining: 6,7.'
            },
            {
                input: { matrix: [[1,2],[3,4]] },
                output: [1, 3, 4, 2],
                explanation: 'Down: 1,3. Right: 4. Up: 2. All elements visited in counterclockwise order.'
            }
        ],
        solutions: {
            python: `def counterclockwise_spiral(matrix):
    """
    Traverse matrix in counterclockwise spiral order.
    Direction: down, right, up, left.
    Time: O(m*n), Space: O(m*n)
    """
    if not matrix or not matrix[0]:
        return []

    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # Down the left column
        for row in range(top, bottom + 1):
            result.append(matrix[row][left])
        left += 1

        # Right along the bottom row
        for col in range(left, right + 1):
            result.append(matrix[bottom][col])
        bottom -= 1

        # Up the right column
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][right])
            right -= 1

        # Left along the top row
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[top][col])
            top += 1

    return result


# Tests
if __name__ == "__main__":
    print(counterclockwise_spiral([[1,2,3],[4,5,6],[7,8,9]]))
    # [1, 4, 7, 8, 9, 6, 3, 2, 5]
    print(counterclockwise_spiral([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))
    # [1, 5, 9, 10, 11, 12, 8, 4, 3, 2, 6, 7]
    print(counterclockwise_spiral([[1,2],[3,4]]))
    # [1, 3, 4, 2]`,
            go: `package main

import "fmt"

func counterclockwiseSpiral(matrix [][]int) []int {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return []int{}
    }

    result := []int{}
    top, bottom := 0, len(matrix)-1
    left, right := 0, len(matrix[0])-1

    for top <= bottom && left <= right {
        // Down the left column
        for row := top; row <= bottom; row++ {
            result = append(result, matrix[row][left])
        }
        left++

        // Right along the bottom row
        for col := left; col <= right; col++ {
            result = append(result, matrix[bottom][col])
        }
        bottom--

        // Up the right column
        if left <= right {
            for row := bottom; row >= top; row-- {
                result = append(result, matrix[row][right])
            }
            right--
        }

        // Left along the top row
        if top <= bottom {
            for col := right; col >= left; col-- {
                result = append(result, matrix[top][col])
            }
            top++
        }
    }

    return result
}

func main() {
    fmt.Println(counterclockwiseSpiral([][]int{{1,2,3},{4,5,6},{7,8,9}}))
    // [1 4 7 8 9 6 3 2 5]
    fmt.Println(counterclockwiseSpiral([][]int{{1,2,3,4},{5,6,7,8},{9,10,11,12}}))
    // [1 5 9 10 11 12 8 4 3 2 6 7]
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-01-counterclockwise-spiral', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-01-counterclockwise-spiral'] = problem;
})();
