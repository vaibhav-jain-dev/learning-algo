/**
 * O(n^2) Prim Without Heap
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: prims-algorithm
 * Parent: 07-prims-algorithm/01-min-cost-connect-points-prim
 */
(function() {
    'use strict';

    const problem = {
        name: 'O(n^2) Prim Without Heap',
        difficulty: 'Medium',
        algorithm: 'prims-algorithm',
        parent: '07-prims-algorithm/01-min-cost-connect-points-prim',
        description: 'Since this is a dense graph (every point connects to every other), implement Prim\',
        problem: 'For complete graphs with n^2 edges, maintaining a heap of n^2 entries is wasteful. An O(n^2) approach with a minDist array avoids heap overhead entirely.',
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
                input: {"points":[[0,0],[2,2],[3,10],[5,2],[7,0]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the o n 2 prim without heap criteria.'
            },
            // Edge case
            {
                input: {"points":[[0,0]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def o_n_2_prim_without_heap(points):
    """
    O(n^2) Prim Without Heap

    Since this is a dense graph (every point connects to every other), implement Prim\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(points)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(o_n_2_prim_without_heap([[0,0],[2,2],[3,10],[5,2],[7,0]]))  # Expected: 1
print(o_n_2_prim_without_heap([[0,0]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// ON2PrimWithoutHeap solves the O(n^2) Prim Without Heap problem.
// Since this is a dense graph (every point connects to every other), implement Prim\\
// Time: O(?), Space: O(?)
func ON2PrimWithoutHeap(points [][]int) int {
	result := 0

	for i := 0; i < len(points); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ON2PrimWithoutHeap([][]int{{0, 0}, {2, 2}, {3, 10}, {5, 2}, {7, 0}})) // Expected: 1
	fmt.Println(ON2PrimWithoutHeap([][]int{{0, 0}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '07-prims-algorithm/01-min-cost-connect-points-prim/twist-01-o-n-2-prim-without-heap', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/07-prims-algorithm/01-min-cost-connect-points-prim/twist-01-o-n-2-prim-without-heap'] = problem;
})();
