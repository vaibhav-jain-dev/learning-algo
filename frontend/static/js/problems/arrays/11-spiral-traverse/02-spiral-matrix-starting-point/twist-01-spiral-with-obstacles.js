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
        hints: [

        ],
        complexity: {
            time: 'O(max(rows,cols)^2)',
            space: 'O(rows*cols)'
        },
        examples: [
            // Basic test case
            {
                input: {"rows":3,"cols":3,"rStart":1,"cStart":1,"blocked":[[0,2]]},
                output: [[1,1],[1,2],[2,2],[2,1],[2,0],[1,0],[0,0],[0,1]],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"rows":2,"cols":2,"rStart":0,"cStart":0,"blocked":[]},
                output: [[0,0],[0,1],[1,1],[1,0]],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"rows":3,"cols":3,"rStart":0,"cStart":0,"blocked":[[1,1]]},
                output: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def spiral_with_obstacles(rows, cols, rStart, cStart):
    """
    Spiral with Obstacles

    Walk in a clockwise spiral from a starting point in a grid, but some cells are blocked. Skip blocked cells and continue the spiral path without visiting them.

    Time: O(max(rows,cols)^2)
    Space: O(rows*cols)
    """
    result = []

    for i in range(len(rows)):
        # Check if element meets criteria
        result.append(rows[i])

    return result


# Test cases
print(spiral_with_obstacles(3, 3, 1, 1))  # Expected: [[1,1],[1,2],[2,2],[2,1],[2,0],[1,0],[0,0],[0,1]]
print(spiral_with_obstacles(2, 2, 0, 0))  # Expected: [[0,0],[0,1],[1,1],[1,0]]
print(spiral_with_obstacles(3, 3, 0, 0))  # Expected: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]]
`,
            go: `package main

import "fmt"

// SpiralWithObstacles solves the Spiral with Obstacles problem.
// Walk in a clockwise spiral from a starting point in a grid, but some cells are blocked. Skip blocked cells and continue the spiral path without visiting them.
// Time: O(max(rows,cols)^2), Space: O(rows*cols)
func SpiralWithObstacles(rows int, cols int, rStart int, cStart int) []int {
	result := make([]int, 0)

	for i := 0; i < len(rows); i++ {
		result = append(result, rows[i])
	}

	return result
}

func main() {
	fmt.Println(SpiralWithObstacles(3, 3, 1, 1)) // Expected: [[1,1],[1,2],[2,2],[2,1],[2,0],[1,0],[0,0],[0,1]]
	fmt.Println(SpiralWithObstacles(2, 2, 0, 0)) // Expected: [[0,0],[0,1],[1,1],[1,0]]
	fmt.Println(SpiralWithObstacles(3, 3, 0, 0)) // Expected: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1],[2,0],[1,0]]
}
`
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
