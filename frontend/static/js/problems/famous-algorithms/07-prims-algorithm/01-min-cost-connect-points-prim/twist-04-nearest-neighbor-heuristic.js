/**
 * Nearest Neighbor Heuristic
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';

    const problem = {
        name: 'Nearest Neighbor Heuristic',
        difficulty: 'Easy',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Compare Prim.',
        problem: 'The nearest neighbor heuristic is NOT the same as Prim.',
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
                input: {"points":[[0,0],[2,2],[3,10],[5,2],[7,0]]},
                output: 1,
                explanation: 'The greedy selection of minimum-weight edges, combined with cycle detection, ensures the resulting tree has the minimum total edge weight.'
            },
            // Edge case
            {
                input: {"points":[[0,0]]},
                output: 0,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def nearest_neighbor_heuristic(points):
    """
    Nearest Neighbor Heuristic

    Compare Prim\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(points)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(nearest_neighbor_heuristic([[0,0],[2,2],[3,10],[5,2],[7,0]]))  # Expected: 1
print(nearest_neighbor_heuristic([[0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// NearestNeighborHeuristic solves the Nearest Neighbor Heuristic problem.
// Compare Prim\\
// Time: O(?), Space: O(?)
func NearestNeighborHeuristic(points [][]int) int {
	result := 0

	for i := 0; i < len(points); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NearestNeighborHeuristic([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})) // Expected: 1
	fmt.Println(NearestNeighborHeuristic([][]int{{0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-04-nearest-neighbor-heuristic', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-04-nearest-neighbor-heuristic'] = problem;
})();
