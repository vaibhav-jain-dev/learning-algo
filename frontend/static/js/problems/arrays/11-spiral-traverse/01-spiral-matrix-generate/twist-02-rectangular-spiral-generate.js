/**
 * Rectangular Spiral Generate
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rectangular Spiral Generate',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Generate an m x n rectangular matrix (not necessarily square) filled with values 1 to m*n in clockwise spiral order. Handle cases where rows and columns exhaust at different times.',
        problem: 'Use the same boundary approach as square spiral but with separate row and column counts. The key difference is handling the case where one dimension is exhausted before the other.',
        hints: [

        ],
        complexity: {
            time: 'O(m*n)',
            space: 'O(m*n)'
        },
        examples: [
            // Basic test case
            {
                input: {"rows":3,"cols":4},
                output: [[1,2,3,4],[10,11,12,5],[9,8,7,6]],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"rows":2,"cols":3},
                output: [[1,2,3],[6,5,4]],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"rows":1,"cols":5},
                output: [[1,2,3,4,5]],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def rectangular_spiral_generate(n):
    """
    Rectangular Spiral Generate

    Generate an m x n rectangular matrix (not necessarily square) filled with values 1 to m*n in clockwise spiral order. Handle cases where rows and columns exhaust at different times.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for item in n:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(rectangular_spiral_generate(None))  # Expected: [[1,2,3,4],[10,11,12,5],[9,8,7,6]]
print(rectangular_spiral_generate(None))  # Expected: [[1,2,3],[6,5,4]]
print(rectangular_spiral_generate(None))  # Expected: [[1,2,3,4,5]]
`,
            go: `package main

import "fmt"

// RectangularSpiralGenerate solves the Rectangular Spiral Generate problem.
// Generate an m x n rectangular matrix (not necessarily square) filled with values 1 to m*n in clockwise spiral order. Handle cases where rows and columns exhaust at different times.
// Time: O(m*n), Space: O(m*n)
func RectangularSpiralGenerate(n int) string {
	result := ""

	for _, v := range n {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(RectangularSpiralGenerate(nil)) // Expected: [[1,2,3,4],[10,11,12,5],[9,8,7,6]]
	fmt.Println(RectangularSpiralGenerate(nil)) // Expected: [[1,2,3],[6,5,4]]
	fmt.Println(RectangularSpiralGenerate(nil)) // Expected: [[1,2,3,4,5]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-02-rectangular-spiral-generate', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-02-rectangular-spiral-generate'] = problem;
})();
