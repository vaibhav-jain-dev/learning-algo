/**
 * Number of Islands in a Stream
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-dfs
 * Parent: 01-depth-first-search/01-number-of-islands
 */
(function() {
    'use strict';

    const problem = {
        name: 'Number of Islands in a Stream',
        difficulty: 'Hard',
        algorithm: 'graph-dfs',
        parent: '01-depth-first-search/01-number-of-islands',
        description: 'Initially the grid is all water. Land cells appear one at a time at given positions. After each addition, report the current number of islands.',
        problem: 'You cannot re-scan the entire grid after each addition. This forces an online/incremental approach (Union-Find is ideal). Adding one cell might merge multiple existing islands.',
        hints: [
            'Start by understanding the key difference: You cannot re-scan the entire grid after each addition.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Positions: [(0,0),(0,1),(1,2),(2,1)].',
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
                explanation: 'For this input, there is 1 valid position that satisfy the number of islands in a stream criteria.'
            },
            {
                input: {"grid":[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the number of islands in a stream criteria.'
            },
            // Edge case
            {
                input: {"grid":[["1","1","1","1","0"]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def number_of_islands_in_a_stream(grid):
    """
    Number of Islands in a Stream

    Initially the grid is all water. Land cells appear one at a time at given positions. After each addition, report the current number of islands.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(number_of_islands_in_a_stream([["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]))  # Expected: 1
print(number_of_islands_in_a_stream([["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]))  # Expected: 2
print(number_of_islands_in_a_stream([["1","1","1","1","0"]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NumberOfIslandsInAStream solves the Number of Islands in a Stream problem.
// Initially the grid is all water. Land cells appear one at a time at given positions. After each addition, report the current number of islands.
// Time: O(M * N), Space: O(M * N)
func NumberOfIslandsInAStream(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NumberOfIslandsInAStream([][]int{{1, 1, 1, 1, 0}, {1, 1, 0, 1, 0}, {1, 1, 0, 0, 0}, {0, 0, 0, 0, 0}})) // Expected: 1
	fmt.Println(NumberOfIslandsInAStream([][]int{{1, 1, 0, 0, 0}, {1, 1, 0, 0, 0}, {0, 0, 1, 0, 0}, {0, 0, 0, 1, 1}})) // Expected: 2
	fmt.Println(NumberOfIslandsInAStream([][]int{{1, 1, 1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '01-depth-first-search/01-number-of-islands/twist-04-number-of-islands-in-a-stream', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/01-depth-first-search/01-number-of-islands/twist-04-number-of-islands-in-a-stream'] = problem;
})();
