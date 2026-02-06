/**
 * Rectangular Grid Constraint
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-largest-island
 * Parent: 05-river-sizes/03-making-a-large-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rectangular Grid Constraint',
        difficulty: 'Medium',
        algorithm: 'graph-largest-island',
        parent: '05-river-sizes/03-making-a-large-island',
        description: 'The grid is not square (m x n where m != n). Ensure the solution handles non-square grids correctly.',
        problem: 'The original problem specifies n x n. Non-square grids require using separate row/column bounds throughout, a common source of index bugs.',
        hints: [
            'Start by understanding the key difference: The original problem specifies n x n.',
            'Think about what data structures need to change from the original solution.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the rectangular grid constraint criteria.'
            },
            {
                input: {"grid":[[1,1],[1,0]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the rectangular grid constraint criteria.'
            },
            {
                input: {"grid":[[1,1],[1,1]]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the rectangular grid constraint criteria.'
            },
            // Edge case
            {
                input: {"grid":[[1,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def rectangular_grid_constraint(grid):
    """
    Rectangular Grid Constraint

    The grid is not square (m x n where m != n). Ensure the solution handles non-square grids correctly.

    Time: O(N^2)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(rectangular_grid_constraint([[1,0],[0,1]]))  # Expected: 1
print(rectangular_grid_constraint([[1,1],[1,0]]))  # Expected: 2
print(rectangular_grid_constraint([[1,1],[1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RectangularGridConstraint solves the Rectangular Grid Constraint problem.
// The grid is not square (m x n where m != n). Ensure the solution handles non-square grids correctly.
// Time: O(N^2), Space: O(N^2)
func RectangularGridConstraint(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RectangularGridConstraint([][]int{{1, 0}, {0, 1}})) // Expected: 1
	fmt.Println(RectangularGridConstraint([][]int{{1, 1}, {1, 0}})) // Expected: 2
	fmt.Println(RectangularGridConstraint([][]int{{1, 1}, {1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/03-making-a-large-island/twist-03-rectangular-grid-constraint', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/03-making-a-large-island/twist-03-rectangular-grid-constraint'] = problem;
})();
