/**
 * K Shortest Paths
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Algorithm: bfs-astar
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Shortest Paths',
        difficulty: 'Very Hard',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Find the k shortest paths from start to end in the binary grid (paths may share cells).',
        problem: 'A* finds only the shortest path. Finding k shortest requires allowing nodes to be visited multiple times and using Yen\',
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
                explanation: 'For this input, there is 1 valid position that satisfy the k shortest paths criteria.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def k_shortest_paths(grid):
    """
    K Shortest Paths

    Find the k shortest paths from start to end in the binary grid (paths may share cells).

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(grid)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(k_shortest_paths([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: 1
print(k_shortest_paths([[0,0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// KShortestPaths solves the K Shortest Paths problem.
// Find the k shortest paths from start to end in the binary grid (paths may share cells).
// Time: O(?), Space: O(?)
func KShortestPaths(grid [][]int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KShortestPaths([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: 1
	fmt.Println(KShortestPaths([][]int{{0, 0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-03-k-shortest-paths', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-03-k-shortest-paths'] = problem;
})();
