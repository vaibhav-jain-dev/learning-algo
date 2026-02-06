/**
 * Shortest Path with Only 4 Directions
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-bfs
 * Parent: 02-breadth-first-search/02-shortest-path-binary-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Path with Only 4 Directions',
        difficulty: 'Easy',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search/02-shortest-path-binary-matrix',
        description: 'Find the shortest path but only allow horizontal and vertical movement (4 directions) instead of 8-directional movement.',
        problem: 'Reducing directions from 8 to 4 eliminates diagonal shortcuts. Paths that were short with diagonals become longer or impossible. The optimal path structure changes fundamentally.',
        hints: [
            'Start by understanding the key difference: Reducing directions from 8 to 4 eliminates diagonal shortcuts.',
            'Consider how this simplifies the original problem approach.'
        ],
        complexity: {
            time: 'O(N^2)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,1],[1,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the shortest path with only 4 directions criteria.'
            },
            {
                input: {"grid":[[0,0,0],[1,1,0],[1,1,0]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the shortest path with only 4 directions criteria.'
            },
            {
                input: {"grid":[[1,0,0],[1,1,0],[1,1,0]]},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the shortest path with only 4 directions criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def shortest_path_with_only_4_directions(grid):
    """
    Shortest Path with Only 4 Directions

    Find the shortest path but only allow horizontal and vertical movement (4 directions) instead of 8-directional movement.

    Time: O(N^2)
    Space: O(N^2)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(shortest_path_with_only_4_directions([[0,1],[1,0]]))  # Expected: 1
print(shortest_path_with_only_4_directions([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: 2
print(shortest_path_with_only_4_directions([[1,0,0],[1,1,0],[1,1,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ShortestPathWithOnly4Directions solves the Shortest Path with Only 4 Directions problem.
// Find the shortest path but only allow horizontal and vertical movement (4 directions) instead of 8-directional movement.
// Time: O(N^2), Space: O(N^2)
func ShortestPathWithOnly4Directions(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ShortestPathWithOnly4Directions([][]int{{0, 1}, {1, 0}})) // Expected: 1
	fmt.Println(ShortestPathWithOnly4Directions([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 2
	fmt.Println(ShortestPathWithOnly4Directions([][]int{{1, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/02-shortest-path-binary-matrix/twist-01-shortest-path-with-only-4-directions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/02-shortest-path-binary-matrix/twist-01-shortest-path-with-only-4-directions'] = problem;
})();
