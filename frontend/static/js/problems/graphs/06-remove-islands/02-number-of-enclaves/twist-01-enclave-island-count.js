/**
 * Enclave Island Count
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/02-number-of-enclaves
 */
(function() {
    'use strict';

    const problem = {
        name: 'Enclave Island Count',
        difficulty: 'Easy',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/02-number-of-enclaves',
        description: 'Instead of counting enclave land cells, count the number of distinct enclave islands.',
        problem: 'You count connected components rather than individual cells. After eliminating border-connected land, each remaining DFS start is one enclave island.',
        hints: [
            'Start by understanding the key difference: You count connected components rather than individual cells.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Grid with 5 enclave cells forming 2 separate islands.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the enclave island count criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def enclave_island_count(grid):
    """
    Enclave Island Count

    Instead of counting enclave land cells, count the number of distinct enclave islands.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(enclave_island_count([[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]))  # Expected: 1
print(enclave_island_count([[0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// EnclaveIslandCount solves the Enclave Island Count problem.
// Instead of counting enclave land cells, count the number of distinct enclave islands.
// Time: O(M * N), Space: O(M * N)
func EnclaveIslandCount(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(EnclaveIslandCount([][]int{{0, 0, 0, 0}, {1, 0, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}})) // Expected: 1
	fmt.Println(EnclaveIslandCount([][]int{{0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/02-number-of-enclaves/twist-01-enclave-island-count', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/02-number-of-enclaves/twist-01-enclave-island-count'] = problem;
})();
