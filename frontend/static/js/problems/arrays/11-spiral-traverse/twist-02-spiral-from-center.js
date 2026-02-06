/**
 * Spiral from Center
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral from Center',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array, return a one-dimensional array of all elements starting from the center of the matrix and expanding outward in a clockwise spiral. Direction lengths grow as 1,1,2,2,3,3,... as you expand. For even dimensions, start from the upper-left cell of the center 2x2 block.',
        problem: 'Find the center cell, then spiral outward using an expanding step pattern. Track direction changes: after every two turns, increase the step count by one. Filter out positions that fall outside the matrix boundaries.',
        hints: [
            'The center of the matrix is at ((rows-1)//2, (cols-1)//2).',
            'Use direction vectors for right, down, left, up and cycle through them.',
            'The step pattern is 1,1,2,2,3,3,... - increase steps after every two direction changes.',
            'Check bounds before adding each cell to the result.'
        ],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            {
                input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] },
                output: [5, 6, 9, 8, 7, 4, 1, 2, 3],
                explanation: 'Center is (1,1)=5. Right: 6. Down: 9. Left: 8,7. Up: 4,1. Right: 2,3.'
            },
            {
                input: { matrix: [[1,2],[3,4]] },
                output: [1, 2, 4, 3],
                explanation: 'Center upper-left is (0,0)=1. Right: 2. Down: 4. Left: 3.'
            },
            {
                input: { matrix: [[1,2,3,4],[5,6,7,8],[9,10,11,12]] },
                output: [6, 7, 11, 10, 9, 5, 1, 2, 3, 4, 8, 12],
                explanation: 'Center is (1,1)=6. Spiral outward clockwise visiting all cells.'
            }
        ],
        solutions: {
            python: `def spiral_from_center(matrix):
    """
    Traverse matrix in clockwise spiral starting from center.
    Time: O(m*n), Space: O(m*n)
    """
    if not matrix or not matrix[0]:
        return []

    rows, cols = len(matrix), len(matrix[0])
    total = rows * cols
    result = []

    # Center position
    r = (rows - 1) // 2
    c = (cols - 1) // 2

    # Directions: right, down, left, up
    dr = [0, 1, 0, -1]
    dc = [1, 0, -1, 0]

    direction = 0
    steps = 1
    steps_taken = 0
    turn_count = 0

    while len(result) < total:
        if 0 <= r < rows and 0 <= c < cols:
            result.append(matrix[r][c])

        r += dr[direction]
        c += dc[direction]
        steps_taken += 1

        if steps_taken == steps:
            steps_taken = 0
            direction = (direction + 1) % 4
            turn_count += 1
            if turn_count % 2 == 0:
                steps += 1

    return result


# Tests
if __name__ == "__main__":
    print(spiral_from_center([[1,2,3],[4,5,6],[7,8,9]]))
    # [5, 6, 9, 8, 7, 4, 1, 2, 3]
    print(spiral_from_center([[1,2],[3,4]]))
    # [1, 2, 4, 3]
    print(spiral_from_center([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))
    # [6, 7, 11, 10, 9, 5, 1, 2, 3, 4, 8, 12]`,
            go: `package main

import "fmt"

func spiralFromCenter(matrix [][]int) []int {
    if len(matrix) == 0 || len(matrix[0]) == 0 {
        return []int{}
    }

    rows, cols := len(matrix), len(matrix[0])
    total := rows * cols
    result := []int{}

    r := (rows - 1) / 2
    c := (cols - 1) / 2

    dr := []int{0, 1, 0, -1}
    dc := []int{1, 0, -1, 0}

    direction := 0
    steps := 1
    stepsTaken := 0
    turnCount := 0

    for len(result) < total {
        if r >= 0 && r < rows && c >= 0 && c < cols {
            result = append(result, matrix[r][c])
        }
        r += dr[direction]
        c += dc[direction]
        stepsTaken++

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
    fmt.Println(spiralFromCenter([][]int{{1,2,3},{4,5,6},{7,8,9}}))
    // [5 6 9 8 7 4 1 2 3]
    fmt.Println(spiralFromCenter([][]int{{1,2},{3,4}}))
    // [1 2 4 3]
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-02-spiral-from-center', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-02-spiral-from-center'] = problem;
})();
