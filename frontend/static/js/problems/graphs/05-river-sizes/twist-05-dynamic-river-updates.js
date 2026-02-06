/**
 * Dynamic River Updates
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dynamic River Updates',
        difficulty: 'Hard',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes',
        description: 'After initial computation, cells can flip between 0 and 1. Efficiently update river sizes after each flip.',
        problem: 'Recomputing from scratch is wasteful. Union-Find allows incremental merges when a cell becomes 1, and split detection when a cell becomes 0 (much harder).',
        hints: [
            'Start by understanding the key difference: Recomputing from scratch is wasteful.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Flip cell (2,2) from 0 to 1.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]]},
                output: [[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1]],
                explanation: 'The dynamic river updates for this input yields [1,0,0,1,0, 1,0,1,0,0, 0,0,1,0,1].'
            },
            {
                input: {"matrix":[[1,1,1],[1,1,1],[1,1,1]]},
                output: [[1,1,1],[1,1,1],[1,1,1]],
                explanation: 'The dynamic river updates for this input yields [1,1,1, 1,1,1, 1,1,1].'
            },
            // Edge case
            {
                input: {"matrix":[[1,0,0,1,0]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def dynamic_river_updates(matrix):
    """
    Dynamic River Updates

    After initial computation, cells can flip between 0 and 1. Efficiently update river sizes after each flip.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(dynamic_river_updates([[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1],[1,0,1,0,1],[1,0,1,1,0]]))  # Expected: [[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1]]
print(dynamic_river_updates([[1,1,1],[1,1,1],[1,1,1]]))  # Expected: [[1,1,1],[1,1,1],[1,1,1]]
print(dynamic_river_updates([[1,0,0,1,0]]))  # Expected: []
`,
            go: `package main

import "fmt"

// DynamicRiverUpdates solves the Dynamic River Updates problem.
// After initial computation, cells can flip between 0 and 1. Efficiently update river sizes after each flip.
// Time: O(N * M), Space: O(N * M)
func DynamicRiverUpdates(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(DynamicRiverUpdates([][]int{{1, 0, 0, 1, 0}, {1, 0, 1, 0, 0}, {0, 0, 1, 0, 1}, {1, 0, 1, 0, 1}, {1, 0, 1, 1, 0}})) // Expected: [[1,0,0,1,0],[1,0,1,0,0],[0,0,1,0,1]]
	fmt.Println(DynamicRiverUpdates([][]int{{1, 1, 1}, {1, 1, 1}, {1, 1, 1}})) // Expected: [[1,1,1],[1,1,1],[1,1,1]]
	fmt.Println(DynamicRiverUpdates([][]int{{1, 0, 0, 1, 0}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/twist-05-dynamic-river-updates', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/twist-05-dynamic-river-updates'] = problem;
})();
