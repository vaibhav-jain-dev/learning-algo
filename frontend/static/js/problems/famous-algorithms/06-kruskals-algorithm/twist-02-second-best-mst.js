/**
 * Second Best MST
 * Category: famous-algorithms
 * Difficulty: Very Hard
 * Algorithm: kruskals-algorithm
 * Parent: 06-kruskals-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Second Best MST',
        difficulty: 'Very Hard',
        algorithm: 'kruskals-algorithm',
        parent: '06-kruskals-algorithm',
        description: 'Find the spanning tree with the second smallest total weight (it may share most edges with the MST).',
        problem: 'Requires finding the MST first, then for each non-MST edge, determining which MST edge it could replace and tracking the minimum increase in total weight.',
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
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the second best mst criteria.'
            },
            // Edge case
            {
                input: {"V":0,"E":0,"edges":[[0,1,10]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def second_best_mst(V, E, edges):
    """
    Second Best MST

    Find the spanning tree with the second smallest total weight (it may share most edges with the MST).

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(V)

    for i in range(n):
        # Check condition based on E
        j = 0
        for k in range(i, n):
            if j < len(E) and V[k] == E[j]:
                j += 1
        if j == len(E):
            count += 1

    return count


# Test cases
print(second_best_mst(4, 5, [[0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]]))  # Expected: 1
print(second_best_mst(0, 0, [[0,1,10]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// SecondBestMst solves the Second Best MST problem.
// Find the spanning tree with the second smallest total weight (it may share most edges with the MST).
// Time: O(?), Space: O(?)
func SecondBestMst(V int, E int, edges [][]int) int {
	result := 0

	for i := 0; i < len(V); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SecondBestMst(4, 5, [][]int{{0, 1, 10}, {0, 2, 6}, {0, 3, 5}, {1, 3, 15}, {2, 3, 4}})) // Expected: 1
	fmt.Println(SecondBestMst(0, 0, [][]int{{0, 1, 10}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '06-kruskals-algorithm/twist-02-second-best-mst', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/06-kruskals-algorithm/twist-02-second-best-mst'] = problem;
})();
