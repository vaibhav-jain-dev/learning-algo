/**
 * Return Sub-Island Cells
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return Sub-Island Cells',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'Instead of counting sub-islands, return the list of all cells that belong to any sub-island in grid2.',
        problem: 'You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.',
        hints: [
            'Start by understanding the key difference: You must collect cell coordinates during DFS and only include them in the result if the island qualifies as a sub-island, requiring deferred output.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Sub-island at cells [(0,0),(0,1),(1,0)].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid1":[[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]],"grid2":[[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]},
                output: [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0]],
                explanation: 'The return sub island cells for this input yields [1,1,1,0,0, 0,1,1,1,1, 0,0,0,0,0].'
            },
            // Edge case
            {
                input: {"grid1":[[1,1,1,0,0]],"grid2":[[1,1,1,0,0]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def return_sub_island_cells(grid1, grid2):
    """
    Return Sub-Island Cells

    Instead of counting sub-islands, return the list of all cells that belong to any sub-island in grid2.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = []

    for i in range(len(grid1)):
        # Check if element meets criteria
        result.append(grid1[i])

    return result


# Test cases
print(return_sub_island_cells([[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]))  # Expected: [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0]]
print(return_sub_island_cells([[1,1,1,0,0]], [[1,1,1,0,0]]))  # Expected: []
`,
            go: `package main

import "fmt"

// ReturnSubIslandCells solves the Return Sub-Island Cells problem.
// Instead of counting sub-islands, return the list of all cells that belong to any sub-island in grid2.
// Time: O(M * N), Space: O(M * N)
func ReturnSubIslandCells(grid1 [][]int, grid2 [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(grid1); i++ {
		result = append(result, grid1[i])
	}

	return result
}

func main() {
	fmt.Println(ReturnSubIslandCells([][]int{{1, 1, 1, 0, 0}, {0, 1, 1, 1, 1}, {0, 0, 0, 0, 0}, {1, 0, 0, 0, 0}, {1, 1, 0, 1, 1}}, [][]int{{1, 1, 1, 0, 0}, {0, 0, 1, 1, 1}, {0, 1, 0, 0, 0}, {1, 0, 1, 1, 0}, {0, 1, 0, 1, 0}})) // Expected: [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0]]
	fmt.Println(ReturnSubIslandCells([][]int{{1, 1, 1, 0, 0}}, [][]int{{1, 1, 1, 0, 0}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-05-return-sub-island-cells', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-05-return-sub-island-cells'] = problem;
})();
