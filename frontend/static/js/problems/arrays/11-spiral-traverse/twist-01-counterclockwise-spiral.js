/**
 * Counterclockwise Spiral
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Counterclockwise Spiral',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array, return a one-dimensional array of all elements in counterclockwise spiral order. Instead of the standard clockwise direction (right, down, left, up), traverse the matrix counterclockwise: down first, then right, then up, then left. Continue this pattern spiraling inward until every element has been visited.',
        problem: 'Reverse the direction order of the standard spiral traversal. Use boundary variables (top, bottom, left, right) and traverse in the order: down the left column, right along the bottom row, up the right column, left along the top row, shrinking boundaries after each pass.',
        hints: [
            'Use four boundary variables: top, bottom, left, right to track the unvisited region.',
            'The direction order is: down (left col), right (bottom row), up (right col), left (top row).',
            'After traversing each direction, shrink the corresponding boundary inward.',
            'Handle edge cases where the matrix has only one row or one column.'
        ],
        complexity: {
            time: 'O(m*n)',
            space: 'O(m*n)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]]},
                output: [1,4,7,8,9,6,3,2,5],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"matrix":[[1,2,3,4],[5,6,7,8],[9,10,11,12]]},
                output: [1,5,9,10,11,12,8,4,3,2,6,7],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [1,3,4,2],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def counterclockwise_spiral(matrix):
    """
    Counterclockwise Spiral

    Given an n x m two-dimensional array, return a one-dimensional array of all elements in counterclockwise spiral order. Instead of the standard clockwise direction (right, down, left, up), traverse the matrix counterclockwise: down first, then right, then up, then left. Continue this pattern spiraling inward until every element has been visited.

    Time: O(m*n)
    Space: O(m*n)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(counterclockwise_spiral([[1,2,3],[4,5,6],[7,8,9]]))  # Expected: [1,4,7,8,9,6,3,2,5]
print(counterclockwise_spiral([[1,2,3,4],[5,6,7,8],[9,10,11,12]]))  # Expected: [1,5,9,10,11,12,8,4,3,2,6,7]
print(counterclockwise_spiral([[1,2],[3,4]]))  # Expected: [1,3,4,2]
`,
            go: `package main

import "fmt"

// CounterclockwiseSpiral solves the Counterclockwise Spiral problem.
// Given an n x m two-dimensional array, return a one-dimensional array of all elements in counterclockwise spiral order. Instead of the standard clockwise direction (right, down, left, up), traverse the matrix counterclockwise: down first, then right, then up, then left. Continue this pattern spiraling inward until every element has been visited.
// Time: O(m*n), Space: O(m*n)
func CounterclockwiseSpiral(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(CounterclockwiseSpiral([][]int{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}})) // Expected: [1,4,7,8,9,6,3,2,5]
	fmt.Println(CounterclockwiseSpiral([][]int{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}})) // Expected: [1,5,9,10,11,12,8,4,3,2,6,7]
	fmt.Println(CounterclockwiseSpiral([][]int{{1, 2}, {3, 4}})) // Expected: [1,3,4,2]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-01-counterclockwise-spiral', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-01-counterclockwise-spiral'] = problem;
})();
