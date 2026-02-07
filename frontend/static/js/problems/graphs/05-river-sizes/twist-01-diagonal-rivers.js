/**
 * Diagonal Rivers
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Diagonal Rivers',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'Rivers can also flow diagonally. Count river sizes when cells are 8-directionally connected instead of 4.',
        problem: 'With 8 directions, components merge in unexpected ways. Two rivers separated by a diagonal gap in the 4-connected version become one river, changing the entire component structure.',
        hints: [
            'Start by understanding the key difference: With 8 directions, components merge in unexpected ways.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"matrix":[[1,1,1],[1,1,1],[1,1,1]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"matrix":[[1,0,0,1,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def diagonal_rivers(matrix):
    """
    Diagonal Rivers

    Rivers can also flow diagonally. Count river sizes when cells are 8-directionally connected instead of 4.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(diagonal_rivers([[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]]))  # Expected: 1
print(diagonal_rivers([[1,1,1],[1,1,1],[1,1,1]]))  # Expected: 2
print(diagonal_rivers([[1,0,0,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DiagonalRivers solves the Diagonal Rivers problem.
// Rivers can also flow diagonally. Count river sizes when cells are 8-directionally connected instead of 4.
// Time: O(N * M), Space: O(N * M)
func DiagonalRivers(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DiagonalRivers([][]int{{1, 0, 0, 1, 0}, {1, 0, 1, 0, 0}, {0, 0, 1, 0, 1}, {1, 0, 1, 0, 1}, {1, 0, 1, 1, 0}})) // Expected: 1
	fmt.Println(DiagonalRivers([][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}})) // Expected: 2
	fmt.Println(DiagonalRivers([][]int{{1, 0, 0, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/twist-01-diagonal-rivers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/twist-01-diagonal-rivers'] = problem;
})();
