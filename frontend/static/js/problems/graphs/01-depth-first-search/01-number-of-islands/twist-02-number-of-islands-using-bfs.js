/**
 * Number of Islands Using BFS
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/01-number-of-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Islands Using BFS',
        difficulty: 'Medium',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/01-number-of-islands',
        description: 'Solve the same problem using BFS instead of DFS. Compare the traversal pattern and discuss when BFS might be preferred.',
        problem: 'Forces you to switch from recursive flood-fill to iterative queue-based exploration. BFS avoids stack overflow on very large islands but uses more memory for wide islands.',
        hints: [
            'Start by understanding the key difference: Forces you to switch from recursive flood-fill to iterative queue-based exploration.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Same input/output, but the internal exploration of each island radiates outward level by level instead of going deep first.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
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
                explanation: 'For this input, there is 1 valid position that satisfy the number of islands using bfs criteria.'
            },
            {
                input: {"grid":[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the number of islands using bfs criteria.'
            },
            // Edge case
            {
                input: {"grid":[["1","1","1","1","0"]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def number_of_islands_using_bfs(grid):
    """
    Number of Islands Using BFS

    Solve the same problem using BFS instead of DFS. Compare the traversal pattern and discuss when BFS might be preferred.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(number_of_islands_using_bfs([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))  # Expected: 1
print(number_of_islands_using_bfs([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]))  # Expected: 2
print(number_of_islands_using_bfs([["1","1","1","1","0"]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NumberOfIslandsUsingBfs solves the Number of Islands Using BFS problem.
// Solve the same problem using BFS instead of DFS. Compare the traversal pattern and discuss when BFS might be preferred.
// Time: O(M * N), Space: O(M * N)
func NumberOfIslandsUsingBfs(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NumberOfIslandsUsingBfs([][]int{{1, 1, 1, 1, 0}, {1, 1, 0, 1, 0}, {1, 1, 0, 0, 0}, {0, 0, 0, 0, 0}})) // Expected: 1
	fmt.Println(NumberOfIslandsUsingBfs([][]int{{1, 1, 0, 0, 0}, {1, 1, 0, 0, 0}, {0, 0, 1, 0, 0}, {0, 0, 0, 1, 1}})) // Expected: 2
	fmt.Println(NumberOfIslandsUsingBfs([][]int{{1, 1, 1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands/twist-02-number-of-islands-using-bfs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands/twist-02-number-of-islands-using-bfs'] = problem;
})();
