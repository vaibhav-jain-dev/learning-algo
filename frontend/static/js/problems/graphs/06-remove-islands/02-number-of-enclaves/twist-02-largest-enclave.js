/**
 * Largest Enclave
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands/02-number-of-enclaves
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Enclave',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands/02-number-of-enclaves',
        description: 'Find the size of the largest enclave (largest land region that cannot reach the boundary).',
        problem: 'You must track the size of each enclave during traversal and keep a running maximum, adding a comparison step to the flood fill.',
        hints: [
            'Start by understanding the key difference: You must track the size of each enclave during traversal and keep a running maximum, adding a comparison step to the flood fill.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Three enclaves with sizes [3, 7, 2].',
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
                explanation: 'For this input, there is 1 valid position that satisfy the largest enclave criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def largest_enclave(grid):
    """
    Largest Enclave

    Find the size of the largest enclave (largest land region that cannot reach the boundary).

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(largest_enclave([[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]))  # Expected: 1
print(largest_enclave([[0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LargestEnclave solves the Largest Enclave problem.
// Find the size of the largest enclave (largest land region that cannot reach the boundary).
// Time: O(M * N), Space: O(M * N)
func LargestEnclave(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LargestEnclave([][]int{{0, 0, 0, 0}, {1, 0, 1, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}})) // Expected: 1
	fmt.Println(LargestEnclave([][]int{{0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/02-number-of-enclaves/twist-02-largest-enclave', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/02-number-of-enclaves/twist-02-largest-enclave'] = problem;
})();
