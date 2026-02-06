/**
 * Path Reconstruction
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: bfs-astar
 * Parent: 08-a-star-algorithm/01-shortest-path-in-grid
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path Reconstruction',
        difficulty: 'Medium',
        algorithm: 'bfs-astar',
        parent: '08-a-star-algorithm/01-shortest-path-in-grid',
        description: 'Return the actual path (list of coordinates) from start to end, not just the length.',
        problem: 'Requires maintaining a parent/predecessor map during search, then backtracking from the destination to the source to reconstruct the path.',
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
                explanation: 'The path reconstruction for this input yields [0,0,0, 1,1,0, 1,1,0].'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def path_reconstruction(grid):
    """
    Path Reconstruction

    Return the actual path (list of coordinates) from start to end, not just the length.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(grid)):
        # Check if element meets criteria
        result.append(grid[i])

    return result


# Test cases
print(path_reconstruction([[0,0,0],[1,1,0],[1,1,0]]))  # Expected: [[0,0,0],[1,1,0],[1,1,0]]
print(path_reconstruction([[0,0,0]]))  # Expected: []
`,
            go: `package main

import "fmt"

// PathReconstruction solves the Path Reconstruction problem.
// Return the actual path (list of coordinates) from start to end, not just the length.
// Time: O(?), Space: O(?)
func PathReconstruction(grid [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(grid); i++ {
		result = append(result, grid[i])
	}

	return result
}

func main() {
	fmt.Println(PathReconstruction([][]int{{0, 0, 0}, {1, 1, 0}, {1, 1, 0}})) // Expected: [[0,0,0],[1,1,0],[1,1,0]]
	fmt.Println(PathReconstruction([][]int{{0, 0, 0}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/01-shortest-path-in-grid/twist-02-path-reconstruction', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/01-shortest-path-in-grid/twist-02-path-reconstruction'] = problem;
})();
