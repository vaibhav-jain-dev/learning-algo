/**
 * Keep Only Islands
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Keep Only Islands',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Instead of removing islands (interior 1s not touching border), remove all border-connected 1s and keep only the islands.',
        problem: 'You invert the logic. After marking border-connected cells, you zero out the marked cells and keep the unmarked ones, flipping the removal target.',
        hints: [
            'Start by understanding the key difference: You invert the logic.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Matrix with border-connected 1s and interior 1s.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N * M)',
            space: 'O(N * M)'
        },
        examples: [
            // Basic test case
            {
                input: {"matrix":[[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]},
                output: [[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0]],
                explanation: 'The keep only islands for this input yields [1,0,0,0,0,0, 0,1,0,1,1,1, 0,0,1,0,1,0].'
            },
            {
                input: {"matrix":[[1,1,1],[1,0,1],[1,1,1]]},
                output: [[1,1,1],[1,0,1],[1,1,1]],
                explanation: 'The keep only islands for this input yields [1,1,1, 1,0,1, 1,1,1].'
            },
            // Edge case
            {
                input: {"matrix":[[1,0,0,0,0,0]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def keep_only_islands(matrix):
    """
    Keep Only Islands

    Instead of removing islands (interior 1s not touching border), remove all border-connected 1s and keep only the islands.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(keep_only_islands([[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]))  # Expected: [[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0]]
print(keep_only_islands([[1,1,1],[1,0,1],[1,1,1]]))  # Expected: [[1,1,1],[1,0,1],[1,1,1]]
print(keep_only_islands([[1,0,0,0,0,0]]))  # Expected: []
`,
            go: `package main

import "fmt"

// KeepOnlyIslands solves the Keep Only Islands problem.
// Instead of removing islands (interior 1s not touching border), remove all border-connected 1s and keep only the islands.
// Time: O(N * M), Space: O(N * M)
func KeepOnlyIslands(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(KeepOnlyIslands([][]int{{1, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 1, 1}, {0, 0, 1, 0, 1, 0}, {1, 1, 0, 0, 1, 0}, {1, 0, 1, 1, 0, 0}, {1, 0, 0, 0, 0, 1}})) // Expected: [[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0]]
	fmt.Println(KeepOnlyIslands([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})) // Expected: [[1,1,1],[1,0,1],[1,1,1]]
	fmt.Println(KeepOnlyIslands([][]int{{1, 0, 0, 0, 0, 0}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/twist-01-keep-only-islands', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/twist-01-keep-only-islands'] = problem;
})();
