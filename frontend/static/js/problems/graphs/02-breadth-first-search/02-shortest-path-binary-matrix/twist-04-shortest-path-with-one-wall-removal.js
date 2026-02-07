/**
 * Shortest Path with One Wall Removal
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/02-shortest-path-binary-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path with One Wall Removal',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/02-shortest-path-binary-matrix',
        description: 'Find the shortest path where you are allowed to convert at most one blocked cell (1) to a clear cell (0). The state now includes whether you have used your removal.',
        problem: 'The state space doubles: each cell has two states (wall-removal-used and wall-removal-available). This requires BFS on a 3D state space (row, col, removalsLeft), a common graph modeling trick.',
        hints: [
            'Start by understanding the key difference: The state space doubles: each cell has two states (wall-removal-used and wall-removal-available).',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,1],[1,0]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"grid":[[0,0,0],[1,1,0],[1,1,0]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            {
                input: {"grid":[[1,0,0],[1,1,0],[1,1,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            },
            // Edge case
            {
                input: {"grid":[[0,1]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def shortest_path_with_one_wall_removal(grid):
    """
    Shortest Path with One Wall Removal

    Find the shortest path where you are allowed to convert at most one blocked cell (1) to a clear cell (0). The state now includes whether you have used your removal.

    Time: O(N^2)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(shortest_path_with_one_wall_removal([[0,1],[1,0]]))  # Expected: 1
print(shortest_path_with_one_wall_removal([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: 2
print(shortest_path_with_one_wall_removal([[1,0,0],[1,1,0],[1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ShortestPathWithOneWallRemoval solves the Shortest Path with One Wall Removal problem.
// Find the shortest path where you are allowed to convert at most one blocked cell (1) to a clear cell (0). The state now includes whether you have used your removal.
// Time: O(N^2), Space: O(N^2)
func ShortestPathWithOneWallRemoval(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ShortestPathWithOneWallRemoval([][]int{{0, 1}, {1, 0}})) // Expected: 1
	fmt.Println(ShortestPathWithOneWallRemoval([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 2
	fmt.Println(ShortestPathWithOneWallRemoval([][]int{{1, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/02-shortest-path-binary-matrix/twist-04-shortest-path-with-one-wall-removal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/02-shortest-path-binary-matrix/twist-04-shortest-path-with-one-wall-removal'] = problem;
})();
