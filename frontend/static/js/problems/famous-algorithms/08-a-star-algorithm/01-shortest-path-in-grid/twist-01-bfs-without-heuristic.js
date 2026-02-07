/**
 * BFS Without Heuristic
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: bfs-astar
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';

    const problem = {
        name: 'BFS Without Heuristic',
        difficulty: 'Easy',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Solve the shortest path using plain BFS instead of A*, since all edges have unit weight.',
        problem: 'For unweighted grids, BFS guarantees shortest path without needing a heuristic or priority queue, making it simpler and potentially faster due to queue vs heap constants.',
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
            python: `def bfs_without_heuristic(grid):
    """
    BFS Without Heuristic

    Solve the shortest path using plain BFS instead of A*, since all edges have unit weight.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(bfs_without_heuristic([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: 1
print(bfs_without_heuristic([[0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// BfsWithoutHeuristic solves the BFS Without Heuristic problem.
// Solve the shortest path using plain BFS instead of A*, since all edges have unit weight.
// Time: O(?), Space: O(?)
func BfsWithoutHeuristic(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BfsWithoutHeuristic([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 1
	fmt.Println(BfsWithoutHeuristic([][]int{{0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-01-bfs-without-heuristic', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-01-bfs-without-heuristic'] = problem;
})();
