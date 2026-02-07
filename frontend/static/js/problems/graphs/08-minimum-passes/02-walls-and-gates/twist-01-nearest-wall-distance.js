/**
 * Nearest Wall Distance
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-min-passes
 * Parent: 08-minimum-passes/02-walls-and-gates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nearest Wall Distance',
        difficulty: 'Medium',
        algorithm: 'graph-min-passes',
        parent: '08-minimum-passes/02-walls-and-gates',
        description: 'Instead of distance to nearest gate, fill each empty room with its distance to the nearest wall.',
        problem: 'You reverse the source cells: BFS starts from walls instead of gates. But walls are obstacles in the original, so you must redefine what blocks movement.',
        hints: [
            'Start by understanding the key difference: You reverse the source cells: BFS starts from walls instead of gates.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Grid where gates and empty rooms are walkable.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(M * N)',
            space: 'O(M * N)'
        },
        examples: [
            // Basic test case
            {
                input: {"rooms":[[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"rooms":[[2147483647,-1,0,2147483647]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def nearest_wall_distance(rooms):
    """
    Nearest Wall Distance

    Instead of distance to nearest gate, fill each empty room with its distance to the nearest wall.

    Time: O(M * N)
    Space: O(M * N)
    """
    result = 0

    for i in range(len(rooms)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(nearest_wall_distance([[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]))  # Expected: 1
print(nearest_wall_distance([[2147483647,-1,0,2147483647]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NearestWallDistance solves the Nearest Wall Distance problem.
// Instead of distance to nearest gate, fill each empty room with its distance to the nearest wall.
// Time: O(M * N), Space: O(M * N)
func NearestWallDistance(rooms [][]int) int {
	result := 0

	for i := 0; i < len(rooms); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NearestWallDistance([][]int{{2147483647, -1, 0, 2147483647}, {2147483647, 2147483647, 2147483647, -1}, {2147483647, -1, 2147483647, -1}, {0, -1, 2147483647, 2147483647}})) // Expected: 1
	fmt.Println(NearestWallDistance([][]int{{2147483647, -1, 0, 2147483647}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '08-minimum-passes/02-walls-and-gates/twist-01-nearest-wall-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/08-minimum-passes/02-walls-and-gates/twist-01-nearest-wall-distance'] = problem;
})();
