/**
 * Surrounded by Single Character
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/01-surrounded-regions
 */
(function() {
    'use strict';

    const problem = {
        name: 'Surrounded by Single Character',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/01-surrounded-regions',
        description: 'The board has three characters: X, O, and Y. Only capture O regions that are surrounded entirely by X (not Y or border).',
        problem: 'Border connectivity is not the only escape. An O region adjacent to any Y cell also escapes capture, requiring you to check neighbor types during DFS.',
        hints: [
            'Start by understanding the key difference: Border connectivity is not the only escape.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: An O group touches Y but not the border.',
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
                explanation: 'The surrounded by single character for this input yields [X,X,X,X, X,O,O,X, X,X,O,X].'
            },
            // Edge case
            {
                input: {"board":[["X","X","X","X"]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def surrounded_by_single_character(board):
    """
    Surrounded by Single Character

    The board has three characters: X, O, and Y. Only capture O regions that are surrounded entirely by X (not Y or border).

    Time: O(M * N)
    Space: O(M * N)
    """
    result = []

    for i in range(len(board)):
        # Check if element meets criteria
        result.append(board[i])

    return result


# Test cases
print(surrounded_by_single_character([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]))  # Expected: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"]]
print(surrounded_by_single_character([["X","X","X","X"]]))  # Expected: []
`,
            go: `package main

import "fmt"

// SurroundedBySingleCharacter solves the Surrounded by Single Character problem.
// The board has three characters: X, O, and Y. Only capture O regions that are surrounded entirely by X (not Y or border).
// Time: O(M * N), Space: O(M * N)
func SurroundedBySingleCharacter(board [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(board); i++ {
		result = append(result, board[i])
	}

	return result
}

func main() {
	fmt.Println(SurroundedBySingleCharacter([][]int{{X, X, X, X}, {X, O, O, X}, {X, X, O, X}, {X, O, X, X}})) // Expected: [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"]]
	fmt.Println(SurroundedBySingleCharacter([][]int{{X, X, X, X}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions/twist-02-surrounded-by-single-character', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions/twist-02-surrounded-by-single-character'] = problem;
})();
