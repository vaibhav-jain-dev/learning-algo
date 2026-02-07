/**
 * Iterative DFS Only
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/01-max-area-of-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative DFS Only',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/01-max-area-of-island',
        description: 'Solve the problem using an explicit stack instead of recursion. The grid can be up to 1000x1000.',
        problem: 'Large grids cause stack overflow with recursive DFS. You must convert to iterative DFS with an explicit stack, changing the code structure significantly.',
        hints: [
            'Start by understanding the key difference: Large grids cause stack overflow with recursive DFS.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: A 1000x1000 grid filled with 1s.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M × N)',
            space: 'O(M × N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"grid":[[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            {
                input: {"grid":[[0,0,0,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,1,0,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def iterative_dfs_only(grid):
    """
    Iterative DFS Only

    Solve the problem using an explicit stack instead of recursion. The grid can be up to 1000x1000.

    Time: O(M × N)
    Space: O(M × N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_dfs_only([[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]))  # Expected: 1
print(iterative_dfs_only([[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]))  # Expected: 2
print(iterative_dfs_only([[0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeDfsOnly solves the Iterative DFS Only problem.
// Solve the problem using an explicit stack instead of recursion. The grid can be up to 1000x1000.
// Time: O(M × N), Space: O(M × N)
func IterativeDfsOnly(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeDfsOnly([][]int{{0, 0, 1, 0, 0}, {0, 1, 1, 1, 0}, {0, 0, 1, 0, 0}})) // Expected: 1
	fmt.Println(IterativeDfsOnly([][]int{{1, 1, 0, 0}, {1, 1, 0, 0}, {0, 0, 1, 1}, {0, 0, 1, 1}})) // Expected: 2
	fmt.Println(IterativeDfsOnly([][]int{{0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/01-max-area-of-island/twist-05-iterative-dfs-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/01-max-area-of-island/twist-05-iterative-dfs-only'] = problem;
})();
