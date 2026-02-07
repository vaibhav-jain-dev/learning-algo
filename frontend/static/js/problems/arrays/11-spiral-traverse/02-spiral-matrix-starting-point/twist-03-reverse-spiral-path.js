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
        hints: [

        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"coords":[[0,0],[0,1],[0,2],[0,3]]},
                output: [[0,0],[0,1],[0,2]],
                explanation: 'The reverse spiral path for this input yields [0,0, 0,1, 0,2].'
            },
            {
                input: {"coords":[[1,1],[1,2],[2,2],[2,1],[2,0],[1,0],[0,0],[0,1],[0,2]]},
                output: [[1,1],[1,2],[2,2]],
                explanation: 'The reverse spiral path for this input yields [1,1, 1,2, 2,2].'
            },
            {
                input: {"coords":[[0,0],[0,1],[1,1],[1,0]]},
                output: [[0,0],[0,1],[1,1]],
                explanation: 'The reverse spiral path for this input yields [0,0, 0,1, 1,1].'
            },
            // Edge case
            {
                input: {"coords":[[0,0]]},
                output: [],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            }
        ],
        solutions: {
            python: `def reverse_spiral_path(rows, cols, rStart, cStart):
    """
    Reverse Spiral Path

    Given a spiral-ordered list of coordinates from a grid, determine the starting cell and grid dimensions that produced it. Reconstruct the spiral parameters from its output.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(rows)):
        # Check if element meets criteria
        result.append(rows[i])

    return result


# Test cases
print(reverse_spiral_path(None, None, None, None))  # Expected: [[0,0],[0,1],[0,2]]
print(reverse_spiral_path(None, None, None, None))  # Expected: [[1,1],[1,2],[2,2]]
print(reverse_spiral_path(None, None, None, None))  # Expected: [[0,0],[0,1],[1,1]]
`,
            go: `package main

import "fmt"

// ReverseSpiralPath solves the Reverse Spiral Path problem.
// Given a spiral-ordered list of coordinates from a grid, determine the starting cell and grid dimensions that produced it. Reconstruct the spiral parameters from its output.
// Time: O(n), Space: O(1)
func ReverseSpiralPath(rows int, cols int, rStart int, cStart int) []int {
	result := make([]int, 0)

	for i := 0; i < len(rows); i++ {
		result = append(result, rows[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseSpiralPath(nil, nil, nil, nil)) // Expected: [[0,0],[0,1],[0,2]]
	fmt.Println(ReverseSpiralPath(nil, nil, nil, nil)) // Expected: [[1,1],[1,2],[2,2]]
	fmt.Println(ReverseSpiralPath(nil, nil, nil, nil)) // Expected: [[0,0],[0,1],[1,1]]
}
`
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
