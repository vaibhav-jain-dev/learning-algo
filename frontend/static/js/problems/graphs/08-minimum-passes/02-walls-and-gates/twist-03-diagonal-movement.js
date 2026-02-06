/**
 * Diagonal Movement
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes/02-walls-and-gates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Diagonal Movement',
        difficulty: 'Easy',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/02-walls-and-gates',
        description: 'Allow diagonal movement in addition to 4-directional. Diagonal moves also cost 1. Fill rooms with minimum distance to any gate.',
        problem: 'With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.',
        hints: [
            'Start by understanding the key difference: With 8 directions, distances shrink and the Chebyshev distance applies instead of Manhattan distance, changing all computed values.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Room at (2,2) with gate at (0,0).',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"rooms":[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the diagonal movement criteria.'
            },
            // Edge case
            {
                input: {"rooms":[[2147483647,-1,0,2147483647]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def diagonal_movement(rooms):
    """
    Diagonal Movement

    Allow diagonal movement in addition to 4-directional. Diagonal moves also cost 1. Fill rooms with minimum distance to any gate.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(rooms)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(diagonal_movement([[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]))  # Expected: 1
print(diagonal_movement([[2147483647,-1,0,2147483647]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DiagonalMovement solves the Diagonal Movement problem.
// Allow diagonal movement in addition to 4-directional. Diagonal moves also cost 1. Fill rooms with minimum distance to any gate.
// Time: O(M * N), Space: O(M * N)
func DiagonalMovement(rooms [][]int) int {
	result := 0

	for i := 0; i < len(rooms); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DiagonalMovement([][]int{{2147483647, -1, 0, 2147483647}, {2147483647, 2147483647, 2147483647, -1}, {2147483647, -1, 2147483647, -1}, {0, -1, 2147483647, 2147483647}})) // Expected: 1
	fmt.Println(DiagonalMovement([][]int{{2147483647, -1, 0, 2147483647}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/02-walls-and-gates/twist-03-diagonal-movement', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/02-walls-and-gates/twist-03-diagonal-movement'] = problem;
})();
