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
        hints: [

        ],
        complexity: {
            time: 'O(K + wasted_steps)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"rows":3,"cols":3,"rStart":1,"cStart":1,"k":5},
                output: [2,0],
                explanation: ''
            },
            {
                input: {"rows":1,"cols":4,"rStart":0,"cStart":0,"k":3},
                output: [0,2],
                explanation: ''
            },
            // Edge case
            {
                input: {"rows":5,"cols":5,"rStart":2,"cStart":2,"k":1},
                output: [2,2],
                explanation: ''
            }
        ],
        solutions: {
            python: `def kth_cell_in_spiral(rows, cols, rStart, cStart):
    """
    K-th Cell in Spiral

    Given grid dimensions, a starting cell, and an integer K, return the coordinates of the K-th cell visited in the spiral walk (1-indexed). Do this without generating the entire spiral.

    Time: O(K + wasted_steps)
    Space: O(1)
    """
    result = []

    for item in rows:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(kth_cell_in_spiral(3, 3, 1, 1))  # Expected: [2,0]
print(kth_cell_in_spiral(1, 4, 0, 0))  # Expected: [0,2]
print(kth_cell_in_spiral(5, 5, 2, 2))  # Expected: [2,2]
`,
            go: `package main

import "fmt"

// KthCellInSpiral solves the K-th Cell in Spiral problem.
// Given grid dimensions, a starting cell, and an integer K, return the coordinates of the K-th cell visited in the spiral walk (1-indexed). Do this without generating the entire spiral.
// Time: O(K + wasted_steps), Space: O(1)
func KthCellInSpiral(rows int, cols int, rStart int, cStart int) string {
	result := ""

	for _, v := range rows {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(KthCellInSpiral(3, 3, 1, 1)) // Expected: [2,0]
	fmt.Println(KthCellInSpiral(1, 4, 0, 0)) // Expected: [0,2]
	fmt.Println(KthCellInSpiral(5, 5, 2, 2)) // Expected: [2,2]
}
`
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
