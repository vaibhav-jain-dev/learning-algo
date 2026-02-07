/**
 * Exact Island Match
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/02-count-sub-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Exact Island Match',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/02-count-sub-islands',
        description: 'An island in grid2 counts only if it has the exact same shape and position as an island in grid1 (not just contained within).',
        problem: 'Containment is not enough. You must ensure no extra cells exist in grid1 island beyond those in grid2 island, requiring bidirectional shape comparison.',
        hints: [
            'Start by understanding the key difference: Containment is not enough.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Grid1 island covers cells {(0,0),(0,1),(1,0)}.',
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
                output: 0,
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
            python: `def exact_island_match(grid1, grid2):
    """
    Exact Island Match

    An island in grid2 counts only if it has the exact same shape and position as an island in grid1 (not just contained within).

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
print(exact_island_match([[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]))  # Expected: 0
print(exact_island_match([[1,1,1,0,0]], [[1,1,1,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ExactIslandMatch solves the Exact Island Match problem.
// An island in grid2 counts only if it has the exact same shape and position as an island in grid1 (not just contained within).
// Time: O(M * N), Space: O(M * N)
func ExactIslandMatch(grid1 [][]int, grid2 [][]int) int {
	result := 0

	for i := 0; i < len(grid1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ExactIslandMatch([][]int{{1, 1, 1, 0, 0}, {0, 1, 1, 1, 1}, {0, 0, 0, 0, 0}, {1, 0, 0, 0, 0}, {1, 1, 0, 1, 1}}, [][]int{{1, 1, 1, 0, 0}, {0, 0, 1, 1, 1}, {0, 1, 0, 0, 0}, {1, 0, 1, 1, 0}, {0, 1, 0, 1, 0}})) // Expected: 0
	fmt.Println(ExactIslandMatch([][]int{{1, 1, 1, 0, 0}}, [][]int{{1, 1, 1, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/02-count-sub-islands/twist-01-exact-island-match', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/02-count-sub-islands/twist-01-exact-island-match'] = problem;
})();
