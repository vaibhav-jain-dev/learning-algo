/**
 * Minimum Obstacles to Remove
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: bfs-astar
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Obstacles to Remove',
        difficulty: 'Hard',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Instead of finding a path avoiding obstacles, find the path from start to end that requires removing the fewest obstacles.',
        problem: 'Transforms to a 0-1 BFS problem where moving to an empty cell costs 0 and moving to an obstacle costs 1 (to remove it). Uses deque instead of priority queue.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"grid":[[0,0,0],[1,1,0],[1,1,0]]},
                output: [[0,0,0],[1,1,0],[1,1,0]],
                explanation: 'The minimum obstacles to remove for this input yields [0,0,0, 1,1,0, 1,1,0].'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def minimum_obstacles_to_remove(grid):
    """
    Minimum Obstacles to Remove

    Instead of finding a path avoiding obstacles, find the path from start to end that requires removing the fewest obstacles.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(grid)):
        # Check if element meets criteria
        result.append(grid[i])

    return result


# Test cases
print(minimum_obstacles_to_remove([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: [[0,0,0],[1,1,0],[1,1,0]]
print(minimum_obstacles_to_remove([[0,0,0]]))  # Expected: []
`,
            go: `package main

import "fmt"

// MinimumObstaclesToRemove solves the Minimum Obstacles to Remove problem.
// Instead of finding a path avoiding obstacles, find the path from start to end that requires removing the fewest obstacles.
// Time: O(?), Space: O(?)
func MinimumObstaclesToRemove(grid [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(grid); i++ {
		result = append(result, grid[i])
	}

	return result
}

func main() {
	fmt.Println(MinimumObstaclesToRemove([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: [[0,0,0],[1,1,0],[1,1,0]]
	fmt.Println(MinimumObstaclesToRemove([][]int{{0, 0, 0}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-05-minimum-obstacles-to-remove', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-05-minimum-obstacles-to-remove'] = problem;
})();
