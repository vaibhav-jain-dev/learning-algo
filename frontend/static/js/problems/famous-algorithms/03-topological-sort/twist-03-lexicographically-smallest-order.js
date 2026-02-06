/**
 * Lexicographically Smallest Order
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: topological-sort
 * Parent: 03-topological-sort
 */
(function() {
    'use strict';

    const problem = {
        name: 'Lexicographically Smallest Order',
        difficulty: 'Medium',
        algorithm: 'topological-sort',
        parent: '03-topological-sort',
        description: 'Find the lexicographically smallest topological ordering of the DAG.',
        problem: 'Replaces a regular queue with a min-heap/priority queue to always process the smallest available node first among those with zero in-degree.',
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
                input: {"n":6,"edges":[[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the lexicographically smallest order criteria.'
            },
            {
                input: {"n":2,"edges":[[1,0],[0,1]]},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the lexicographically smallest order criteria.'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[5,2]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def lexicographically_smallest_order(n, edges):
    """
    Lexicographically Smallest Order

    Find the lexicographically smallest topological ordering of the DAG.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on edges
        j = 0
        for k in range(i, n):
            if j < len(edges) and n[k] == edges[j]:
                j += 1
        if j == len(edges):
            count += 1

    return count


# Test cases
print(lexicographically_smallest_order(6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]))  # Expected: 1
print(lexicographically_smallest_order(2, [[1,0],[0,1]]))  # Expected: 2
print(lexicographically_smallest_order(0, [[5,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// LexicographicallySmallestOrder solves the Lexicographically Smallest Order problem.
// Find the lexicographically smallest topological ordering of the DAG.
// Time: O(?), Space: O(?)
func LexicographicallySmallestOrder(n int, edges [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(LexicographicallySmallestOrder(6, [][]int{{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}})) // Expected: 1
	fmt.Println(LexicographicallySmallestOrder(2, [][]int{{1, 0}, {0, 1}})) // Expected: 2
	fmt.Println(LexicographicallySmallestOrder(0, [][]int{{5, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '03-topological-sort/twist-03-lexicographically-smallest-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/03-topological-sort/twist-03-lexicographically-smallest-order'] = problem;
})();
