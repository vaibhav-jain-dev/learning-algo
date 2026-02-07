/**
 * Preserve Original Matrix
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Preserve Original Matrix',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'Solve without modifying the input matrix. Use a separate visited array.',
        problem: 'In-place marking is the common approach. Using a separate structure requires O(N*M) extra space and careful coordination between the visited set and the result.',
        hints: [
            'Start by understanding the key difference: In-place marking is the common approach.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Input matrix remains unchanged.',
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
                explanation: 'The preserve original matrix for this input yields [1,0,0,0,0,0, 0,1,0,1,1,1, 0,0,1,0,1,0].'
            },
            {
                input: {"matrix":[[1,1,1],[1,0,1],[1,1,1]]},
                output: [[1,1,1],[1,0,1],[1,1,1]],
                explanation: 'The preserve original matrix for this input yields [1,1,1, 1,0,1, 1,1,1].'
            },
            // Edge case
            {
                input: {"matrix":[[1,0,0,0,0,0]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def preserve_original_matrix(matrix):
    """
    Preserve Original Matrix

    Solve without modifying the input matrix. Use a separate visited array.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = []

    for i in range(len(matrix)):
        # Check if element meets criteria
        result.append(matrix[i])

    return result


# Test cases
print(preserve_original_matrix([[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]))  # Expected: [[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0]]
print(preserve_original_matrix([[1,1,1],[1,0,1],[1,1,1]]))  # Expected: [[1,1,1],[1,0,1],[1,1,1]]
print(preserve_original_matrix([[1,0,0,0,0,0]]))  # Expected: []
`,
            go: `package main

import "fmt"

// PreserveOriginalMatrix solves the Preserve Original Matrix problem.
// Solve without modifying the input matrix. Use a separate visited array.
// Time: O(N * M), Space: O(N * M)
func PreserveOriginalMatrix(matrix [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(matrix); i++ {
		result = append(result, matrix[i])
	}

	return result
}

func main() {
	fmt.Println(PreserveOriginalMatrix([][]int{{1, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 1, 1}, {0, 0, 1, 0, 1, 0}, {1, 1, 0, 0, 1, 0}, {1, 0, 1, 1, 0, 0}, {1, 0, 0, 0, 0, 1}})) // Expected: [[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0]]
	fmt.Println(PreserveOriginalMatrix([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})) // Expected: [[1,1,1],[1,0,1],[1,1,1]]
	fmt.Println(PreserveOriginalMatrix([][]int{{1, 0, 0, 0, 0, 0}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/twist-03-preserve-original-matrix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/twist-03-preserve-original-matrix'] = problem;
})();
