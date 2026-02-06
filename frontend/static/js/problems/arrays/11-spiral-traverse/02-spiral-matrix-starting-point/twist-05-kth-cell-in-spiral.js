/**
 * K-th Cell in Spiral
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/02-spiral-matrix-starting-point
 */
(function() {
    'use strict';

    const problem = {
        name: 'K-th Cell in Spiral',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/02-spiral-matrix-starting-point',
        description: 'Given grid dimensions, a starting cell, and an integer K, return the coordinates of the K-th cell visited in the spiral walk (1-indexed). Do this without generating the entire spiral.',
        problem: 'Simulate the spiral but stop as soon as the K-th in-bounds cell is found. This avoids generating the full spiral for large grids when K is small.',
        hints: ["Simulate the spiral step by step from the starting cell.", "Count only in-bounds cells toward K.", "Stop as soon as the K-th valid cell is reached.", "For large K close to rows*cols, this approaches O(rows*cols) but saves for small K."],
        complexity: { time: 'O(K + wasted_steps)', space: 'O(1)' },
        examples: [
            {
                input: {"rows": 3, "cols": 3, "rStart": 1, "cStart": 1, "k": 5},
                output: [2, 0],
                explanation: 'Spiral from (1,1): cells 1=(1,1), 2=(1,2), 3=(2,2), 4=(2,1), 5=(2,0).'
            },
            {
                input: {"rows": 1, "cols": 4, "rStart": 0, "cStart": 0, "k": 3},
                output: [0, 2],
                explanation: 'Linear spiral in 1-row grid: (0,0), (0,1), (0,2). K=3 is (0,2).'
            },
            {
                input: {"rows": 5, "cols": 5, "rStart": 2, "cStart": 2, "k": 1},
                output: [2, 2],
                explanation: 'K=1 returns the starting cell itself.'
            }
        ],
        solutions: {
            python: `def kth_cell_in_spiral(rows, cols, rStart, cStart, k):
    """Find K-th cell visited in spiral (1-indexed).
    Time: O(K + wasted), Space: O(1)"""
    dr, dc = [0, 1, 0, -1], [1, 0, -1, 0]
    r, c = rStart, cStart
    direction = 0
    steps, steps_taken, turn_count = 1, 0, 0
    count = 0

    while True:
        if 0 <= r < rows and 0 <= c < cols:
            count += 1
            if count == k:
                return [r, c]
        r += dr[direction]
        c += dc[direction]
        steps_taken += 1
        if steps_taken == steps:
            steps_taken = 0
            direction = (direction + 1) % 4
            turn_count += 1
            if turn_count % 2 == 0:
                steps += 1

if __name__ == "__main__":
    print(kth_cell_in_spiral(3, 3, 1, 1, 5))  # [2, 0]
    print(kth_cell_in_spiral(1, 4, 0, 0, 3))  # [0, 2]`,
            go: `package main

import "fmt"

func kthCellInSpiral(rows, cols, rStart, cStart, k int) []int {
    dr := []int{0, 1, 0, -1}
    dc := []int{1, 0, -1, 0}
    r, c := rStart, cStart
    direction, steps, stepsTaken, turnCount := 0, 1, 0, 0
    count := 0

    for {
        if r >= 0 && r < rows && c >= 0 && c < cols {
            count++
            if count == k { return []int{r, c} }
        }
        r += dr[direction]; c += dc[direction]
        stepsTaken++
        if stepsTaken == steps {
            stepsTaken = 0; direction = (direction+1)%4; turnCount++
            if turnCount%2 == 0 { steps++ }
        }
    }
}

func main() {
    fmt.Println(kthCellInSpiral(3, 3, 1, 1, 5))
    fmt.Println(kthCellInSpiral(1, 4, 0, 0, 3))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/02-spiral-matrix-starting-point/twist-05-kth-cell-in-spiral', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/02-spiral-matrix-starting-point/twist-05-kth-cell-in-spiral'] = problem;
})();
