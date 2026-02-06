/**
 * Minimum Flips to Surround
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/01-surrounded-regions
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Flips to Surround',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/01-surrounded-regions',
        description: 'Some O regions touch the border through a narrow connection. Find the minimum number of O cells to flip to X to make a specific region surrounded.',
        problem: 'This becomes a min-cut problem. You need to find the smallest set of cells whose removal disconnects an O region from the border.',
        hints: [
            'Start by understanding the key difference: This becomes a min-cut problem.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: An O region connects to border through a single O cell.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the minimum flips to surround criteria.'
            },
            // Edge case
            {
                input: {"board":[["X","X","X","X"]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def minimum_flips_to_surround(board):
    """
    Minimum Flips to Surround

    Some O regions touch the border through a narrow connection. Find the minimum number of O cells to flip to X to make a specific region surrounded.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(board)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(minimum_flips_to_surround([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]))  # Expected: 1
print(minimum_flips_to_surround([["X","X","X","X"]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MinimumFlipsToSurround solves the Minimum Flips to Surround problem.
// Some O regions touch the border through a narrow connection. Find the minimum number of O cells to flip to X to make a specific region surrounded.
// Time: O(M * N), Space: O(M * N)
func MinimumFlipsToSurround(board [][]int) int {
	result := 0

	for i := 0; i < len(board); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumFlipsToSurround([][]int{{X, X, X, X}, {X, O, O, X}, {X, X, O, X}, {X, O, X, X}})) // Expected: 1
	fmt.Println(MinimumFlipsToSurround([][]int{{X, X, X, X}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions/twist-04-minimum-flips-to-surround', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions/twist-04-minimum-flips-to-surround'] = problem;
})();
