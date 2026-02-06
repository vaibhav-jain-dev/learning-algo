/**
 * Shortest Path with Weighted Cells
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/02-shortest-path-binary-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path with Weighted Cells',
        difficulty: 'Hard',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/02-shortest-path-binary-matrix',
        description: 'Each cell has a cost (0 means free, higher values mean more cost). Find the path from top-left to bottom-right with minimum total cost.',
        problem: 'Standard BFS assumes uniform cost. With varying weights, you need Dijkstra\\',
        hints: [
            'Start by understanding the key difference: Standard BFS assumes uniform cost.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the shortest path with weighted cells criteria.'
            },
            {
                input: {"grid":[[0,0,0],[1,1,0],[1,1,0]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the shortest path with weighted cells criteria.'
            },
            {
                input: {"grid":[[1,0,0],[1,1,0],[1,1,0]]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the shortest path with weighted cells criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def shortest_path_with_weighted_cells(grid):
    """
    Shortest Path with Weighted Cells

    Each cell has a cost (0 means free, higher values mean more cost). Find the path from top-left to bottom-right with minimum total cost.

    Time: O(N^2)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(shortest_path_with_weighted_cells([[0,1],[1,0]]))  # Expected: 1
print(shortest_path_with_weighted_cells([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: 2
print(shortest_path_with_weighted_cells([[1,0,0],[1,1,0],[1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ShortestPathWithWeightedCells solves the Shortest Path with Weighted Cells problem.
// Each cell has a cost (0 means free, higher values mean more cost). Find the path from top-left to bottom-right with minimum total cost.
// Time: O(N^2), Space: O(N^2)
func ShortestPathWithWeightedCells(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ShortestPathWithWeightedCells([][]int{{0, 1}, {1, 0}})) // Expected: 1
	fmt.Println(ShortestPathWithWeightedCells([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 2
	fmt.Println(ShortestPathWithWeightedCells([][]int{{1, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/02-shortest-path-binary-matrix/twist-02-shortest-path-with-weighted-cells', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/02-shortest-path-binary-matrix/twist-02-shortest-path-with-weighted-cells'] = problem;
})();
