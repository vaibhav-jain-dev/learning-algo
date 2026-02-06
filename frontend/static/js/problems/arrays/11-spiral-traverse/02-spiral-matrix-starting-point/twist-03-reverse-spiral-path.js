/**
 * Reverse Spiral Path
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/02-spiral-matrix-starting-point
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Spiral Path',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/02-spiral-matrix-starting-point',
        description: 'Given a spiral-ordered list of coordinates from a grid, determine the starting cell and grid dimensions that produced it. Reconstruct the spiral parameters from its output.',
        problem: 'Analyze the coordinates to find grid bounds (min/max row and col). The first coordinate is the start position. Dimensions are max_row - min_row + 1 by max_col - min_col + 1.',
        hints: ["The first coordinate in the list is the starting cell.", "Find the bounding box of all coordinates to determine grid dimensions.", "Verify that the coordinates form a valid spiral pattern.", "The number of coordinates should equal rows * cols."],
        complexity: { time: 'O(n)', space: 'O(1)' },
        examples: [
            {
                input: {"coords": [[0, 0], [0, 1], [0, 2], [0, 3]]},
                output: {"rows": 1, "cols": 4, "start": [0, 0]},
                explanation: 'All coords in row 0, 4 columns. Start at (0,0).'
            },
            {
                input: {"coords": [[1, 1], [1, 2], [2, 2], [2, 1], [2, 0], [1, 0], [0, 0], [0, 1], [0, 2]]},
                output: {"rows": 3, "cols": 3, "start": [1, 1]},
                explanation: '9 coords spanning 3x3. Start at (1,1) center.'
            },
            {
                input: {"coords": [[0, 0], [0, 1], [1, 1], [1, 0]]},
                output: {"rows": 2, "cols": 2, "start": [0, 0]},
                explanation: '2x2 grid starting at (0,0).'
            }
        ],
        solutions: {
            python: `def reverse_spiral_path(coords):
    """Determine spiral parameters from coordinate list.
    Time: O(n), Space: O(1)"""
    if not coords:
        return None
    min_r = min(c[0] for c in coords)
    max_r = max(c[0] for c in coords)
    min_c = min(c[1] for c in coords)
    max_c = max(c[1] for c in coords)
    return {
        "rows": max_r - min_r + 1,
        "cols": max_c - min_c + 1,
        "start": coords[0]
    }

if __name__ == "__main__":
    print(reverse_spiral_path([[0,0],[0,1],[0,2],[0,3]]))
    print(reverse_spiral_path([[1,1],[1,2],[2,2],[2,1],[2,0],[1,0],[0,0],[0,1],[0,2]]))`,
            go: `package main

import "fmt"

func reverseSpiralPath(coords [][]int) map[string]interface{} {
    if len(coords) == 0 { return nil }
    minR, maxR := coords[0][0], coords[0][0]
    minC, maxC := coords[0][1], coords[0][1]
    for _, c := range coords {
        if c[0] < minR { minR = c[0] }
        if c[0] > maxR { maxR = c[0] }
        if c[1] < minC { minC = c[1] }
        if c[1] > maxC { maxC = c[1] }
    }
    return map[string]interface{}{
        "rows": maxR - minR + 1,
        "cols": maxC - minC + 1,
        "start": coords[0],
    }
}

func main() {
    fmt.Println(reverseSpiralPath([][]int{{0,0},{0,1},{0,2},{0,3}}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/02-spiral-matrix-starting-point/twist-03-reverse-spiral-path', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/02-spiral-matrix-starting-point/twist-03-reverse-spiral-path'] = problem;
})();
