/**
 * Count Paths With Diagonal Moves
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-graph-traversal
 * Parent: 16-ways-to-traverse-graph
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Paths With Diagonal Moves',
        difficulty: 'Medium',
        algorithm: 'dp-graph-traversal',
        parent: '16-ways-to-traverse-graph',
        description: 'In addition to right and down, you can also move diagonally (down-right). Count all paths to the bottom-right corner.',
        problem: 'Adds a third transition to the DP recurrence: dp[i][j] = dp[i-1][j] + dp[i][j-1] + dp[i-1][j-1], significantly increasing the path count.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"width":4,"height":3},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count paths with diagonal moves criteria.'
            },
            {
                input: {"width":2,"height":2},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count paths with diagonal moves criteria.'
            },
            {
                input: {"width":3,"height":3},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the count paths with diagonal moves criteria.'
            },
            {
                input: {"width":1,"height":5},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the count paths with diagonal moves criteria.'
            },
            // Edge case
            {
                input: {"width":0,"height":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_paths_with_diagonal_moves(width, height):
    """
    Count Paths With Diagonal Moves

    In addition to right and down, you can also move diagonally (down-right). Count all paths to the bottom-right corner.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(width)

    for i in range(n):
        # Check condition based on height
        j = 0
        for k in range(i, n):
            if j < len(height) and width[k] == height[j]:
                j += 1
        if j == len(height):
            count += 1

    return count


# Test cases
print(count_paths_with_diagonal_moves(4, 3))  # Expected: 1
print(count_paths_with_diagonal_moves(2, 2))  # Expected: 2
print(count_paths_with_diagonal_moves(3, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountPathsWithDiagonalMoves solves the Count Paths With Diagonal Moves problem.
// In addition to right and down, you can also move diagonally (down-right). Count all paths to the bottom-right corner.
// Time: O(n^2), Space: O(n)
func CountPathsWithDiagonalMoves(width int, height int) int {
	result := 0

	for i := 0; i < len(width); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountPathsWithDiagonalMoves(4, 3)) // Expected: 1
	fmt.Println(CountPathsWithDiagonalMoves(2, 2)) // Expected: 2
	fmt.Println(CountPathsWithDiagonalMoves(3, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '16-ways-to-traverse-graph/twist-03-count-paths-with-diagonal-moves', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/16-ways-to-traverse-graph/twist-03-count-paths-with-diagonal-moves'] = problem;
})();
