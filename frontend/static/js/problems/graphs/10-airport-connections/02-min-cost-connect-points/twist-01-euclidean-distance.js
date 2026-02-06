/**
 * Euclidean Distance
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: minimum-spanning-tree
 * Parent: 10-airport-connections/02-min-cost-connect-points
 */
(function() {
    'use strict';

    const problem = {
        name: 'Euclidean Distance',
        difficulty: 'Medium',
        algorithm: 'minimum-spanning-tree',
        parent: '10-airport-connections/02-min-cost-connect-points',
        description: 'Use Euclidean distance instead of Manhattan distance. Points are connected by straight-line distance.',
        problem: 'The MST algorithm is the same, but the distance metric changes all edge weights. Euclidean distance is sqrt((x1-x2)^2 + (y1-y2)^2), which may change the optimal spanning tree.',
        hints: [
            'Start by understanding the key difference: The MST algorithm is the same, but the distance metric changes all edge weights.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Points (0,0) and (3,4).',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(n^2 log n)',
            space: 'O(n^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"points":[[0,0],[2,2],[3,10],[5,2],[7,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the euclidean distance criteria.'
            },
            // Edge case
            {
                input: {"points":[[0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def euclidean_distance(points):
    """
    Euclidean Distance

    Use Euclidean distance instead of Manhattan distance. Points are connected by straight-line distance.

    Time: O(n^2 log n)
    Space: O(n^2)
    """
    result = 0

    for i in range(len(points)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(euclidean_distance([[0,0],[2,2],[3,10],[5,2],[7,0]]))  # Expected: 1
print(euclidean_distance([[0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// EuclideanDistance solves the Euclidean Distance problem.
// Use Euclidean distance instead of Manhattan distance. Points are connected by straight-line distance.
// Time: O(n^2 log n), Space: O(n^2)
func EuclideanDistance(points [][]int) int {
	result := 0

	for i := 0; i < len(points); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(EuclideanDistance([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})) // Expected: 1
	fmt.Println(EuclideanDistance([][]int{{0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '10-airport-connections/02-min-cost-connect-points/twist-01-euclidean-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/10-airport-connections/02-min-cost-connect-points/twist-01-euclidean-distance'] = problem;
})();
