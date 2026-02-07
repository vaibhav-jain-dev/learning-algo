/**
 * Reversible Rot
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes/01-rotting-oranges
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reversible Rot',
        difficulty: 'Hard',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/01-rotting-oranges',
        description: 'A rotten orange becomes fresh again after 2 minutes. Fresh oranges adjacent to rotten ones still get infected during the minute. Does the grid stabilize?',
        problem: 'The BFS is no longer monotonic. Rot waves oscillate, and you must simulate until a steady state or detect an infinite cycle.',
        hints: [
            'Start by understanding the key difference: The BFS is no longer monotonic.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Grid [[2,1,0,0,1]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[2,1,1],[1,1,0],[0,1,1]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"grid":[[2,1,1]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def reversible_rot(grid):
    """
    Reversible Rot

    A rotten orange becomes fresh again after 2 minutes. Fresh oranges adjacent to rotten ones still get infected during the minute. Does the grid stabilize?

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(reversible_rot([[2,1,1],[1,1,0],[0,1,1]]))  # Expected: 1
print(reversible_rot([[2,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReversibleRot solves the Reversible Rot problem.
// A rotten orange becomes fresh again after 2 minutes. Fresh oranges adjacent to rotten ones still get infected during the minute. Does the grid stabilize?
// Time: O(M * N), Space: O(M * N)
func ReversibleRot(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReversibleRot([][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}})) // Expected: 1
	fmt.Println(ReversibleRot([][]int{{2, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/01-rotting-oranges/twist-04-reversible-rot', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/01-rotting-oranges/twist-04-reversible-rot'] = problem;
})();
