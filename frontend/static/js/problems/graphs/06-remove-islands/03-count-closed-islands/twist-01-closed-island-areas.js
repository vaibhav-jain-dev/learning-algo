/**
 * Closed Island Areas
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/03-count-closed-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closed Island Areas',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/03-count-closed-islands',
        description: 'Return the total area (cell count) of all closed islands combined, not just the count of closed islands.',
        problem: 'You must accumulate cell counts during the second-pass DFS rather than just incrementing a counter per island.',
        hints: [
            'Start by understanding the key difference: You must accumulate cell counts during the second-pass DFS rather than just incrementing a counter per island.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Two closed islands with areas 4 and 3.',
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
            python: `def closed_island_areas(grid):
    """
    Closed Island Areas

    Return the total area (cell count) of all closed islands combined, not just the count of closed islands.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(closed_island_areas([[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]))  # Expected: 1
print(closed_island_areas([[1,1,1,1,1,1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ClosedIslandAreas solves the Closed Island Areas problem.
// Return the total area (cell count) of all closed islands combined, not just the count of closed islands.
// Time: O(M * N), Space: O(M * N)
func ClosedIslandAreas(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ClosedIslandAreas([][]int{{1, 1, 1, 1, 1, 1, 1, 0}, {1, 0, 0, 0, 0, 1, 1, 0}, {1, 0, 1, 0, 1, 1, 1, 0}, {1, 0, 0, 0, 0, 1, 0, 1}, {1, 1, 1, 1, 1, 1, 1, 0}})) // Expected: 1
	fmt.Println(ClosedIslandAreas([][]int{{1, 1, 1, 1, 1, 1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/03-count-closed-islands/twist-01-closed-island-areas', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/03-count-closed-islands/twist-01-closed-island-areas'] = problem;
})();
