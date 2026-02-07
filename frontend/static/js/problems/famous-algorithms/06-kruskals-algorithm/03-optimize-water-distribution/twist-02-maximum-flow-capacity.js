/**
 * Maximum Flow Capacity
 * Category: famous-algorithms
 * Difficulty: Hard
 * Algorithm: kruskals-algorithm
 * Parent: 06-kruskals-algorithm/03-optimize-water-distribution
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Flow Capacity',
        difficulty: 'Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm/03-optimize-water-distribution',
        description: 'Each pipe has both a cost and a capacity. Find the minimum cost to supply water to all houses where each house needs at least 1 unit of water.',
        problem: 'Adds a capacity dimension -- simple MST may not provide sufficient flow, requiring min-cost max-flow analysis instead of pure MST.',
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
                input: {"n":3,"wells":[1,2,2],"pipes":[[1,2,1],[2,3,1]]},
                output: 1,
                explanation: 'The greedy selection of minimum-weight edges, combined with cycle detection, ensures the resulting tree has the minimum total edge weight.'
            },
            // Edge case
            {
                input: {"n":0,"wells":[1],"pipes":[[1,2,1]]},
                output: 0,
                explanation: 'Process edges in order of weight. For each edge, check if its endpoints are already connected. If not, add the edge to the MST and merge their components.'
            }
        ],
        solutions: {
            python: `def maximum_flow_capacity(n, wells, pipes):
    """
    Maximum Flow Capacity

    Each pipe has both a cost and a capacity. Find the minimum cost to supply water to all houses where each house needs at least 1 unit of water.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on wells
        j = 0
        for k in range(i, n):
            if j < len(wells) and n[k] == wells[j]:
                j += 1
        if j == len(wells):
            count += 1

    return count


# Test cases
print(maximum_flow_capacity(3, [1,2,2], [[1,2,1],[2,3,1]]))  # Expected: 1
print(maximum_flow_capacity(0, [1], [[1,2,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaximumFlowCapacity solves the Maximum Flow Capacity problem.
// Each pipe has both a cost and a capacity. Find the minimum cost to supply water to all houses where each house needs at least 1 unit of water.
// Time: O(?), Space: O(?)
func MaximumFlowCapacity(n int, wells []int, pipes [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaximumFlowCapacity(3, []int{1, 2, 2}, [][]int{{1, 2, 1}, {2, 3, 1}})) // Expected: 1
	fmt.Println(MaximumFlowCapacity(0, []int{1}, [][]int{{1, 2, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/03-optimize-water-distribution/twist-02-maximum-flow-capacity', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/03-optimize-water-distribution/twist-02-maximum-flow-capacity'] = problem;
})();
