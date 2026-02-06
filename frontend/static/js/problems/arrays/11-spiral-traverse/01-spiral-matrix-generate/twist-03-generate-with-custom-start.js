/**
 * Generate with Custom Start
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generate with Custom Start',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Fill an n x n matrix in spiral order starting from a given cell (r, c) instead of (0, 0). The spiral expands outward from the starting point, filling cells with values 1, 2, 3, ... in clockwise order.',
        problem: 'Start at the given cell and use the expanding spiral pattern (step sizes 1,1,2,2,3,3,...). Only fill cells that are within bounds and not yet filled.',
        hints: ["Begin at (r, c) and place value 1 there.", "Use clockwise direction vectors: right, down, left, up.", "Expand step sizes after every two direction changes.", "Skip positions outside the matrix bounds."],
        complexity: { time: 'O(n^2)', space: 'O(n^2)' },
        examples: [
            {
                input: {"n": 3, "r": 1, "c": 1},
                output: [[6, 7, 8], [5, 1, 2], [4, 3, 9]],
                explanation: 'Start at center (1,1)=1. Spiral outward: right=2, down=3, left=4,5, up=6,7, right=8,9.'
            },
            {
                input: {"n": 3, "r": 0, "c": 0},
                output: [[1, 2, 3], [8, 9, 4], [7, 6, 5]],
                explanation: 'Starting at (0,0) is the standard spiral generate.'
            },
            {
                input: {"n": 2, "r": 0, "c": 1},
                output: [[3, 1], [4, 2]],
                explanation: 'Start at (0,1)=1. Down=2, left=3, down=4.'
            }
        ],
        solutions: {
            python: `def generate_with_custom_start(n, r, c):
    """Generate n x n spiral matrix starting from (r, c).
    Time: O(n^2), Space: O(n^2)"""
    matrix = [[0] * n for _ in range(n)]
    dr = [0, 1, 0, -1]  # right, down, left, up
    dc = [1, 0, -1, 0]
    
    direction = 0
    steps = 1
    steps_taken = 0
    turn_count = 0
    num = 1
    total = n * n

    while num <= total:
        if 0 <= r < n and 0 <= c < n and matrix[r][c] == 0:
            matrix[r][c] = num
            num += 1

        r += dr[direction]
        c += dc[direction]
        steps_taken += 1

        if steps_taken == steps:
            steps_taken = 0
            direction = (direction + 1) % 4
            turn_count += 1
            if turn_count % 2 == 0:
                steps += 1

    return matrix

# Tests
if __name__ == "__main__":
    for row in generate_with_custom_start(3, 1, 1):
        print(row)  # [[6,7,8],[5,1,2],[4,3,9]]
    for row in generate_with_custom_start(3, 0, 0):
        print(row)  # standard spiral`,
            go: `package main

import "fmt"

func generateWithCustomStart(n, r, c int) [][]int {
    matrix := make([][]int, n)
    for i := range matrix {
        matrix[i] = make([]int, n)
    }
    dr := []int{0, 1, 0, -1}
    dc := []int{1, 0, -1, 0}
    direction := 0
    steps := 1
    stepsTaken := 0
    turnCount := 0
    num := 1
    total := n * n

    for num <= total {
        if r >= 0 && r < n && c >= 0 && c < n && matrix[r][c] == 0 {
            matrix[r][c] = num
            num++
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
    return matrix
}

func main() {
    for _, row := range generateWithCustomStart(3, 1, 1) {
        fmt.Println(row)
    }
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-03-generate-with-custom-start', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-03-generate-with-custom-start'] = problem;
})();
