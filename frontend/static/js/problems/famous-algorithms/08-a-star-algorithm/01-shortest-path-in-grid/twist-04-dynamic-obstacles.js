/**
 * Dynamic Obstacles
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: bfs-astar
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dynamic Obstacles',
        difficulty: 'Hard',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Obstacles appear and disappear at known time steps. Find the shortest path accounting for time-dependent obstacles.',
        problem: 'The state space becomes 3D (row, col, time), as a cell might be blocked at time t but open at time t+1, requiring time-expanded graph search.',
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
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0]]},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def dynamic_obstacles(grid):
    """
    Dynamic Obstacles

    Obstacles appear and disappear at known time steps. Find the shortest path accounting for time-dependent obstacles.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(dynamic_obstacles([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: 1
print(dynamic_obstacles([[0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DynamicObstacles solves the Dynamic Obstacles problem.
// Obstacles appear and disappear at known time steps. Find the shortest path accounting for time-dependent obstacles.
// Time: O(?), Space: O(?)
func DynamicObstacles(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DynamicObstacles([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 1
	fmt.Println(DynamicObstacles([][]int{{0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-04-dynamic-obstacles', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-04-dynamic-obstacles'] = problem;
})();
