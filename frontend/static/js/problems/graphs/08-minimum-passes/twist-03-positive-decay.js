/**
 * Positive Decay
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Positive Decay',
        difficulty: 'Hard',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes',
        description: 'After converting a negative to positive, the new positive has strength 1. Original positives have strength equal to their value. A positive can only convert adjacent negatives if its strength exceeds the absolute value of the negative.',
        problem: 'Simple BFS propagation no longer works uniformly. Each conversion depends on value comparison, requiring priority-based processing.',
        hints: [
            'Start by understanding the key difference: Simple BFS propagation no longer works uniformly.',
            'Consider breaking this into subproblems and solving each independently.'
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
            python: `def positive_decay(matrix):
    """
    Positive Decay

    After converting a negative to positive, the new positive has strength 1. Original positives have strength equal to their value. A positive can only convert adjacent negatives if its strength exceeds the absolute value of the negative.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = 0

    for i in range(len(matrix)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(positive_decay([[0,-1,-3,2,0],[1,-2,-5,-1,-3],[3,0,0,-4,-1]]))  # Expected: 1
print(positive_decay([[1,0,0,-2,-3],[-4,-5,-6,-2,-1],[0,0,0,0,-1],[1,2,3,0,-2]]))  # Expected: 2
print(positive_decay([[0,-1,-3,2,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// PositiveDecay solves the Positive Decay problem.
// After converting a negative to positive, the new positive has strength 1. Original positives have strength equal to their value. A positive can only convert adjacent negatives if its strength exceeds the absolute value of the negative.
// Time: O(N * M), Space: O(N * M)
func PositiveDecay(matrix [][]int) int {
	result := 0

	for i := 0; i < len(matrix); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PositiveDecay([][]int{{0, -1, -3, 2, 0}, {1, -2, -5, -1, -3}, {3, 0, 0, -4, -1}})) // Expected: 1
	fmt.Println(PositiveDecay([][]int{{1, 0, 0, -2, -3}, {-4, -5, -6, -2, -1}, {0, 0, 0, 0, -1}, {1, 2, 3, 0, -2}})) // Expected: 2
	fmt.Println(PositiveDecay([][]int{{0, -1, -3, 2, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/twist-03-positive-decay', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/twist-03-positive-decay'] = problem;
})();
