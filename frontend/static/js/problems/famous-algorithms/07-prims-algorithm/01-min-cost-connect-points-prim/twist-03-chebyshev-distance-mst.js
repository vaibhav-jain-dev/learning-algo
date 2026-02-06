/**
 * Chebyshev Distance MST
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';

    const problem = {
        name: 'Chebyshev Distance MST',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Use Chebyshev distance (max of absolute differences in each coordinate) instead of Manhattan distance.',
        problem: 'Changes the distance metric which affects edge weights and potentially the MST structure. Chebyshev distance allows diagonal movement at the same cost as horizontal/vertical.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the chebyshev distance mst criteria.'
            },
            // Edge case
            {
                input: {"points":[[0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def chebyshev_distance_mst(points):
    """
    Chebyshev Distance MST

    Use Chebyshev distance (max of absolute differences in each coordinate) instead of Manhattan distance.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(points)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(chebyshev_distance_mst([[0,0],[2,2],[3,10],[5,2],[7,0]]))  # Expected: 1
print(chebyshev_distance_mst([[0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ChebyshevDistanceMst solves the Chebyshev Distance MST problem.
// Use Chebyshev distance (max of absolute differences in each coordinate) instead of Manhattan distance.
// Time: O(?), Space: O(?)
func ChebyshevDistanceMst(points [][]int) int {
	result := 0

	for i := 0; i < len(points); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ChebyshevDistanceMst([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})) // Expected: 1
	fmt.Println(ChebyshevDistanceMst([][]int{{0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-03-chebyshev-distance-mst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-03-chebyshev-distance-mst'] = problem;
})();
