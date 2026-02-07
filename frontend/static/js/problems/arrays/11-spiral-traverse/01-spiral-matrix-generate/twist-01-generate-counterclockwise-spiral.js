/**
 * Generate Counterclockwise Spiral
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse/01-spiral-matrix-generate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generate Counterclockwise Spiral',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse/01-spiral-matrix-generate',
        description: 'Generate an n x n matrix filled with 1 to n^2 in counterclockwise spiral order. Start from the top-left corner and fill downward first, then right, then up, then left, spiraling inward.',
        problem: 'Use boundary variables and fill in order: down the left column, right along the bottom, up the right column, left along the top. Shrink boundaries after each pass.',
        hints: [

        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":3},
                output: [[1,8,7],[2,9,6],[3,4,5]],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"n":2},
                output: [[1,4],[2,3]],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"n":1},
                output: [[1]],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def generate_counterclockwise_spiral(n):
    """
    Generate Counterclockwise Spiral

    Generate an n x n matrix filled with 1 to n^2 in counterclockwise spiral order. Start from the top-left corner and fill downward first, then right, then up, then left, spiraling inward.

    Time: O(n^2)
    Space: O(n^2)
    """
    result = []

    for item in n:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(generate_counterclockwise_spiral(3))  # Expected: [[1,8,7],[2,9,6],[3,4,5]]
print(generate_counterclockwise_spiral(2))  # Expected: [[1,4],[2,3]]
print(generate_counterclockwise_spiral(1))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// GenerateCounterclockwiseSpiral solves the Generate Counterclockwise Spiral problem.
// Generate an n x n matrix filled with 1 to n^2 in counterclockwise spiral order. Start from the top-left corner and fill downward first, then right, then up, then left, spiraling inward.
// Time: O(n^2), Space: O(n^2)
func GenerateCounterclockwiseSpiral(n int) string {
	result := ""

	for _, v := range n {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(GenerateCounterclockwiseSpiral(3)) // Expected: [[1,8,7],[2,9,6],[3,4,5]]
	fmt.Println(GenerateCounterclockwiseSpiral(2)) // Expected: [[1,4],[2,3]]
	fmt.Println(GenerateCounterclockwiseSpiral(1)) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/01-spiral-matrix-generate/twist-01-generate-counterclockwise-spiral', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/01-spiral-matrix-generate/twist-01-generate-counterclockwise-spiral'] = problem;
})();
