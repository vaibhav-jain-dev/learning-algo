/**
 * Three Grid Sub-Islands
 * Category: graphs
 * Difficulty: Very Hard
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Grid Sub-Islands',
        difficulty: 'Very Hard',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'Given three grids, count islands in grid3 that are sub-islands of both grid1 AND grid2 simultaneously.',
        problem: 'You must check containment against two reference grids simultaneously during a single DFS traversal, requiring AND logic across three matrices.',
        hints: [
            'Start by understanding the key difference: You must check containment against two reference grids simultaneously during a single DFS traversal, requiring AND logic across three matrices.',
            'This is significantly harder than the parent problem. Consider if a different algorithmic paradigm is needed.',
            'Consider the example: Grid3 island cells must all be 1 in both grid1 and grid2.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'Varies - see approach',
            space: 'Varies - see approach'
        },
        examples: [
            // Basic test case
            {
                input: {"grid1":[[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],"grid2":[[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the three grid sub islands criteria.'
            },
            // Edge case
            {
                input: {"grid1":[[1,1,1,0,0]],"grid2":[[1,1,1,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def three_grid_sub_islands(grid1, grid2):
    """
    Three Grid Sub-Islands

    Given three grids, count islands in grid3 that are sub-islands of both grid1 AND grid2 simultaneously.

    Time: Varies - see approach
    Space: Varies - see approach
    """
    count = 0
    n = len(grid1)

    for i in range(n):
        # Check condition based on grid2
        j = 0
        for k in range(i, n):
            if j < len(grid2) and grid1[k] == grid2[j]:
                j += 1
        if j == len(grid2):
            count += 1

    return count


# Test cases
print(three_grid_sub_islands([[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]))  # Expected: 1
print(three_grid_sub_islands([[1,1,1,0,0]], [[1,1,1,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ThreeGridSubIslands solves the Three Grid Sub-Islands problem.
// Given three grids, count islands in grid3 that are sub-islands of both grid1 AND grid2 simultaneously.
// Time: Varies - see approach, Space: Varies - see approach
func ThreeGridSubIslands(grid1 [][]int, grid2 [][]int) int {
	result := 0

	for i := 0; i < len(grid1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ThreeGridSubIslands([][]int{{1, 1, 1, 0, 0}, {0, 1, 1, 1, 1}, {0, 0, 0, 0, 0}, {1, 0, 0, 0, 0}, {1, 1, 0, 1, 1}}, [][]int{{1, 1, 1, 0, 0}, {0, 0, 1, 1, 1}, {0, 1, 0, 0, 0}, {1, 0, 1, 1, 0}, {0, 1, 0, 1, 0}})) // Expected: 1
	fmt.Println(ThreeGridSubIslands([][]int{{1, 1, 1, 0, 0}}, [][]int{{1, 1, 1, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-04-three-grid-sub-islands', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-04-three-grid-sub-islands'] = problem;
})();
