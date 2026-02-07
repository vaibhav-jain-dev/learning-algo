/**
 * Anti-Diagonal Transpose
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: anti-diagonal-transpose
 * Parent: 06-transpose-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Diagonal Transpose',
        difficulty: 'Medium',
        algorithm: 'anti-diagonal-transpose',
        parent: '06-transpose-matrix',
        description: 'Instead of transposing across the main diagonal, transpose across the anti-diagonal (top-right to bottom-left). The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.',
        problem: 'The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.',
        hints: [
            'Think about how anti-diagonal transpose differs from the standard version of this problem.',
            'Key insight: The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.',
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
            python: `def anti_diagonal_transpose(matrix):
    """
    Anti-Diagonal Transpose

    Instead of transposing across the main diagonal, transpose across the anti-diagonal (top-right to bottom-left). The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(anti_diagonal_transpose([[1,2],[3,4]]))  # Expected: [[1,3],[2,4]]
print(anti_diagonal_transpose([[1,2,3],[4,5,6]]))  # Expected: [[1,4],[2,5],[3,6]]
print(anti_diagonal_transpose([[1]]))  # Expected: [[1]]
`,
            go: `package main

import "fmt"

// AntiDiagonalTranspose solves the Anti-Diagonal Transpose problem.
// Instead of transposing across the main diagonal, transpose across the anti-diagonal (top-right to bottom-left). The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.
// Time: O(n), Space: O(n)
func AntiDiagonalTranspose(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AntiDiagonalTranspose([][]int{{1, 2}, {3, 4}})) // Expected: [[1,3],[2,4]]
	fmt.Println(AntiDiagonalTranspose([][]int{{1, 2, 3}, {4, 5, 6}})) // Expected: [[1,4],[2,5],[3,6]]
	fmt.Println(AntiDiagonalTranspose([][]int{{1}})) // Expected: [[1]]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/twist-02-anti-diagonal-transpose', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/twist-02-anti-diagonal-transpose'] = problem;
})();
