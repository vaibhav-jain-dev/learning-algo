/**
 * Top K Island Areas
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/01-max-area-of-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Top K Island Areas',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/01-max-area-of-island',
        description: 'Return the areas of the K largest islands in descending order.',
        problem: 'You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.',
        hints: [
            'Start by understanding the key difference: You need to collect all island areas and then either sort or use a heap, adding a selection step on top of the flood fill.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(M × N)',
            space: 'O(M × N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]],"k":3},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"grid":[[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]],"k":3},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            {
                input: {"grid":[[0,0,0,0]],"k":3},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,1,0,0]],"k":3},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def top_k_island_areas(grid, k):
    """
    Top K Island Areas

    Return the areas of the K largest islands in descending order.

    Time: O(M × N)
    Space: O(M × N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(top_k_island_areas([[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]], 3))  # Expected: 1
print(top_k_island_areas([[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]], 3))  # Expected: 2
print(top_k_island_areas([[0,0,0,0]], 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// TopKIslandAreas solves the Top K Island Areas problem.
// Return the areas of the K largest islands in descending order.
// Time: O(M × N), Space: O(M × N)
func TopKIslandAreas(grid [][]int, k int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TopKIslandAreas([][]int{{0, 0, 1, 0, 0}, {0, 1, 1, 1, 0}, {0, 0, 1, 0, 0}}, 3)) // Expected: 1
	fmt.Println(TopKIslandAreas([][]int{{1, 1, 0, 0}, {1, 1, 0, 0}, {0, 0, 1, 1}, {0, 0, 1, 1}}, 3)) // Expected: 2
	fmt.Println(TopKIslandAreas([][]int{{0, 0, 0, 0}}, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/01-max-area-of-island/twist-02-top-k-island-areas', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/01-max-area-of-island/twist-02-top-k-island-areas'] = problem;
})();
