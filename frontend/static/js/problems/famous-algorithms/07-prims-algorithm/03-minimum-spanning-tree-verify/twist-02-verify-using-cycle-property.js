/**
 * Verify Using Cycle Property
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm/03-minimum-spanning-tree-verify
 */
(function() {
    'use strict';

    const problem = {
        name: 'Verify Using Cycle Property',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/03-minimum-spanning-tree-verify',
        description: 'For each non-tree edge, verify that it is the heaviest edge in the cycle it would create when added to the proposed tree.',
        problem: 'Uses the cycle property: a non-MST edge must be the max-weight edge in any cycle it participates in. This checks from the non-tree edges perspective.',
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
                explanation: 'The verify using cycle property condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"graphEdges":[[0,1,1]],"proposed":[[0,1,1]]},
                output: false,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def verify_using_cycle_property(n, graphEdges, proposed):
    """
    Verify Using Cycle Property

    For each non-tree edge, verify that it is the heaviest edge in the cycle it would create when added to the proposed tree.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(n)):
        if j < len(graphEdges) and n[i] == graphEdges[j]:
            j += 1

    return j == len(graphEdges)


# Test cases
print(verify_using_cycle_property(4, [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]], [[0,1,1],[0,2,2],[1,3,4]]))  # Expected: True
print(verify_using_cycle_property(0, [[0,1,1]], [[0,1,1]]))  # Expected: False
`,
            go: `package main

import "fmt"

// VerifyUsingCycleProperty solves the Verify Using Cycle Property problem.
// For each non-tree edge, verify that it is the heaviest edge in the cycle it would create when added to the proposed tree.
// Time: O(?), Space: O(?)
func VerifyUsingCycleProperty(n int, graphEdges [][]int, proposed [][]int) bool {
	j := 0

	for i := 0; i < len(n) && j < len(graphEdges); i++ {
		if n[i] == graphEdges[j] {
			j++
		}
	}

	return j == len(graphEdges)
}

func main() {
	fmt.Println(VerifyUsingCycleProperty(4, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 2, 3}, {1, 3, 4}, {2, 3, 5}}, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 3, 4}})) // Expected: true
	fmt.Println(VerifyUsingCycleProperty(0, [][]int{{0, 1, 1}}, [][]int{{0, 1, 1}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/03-minimum-spanning-tree-verify/twist-02-verify-using-cycle-property', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/03-minimum-spanning-tree-verify/twist-02-verify-using-cycle-property'] = problem;
})();
