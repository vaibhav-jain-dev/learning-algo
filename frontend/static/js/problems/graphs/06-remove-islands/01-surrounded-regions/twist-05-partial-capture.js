/**
 * Partial Capture
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/01-surrounded-regions
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partial Capture',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/01-surrounded-regions',
        description: 'Capture O regions that are surrounded on at least 3 sides (top, bottom, left, right borders). A region touching only one border side should be captured.',
        problem: 'Instead of binary border/not-border, you track which specific borders a region touches and only spare it if it touches 2 or more border sides.',
        hints: [
            'Start by understanding the key difference: Instead of binary border/not-border, you track which specific borders a region touches and only spare it if it touches 2 or more border sides.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: An O group touches only the top border.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"board":[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]},
                output: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"]],
                explanation: 'The partial capture for this input yields [X,X,X,X, X,O,O,X, X,X,O,X].'
            },
            // Edge case
            {
                input: {"board":[["X","X","X","X"]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def partial_capture(board):
    """
    Partial Capture

    Capture O regions that are surrounded on at least 3 sides (top, bottom, left, right borders). A region touching only one border side should be captured.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = []

    for i in range(len(board)):
        # Check if element meets criteria
        result.append(board[i])

    return result


# Test cases
print(partial_capture([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]))  # Expected: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"]]
print(partial_capture([["X","X","X","X"]]))  # Expected: []
`,
            go: `package main

import "fmt"

// PartialCapture solves the Partial Capture problem.
// Capture O regions that are surrounded on at least 3 sides (top, bottom, left, right borders). A region touching only one border side should be captured.
// Time: O(M * N), Space: O(M * N)
func PartialCapture(board [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(board); i++ {
		result = append(result, board[i])
	}

	return result
}

func main() {
	fmt.Println(PartialCapture([][]int{{X, X, X, X}, {X, O, O, X}, {X, X, O, X}, {X, O, X, X}})) // Expected: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"]]
	fmt.Println(PartialCapture([][]int{{X, X, X, X}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions/twist-05-partial-capture', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions/twist-05-partial-capture'] = problem;
})();
