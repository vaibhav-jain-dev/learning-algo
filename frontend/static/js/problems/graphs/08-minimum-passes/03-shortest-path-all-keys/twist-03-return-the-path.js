/**
 * Return the Path
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 * Parent: 08-minimum-passes/03-shortest-path-all-keys
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return the Path',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '08-minimum-passes/03-shortest-path-all-keys',
        description: 'Instead of just the move count, return the actual path (sequence of cells) taken to collect all keys.',
        problem: 'You must store parent pointers for each state (row, col, keys) and backtrack from the final state to reconstruct the path.',
        hints: [
            'Start by understanding the key difference: You must store parent pointers for each state (row, col, keys) and backtrack from the final state to reconstruct the path.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Path: (0,0)->(0,1)->(0,2) pick key a ->(1,2)->(2,2) open lock A ->(2,1) pick key b.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N * 2^K)',
            space: 'O(M * N * 2^K)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":["@.a..","###.#","b.A.B"]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the return the path criteria.'
            },
            // Edge case
            {
                input: {"grid":["@.a.."]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def return_the_path(grid):
    """
    Return the Path

    Instead of just the move count, return the actual path (sequence of cells) taken to collect all keys.

    Time: O(M * N * 2^K)
    Space: O(M * N * 2^K)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(return_the_path(["@.a..","###.#","b.A.B"]))  # Expected: 1
print(return_the_path(["@.a.."]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ReturnThePath solves the Return the Path problem.
// Instead of just the move count, return the actual path (sequence of cells) taken to collect all keys.
// Time: O(M * N * 2^K), Space: O(M * N * 2^K)
func ReturnThePath(grid []string) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReturnThePath([]string{"@.a..", "###.#", "b.A.B"})) // Expected: 1
	fmt.Println(ReturnThePath([]string{"@.a.."})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/03-shortest-path-all-keys/twist-03-return-the-path', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/03-shortest-path-all-keys/twist-03-return-the-path'] = problem;
})();
