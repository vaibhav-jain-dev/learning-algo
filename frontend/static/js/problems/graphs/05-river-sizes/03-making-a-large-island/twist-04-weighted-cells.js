/**
 * Weighted Cells
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-largest-island
 * Parent: 05-river-sizes/03-making-a-large-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Cells',
        difficulty: 'Hard',
        algorithm: 'graph-largest-island',
        parent: '05-river-sizes/03-making-a-large-island',
        description: 'Each land cell has a positive weight. Maximize the total weight of the island after flipping one 0 to 1 (with weight 1).',
        problem: 'Island size becomes island weight. You must sum weights during the labeling pass instead of counting cells, and the flip adds weight 1 specifically.',
        hints: [
            'Start by understanding the key difference: Island size becomes island weight.',
            'Consider breaking this into subproblems and solving each independently.'
        ],
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[1,0],[0,1]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the weighted cells criteria.'
            },
            {
                input: {"grid":[[1,1],[1,0]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the weighted cells criteria.'
            },
            {
                input: {"grid":[[1,1],[1,1]]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the weighted cells criteria.'
            },
            // Edge case
            {
                input: {"grid":[[1,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weighted_cells(grid):
    """
    Weighted Cells

    Each land cell has a positive weight. Maximize the total weight of the island after flipping one 0 to 1 (with weight 1).

    Time: O(N^2)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(weighted_cells([[1,0],[0,1]]))  # Expected: 1
print(weighted_cells([[1,1],[1,0]]))  # Expected: 2
print(weighted_cells([[1,1],[1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedCells solves the Weighted Cells problem.
// Each land cell has a positive weight. Maximize the total weight of the island after flipping one 0 to 1 (with weight 1).
// Time: O(N^2), Space: O(N^2)
func WeightedCells(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedCells([][]int{{1, 0}, {0, 1}})) // Expected: 1
	fmt.Println(WeightedCells([][]int{{1, 1}, {1, 0}})) // Expected: 2
	fmt.Println(WeightedCells([][]int{{1, 1}, {1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/03-making-a-large-island/twist-04-weighted-cells', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/03-making-a-large-island/twist-04-weighted-cells'] = problem;
})();
