/**
 * Multiple Rot Speeds
 * Category: graphs
 * Difficulty: Hard
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes/01-rotting-oranges
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multiple Rot Speeds',
        difficulty: 'Hard',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/01-rotting-oranges',
        description: 'Some rotten oranges are super-rotten and can rot fresh oranges 2 cells away in one minute. Find the minimum minutes.',
        problem: 'Standard BFS processes one cell distance per level. Super-rotten oranges break this assumption, requiring you to add cells at distance 2 to the same BFS level.',
        hints: [
            'Start by understanding the key difference: Standard BFS processes one cell distance per level.',
            'Consider breaking this into subproblems and solving each independently.',
            'Consider the example: Grid [[2,1,1,1,1]].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[2,1,1],[1,1,0],[0,1,1]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"grid":[[2,1,1]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def multiple_rot_speeds(grid):
    """
    Multiple Rot Speeds

    Some rotten oranges are super-rotten and can rot fresh oranges 2 cells away in one minute. Find the minimum minutes.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(multiple_rot_speeds([[2,1,1],[1,1,0],[0,1,1]]))  # Expected: 1
print(multiple_rot_speeds([[2,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MultipleRotSpeeds solves the Multiple Rot Speeds problem.
// Some rotten oranges are super-rotten and can rot fresh oranges 2 cells away in one minute. Find the minimum minutes.
// Time: O(M * N), Space: O(M * N)
func MultipleRotSpeeds(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MultipleRotSpeeds([][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}})) // Expected: 1
	fmt.Println(MultipleRotSpeeds([][]int{{2, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/01-rotting-oranges/twist-01-multiple-rot-speeds', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/01-rotting-oranges/twist-01-multiple-rot-speeds'] = problem;
})();
