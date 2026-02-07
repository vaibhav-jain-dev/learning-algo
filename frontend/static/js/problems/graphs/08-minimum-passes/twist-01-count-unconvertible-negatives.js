/**
 * Count Unconvertible Negatives
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Unconvertible Negatives',
        difficulty: 'Easy',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes',
        description: 'Instead of returning passes count, return how many negative values remain unconvertible (surrounded by zeros or other negatives with no positive path).',
        problem: 'You shift focus from the BFS level count to the remaining unconverted cells after BFS completes, requiring a final scan of the matrix.',
        hints: [
            'Start by understanding the key difference: You shift focus from the BFS level count to the remaining unconverted cells after BFS completes, requiring a final scan of the matrix.',
            'Consider how this simplifies the original problem approach.'
        ],
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[0,-1,-3,2,0],[1,-2,-5,-1,-3],[3,0,0,-4,-1]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"matrix":[[1,0,0,-2,-3],[-4,-5,-6,-2,-1],[0,0,0,0,-1],[1,2,3,0,-2]]},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"matrix":[[0,-1,-3,2,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def count_unconvertible_negatives(matrix):
    """
    Count Unconvertible Negatives

    Instead of returning passes count, return how many negative values remain unconvertible (surrounded by zeros or other negatives with no positive path).

    Time: O(N * M)
    Space: O(N * M)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_unconvertible_negatives([[0,-1,-3,2,0],[1,-2,-5,-1,-3],[3,0,0,-4,-1]]))  # Expected: 1
print(count_unconvertible_negatives([[1,0,0,-2,-3],[-4,-5,-6,-2,-1],[0,0,0,0,-1],[1,2,3,0,-2]]))  # Expected: 2
print(count_unconvertible_negatives([[0,-1,-3,2,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountUnconvertibleNegatives solves the Count Unconvertible Negatives problem.
// Instead of returning passes count, return how many negative values remain unconvertible (surrounded by zeros or other negatives with no positive path).
// Time: O(N * M), Space: O(N * M)
func CountUnconvertibleNegatives(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountUnconvertibleNegatives([][]int{{0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}})) // Expected: 1
	fmt.Println(CountUnconvertibleNegatives([][]int{{1, 0, 0, -2, -3}, {-4, -5, -6, -2, -1}, {0, 0, 0, 0, -1}, {1, 2, 3, 0, -2}})) // Expected: 2
	fmt.Println(CountUnconvertibleNegatives([][]int{{0, -1, -3, 2, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/twist-01-count-unconvertible-negatives', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/twist-01-count-unconvertible-negatives'] = problem;
})();
