/**
 * Spiral Matrix Starting Point
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Matrix Starting Point',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'You start at cell (rStart, cStart) in a rows x cols grid. You walk in a clockwise spiral pattern starting with moving right, visiting all cells in the grid. Return the coordinates of all cells in the order you visit them.',
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
          "rows": 1,
          "cols": 4,
          "rStart": 0,
          "cStart": 0
        },
        output: "[[0,0], [0,1], [0,2], [0,3]]",
        explanation: 'Given the input, the algorithm processes it to produce [[0,0], [0,1], [0,2], [0,3]]'
    },
    {
        input: {
          "rows": 5,
          "cols": 6,
          "rStart": 1,
          "cStart": 4
        },
        output: "[[1,4], [1,5], [2,5], [2,4], [2,3], [1,3], [0,3], [0,4], [0,5], [3,5], [3,4], [3,3], [3,2], [2,2], [1,2], [0,2], [4,5], [4,4], [4,3], [4,2], [4,1], [3,1], [2,1], [1,1], [0,1], [4,0], [3,0], [2,0], [1,0], [0,0]]",
        explanation: 'Given the input, the algorithm processes it to produce [[1,4], [1,5], [2,5], [2,4], [2,3], [1,3], [0,3], [0,4], [0,5], [3,5], [3,4], [3,3], [3,2], [2,2], [1,2], [0,2], [4,5], [4,4], [4,3], [4,2], [4,1], [3,1], [2,1], [1,1], [0,1], [4,0], [3,0], [2,0], [1,0], [0,0]]'
    }
        ],
        solutions: {
            python: `def spiralMatrixStartingPoint(rows, cols, rStart, cStart):
    """
    Spiral Matrix Starting Point - Walk in clockwise spiral from starting position,
    visiting all cells in a rows x cols grid.

    Time: O(rows * cols) - Visit all cells
    Space: O(rows * cols) - Store result (O(1) extra space)
    """
    result = []
    # Directions: right, down, left, up
    dr = [0, 1, 0, -1]
    dc = [1, 0, -1, 0]

    # Total cells to visit
    total = rows * cols

    # Start position
    r, c = rStart, cStart
    direction = 0  # Start moving right

    # Steps in each direction: 1, 1, 2, 2, 3, 3, 4, 4, ...
    steps = 1
    stepsTaken = 0
    turnCount = 0

    while len(result) < total:
        # Add cell if within bounds
        if 0 <= r < rows and 0 <= c < cols:
            result.append([r, c])

        # Move in current direction
        r += dr[direction]
        c += dc[direction]
        stepsTaken += 1

        # Check if we need to turn
        if stepsTaken == steps:
            stepsTaken = 0
            direction = (direction + 1) % 4
            turnCount += 1
            # Increase steps after every 2 turns
            if turnCount % 2 == 0:
                steps += 1

    return result


# Test
if __name__ == "__main__":
    print(spiralMatrixStartingPoint(1, 4, 0, 0))
    # Output: [[0,0], [0,1], [0,2], [0,3]]
    print(spiralMatrixStartingPoint(5, 6, 1, 4))`,
            go: `package main

import "fmt"

// SpiralMatrixStartingPoint walks in clockwise spiral from starting position.
// Time: O(rows * cols), Space: O(rows * cols)
func SpiralMatrixStartingPoint(rows, cols, rStart, cStart int) [][]int {
    result := [][]int{}
    // Directions: right, down, left, up
    dr := []int{0, 1, 0, -1}
    dc := []int{1, 0, -1, 0}

    // Total cells to visit
    total := rows * cols

    // Start position
    r, c := rStart, cStart
    direction := 0 // Start moving right

    // Steps in each direction: 1, 1, 2, 2, 3, 3, ...
    steps := 1
    stepsTaken := 0
    turnCount := 0

    for len(result) < total {
        // Add cell if within bounds
        if r >= 0 && r < rows && c >= 0 && c < cols {
            result = append(result, []int{r, c})
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
            // Increase steps after every 2 turns
            if turnCount%2 == 0 {
                steps++
            }
        }
    }

    return result
}

func main() {
    fmt.Println(SpiralMatrixStartingPoint(1, 4, 0, 0))
    // Output: [[0 0] [0 1] [0 2] [0 3]]
    fmt.Println(SpiralMatrixStartingPoint(5, 6, 1, 4))
}`
        },
        twists: [
            { id: '11-spiral-traverse/02-spiral-matrix-starting-point/twist-01-spiral-with-obstacles', name: 'Spiral with Obstacles', difficulty: 'Hard' },
            { id: '11-spiral-traverse/02-spiral-matrix-starting-point/twist-02-shortest-spiral-distance', name: 'Shortest Spiral Distance', difficulty: 'Hard' },
            { id: '11-spiral-traverse/02-spiral-matrix-starting-point/twist-03-reverse-spiral-path', name: 'Reverse Spiral Path', difficulty: 'Medium' },
            { id: '11-spiral-traverse/02-spiral-matrix-starting-point/twist-04-spiral-with-direction-choice', name: 'Spiral with Direction Choice', difficulty: 'Hard' },
            { id: '11-spiral-traverse/02-spiral-matrix-starting-point/twist-05-kth-cell-in-spiral', name: 'K-th Cell in Spiral', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 11-spiral-traverse
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/02-spiral-matrix-starting-point', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/02-spiral-matrix-starting-point'] = problem;

})();
