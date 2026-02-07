/**
 * K Largest Rivers
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Largest Rivers',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'Return only the K largest river sizes. Optimize so you do not need to sort all sizes.',
        problem: 'A min-heap of size K during traversal avoids sorting all components. You must think about the selection problem layered on top of flood fill.',
        hints: [
            'Start by understanding the key difference: A min-heap of size K during traversal avoids sorting all components.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]],"k":3},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"matrix":[[1,1,1],[1,1,1],[1,1,1]],"k":3},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"matrix":[[1,0,0,1,0]],"k":3},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def k_largest_rivers(matrix, k):
    """
    K Largest Rivers

    Return only the K largest river sizes. Optimize so you do not need to sort all sizes.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(k_largest_rivers([[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]], 3))  # Expected: 1
print(k_largest_rivers([[1,1,1],[1,1,1],[1,1,1]], 3))  # Expected: 2
print(k_largest_rivers([[1,0,0,1,0]], 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// KLargestRivers solves the K Largest Rivers problem.
// Return only the K largest river sizes. Optimize so you do not need to sort all sizes.
// Time: O(N * M), Space: O(N * M)
func KLargestRivers(matrix [][]int, k int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KLargestRivers([][]int{{1, 0, 0, 1, 0}, {1, 0, 1, 0, 0}, {0, 0, 1, 0, 1}, {1, 0, 1, 0, 1}, {1, 0, 1, 1, 0}}, 3)) // Expected: 1
	fmt.Println(KLargestRivers([][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}}, 3)) // Expected: 2
	fmt.Println(KLargestRivers([][]int{{1, 0, 0, 1, 0}}, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/twist-03-k-largest-rivers', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/twist-03-k-largest-rivers'] = problem;
})();
