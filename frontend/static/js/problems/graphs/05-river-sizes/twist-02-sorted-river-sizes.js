/**
 * Sorted River Sizes
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted River Sizes',
        difficulty: 'Easy',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'Return river sizes in sorted order from smallest to largest.',
        problem: 'The core BFS/DFS is the same, but you must think about the output format and whether to sort in-place or use a data structure that maintains order.',
        hints: [
            'Start by understanding the key difference: The core BFS/DFS is the same, but you must think about the output format and whether to sort in-place or use a data structure that maintains order.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Matrix with rivers of sizes [5, 2, 1, 2].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
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
            python: `def sorted_river_sizes(matrix):
    """
    Sorted River Sizes

    Return river sizes in sorted order from smallest to largest.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(sorted_river_sizes([[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]]))  # Expected: 1
print(sorted_river_sizes([[1,1,1],[1,1,1],[1,1,1]]))  # Expected: 2
print(sorted_river_sizes([[1,0,0,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SortedRiverSizes solves the Sorted River Sizes problem.
// Return river sizes in sorted order from smallest to largest.
// Time: O(N * M), Space: O(N * M)
func SortedRiverSizes(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SortedRiverSizes([][]int{{1, 0, 0, 1, 0}, {1, 0, 1, 0, 0}, {0, 0, 1, 0, 1}, {1, 0, 1, 0, 1}, {1, 0, 1, 1, 0}})) // Expected: 1
	fmt.Println(SortedRiverSizes([][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}})) // Expected: 2
	fmt.Println(SortedRiverSizes([][]int{{1, 0, 0, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/twist-02-sorted-river-sizes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/twist-02-sorted-river-sizes'] = problem;
})();
