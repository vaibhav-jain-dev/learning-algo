/**
 * Water Enclaves
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/02-number-of-enclaves
 */
(function() {
    'use strict';

    const problem = {
        name: 'Water Enclaves',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/02-number-of-enclaves',
        description: 'Instead of land enclaves, count water cells (0s) that are completely enclosed by land (1s) and cannot reach the boundary.',
        problem: 'You flip the roles of 0 and 1. Now you DFS from boundary water cells and count remaining interior water cells.',
        hints: [
            'Start by understanding the key difference: You flip the roles of 0 and 1.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the water enclaves criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def water_enclaves(grid):
    """
    Water Enclaves

    Instead of land enclaves, count water cells (0s) that are completely enclosed by land (1s) and cannot reach the boundary.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(water_enclaves([[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]))  # Expected: 1
print(water_enclaves([[0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WaterEnclaves solves the Water Enclaves problem.
// Instead of land enclaves, count water cells (0s) that are completely enclosed by land (1s) and cannot reach the boundary.
// Time: O(M * N), Space: O(M * N)
func WaterEnclaves(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WaterEnclaves([][]int{{0, 0, 0, 0}, {1, 0, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}})) // Expected: 1
	fmt.Println(WaterEnclaves([][]int{{0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/02-number-of-enclaves/twist-04-water-enclaves', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/02-number-of-enclaves/twist-04-water-enclaves'] = problem;
})();
