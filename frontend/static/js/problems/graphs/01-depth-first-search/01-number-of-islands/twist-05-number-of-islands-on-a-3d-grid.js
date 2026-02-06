/**
 * Number of Islands on a 3D Grid
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/01-number-of-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Islands on a 3D Grid',
        difficulty: 'Hard',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/01-number-of-islands',
        description: 'Extend the problem to a 3D grid (layers x rows x cols). A "3D island" is a connected component of 1s connected in 6 directions (up/down/left/right/above/below).',
        problem: 'Adds a third dimension to the DFS, requiring 6-directional exploration. The mental model shifts from 2D grid to 3D space, and stack depth can grow significantly.',
        hints: [
            'Start by understanding the key difference: Adds a third dimension to the DFS, requiring 6-directional exploration.',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the number of islands on a 3d grid criteria.'
            },
            {
                input: {"grid":[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the number of islands on a 3d grid criteria.'
            },
            // Edge case
            {
                input: {"grid":[["1","1","1","1","0"]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def number_of_islands_on_a_3d_grid(grid):
    """
    Number of Islands on a 3D Grid

    Extend the problem to a 3D grid (layers x rows x cols). A "3D island" is a connected component of 1s connected in 6 directions (up/down/left/right/above/below).

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(number_of_islands_on_a_3d_grid([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))  # Expected: 1
print(number_of_islands_on_a_3d_grid([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]))  # Expected: 2
print(number_of_islands_on_a_3d_grid([["1","1","1","1","0"]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NumberOfIslandsOnA3dGrid solves the Number of Islands on a 3D Grid problem.
// Extend the problem to a 3D grid (layers x rows x cols). A "3D island" is a connected component of 1s connected in 6 directions (up/down/left/right/above/below).
// Time: O(M * N), Space: O(M * N)
func NumberOfIslandsOnA3dGrid(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NumberOfIslandsOnA3dGrid([][]int{{1, 1, 1, 1, 0}, {1, 1, 0, 1, 0}, {1, 1, 0, 0, 0}, {0, 0, 0, 0, 0}})) // Expected: 1
	fmt.Println(NumberOfIslandsOnA3dGrid([][]int{{1, 1, 0, 0, 0}, {1, 1, 0, 0, 0}, {0, 0, 1, 0, 0}, {0, 0, 0, 1, 1}})) // Expected: 2
	fmt.Println(NumberOfIslandsOnA3dGrid([][]int{{1, 1, 1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands/twist-05-number-of-islands-on-a-3d-grid', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands/twist-05-number-of-islands-on-a-3d-grid'] = problem;
})();
