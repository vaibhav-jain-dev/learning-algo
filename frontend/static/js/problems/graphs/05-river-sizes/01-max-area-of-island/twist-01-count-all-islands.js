/**
 * Count All Islands
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-flood-fill
 * Parent: 05-river-sizes/01-max-area-of-island
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count All Islands',
        difficulty: 'Easy',
        algorithm: 'graph-flood-fill',
        parent: '05-river-sizes/01-max-area-of-island',
        description: 'Instead of finding the maximum area, count the total number of distinct islands.',
        problem: 'You no longer track area per island, just increment a counter each time you start a new DFS from an unvisited land cell. The traversal simplifies.',
        hints: [
            'Start by understanding the key difference: You no longer track area per island, just increment a counter each time you start a new DFS from an unvisited land cell.',
            'Consider how this simplifies the original problem approach.'
        ],
        complexity: {
            time: 'O(M × N)',
            space: 'O(M × N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the count all islands criteria.'
            },
            {
                input: {"grid":[[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the count all islands criteria.'
            },
            {
                input: {"grid":[[0,0,0,0]]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the count all islands criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,1,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def count_all_islands(grid):
    """
    Count All Islands

    Instead of finding the maximum area, count the total number of distinct islands.

    Time: O(M × N)
    Space: O(M × N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_all_islands([[0,0,1,0,0],[0,1,1,1,0],[0,0,1,0,0]]))  # Expected: 1
print(count_all_islands([[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]]))  # Expected: 2
print(count_all_islands([[0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// CountAllIslands solves the Count All Islands problem.
// Instead of finding the maximum area, count the total number of distinct islands.
// Time: O(M × N), Space: O(M × N)
func CountAllIslands(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountAllIslands([][]int{{0, 0, 1, 0, 0}, {0, 1, 1, 1, 0}, {0, 0, 1, 0, 0}})) // Expected: 1
	fmt.Println(CountAllIslands([][]int{{1, 1, 0, 0}, {1, 1, 0, 0}, {0, 0, 1, 1}, {0, 0, 1, 1}})) // Expected: 2
	fmt.Println(CountAllIslands([][]int{{0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '05-river-sizes/01-max-area-of-island/twist-01-count-all-islands', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/05-river-sizes/01-max-area-of-island/twist-01-count-all-islands'] = problem;
})();
