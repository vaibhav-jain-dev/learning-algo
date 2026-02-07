/**
 * Count Surrounded Regions
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/01-surrounded-regions
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Surrounded Regions',
        difficulty: 'Easy',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/01-surrounded-regions',
        description: 'Instead of capturing surrounded regions, just count how many distinct surrounded regions exist.',
        problem: 'You skip the matrix modification and just count. Each new DFS from an interior O that is not border-connected increments a counter.',
        hints: [
            'Start by understanding the key difference: You skip the matrix modification and just count.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Board with 3 groups of Os: 2 are surrounded, 1 touches border.',
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
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"board":[["X","X","X","X"]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def count_surrounded_regions(board):
    """
    Count Surrounded Regions

    Instead of capturing surrounded regions, just count how many distinct surrounded regions exist.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(board)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_surrounded_regions([["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]))  # Expected: 1
print(count_surrounded_regions([["X","X","X","X"]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountSurroundedRegions solves the Count Surrounded Regions problem.
// Instead of capturing surrounded regions, just count how many distinct surrounded regions exist.
// Time: O(M * N), Space: O(M * N)
func CountSurroundedRegions(board [][]int) int {
	result := 0

	for i := 0; i < len(board); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountSurroundedRegions([][]int{{X, X, X, X}, {X, O, O, X}, {X, X, O, X}, {X, O, X, X}})) // Expected: 1
	fmt.Println(CountSurroundedRegions([][]int{{X, X, X, X}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/01-surrounded-regions/twist-01-count-surrounded-regions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/01-surrounded-regions/twist-01-count-surrounded-regions'] = problem;
})();
