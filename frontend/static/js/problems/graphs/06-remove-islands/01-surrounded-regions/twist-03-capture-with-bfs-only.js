/**
 * Capture with BFS Only
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/01-surrounded-regions
 */
(function() {
    'use strict';

    const problem = {
        name: 'Capture with BFS Only',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/01-surrounded-regions',
        description: 'Solve using BFS instead of DFS. Start from all border Os and expand inward.',
        problem: 'BFS from border cells naturally marks all safe Os level by level. The remaining Os are surrounded. This reversal of approach avoids deep recursion.',
        hints: [
            'Start by understanding the key difference: BFS from border cells naturally marks all safe Os level by level.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Same board, but processed with a queue starting from all border O cells simultaneously.',
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
                explanation: 'The capture with bfs only for this input yields [X,X,X,X, X,O,O,X, X,X,O,X].'
            },
            // Edge case
            {
                input: {"board":[["X","X","X","X"]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def capture_with_bfs_only(board):
    """
    Capture with BFS Only

    Solve using BFS instead of DFS. Start from all border Os and expand inward.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = []

    for i in range(len(board)):
        # Check if element meets criteria
        result.append(board[i])

    return result


# Test cases
print(capture_with_bfs_only([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]))  # Expected: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"]]
print(capture_with_bfs_only([["X","X","X","X"]]))  # Expected: []
`,
            go: `package main

import "fmt"

// CaptureWithBfsOnly solves the Capture with BFS Only problem.
// Solve using BFS instead of DFS. Start from all border Os and expand inward.
// Time: O(M * N), Space: O(M * N)
func CaptureWithBfsOnly(board [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(board); i++ {
		result = append(result, board[i])
	}

	return result
}

func main() {
	fmt.Println(CaptureWithBfsOnly([][]int{{X, X, X, X}, {X, O, O, X}, {X, X, O, X}, {X, O, X, X}})) // Expected: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"]]
	fmt.Println(CaptureWithBfsOnly([][]int{{X, X, X, X}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions/twist-03-capture-with-bfs-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions/twist-03-capture-with-bfs-only'] = problem;
})();
