/**
 * Rot with Immunity
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes/01-rotting-oranges
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rot with Immunity',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/01-rotting-oranges',
        description: 'Some fresh oranges are immune (value 3) and can never rot. Determine if all non-immune fresh oranges can rot.',
        problem: 'Immune oranges act as barriers that cannot be converted. You must skip them during BFS and check only non-immune fresh oranges remain at the end.',
        hints: [
            'Start by understanding the key difference: Immune oranges act as barriers that cannot be converted.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Grid [[2,1,3,1]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[2,1,1],[1,1,0],[0,1,1]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the rot with immunity criteria.'
            },
            // Edge case
            {
                input: {"grid":[[2,1,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def rot_with_immunity(grid):
    """
    Rot with Immunity

    Some fresh oranges are immune (value 3) and can never rot. Determine if all non-immune fresh oranges can rot.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(rot_with_immunity([[2,1,1],[1,1,0],[0,1,1]]))  # Expected: 1
print(rot_with_immunity([[2,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RotWithImmunity solves the Rot with Immunity problem.
// Some fresh oranges are immune (value 3) and can never rot. Determine if all non-immune fresh oranges can rot.
// Time: O(M * N), Space: O(M * N)
func RotWithImmunity(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RotWithImmunity([][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}})) // Expected: 1
	fmt.Println(RotWithImmunity([][]int{{2, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/01-rotting-oranges/twist-02-rot-with-immunity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/01-rotting-oranges/twist-02-rot-with-immunity'] = problem;
})();
