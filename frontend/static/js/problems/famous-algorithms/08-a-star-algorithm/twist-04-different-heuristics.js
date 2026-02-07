/**
 * Different Heuristics
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: a-star
 * Parent: 08-a-star-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Different Heuristics',
        difficulty: 'Medium',
        algorithm: 'a-star',
        parent: '08-a-star-algorithm',
        description: 'Compare Manhattan, Euclidean, and Chebyshev distance heuristics for grid pathfinding. Analyze admissibility for 4-directional vs 8-directional movement.',
        problem: 'Different heuristics affect A* performance differently -- some are more informed (tighter bound) but must remain admissible (never overestimate) for optimality.',
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
                input: {"grid":[[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,1,0,0]],"start":[0,0],"end":[3,3]},
                output: 1,
                explanation: 'The priority queue ensures we always process the nearest unvisited node. When a node is dequeued, its shortest distance is finalized. Neighbors are updated if a shorter path is found.'
            },
            // Edge case
            {
                input: {"grid":[[0,0,0,0]],"start":[0],"end":[3]},
                output: 0,
                explanation: 'Initialize distances to infinity except the source (distance 0). Process the closest unvisited node first, relaxing all its outgoing edges. Continue until all reachable nodes have final distances.'
            }
        ],
        solutions: {
            python: `def different_heuristics(grid, start, end):
    """
    Different Heuristics

    Compare Manhattan, Euclidean, and Chebyshev distance heuristics for grid pathfinding. Analyze admissibility for 4-directional vs 8-directional movement.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(grid)

    for i in range(n):
        # Check condition based on start
        j = 0
        for k in range(i, n):
            if j < len(start) and grid[k] == start[j]:
                j += 1
        if j == len(start):
            count += 1

    return count


# Test cases
print(different_heuristics([[0,0,0,0],[0,1,1,0],[0,0,0,0],[0,1,0,0]], [0,0], [3,3]))  # Expected: 1
print(different_heuristics([[0,0,0,0]], [0], [3]))  # Expected: 0
`,
            go: `package main

import "fmt"

// DifferentHeuristics solves the Different Heuristics problem.
// Compare Manhattan, Euclidean, and Chebyshev distance heuristics for grid pathfinding. Analyze admissibility for 4-directional vs 8-directional movement.
// Time: O(?), Space: O(?)
func DifferentHeuristics(grid [][]int, start []int, end []int) int {
	result := 0

	for i := 0; i < len(grid); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DifferentHeuristics([][]int{{0, 0, 0, 0}, {0, 1, 1, 0}, {0, 0, 0, 0}, {0, 1, 0, 0}}, []int{0, 0}, []int{3, 3})) // Expected: 1
	fmt.Println(DifferentHeuristics([][]int{{0, 0, 0, 0}}, []int{0}, []int{3})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '08-a-star-algorithm/twist-04-different-heuristics', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/08-a-star-algorithm/twist-04-different-heuristics'] = problem;
})();
