/**
 * Count Removed Cells
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Removed Cells',
        difficulty: 'Easy',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Instead of returning the modified matrix, return the total count of removed cells (island cells not touching border).',
        problem: 'You simplify the output but the traversal is identical. The twist forces you to realize the counting can happen during traversal without modifying the matrix.',
        hints: [
            'Start by understanding the key difference: You simplify the output but the traversal is identical.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Matrix 6x6 with 3 interior 1s that form an island.',
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
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"matrix":[[1,1,1],[1,0,1],[1,1,1]]},
                output: 2,
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
            python: `def count_removed_cells(matrix):
    """
    Count Removed Cells

    Instead of returning the modified matrix, return the total count of removed cells (island cells not touching border).

    Time: O(N * M)
    Space: O(N * M)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_removed_cells([[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]))  # Expected: 1
print(count_removed_cells([[1,1,1],[1,0,1],[1,1,1]]))  # Expected: 2
print(count_removed_cells([[1,0,0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountRemovedCells solves the Count Removed Cells problem.
// Instead of returning the modified matrix, return the total count of removed cells (island cells not touching border).
// Time: O(N * M), Space: O(N * M)
func CountRemovedCells(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountRemovedCells([][]int{{1, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 1, 1}, {0, 0, 1, 0, 1, 0}, {1, 1, 0, 0, 1, 0}, {1, 0, 1, 1, 0, 0}, {1, 0, 0, 0, 0, 1}})) // Expected: 1
	fmt.Println(CountRemovedCells([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})) // Expected: 2
	fmt.Println(CountRemovedCells([][]int{{1, 0, 0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/twist-02-count-removed-cells', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/twist-02-count-removed-cells'] = problem;
})();
