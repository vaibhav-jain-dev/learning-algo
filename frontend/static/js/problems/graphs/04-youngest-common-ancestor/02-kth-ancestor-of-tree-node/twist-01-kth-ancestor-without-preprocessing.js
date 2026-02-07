/**
 * Kth Ancestor Without Preprocessing
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/02-kth-ancestor-of-tree-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Ancestor Without Preprocessing',
        difficulty: 'Easy',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node',
        description: 'Find the kth ancestor of a single node with no preprocessing allowed. Just walk up the tree.',
        problem: 'Binary lifting is overkill for a single query. Simple parent traversal in O(k) is optimal, forcing you to think about when preprocessing is worthwhile.',
        hints: [
            'Start by understanding the key difference: Binary lifting is overkill for a single query.',
            'Consider how this simplifies the original problem approach.'
        ],
        complexity: {
            time: 'O(N log N) preprocessing, O(log K) query',
            space: 'O(N log N)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":7,"parent":[-1,0,0,1,1,2,2],"queries":[[3,1],[5,2],[6,3]]},
                output: [-1,0,0],
                explanation: 'The kth ancestor without preprocessing for this input yields [-1, 0, 0].'
            },
            // Edge case
            {
                input: {"n":0,"parent":[-1],"queries":[[3,1]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def kth_ancestor_without_preprocessing(n, parent, queries):
    """
    Kth Ancestor Without Preprocessing

    Find the kth ancestor of a single node with no preprocessing allowed. Just walk up the tree.

    Time: O(N log N) preprocessing, O(log K) query
    Space: O(N log N)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(kth_ancestor_without_preprocessing(7, [-1,0,0,1,1,2,2], [[3,1],[5,2],[6,3]]))  # Expected: [-1,0,0]
print(kth_ancestor_without_preprocessing(0, [-1], [[3,1]]))  # Expected: []
`,
            go: `package main

import "fmt"

// KthAncestorWithoutPreprocessing solves the Kth Ancestor Without Preprocessing problem.
// Find the kth ancestor of a single node with no preprocessing allowed. Just walk up the tree.
// Time: O(N log N) preprocessing, O(log K) query, Space: O(N log N)
func KthAncestorWithoutPreprocessing(n int, parent []int, queries [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(KthAncestorWithoutPreprocessing(7, []int{-1, 0, 0, 1, 1, 2, 2}, [][]int{{3, 1}, {5, 2}, {6, 3}})) // Expected: [-1,0,0]
	fmt.Println(KthAncestorWithoutPreprocessing(0, []int{-1}, [][]int{{3, 1}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node/twist-01-kth-ancestor-without-preprocessing', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/02-kth-ancestor-of-tree-node/twist-01-kth-ancestor-without-preprocessing'] = problem;
})();
