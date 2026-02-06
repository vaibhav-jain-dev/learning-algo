/**
 * Spiral with Obstacles
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/02-spiral-matrix-starting-point
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral with Obstacles',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/02-spiral-matrix-starting-point',
        description: 'Walk in a clockwise spiral from a starting point in a grid, but some cells are blocked. Skip blocked cells and continue the spiral path without visiting them.',
        problem: 'Use the expanding spiral pattern but check each cell for obstacles. Blocked cells are not added to result but still count toward spiral position tracking.',
        hints: ["Use a set or 2D array to mark blocked cells.", "Continue the spiral path even when a cell is blocked.", "Blocked cells still consume a position in the spiral sequence.", "Count only valid (unblocked, in-bounds) cells toward the result."],
        complexity: { time: 'O(max(rows,cols)^2)', space: 'O(rows*cols)' },
        examples: [
            {
                input: {"rows": 3, "cols": 3, "rStart": 1, "cStart": 1, "blocked": [[0, 2]]},
                output: [[1, 1], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [0, 0], [0, 1]],
                explanation: 'Spiral from center skipping blocked cell (0,2). 8 cells visited instead of 9.'
            },
            {
                input: {"rows": 2, "cols": 2, "rStart": 0, "cStart": 0, "blocked": []},
                output: [[0, 0], [0, 1], [1, 1], [1, 0]],
                explanation: 'No obstacles, normal spiral from (0,0).'
            },
            {
                input: {"rows": 3, "cols": 3, "rStart": 0, "cStart": 0, "blocked": [[1, 1]]},
                output: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0]],
                explanation: 'Center cell blocked, all other cells visited.'
            }
        ],
        solutions: {
            python: `def spiral_with_obstacles(rows, cols, rStart, cStart, blocked):
    """Spiral traversal skipping blocked cells.
    Time: O(max(rows,cols)^2), Space: O(rows*cols)"""
    blocked_set = set(map(tuple, blocked))
    result = []
    total = rows * cols - len(blocked_set)
    dr, dc = [0, 1, 0, -1], [1, 0, -1, 0]
    r, c = rStart, cStart
    direction = 0
    steps, steps_taken, turn_count = 1, 0, 0

    while len(result) < total:
        if 0 <= r < rows and 0 <= c < cols and (r, c) not in blocked_set:
            result.append([r, c])
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

if __name__ == "__main__":
    print(spiral_with_obstacles(3, 3, 1, 1, [[0,2]]))
    print(spiral_with_obstacles(2, 2, 0, 0, []))`,
            go: `package main

import "fmt"

func spiralWithObstacles(rows, cols, rStart, cStart int, blocked [][]int) [][]int {
    blockedSet := map[[2]int]bool{}
    for _, b := range blocked {
        blockedSet[[2]int{b[0], b[1]}] = true
    }
    result := [][]int{}
    total := rows*cols - len(blockedSet)
    dr := []int{0, 1, 0, -1}
    dc := []int{1, 0, -1, 0}
    r, c := rStart, cStart
    direction, steps, stepsTaken, turnCount := 0, 1, 0, 0

    for len(result) < total {
        if r >= 0 && r < rows && c >= 0 && c < cols && !blockedSet[[2]int{r, c}] {
            result = append(result, []int{r, c})
        }
        r += dr[direction]
        c += dc[direction]
        stepsTaken++
        if stepsTaken == steps {
            stepsTaken = 0
            direction = (direction + 1) % 4
            turnCount++
            if turnCount%2 == 0 { steps++ }
        }
    }
    return result
}

func main() {
    fmt.Println(spiralWithObstacles(3, 3, 1, 1, [][]int{{0,2}}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/02-spiral-matrix-starting-point/twist-01-spiral-with-obstacles', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/02-spiral-matrix-starting-point/twist-01-spiral-with-obstacles'] = problem;
})();
