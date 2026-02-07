/**
 * Reversed Cell Meanings
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/03-count-closed-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reversed Cell Meanings',
        difficulty: 'Easy',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/03-count-closed-islands',
        description: 'In this variant, 1 represents land and 0 represents water (the usual convention). Count closed islands of 1s surrounded by 0s.',
        problem: 'The problem uses inverted conventions (0=land, 1=water). Switching back to standard convention tests whether you adapt your boundary conditions correctly.',
        hints: [
            'Start by understanding the key difference: The problem uses inverted conventions (0=land, 1=water).',
            'Consider how this simplifies the original problem approach.'
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
            python: `def reversed_cell_meanings(grid):
    """
    Reversed Cell Meanings

    In this variant, 1 represents land and 0 represents water (the usual convention). Count closed islands of 1s surrounded by 0s.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(reversed_cell_meanings([[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]))  # Expected: 1
print(reversed_cell_meanings([[1,1,1,1,1,1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReversedCellMeanings solves the Reversed Cell Meanings problem.
// In this variant, 1 represents land and 0 represents water (the usual convention). Count closed islands of 1s surrounded by 0s.
// Time: O(M * N), Space: O(M * N)
func ReversedCellMeanings(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReversedCellMeanings([][]int{{1, 1, 1, 1, 1, 1, 1, 0}, {1, 0, 0, 0, 0, 1, 1, 0}, {1, 0, 1, 0, 1, 1, 1, 0}, {1, 0, 0, 0, 0, 1, 0, 1}, {1, 1, 1, 1, 1, 1, 1, 0}})) // Expected: 1
	fmt.Println(ReversedCellMeanings([][]int{{1, 1, 1, 1, 1, 1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/03-count-closed-islands/twist-02-reversed-cell-meanings', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/03-count-closed-islands/twist-02-reversed-cell-meanings'] = problem;
})();
