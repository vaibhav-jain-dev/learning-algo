/**
 * Spiral with Direction Choice
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/02-spiral-matrix-starting-point
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral with Direction Choice',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/02-spiral-matrix-starting-point',
        description: 'At the starting point you can choose to start moving in any of 4 directions. Find the direction choice that visits all grid cells with the fewest out-of-bound steps (wasted steps where the spiral position is outside the grid).',
        problem: 'Simulate the spiral for all 4 starting directions. Count wasted steps for each. Return the direction with minimum waste.',
        hints: ["Try all 4 initial directions: right, down, left, up.", "For each, simulate the full spiral and count out-of-bounds positions.", "The direction with fewest wasted steps is optimal.", "Break ties by choosing the first direction in order."],
        complexity: { time: 'O(rows*cols * max(rows,cols))', space: 'O(1)' },
        examples: [
            {
                input: {"rows": 3, "cols": 5, "rStart": 1, "cStart": 2},
                output: {"direction": "right", "wasted": 6},
                explanation: 'Starting right from center of 3x5 wastes fewest steps.'
            },
            {
                input: {"rows": 1, "cols": 4, "rStart": 0, "cStart": 0},
                output: {"direction": "right", "wasted": 0},
                explanation: '1x4 grid starting at left - going right has zero waste.'
            },
            {
                input: {"rows": 2, "cols": 2, "rStart": 0, "cStart": 0},
                output: {"direction": "right", "wasted": 0},
                explanation: '2x2 from corner, right direction visits all with no waste.'
            }
        ],
        solutions: {
            python: `def spiral_direction_choice(rows, cols, rStart, cStart):
    """Find best starting direction for minimum wasted steps.
    Time: O(rows*cols*max(rows,cols)), Space: O(1)"""
    directions = ["right", "down", "left", "up"]
    all_dr = [[0,1,0,-1],[1,0,-1,0],[0,-1,0,1],[-1,0,1,0]]
    all_dc = [[1,0,-1,0],[0,-1,0,1],[-1,0,1,0],[0,1,0,-1]]
    
    best_dir, best_waste = "right", float('inf')
    total = rows * cols

    for d_idx in range(4):
        dr, dc = all_dr[d_idx], all_dc[d_idx]
        r, c = rStart, cStart
        direction = 0
        steps, steps_taken, turn_count = 1, 0, 0
        visited, wasted = 0, 0

        while visited < total:
            if 0 <= r < rows and 0 <= c < cols:
                visited += 1
            else:
                wasted += 1
            r += dr[direction]
            c += dc[direction]
            steps_taken += 1
            if steps_taken == steps:
                steps_taken = 0
                direction = (direction + 1) % 4
                turn_count += 1
                if turn_count % 2 == 0:
                    steps += 1

        if wasted < best_waste:
            best_waste = wasted
            best_dir = directions[d_idx]

    return {"direction": best_dir, "wasted": best_waste}

if __name__ == "__main__":
    print(spiral_direction_choice(3, 5, 1, 2))
    print(spiral_direction_choice(1, 4, 0, 0))`,
            go: `package main

import "fmt"

func spiralDirectionChoice(rows, cols, rStart, cStart int) (string, int) {
    dirs := []string{"right", "down", "left", "up"}
    allDr := [][]int{{0,1,0,-1},{1,0,-1,0},{0,-1,0,1},{-1,0,1,0}}
    allDc := [][]int{{1,0,-1,0},{0,-1,0,1},{-1,0,1,0},{0,1,0,-1}}
    bestDir, bestWaste := "right", 1<<30
    total := rows * cols

    for dIdx := 0; dIdx < 4; dIdx++ {
        dr, dc := allDr[dIdx], allDc[dIdx]
        r, c := rStart, cStart
        direction, steps, stepsTaken, turnCount := 0, 1, 0, 0
        visited, wasted := 0, 0
        for visited < total {
            if r >= 0 && r < rows && c >= 0 && c < cols {
                visited++
            } else {
                wasted++
            }
            r += dr[direction]; c += dc[direction]
            stepsTaken++
            if stepsTaken == steps {
                stepsTaken = 0; direction = (direction+1)%4; turnCount++
                if turnCount%2 == 0 { steps++ }
            }
        }
        if wasted < bestWaste { bestWaste = wasted; bestDir = dirs[dIdx] }
    }
    return bestDir, bestWaste
}

func main() {
    d, w := spiralDirectionChoice(3, 5, 1, 2)
    fmt.Println(d, w)
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/02-spiral-matrix-starting-point/twist-04-spiral-with-direction-choice', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/02-spiral-matrix-starting-point/twist-04-spiral-with-direction-choice'] = problem;
})();
