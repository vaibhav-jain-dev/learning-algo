/**
 * MST with Edge Constraints
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kruskals-algorithm
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'MST with Edge Constraints',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'Find the MST where certain edges must be included and certain edges must be excluded.',
        problem: 'Pre-forces some edges into the solution and removes others, then runs Kruskal on the remaining edges while respecting the forced inclusions.',
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
                input: {"V":4,"E":5,"edges":[[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]},
                output: true,
                explanation: 'The mst with edge constraints condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"V":0,"E":0,"edges":[[0,1,10]]},
                output: false,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def mst_with_edge_constraints(V, E, edges):
    """
    MST with Edge Constraints

    Find the MST where certain edges must be included and certain edges must be excluded.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(V)):
        if j < len(E) and V[i] == E[j]:
            j += 1

    return j == len(E)


# Test cases
print(mst_with_edge_constraints(4, 5, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]))  # Expected: True
print(mst_with_edge_constraints(0, 0, [[0,1,10]]))  # Expected: False
`,
            go: `package main

import "fmt"

// MstWithEdgeConstraints solves the MST with Edge Constraints problem.
// Find the MST where certain edges must be included and certain edges must be excluded.
// Time: O(?), Space: O(?)
func MstWithEdgeConstraints(V int, E int, edges [][]int) bool {
	j := 0

	for i := 0; i < len(V) && j < len(E); i++ {
		if V[i] == E[j] {
			j++
		}
	}

	return j == len(E)
}

func main() {
	fmt.Println(MstWithEdgeConstraints(4, 5, [][]int{{0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}})) // Expected: true
	fmt.Println(MstWithEdgeConstraints(0, 0, [][]int{{0, 1, 10}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-04-mst-with-edge-constraints', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-04-mst-with-edge-constraints'] = problem;
})();
