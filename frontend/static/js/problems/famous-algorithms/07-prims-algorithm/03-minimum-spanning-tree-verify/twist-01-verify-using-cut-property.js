/**
 * Verify Using Cut Property
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm/03-minimum-spanning-tree-verify
 */
(function() {
    'use strict';

    const problem = {
        name: 'Verify Using Cut Property',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/03-minimum-spanning-tree-verify',
        description: 'Verify the MST by checking the cut property: for every edge in the proposed tree, it must be the lightest edge crossing some cut.',
        problem: 'Uses the theoretical cut property directly instead of comparing total weights, providing a proof-based verification that does not require computing the actual MST.',
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
                explanation: 'The verify using cut property condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"n":0,"graphEdges":[[0,1,1]],"proposed":[[0,1,1]]},
                output: false,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def verify_using_cut_property(n, graphEdges, proposed):
    """
    Verify Using Cut Property

    Verify the MST by checking the cut property: for every edge in the proposed tree, it must be the lightest edge crossing some cut.

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(n)):
        if j < len(graphEdges) and n[i] == graphEdges[j]:
            j += 1

    return j == len(graphEdges)


# Test cases
print(verify_using_cut_property(4, [[0,1,1],[0,2,2],[1,2,3],[1,3,4],[2,3,5]], [[0,1,1],[0,2,2],[1,3,4]]))  # Expected: True
print(verify_using_cut_property(0, [[0,1,1]], [[0,1,1]]))  # Expected: False
`,
            go: `package main

import "fmt"

// VerifyUsingCutProperty solves the Verify Using Cut Property problem.
// Verify the MST by checking the cut property: for every edge in the proposed tree, it must be the lightest edge crossing some cut.
// Time: O(?), Space: O(?)
func VerifyUsingCutProperty(n int, graphEdges [][]int, proposed [][]int) bool {
	j := 0

	for i := 0; i < len(n) && j < len(graphEdges); i++ {
		if n[i] == graphEdges[j] {
			j++
		}
	}

	return j == len(graphEdges)
}

func main() {
	fmt.Println(VerifyUsingCutProperty(4, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 2, 3}, {1, 3, 4}, {2, 3, 5}}, [][]int{{0, 1, 1}, {0, 2, 2}, {1, 3, 4}})) // Expected: true
	fmt.Println(VerifyUsingCutProperty(0, [][]int{{0, 1, 1}}, [][]int{{0, 1, 1}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/03-minimum-spanning-tree-verify/twist-01-verify-using-cut-property', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/03-minimum-spanning-tree-verify/twist-01-verify-using-cut-property'] = problem;
})();
