/**
 * Remove Islands Iteratively
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-flood-fill
 * Parent: 06-remove-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Islands Iteratively',
        difficulty: 'Medium',
        algorithm: 'graph-flood-fill',
        parent: '06-remove-islands',
        description: 'After removing islands, the removal might create new islands (groups that were connected to border only through removed cells). Repeat until stable.',
        problem: 'A single pass is insufficient. You need a fixed-point iteration that keeps removing until no more islands exist, adding a convergence loop.',
        hints: [
            'Start by understanding the key difference: A single pass is insufficient.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: First pass removes group A.',
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
                output: [[0,1]],
                explanation: 'Found 1 group(s) matching the criteria.'
            },
            {
                input: {"matrix":[[1,1,1],[1,0,1],[1,1,1]]},
                output: [[0,1],[2,3]],
                explanation: 'Found 2 group(s) matching the criteria.'
            },
            // Edge case
            {
                input: {"matrix":[[1,0,0,0,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def remove_islands_iteratively(matrix):
    """
    Remove Islands Iteratively

    After removing islands, the removal might create new islands (groups that were connected to border only through removed cells). Repeat until stable.

    Time: O(N * M)
    Space: O(N * M)
    """
    result = []
    n = len(matrix)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([matrix[i], matrix[j]])

    return result


# Test cases
print(remove_islands_iteratively([[1,0,0,0,0,0],[0,1,0,1,1,1],[0,0,1,0,1,0],[1,1,0,0,1,0],[1,0,1,1,0,0],[1,0,0,0,0,1]]))  # Expected: [[0,1]]
print(remove_islands_iteratively([[1,1,1],[1,0,1],[1,1,1]]))  # Expected: [[0,1],[2,3]]
print(remove_islands_iteratively([[1,0,0,0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// RemoveIslandsIteratively solves the Remove Islands Iteratively problem.
// After removing islands, the removal might create new islands (groups that were connected to border only through removed cells). Repeat until stable.
// Time: O(N * M), Space: O(N * M)
func RemoveIslandsIteratively(matrix [][]int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(matrix); i++ {
		for j := i + 1; j < len(matrix); j++ {
			result = append(result, []int{matrix[i], matrix[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(RemoveIslandsIteratively([][]int{{1, 0, 0, 0, 0, 0}, {0, 1, 0, 1, 1, 1}, {0, 0, 1, 0, 1, 0}, {1, 1, 0, 0, 1, 0}, {1, 0, 1, 1, 0, 0}, {1, 0, 0, 0, 0, 1}})) // Expected: [[0,1]]
	fmt.Println(RemoveIslandsIteratively([][]int{{1, 1, 1}, {1, 0, 1}, {1, 1, 1}})) // Expected: [[0,1],[2,3]]
	fmt.Println(RemoveIslandsIteratively([][]int{{1, 0, 0, 0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '06-remove-islands/twist-05-remove-islands-iteratively', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/06-remove-islands/twist-05-remove-islands-iteratively'] = problem;
})();
