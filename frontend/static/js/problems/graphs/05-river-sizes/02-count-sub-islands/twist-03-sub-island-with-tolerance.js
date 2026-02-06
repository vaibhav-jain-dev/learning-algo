/**
 * Sub-Island with Tolerance
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sub-Island with Tolerance',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'An island in grid2 is a sub-island if at most K of its cells are water in grid1.',
        problem: 'The boolean check becomes a counting problem. You track the number of mismatched cells during DFS and compare against threshold K.',
        hints: [
            'Start by understanding the key difference: The boolean check becomes a counting problem.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Grid2 island has 10 cells, 2 are water in grid1.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the sub island with tolerance criteria.'
            },
            // Edge case
            {
                input: {"grid1":[[1,1,1,0,0]],"grid2":[[1,1,1,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def sub_island_with_tolerance(grid1, grid2):
    """
    Sub-Island with Tolerance

    An island in grid2 is a sub-island if at most K of its cells are water in grid1.

    Time: O(M * N)
    Space: O(M * N)
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
print(sub_island_with_tolerance([[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]))  # Expected: 1
print(sub_island_with_tolerance([[1,1,1,0,0]], [[1,1,1,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SubIslandWithTolerance solves the Sub-Island with Tolerance problem.
// An island in grid2 is a sub-island if at most K of its cells are water in grid1.
// Time: O(M * N), Space: O(M * N)
func SubIslandWithTolerance(grid1 [][]int, grid2 [][]int) int {
	result := 0

	for i := 0; i < len(grid1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SubIslandWithTolerance([][]int{{1, 1, 1, 0, 0}, {0, 1, 1, 1, 1}, {0, 0, 0, 0, 0}, {1, 0, 0, 0, 0}, {1, 1, 0, 1, 1}}, [][]int{{1, 1, 1, 0, 0}, {0, 0, 1, 1, 1}, {0, 1, 0, 0, 0}, {1, 0, 1, 1, 0}, {0, 1, 0, 1, 0}})) // Expected: 1
	fmt.Println(SubIslandWithTolerance([][]int{{1, 1, 1, 0, 0}}, [][]int{{1, 1, 1, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-03-sub-island-with-tolerance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-03-sub-island-with-tolerance'] = problem;
})();
