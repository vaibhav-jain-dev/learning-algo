/**
 * Negative Weight Handling
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: dijkstras-algorithm
 * Parent: 02-dijkstras-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Negative Weight Handling',
        difficulty: 'Hard',
        algorithm: 'dijkstras-algorithm',
        parent: '02-dijkstras-algorithm',
        description: 'Dijkstra\',
        problem: 'Forces understanding of WHY the greedy choice works: once a node is finalized, no future path can improve it (only if edges are non-negative). A negative edge violates this invariant.',
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
                input: {"vertices":5,"edges":[[0,1,4],[0,2,1],[1,3,1],[2,1,2],[2,3,5],[3,4,3]],"source":0},
                output: [[0,1,4],[0,2,1],[1,3,1]],
                explanation: 'The negative weight handling for this input yields [0,1,4, 0,2,1, 1,3,1].'
            },
            // Edge case
            {
                input: {"vertices":0,"edges":[[0,1,4]],"source":0},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def negative_weight_handling(vertices, edges, source):
    """
    Negative Weight Handling

    Dijkstra\\

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(vertices)):
        # Check if element meets criteria
        result.append(vertices[i])

    return result


# Test cases
print(negative_weight_handling(5, [[0,1,4],[0,2,1],[1,3,1],[2,1,2],[2,3,5],[3,4,3]], 0))  # Expected: [[0,1,4],[0,2,1],[1,3,1]]
print(negative_weight_handling(0, [[0,1,4]], 0))  # Expected: []
`,
            go: `package main

import "fmt"

// NegativeWeightHandling solves the Negative Weight Handling problem.
// Dijkstra\\
// Time: O(?), Space: O(?)
func NegativeWeightHandling(vertices int, edges [][]int, source int) []int {
	result := make([]int, 0)

	for i := 0; i < len(vertices); i++ {
		result = append(result, vertices[i])
	}

	return result
}

func main() {
	fmt.Println(NegativeWeightHandling(5, [][]int{{0, 1, 4}, {0, 2, 1}, {1, 3, 1}, {2, 1, 2}, {2, 3, 5}, {3, 4, 3}}, 0)) // Expected: [[0,1,4],[0,2,1],[1,3,1]]
	fmt.Println(NegativeWeightHandling(0, [][]int{{0, 1, 4}}, 0)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '02-dijkstras-algorithm/twist-01-negative-weight-handling', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/02-dijkstras-algorithm/twist-01-negative-weight-handling'] = problem;
})();
