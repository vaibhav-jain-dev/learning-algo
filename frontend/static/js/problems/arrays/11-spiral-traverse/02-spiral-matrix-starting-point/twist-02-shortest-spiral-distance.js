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
        hints: [

        ],
        complexity: {
            time: 'O(rows*cols)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"rows":3,"cols":3,"start":[0,0],"target":[1,1]},
                output: 8,
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"rows":3,"cols":3,"start":[1,1],"target":[0,0]},
                output: 6,
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"rows":2,"cols":2,"start":[0,0],"target":[0,1]},
                output: 1,
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def shortest_spiral_distance(rows, cols, rStart, cStart, target):
    """
    Shortest Spiral Distance

    Given a start cell and target cell in a grid, find how many steps it takes to reach the target when following the clockwise spiral path from the start.

    Time: O(rows*cols)
    Space: O(1)
    """
    count = 0
    n = len(rows)

    for i in range(n):
        # Check condition based on cols
        j = 0
        for k in range(i, n):
            if j < len(cols) and rows[k] == cols[j]:
                j += 1
        if j == len(cols):
            count += 1

    return count


# Test cases
print(shortest_spiral_distance(3, 3, None, None, [1,1]))  # Expected: 8
print(shortest_spiral_distance(3, 3, None, None, [0,0]))  # Expected: 6
print(shortest_spiral_distance(2, 2, None, None, [0,1]))  # Expected: 1
`,
            go: `package main

import "fmt"

// ShortestSpiralDistance solves the Shortest Spiral Distance problem.
// Given a start cell and target cell in a grid, find how many steps it takes to reach the target when following the clockwise spiral path from the start.
// Time: O(rows*cols), Space: O(1)
func ShortestSpiralDistance(rows int, cols int, rStart int, cStart int, target int) int {
	result := 0

	for i := 0; i < len(rows); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ShortestSpiralDistance(3, 3, nil, nil, []int{1, 1})) // Expected: 8
	fmt.Println(ShortestSpiralDistance(3, 3, nil, nil, []int{0, 0})) // Expected: 6
	fmt.Println(ShortestSpiralDistance(2, 2, nil, nil, []int{0, 1})) // Expected: 1
}
`
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
