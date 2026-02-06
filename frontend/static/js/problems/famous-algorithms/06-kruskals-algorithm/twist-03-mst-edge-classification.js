/**
 * MST Edge Classification
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kruskals-algorithm
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'MST Edge Classification',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'For each edge in the graph, determine if it is always in every MST, never in any MST, or sometimes in an MST.',
        problem: 'Requires understanding the cut and cycle properties deeply -- an edge is mandatory if it is the unique lightest in some cut, impossible if it is the unique heaviest in some cycle.',
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
                explanation: 'The mst edge classification condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"V":0,"E":0,"edges":[[0,1,10]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def mst_edge_classification(V, E, edges):
    """
    MST Edge Classification

    For each edge in the graph, determine if it is always in every MST, never in any MST, or sometimes in an MST.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(V)):
        if j < len(E) and V[i] == E[j]:
            j += 1

    return j == len(E)


# Test cases
print(mst_edge_classification(4, 5, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]))  # Expected: True
print(mst_edge_classification(0, 0, [[0,1,10]]))  # Expected: False
`,
            go: `package main

import "fmt"

// MstEdgeClassification solves the MST Edge Classification problem.
// For each edge in the graph, determine if it is always in every MST, never in any MST, or sometimes in an MST.
// Time: O(?), Space: O(?)
func MstEdgeClassification(V int, E int, edges [][]int) bool {
	j := 0

	for i := 0; i < len(V) && j < len(E); i++ {
		if V[i] == E[j] {
			j++
		}
	}

	return j == len(E)
}

func main() {
	fmt.Println(MstEdgeClassification(4, 5, [][]int{{0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}})) // Expected: true
	fmt.Println(MstEdgeClassification(0, 0, [][]int{{0, 1, 10}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-03-mst-edge-classification', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-03-mst-edge-classification'] = problem;
})();
