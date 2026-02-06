/**
 * Rotate Ring Only
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: rotate-ring-only
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate Ring Only',
        difficulty: 'Hard',
        algorithm: 'rotate-ring-only',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate only the outermost ring of the matrix by 90 degrees, leaving inner elements unchanged. Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.',
        problem: 'Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.',
        hints: [
            'Think about how rotate ring only differs from the standard version of this problem.',
            'Key insight: Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.',
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
                explanation: ''
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6]]},
                output: [[1,4],[2,5],[3,6]],
                explanation: ''
            },
            // Edge case
            {
                input: {"matrix":[[1]]},
                output: [[1]],
                explanation: ''
            }
        ],
        solutions: {
            python: `def rotate_ring_only(matrix):
    """
    Rotate Ring Only

    Rotate only the outermost ring of the matrix by 90 degrees, leaving inner elements unchanged. Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in matrix:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(rotate_ring_only([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(rotate_ring_only([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(rotate_ring_only([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// RotateRingOnly solves the Rotate Ring Only problem.
// Rotate only the outermost ring of the matrix by 90 degrees, leaving inner elements unchanged. Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.
// Time: O(n), Space: O(n)
func RotateRingOnly(matrix []string) string {
	result := ""

	for _, v := range matrix {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(RotateRingOnly([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(RotateRingOnly([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(RotateRingOnly([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-05-rotate-ring-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-05-rotate-ring-only'] = problem;
})();
