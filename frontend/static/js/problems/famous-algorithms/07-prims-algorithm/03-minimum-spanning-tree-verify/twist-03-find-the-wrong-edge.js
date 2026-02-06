/**
 * Find the Wrong Edge
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm/03-minimum-spanning-tree-verify
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find the Wrong Edge',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/03-minimum-spanning-tree-verify',
        description: 'If the proposed tree is NOT a valid MST, identify which specific edge should be swapped and with which non-tree edge.',
        problem: 'Goes beyond boolean verification to diagnostic output -- find the tree edge that violates the cut property and the non-tree edge that should replace it.',
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
                input: {"n":4,"graphEdges":[[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]],"proposed":[[0,1,1],[0,2,2],[1,3,4]]},
                output: true,
                explanation: 'The find the wrong edge condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"graphEdges":[[0,1,1]],"proposed":[[0,1,1]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def find_the_wrong_edge(n, graphEdges, proposed):
    """
    Find the Wrong Edge

    If the proposed tree is NOT a valid MST, identify which specific edge should be swapped and with which non-tree edge.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(n)):
        if j < len(graphEdges) and n[i] == graphEdges[j]:
            j += 1

    return j == len(graphEdges)


# Test cases
print(find_the_wrong_edge(4, [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]], [[0,1,1],[0,2,2],[1,3,4]]))  # Expected: True
print(find_the_wrong_edge(0, [[0,1,1]], [[0,1,1]]))  # Expected: False
`,
            go: `package main

import "fmt"

// FindTheWrongEdge solves the Find the Wrong Edge problem.
// If the proposed tree is NOT a valid MST, identify which specific edge should be swapped and with which non-tree edge.
// Time: O(?), Space: O(?)
func FindTheWrongEdge(n int, graphEdges [][]int, proposed [][]int) bool {
	j := 0

	for i := 0; i < len(n) && j < len(graphEdges); i++ {
		if n[i] == graphEdges[j] {
			j++
		}
	}

	return j == len(graphEdges)
}

func main() {
	fmt.Println(FindTheWrongEdge(4, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 2, 3}, {1, 3, 4}, {2, 3, 5}}, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 3, 4}})) // Expected: true
	fmt.Println(FindTheWrongEdge(0, [][]int{{0, 1, 1}}, [][]int{{0, 1, 1}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/03-minimum-spanning-tree-verify/twist-03-find-the-wrong-edge', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/03-minimum-spanning-tree-verify/twist-03-find-the-wrong-edge'] = problem;
})();
