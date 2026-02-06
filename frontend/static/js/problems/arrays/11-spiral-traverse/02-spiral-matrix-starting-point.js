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
            { title: 'Spiral with Obstacles', difficulty: 'Hard', description: 'Walk in a spiral from a starting point but some cells are blocked. Skip blocked cells and continue the spiral path.', whyDifferent: 'Obstacles break the simple step-counting pattern. You must detect blocked cells and adjust the spiral expansion.', example: 'grid 3x3, start (1,1), cell (0,2) blocked. Spiral skips (0,2) and continues.' },
            { title: 'Shortest Spiral Distance', difficulty: 'Hard', description: 'Given a start cell and target cell in a grid, find how many steps it takes to reach the target following the spiral path.', whyDifferent: 'Instead of visiting all cells, you stop early when the target is found, requiring efficient position-in-spiral calculation.', example: 'rows = 3, cols = 3, start = (0,0), target = (1,1). Spiral distance = 8 (center is last).' },
            { title: 'Reverse Spiral Path', difficulty: 'Medium', description: 'Given a spiral-ordered list of coordinates, determine the starting cell and grid dimensions that produced it.', whyDifferent: 'Inverse problem: reconstruct parameters from output rather than generating output from parameters.', example: 'coords = [[0,0],[0,1],[0,2],[0,3]]. Deduced: 1x4 grid starting at (0,0).' },
            { title: 'Spiral with Direction Choice', difficulty: 'Hard', description: 'At the starting point you can choose to go in any of 4 directions first. Find the direction choice that visits all cells with fewest out-of-bound steps.', whyDifferent: 'Requires simulating all 4 starting directions and counting wasted steps, an optimization over brute-force spiraling.', example: 'rows = 3, cols = 5, start = (1,2). Starting right wastes fewer steps than starting left.' },
            { title: 'K-th Cell in Spiral', difficulty: 'Medium', description: 'Return the coordinates of the K-th cell visited in the spiral, without generating the entire spiral.', whyDifferent: 'Requires O(1) or O(sqrt(n)) computation of spiral position instead of O(n) simulation.', example: 'rows = 5, cols = 6, start = (1,4), K = 5. Return the 5th visited cell coordinates.' }
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
