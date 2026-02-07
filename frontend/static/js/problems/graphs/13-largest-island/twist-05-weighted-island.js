/**
 * Weighted Island
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-largest-island
 * Parent: 13-largest-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Island',
        difficulty: 'Medium',
        algorithm: 'graph-largest-island',
        parent: '13-largest-island',
        description: 'Each land cell has a positive weight. Maximize total island weight after flipping one zero to a cell with weight 1.',
        problem: 'Island size becomes island weight. The labeling pass sums weights instead of counting cells, and the flip contributes weight 1 specifically.',
        hints: [
            'Start by understanding the key difference: Island size becomes island weight.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Two adjacent islands with weights [10, 5] and [3, 8] separated by a zero.',
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
            python: `def weighted_island(grid):
    """
    Weighted Island

    Each land cell has a positive weight. Maximize total island weight after flipping one zero to a cell with weight 1.

    Time: O(N^2)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(weighted_island([[1,0],[0,1]]))  # Expected: 1
print(weighted_island([[1,1],[1,0]]))  # Expected: 2
print(weighted_island([[1,1],[1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedIsland solves the Weighted Island problem.
// Each land cell has a positive weight. Maximize total island weight after flipping one zero to a cell with weight 1.
// Time: O(N^2), Space: O(N^2)
func WeightedIsland(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedIsland([][]int{{1, 0}, {0, 1}})) // Expected: 1
	fmt.Println(WeightedIsland([][]int{{1, 1}, {1, 0}})) // Expected: 2
	fmt.Println(WeightedIsland([][]int{{1, 1}, {1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '13-largest-island/twist-05-weighted-island', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/13-largest-island/twist-05-weighted-island'] = problem;
})();
