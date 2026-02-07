/**
 * Lazy vs Eager Prim
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lazy vs Eager Prim',
        difficulty: 'Hard',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm',
        description: 'Implement both lazy Prim.',
        problem: 'Lazy Prim adds duplicate entries and skips them later. Eager Prim maintains exactly one entry per non-MST node, requiring an indexed PQ with decrease-key operation.',
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
                explanation: 'The lazy vs eager prim condition is satisfied for this input.'
            },
            // Edge case
            {
                input: {"V":0,"edges":[[0,1,2]]},
                output: false,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def lazy_vs_eager_prim(V, edges):
    """
    Lazy vs Eager Prim

    Implement both lazy Prim\\

    Time: O(?)
    Space: O(?)
    """
    j = 0

    for i in range(len(V)):
        if j < len(edges) and V[i] == edges[j]:
            j += 1

    return j == len(edges)


# Test cases
print(lazy_vs_eager_prim(5, [[0,1,2],[0,3,6],[1,2,3],[1,3,8],[1,4,5],[2,4,7],[3,4,9]]))  # Expected: True
print(lazy_vs_eager_prim(0, [[0,1,2]]))  # Expected: False
`,
            go: `package main

import "fmt"

// LazyVsEagerPrim solves the Lazy vs Eager Prim problem.
// Implement both lazy Prim\\
// Time: O(?), Space: O(?)
func LazyVsEagerPrim(V int, edges [][]int) bool {
	j := 0

	for i := 0; i < len(V) && j < len(edges); i++ {
		if V[i] == edges[j] {
			j++
		}
	}

	return j == len(edges)
}

func main() {
	fmt.Println(LazyVsEagerPrim(5, [][]int{{0, 1, 2}, {0, 3, 6}, {1, 2, 3}, {1, 3, 8}, {1, 4, 5}, {2, 4, 7}, {3, 4, 9}})) // Expected: true
	fmt.Println(LazyVsEagerPrim(0, [][]int{{0, 1, 2}})) // Expected: false
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/twist-02-lazy-vs-eager-prim', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/twist-02-lazy-vs-eager-prim'] = problem;
})();
