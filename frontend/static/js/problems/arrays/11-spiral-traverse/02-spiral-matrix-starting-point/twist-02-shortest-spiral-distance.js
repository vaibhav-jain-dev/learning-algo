/**
 * Shortest Spiral Distance
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/02-spiral-matrix-starting-point
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Spiral Distance',
        difficulty: 'Hard',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/02-spiral-matrix-starting-point',
        description: 'Given a start cell and target cell in a grid, find how many steps it takes to reach the target when following the clockwise spiral path from the start.',
        problem: 'Simulate the spiral walk counting steps. Stop as soon as the target cell is reached. Return the step count.',
        hints: ["Simulate the spiral from the start position.", "Count every cell visited (including out-of-bounds positions in the spiral).", "Stop when the target cell is reached.", "The spiral visits cells in a fixed order regardless of grid bounds."],
        complexity: { time: 'O(rows*cols)', space: 'O(1)' },
        examples: [
            {
                input: {"rows": 3, "cols": 3, "start": [0, 0], "target": [1, 1]},
                output: 8,
                explanation: 'Spiral from (0,0) visits all border cells before reaching center (1,1) at step 8.'
            },
            {
                input: {"rows": 3, "cols": 3, "start": [1, 1], "target": [0, 0]},
                output: 6,
                explanation: 'Spiral from center reaches (0,0) at step 6.'
            },
            {
                input: {"rows": 2, "cols": 2, "start": [0, 0], "target": [0, 1]},
                output: 1,
                explanation: 'Target is immediately to the right, reached in 1 step.'
            }
        ],
        solutions: {
            python: `def shortest_spiral_distance(rows, cols, start, target):
    """Find steps to reach target in spiral walk.
    Time: O(rows*cols), Space: O(1)"""
    dr, dc = [0, 1, 0, -1], [1, 0, -1, 0]
    r, c = start
    direction = 0
    steps_size, steps_taken, turn_count = 1, 0, 0
    count = 0

    while True:
        if 0 <= r < rows and 0 <= c < cols:
            if r == target[0] and c == target[1]:
                return count
            count += 1
        r += dr[direction]
        c += dc[direction]
        steps_taken += 1
        if steps_taken == steps_size:
            steps_taken = 0
            direction = (direction + 1) % 4
            turn_count += 1
            if turn_count % 2 == 0:
                steps_size += 1
    return -1

if __name__ == "__main__":
    print(shortest_spiral_distance(3, 3, [0,0], [1,1]))  # 8
    print(shortest_spiral_distance(3, 3, [1,1], [0,0]))  # 6`,
            go: `package main

import "fmt"

func shortestSpiralDistance(rows, cols int, start, target []int) int {
    dr := []int{0, 1, 0, -1}
    dc := []int{1, 0, -1, 0}
    r, c := start[0], start[1]
    direction, stepsSize, stepsTaken, turnCount := 0, 1, 0, 0
    count := 0

    for {
        if r >= 0 && r < rows && c >= 0 && c < cols {
            if r == target[0] && c == target[1] { return count }
            count++
        }
        r += dr[direction]
        c += dc[direction]
        stepsTaken++
        if stepsTaken == stepsSize {
            stepsTaken = 0
            direction = (direction + 1) % 4
            turnCount++
            if turnCount%2 == 0 { stepsSize++ }
        }
    }
}

func main() {
    fmt.Println(shortestSpiralDistance(3, 3, []int{0,0}, []int{1,1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/02-spiral-matrix-starting-point/twist-02-shortest-spiral-distance', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/02-spiral-matrix-starting-point/twist-02-shortest-spiral-distance'] = problem;
})();
