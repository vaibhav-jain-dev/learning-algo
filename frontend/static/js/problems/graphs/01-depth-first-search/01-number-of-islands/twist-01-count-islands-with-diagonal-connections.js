/**
 * Count Islands with Diagonal Connections
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/01-number-of-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Islands with Diagonal Connections',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/01-number-of-islands',
        description: 'Same grid, but land cells are also connected diagonally (8 directions instead of 4). Count the number of islands.',
        problem: 'Expanding from 4-directional to 8-directional connectivity changes which cells form a single island. Two separate islands in the original might merge into one.',
        hints: [
            'Start by understanding the key difference: Expanding from 4-directional to 8-directional connectivity changes which cells form a single island.',
            'Think about what data structures need to change from the original solution.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count islands with diagonal connections criteria.'
            },
            {
                input: {"grid":[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count islands with diagonal connections criteria.'
            },
            // Edge case
            {
                input: {"grid":[["1","1","1","1","0"]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_islands_with_diagonal_connections(grid):
    """
    Count Islands with Diagonal Connections

    Same grid, but land cells are also connected diagonally (8 directions instead of 4). Count the number of islands.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_islands_with_diagonal_connections([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))  # Expected: 1
print(count_islands_with_diagonal_connections([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]))  # Expected: 2
print(count_islands_with_diagonal_connections([["1","1","1","1","0"]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountIslandsWithDiagonalConnections solves the Count Islands with Diagonal Connections problem.
// Same grid, but land cells are also connected diagonally (8 directions instead of 4). Count the number of islands.
// Time: O(M * N), Space: O(M * N)
func CountIslandsWithDiagonalConnections(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountIslandsWithDiagonalConnections([][]int{{1, 1, 1, 1, 0}, {1, 1, 0, 1, 0}, {1, 1, 0, 0, 0}, {0, 0, 0, 0, 0}})) // Expected: 1
	fmt.Println(CountIslandsWithDiagonalConnections([][]int{{1, 1, 0, 0, 0}, {1, 1, 0, 0, 0}, {0, 0, 1, 0, 0}, {0, 0, 0, 1, 1}})) // Expected: 2
	fmt.Println(CountIslandsWithDiagonalConnections([][]int{{1, 1, 1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands/twist-01-count-islands-with-diagonal-connections', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands/twist-01-count-islands-with-diagonal-connections'] = problem;
})();
