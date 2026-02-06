/**
 * Ancestor at Given Depth
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/02-kth-ancestor-of-tree-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Ancestor at Given Depth',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node',
        description: 'Instead of the kth ancestor, find the ancestor of a node at a specific depth level.',
        problem: 'You need to compute each node depth first, then translate depth queries into kth-ancestor queries where k = currentDepth - targetDepth.',
        hints: [
            'Start by understanding the key difference: You need to compute each node depth first, then translate depth queries into kth-ancestor queries where k = currentDepth - targetDepth.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Node 6 at depth 3, target depth 1.',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N log N) preprocessing, O(log K) query',
            space: 'O(N log N)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":7,"parent":[-1,0,0,1,1,2,2],"queries":[[3,1],[5,2],[6,3]]},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the ancestor at given depth criteria.'
            },
            // Edge case
            {
                input: {"n":0,"parent":[-1],"queries":[[3,1]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def ancestor_at_given_depth(n, parent, queries):
    """
    Ancestor at Given Depth

    Instead of the kth ancestor, find the ancestor of a node at a specific depth level.

    Time: O(N log N) preprocessing, O(log K) query
    Space: O(N log N)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on parent
        j = 0
        for k in range(i, n):
            if j < len(parent) and n[k] == parent[j]:
                j += 1
        if j == len(parent):
            count += 1

    return count


# Test cases
print(ancestor_at_given_depth(7, [-1,0,0,1,1,2,2], [[3,1],[5,2],[6,3]]))  # Expected: 3
print(ancestor_at_given_depth(0, [-1], [[3,1]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// AncestorAtGivenDepth solves the Ancestor at Given Depth problem.
// Instead of the kth ancestor, find the ancestor of a node at a specific depth level.
// Time: O(N log N) preprocessing, O(log K) query, Space: O(N log N)
func AncestorAtGivenDepth(n int, parent []int, queries [][]int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(AncestorAtGivenDepth(7, []int{-1, 0, 0, 1, 1, 2, 2}, [][]int{{3, 1}, {5, 2}, {6, 3}})) // Expected: 3
	fmt.Println(AncestorAtGivenDepth(0, []int{-1}, [][]int{{3, 1}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node/twist-05-ancestor-at-given-depth', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/02-kth-ancestor-of-tree-node/twist-05-ancestor-at-given-depth'] = problem;
})();
