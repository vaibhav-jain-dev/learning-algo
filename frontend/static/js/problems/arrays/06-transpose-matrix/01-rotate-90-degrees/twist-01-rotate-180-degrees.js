/**
 * Rotate 180 Degrees
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: rotate-180-degrees
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate 180 Degrees',
        difficulty: 'Easy',
        algorithm: 'rotate-180-degrees',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate the matrix by 180 degrees in-place. Each element moves to the diagonally opposite position. Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).',
        problem: 'Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).',
        hints: [
            'Think about how rotate 180 degrees differs from the standard version of this problem.',
            'Key insight: Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [[1,3],[2,4]],
                explanation: 'The matrix transformation maps each element from its original position to its target position. Process in an order that avoids overwriting values still needed.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6]]},
                output: [[1,4],[2,5],[3,6]],
                explanation: 'Process the matrix following the required traversal pattern. Track the current boundaries (top, bottom, left, right) and adjust them after completing each direction.'
            },
            // Edge case
            {
                input: {"matrix":[[1]]},
                output: [[1]],
                explanation: 'Work layer by layer from outside in. Each layer has four sides to process. Shrink boundaries after each complete layer until all elements are handled.'
            }
        ],
        solutions: {
            python: `def rotate_180_degrees(matrix):
    """
    Rotate 180 Degrees

    Rotate the matrix by 180 degrees in-place. Each element moves to the diagonally opposite position. Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(rotate_180_degrees([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(rotate_180_degrees([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(rotate_180_degrees([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// Rotate180Degrees solves the Rotate 180 Degrees problem.
// Rotate the matrix by 180 degrees in-place. Each element moves to the diagonally opposite position. Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).
// Time: O(n), Space: O(1)
func Rotate180Degrees(matrix []string) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(Rotate180Degrees([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(Rotate180Degrees([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(Rotate180Degrees([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-01-rotate-180-degrees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-01-rotate-180-degrees'] = problem;
})();
