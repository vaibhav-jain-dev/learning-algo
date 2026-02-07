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
        hints: [

        ],
        complexity: {
            time: 'O(rows*cols * max(rows,cols))',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"rows":3,"cols":5,"rStart":1,"cStart":2},
                output: {"direction":"right","wasted":6},
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"rows":1,"cols":4,"rStart":0,"cStart":0},
                output: {"direction":"right","wasted":0},
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"rows":2,"cols":2,"rStart":0,"cStart":0},
                output: {"direction":"right","wasted":0},
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def spiral_with_direction_choice(rows, cols, rStart, cStart):
    """
    Spiral with Direction Choice

    At the starting point you can choose to start moving in any of 4 directions. Find the direction choice that visits all grid cells with the fewest out-of-bound steps (wasted steps where the spiral position is outside the grid).

    Time: O(rows*cols * max(rows,cols))
    Space: O(1)
    """
    count = 0
    n = len(rows)
    m = len(cols)

    for start in range(n):
        j = 0
        for i in range(start, n):
            if j < m and rows[i] == cols[j]:
                j += 1
            if j == m:
                count += 1
                break

    return count


# Test cases
print(spiral_with_direction_choice(3, 5, 1, 2))  # Expected: {"direction": "right", "wasted": 6}
print(spiral_with_direction_choice(1, 4, 0, 0))  # Expected: {"direction": "right", "wasted": 0}
print(spiral_with_direction_choice(2, 2, 0, 0))  # Expected: {"direction": "right", "wasted": 0}
`,
            go: `package main

import "fmt"

// SpiralWithDirectionChoice solves the Spiral with Direction Choice problem.
// At the starting point you can choose to start moving in any of 4 directions. Find the direction choice that visits all grid cells with the fewest out-of-bound steps (wasted steps where the spiral position is outside the grid).
// Time: O(rows*cols * max(rows,cols)), Space: O(1)
func SpiralWithDirectionChoice(rows int, cols int, rStart int, cStart int) int {
	count := 0
	n := len(rows)
	m := len(cols)

	for start := 0; start < n; start++ {
		j := 0
		for i := start; i < n && j < m; i++ {
			if rows[i] == cols[j] {
				j++
			}
		}
		if j == m {
			count++
		}
	}

	return count
}

func main() {
	fmt.Println(SpiralWithDirectionChoice(3, 5, 1, 2)) // Expected: {"direction":"right","wasted":6}
	fmt.Println(SpiralWithDirectionChoice(1, 4, 0, 0)) // Expected: {"direction":"right","wasted":0}
	fmt.Println(SpiralWithDirectionChoice(2, 2, 0, 0)) // Expected: {"direction":"right","wasted":0}
}
`
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
