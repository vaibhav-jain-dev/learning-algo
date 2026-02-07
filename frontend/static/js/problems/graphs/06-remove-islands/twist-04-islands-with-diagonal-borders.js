/**
 * Islands with Diagonal Borders
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Islands with Diagonal Borders',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'A cell touches the border if it or any of its 8-directional neighbors is on the grid edge. Remove groups not touching the border even diagonally.',
        problem: '8-directional connectivity changes which groups are considered border-touching. Fewer groups qualify as islands, fundamentally altering the result.',
        hints: [
            'Start by understanding the key difference: 8-directional connectivity changes which groups are considered border-touching.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: A corner 1 at (1,1) is now border-touching because its diagonal neighbor (0,0) is on the edge.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]},
                output: [[0,1]],
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"matrix":[[1,1,1],[1,0,1],[1,1,1]]},
                output: [[0,1],[2,3]],
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"matrix":[[1,0,0,0,0,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def islands_with_diagonal_borders(matrix):
    """
    Islands with Diagonal Borders

    A cell touches the border if it or any of its 8-directional neighbors is on the grid edge. Remove groups not touching the border even diagonally.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = []
    n = len(matrix)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([matrix[i], matrix[j]])

    return result


# Test cases
print(islands_with_diagonal_borders([[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]))  # Expected: [[0,1]]
print(islands_with_diagonal_borders([[1,1,1],[1,0,1],[1,1,1]]))  # Expected: [[0,1],[2,3]]
print(islands_with_diagonal_borders([[1,0,0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// IslandsWithDiagonalBorders solves the Islands with Diagonal Borders problem.
// A cell touches the border if it or any of its 8-directional neighbors is on the grid edge. Remove groups not touching the border even diagonally.
// Time: O(N * M), Space: O(N * M)
func IslandsWithDiagonalBorders(matrix [][]int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(matrix); i++ {
		for j := i + 1; j < len(matrix); j++ {
			result = append(result, []int{matrix[i], matrix[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(IslandsWithDiagonalBorders([][]int{{1, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 1, 1}, {0, 0, 1, 0, 1, 0}, {1, 1, 0, 0, 1, 0}, {1, 0, 1, 1, 0, 0}, {1, 0, 0, 0, 0, 1}})) // Expected: [[0,1]]
	fmt.Println(IslandsWithDiagonalBorders([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})) // Expected: [[0,1],[2,3]]
	fmt.Println(IslandsWithDiagonalBorders([][]int{{1, 0, 0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/twist-04-islands-with-diagonal-borders', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/twist-04-islands-with-diagonal-borders'] = problem;
})();
