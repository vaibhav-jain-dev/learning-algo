/**
 * MST with Starting Vertex
 * Category: famous-algorithms
 * Difficulty: Easy
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'MST with Starting Vertex',
        difficulty: 'Easy',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Run Prim\',
        problem: 'Tests understanding that MST weight is invariant to the starting vertex (though the actual edges may differ), which is a key property to prove.',
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
                input: {"V":5,"edges":[[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]},
                output: true,
                explanation: 'The mst with starting vertex condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"V":0,"edges":[[0,1,2]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def mst_with_starting_vertex(V, edges):
    """
    MST with Starting Vertex

    Run Prim\\

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(V)):
        if j < len(edges) and V[i] == edges[j]:
            j += 1

    return j == len(edges)


# Test cases
print(mst_with_starting_vertex(5, [[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]))  # Expected: True
print(mst_with_starting_vertex(0, [[0,1,2]]))  # Expected: False
`,
            go: `package main

import "fmt"

// MstWithStartingVertex solves the MST with Starting Vertex problem.
// Run Prim\\
// Time: O(?), Space: O(?)
func MstWithStartingVertex(V int, edges [][]int) bool {
	j := 0

	for i := 0; i < len(V) && j < len(edges); i++ {
		if V[i] == edges[j] {
			j++
		}
	}

	return j == len(edges)
}

func main() {
	fmt.Println(MstWithStartingVertex(5, [][]int{{0, 1, 2}, {0, 3, 6}, {1, 2, 3}, {1, 3, 8}, {1, 4, 5}, {2, 4, 7}, {3, 4, 9}})) // Expected: true
	fmt.Println(MstWithStartingVertex(0, [][]int{{0, 1, 2}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/twist-03-mst-with-starting-vertex', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/twist-03-mst-with-starting-vertex'] = problem;
})();
