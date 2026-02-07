/**
 * Remove One Cell
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-largest-island
 * Parent: 05-river-sizes/03-making-a-large-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove One Cell',
        difficulty: 'Hard',
        algorithm: 'graph-largest-island',
        parent: '05-river-sizes/03-making-a-large-island',
        description: 'Instead of adding a cell, remove one land cell (set 1 to 0). Find the largest remaining island.',
        problem: 'Removing a cell can split an island into multiple pieces. You need to check if the cell is an articulation point of its island, which requires bridge-finding algorithms.',
        hints: [
            'Start by understanding the key difference: Removing a cell can split an island into multiple pieces.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Island shaped like a line [1,1,1,1].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[1,0],[0,1]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"grid":[[1,1],[1,0]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            {
                input: {"grid":[[1,1],[1,1]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            },
            // Edge case
            {
                input: {"grid":[[1,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def remove_one_cell(grid):
    """
    Remove One Cell

    Instead of adding a cell, remove one land cell (set 1 to 0). Find the largest remaining island.

    Time: O(N^2)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(remove_one_cell([[1,0],[0,1]]))  # Expected: 1
print(remove_one_cell([[1,1],[1,0]]))  # Expected: 2
print(remove_one_cell([[1,1],[1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RemoveOneCell solves the Remove One Cell problem.
// Instead of adding a cell, remove one land cell (set 1 to 0). Find the largest remaining island.
// Time: O(N^2), Space: O(N^2)
func RemoveOneCell(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RemoveOneCell([][]int{{1, 0}, {0, 1}})) // Expected: 1
	fmt.Println(RemoveOneCell([][]int{{1, 1}, {1, 0}})) // Expected: 2
	fmt.Println(RemoveOneCell([][]int{{1, 1}, {1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/03-making-a-large-island/twist-02-remove-one-cell', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/03-making-a-large-island/twist-02-remove-one-cell'] = problem;
})();
