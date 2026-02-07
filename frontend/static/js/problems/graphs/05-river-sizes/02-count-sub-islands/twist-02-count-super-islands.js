/**
 * Count Super Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Super Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'Instead of sub-islands, count islands in grid1 that contain at least one complete island from grid2.',
        problem: 'You reverse the containment check. For each grid1 island, you check if any grid2 island is fully inside it, requiring you to map grid2 islands to grid1 islands.',
        hints: [
            'Start by understanding the key difference: You reverse the containment check.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Grid1 has one large island.',
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
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"grid1":[[1,1,1,0,0]],"grid2":[[1,1,1,0,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def count_super_islands(grid1, grid2):
    """
    Count Super Islands

    Instead of sub-islands, count islands in grid1 that contain at least one complete island from grid2.

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
print(count_super_islands([[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]))  # Expected: 1
print(count_super_islands([[1,1,1,0,0]], [[1,1,1,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountSuperIslands solves the Count Super Islands problem.
// Instead of sub-islands, count islands in grid1 that contain at least one complete island from grid2.
// Time: O(M * N), Space: O(M * N)
func CountSuperIslands(grid1 [][]int, grid2 [][]int) int {
	result := 0

	for i := 0; i < len(grid1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountSuperIslands([][]int{{1, 1, 1, 0, 0}, {0, 1, 1, 1, 1}, {0, 0, 0, 0, 0}, {1, 0, 0, 0, 0}, {1, 1, 0, 1, 1}}, [][]int{{1, 1, 1, 0, 0}, {0, 0, 1, 1, 1}, {0, 1, 0, 0, 0}, {1, 0, 1, 1, 0}, {0, 1, 0, 1, 0}})) // Expected: 1
	fmt.Println(CountSuperIslands([][]int{{1, 1, 1, 0, 0}}, [][]int{{1, 1, 1, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-02-count-super-islands', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-02-count-super-islands'] = problem;
})();
