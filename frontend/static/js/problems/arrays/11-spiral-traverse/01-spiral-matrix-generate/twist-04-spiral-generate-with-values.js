/**
 * Spiral Generate with Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Generate with Values',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Given a list of values and an integer n, place the values into an n x n matrix following spiral order. If the list has fewer values than n^2 cells, remaining cells should be filled with 0.',
        problem: 'Use the standard spiral boundary approach but instead of filling with incrementing numbers, pull from the given values list. Stop filling from the list when it is exhausted.',
        hints: [

        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"values":[5,10,15,20],"n":3},
                output: [[5,10,15],[0,0,20],[0,0,0]],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"values":[1,2,3,4,5,6,7,8,9],"n":3},
                output: [[1,2,3],[8,9,4],[7,6,5]],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"values":[42],"n":2},
                output: [[42,0],[0,0]],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def spiral_generate_with_values(n):
    """
    Spiral Generate with Values

    Given a list of values and an integer n, place the values into an n x n matrix following spiral order. If the list has fewer values than n^2 cells, remaining cells should be filled with 0.

    Time: O(n^2)
    Space: O(n^2)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(spiral_generate_with_values(3))  # Expected: [[5,10,15],[0,0,20],[0,0,0]]
print(spiral_generate_with_values(3))  # Expected: [[1,2,3],[8,9,4],[7,6,5]]
print(spiral_generate_with_values(2))  # Expected: [[42,0],[0,0]]
`,
            go: `package main

import "fmt"

// SpiralGenerateWithValues solves the Spiral Generate with Values problem.
// Given a list of values and an integer n, place the values into an n x n matrix following spiral order. If the list has fewer values than n^2 cells, remaining cells should be filled with 0.
// Time: O(n^2), Space: O(n^2)
func SpiralGenerateWithValues(n int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(SpiralGenerateWithValues(3)) // Expected: [[5,10,15],[0,0,20],[0,0,0]]
	fmt.Println(SpiralGenerateWithValues(3)) // Expected: [[1,2,3],[8,9,4],[7,6,5]]
	fmt.Println(SpiralGenerateWithValues(2)) // Expected: [[42,0],[0,0]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-04-spiral-generate-with-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-04-spiral-generate-with-values'] = problem;
})();
