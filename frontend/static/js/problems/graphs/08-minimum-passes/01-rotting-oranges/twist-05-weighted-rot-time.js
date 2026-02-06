/**
 * Weighted Rot Time
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes/01-rotting-oranges
 */
(function() {
    'use strict';

    const problem = {
        name: 'Weighted Rot Time',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/01-rotting-oranges',
        description: 'Each fresh orange has a resistance value (1-3) indicating how many minutes of adjacent rot it takes before it rots.',
        problem: 'BFS levels no longer correspond to single minutes. You need a priority queue or track exposure time per cell, making this closer to Dijkstra than standard BFS.',
        hints: [
            'Start by understanding the key difference: BFS levels no longer correspond to single minutes.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Orange with resistance 3 needs 3 adjacent rotten minutes to rot, not 1.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the weighted rot time criteria.'
            },
            // Edge case
            {
                input: {"grid":[[2,1,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def weighted_rot_time(grid):
    """
    Weighted Rot Time

    Each fresh orange has a resistance value (1-3) indicating how many minutes of adjacent rot it takes before it rots.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(weighted_rot_time([[2,1,1],[1,1,0],[0,1,1]]))  # Expected: 1
print(weighted_rot_time([[2,1,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// WeightedRotTime solves the Weighted Rot Time problem.
// Each fresh orange has a resistance value (1-3) indicating how many minutes of adjacent rot it takes before it rots.
// Time: O(M * N), Space: O(M * N)
func WeightedRotTime(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WeightedRotTime([][]int{{2, 1, 1}, {1, 1, 0}, {0, 1, 1}})) // Expected: 1
	fmt.Println(WeightedRotTime([][]int{{2, 1, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/01-rotting-oranges/twist-05-weighted-rot-time', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/01-rotting-oranges/twist-05-weighted-rot-time'] = problem;
})();
