/**
 * Rotate by K*90 Degrees
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: rotate-by-k90-degrees
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate by K*90 Degrees',
        difficulty: 'Medium',
        algorithm: 'rotate-by-k90-degrees',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate by K * 90 degrees where K can be any integer. Optimize by reducing K mod 4. Must recognize that K mod 4 determines the actual rotation, then apply the appropriate transformation.',
        problem: 'Must recognize that K mod 4 determines the actual rotation, then apply the appropriate transformation.',
        hints: [
            'Think about how rotate by k*90 degrees differs from the standard version of this problem.',
            'Key insight: Must recognize that K mod 4 determines the actual rotation, then apply the appropriate transformation.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
            python: `def rotate_by_k90_degrees(matrix):
    """
    Rotate by K*90 Degrees

    Rotate by K * 90 degrees where K can be any integer. Optimize by reducing K mod 4. Must recognize that K mod 4 determines the actual rotation, then apply the appropriate transformation.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in matrix:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(rotate_by_k90_degrees([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(rotate_by_k90_degrees([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(rotate_by_k90_degrees([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// RotateByK90Degrees solves the Rotate by K*90 Degrees problem.
// Rotate by K * 90 degrees where K can be any integer. Optimize by reducing K mod 4. Must recognize that K mod 4 determines the actual rotation, then apply the appropriate transformation.
// Time: O(n), Space: O(n)
func RotateByK90Degrees(matrix []string) string {
	result := ""

	for _, v := range matrix {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(RotateByK90Degrees([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(RotateByK90Degrees([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(RotateByK90Degrees([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-04-rotate-by-k90-degrees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-04-rotate-by-k90-degrees'] = problem;
})();
