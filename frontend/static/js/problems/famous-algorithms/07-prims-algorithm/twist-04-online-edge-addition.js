/**
 * Online Edge Addition
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Online Edge Addition',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Given an MST, a new edge is added to the graph. Efficiently update the MST without recomputing from scratch.',
        problem: 'Requires finding the cycle created by the new edge in the MST, then removing the heaviest edge in that cycle if the new edge is lighter -- a fundamentally different operation from building MST.',
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
                explanation: 'The online edge addition condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"V":0,"edges":[[0,1,2]]},
                output: false,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def online_edge_addition(V, edges):
    """
    Online Edge Addition

    Given an MST, a new edge is added to the graph. Efficiently update the MST without recomputing from scratch.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(V)):
        if j < len(edges) and V[i] == edges[j]:
            j += 1

    return j == len(edges)


# Test cases
print(online_edge_addition(5, [[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]))  # Expected: True
print(online_edge_addition(0, [[0,1,2]]))  # Expected: False
`,
            go: `package main

import "fmt"

// OnlineEdgeAddition solves the Online Edge Addition problem.
// Given an MST, a new edge is added to the graph. Efficiently update the MST without recomputing from scratch.
// Time: O(?), Space: O(?)
func OnlineEdgeAddition(V int, edges [][]int) bool {
	j := 0

	for i := 0; i < len(V) && j < len(edges); i++ {
		if V[i] == edges[j] {
			j++
		}
	}

	return j == len(edges)
}

func main() {
	fmt.Println(OnlineEdgeAddition(5, [][]int{{0, 1, 2}, {0, 3, 6}, {1, 2, 3}, {1, 3, 8}, {1, 4, 5}, {2, 4, 7}, {3, 4, 9}})) // Expected: true
	fmt.Println(OnlineEdgeAddition(0, [][]int{{0, 1, 2}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/twist-04-online-edge-addition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/twist-04-online-edge-addition'] = problem;
})();
