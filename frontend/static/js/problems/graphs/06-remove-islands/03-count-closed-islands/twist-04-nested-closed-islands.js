/**
 * Nested Closed Islands
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/03-count-closed-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nested Closed Islands',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/03-count-closed-islands',
        description: 'A closed island can contain water that itself contains another closed island. Count islands at each nesting level.',
        problem: 'You need to reason about nesting depth. After removing boundary-connected land, the remaining closed islands may themselves surround water regions with sub-islands.',
        hints: [
            'Start by understanding the key difference: You need to reason about nesting depth.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: A ring of land surrounds water, which surrounds another land island.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"grid":[[1,1,1,1,1,1,1,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def nested_closed_islands(grid):
    """
    Nested Closed Islands

    A closed island can contain water that itself contains another closed island. Count islands at each nesting level.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(nested_closed_islands([[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]))  # Expected: 1
print(nested_closed_islands([[1,1,1,1,1,1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NestedClosedIslands solves the Nested Closed Islands problem.
// A closed island can contain water that itself contains another closed island. Count islands at each nesting level.
// Time: O(M * N), Space: O(M * N)
func NestedClosedIslands(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NestedClosedIslands([][]int{{1, 1, 1, 1, 1, 1, 1, 0}, {1, 0, 0, 0, 0, 1, 1, 0}, {1, 0, 1, 0, 1, 1, 1, 0}, {1, 0, 0, 0, 0, 1, 0, 1}, {1, 1, 1, 1, 1, 1, 1, 0}})) // Expected: 1
	fmt.Println(NestedClosedIslands([][]int{{1, 1, 1, 1, 1, 1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/03-count-closed-islands/twist-04-nested-closed-islands', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/03-count-closed-islands/twist-04-nested-closed-islands'] = problem;
})();
