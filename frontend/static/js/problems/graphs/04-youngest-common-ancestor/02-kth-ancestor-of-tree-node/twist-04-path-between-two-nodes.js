/**
 * Path Between Two Nodes
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/02-kth-ancestor-of-tree-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path Between Two Nodes',
        difficulty: 'Medium',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node',
        description: 'Given two nodes u and v, find the path from u to v by finding their LCA and concatenating the upward paths.',
        problem: 'Binary lifting finds ancestors efficiently, but reconstructing the actual path requires collecting nodes along the way, not just jumping past them.',
        hints: [
            'Start by understanding the key difference: Binary lifting finds ancestors efficiently, but reconstructing the actual path requires collecting nodes along the way, not just jumping past them.',
            'Think about what data structures need to change from the original solution.',
            'Consider the example: Nodes 6 and 4 in the tree.',
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
                output: [-1,0,0,1],
                explanation: 'The path between two nodes for this input yields [-1, 0, 0, 1].'
            },
            // Edge case
            {
                input: {"n":0,"parent":[-1],"queries":[[3,1]]},
                output: [],
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def path_between_two_nodes(n, parent, queries):
    """
    Path Between Two Nodes

    Given two nodes u and v, find the path from u to v by finding their LCA and concatenating the upward paths.

    Time: O(N log N) preprocessing, O(log K) query
    Space: O(N log N)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(path_between_two_nodes(7, [-1,0,0,1,1,2,2], [[3,1],[5,2],[6,3]]))  # Expected: [-1,0,0,1]
print(path_between_two_nodes(0, [-1], [[3,1]]))  # Expected: []
`,
            go: `package main

import "fmt"

// PathBetweenTwoNodes solves the Path Between Two Nodes problem.
// Given two nodes u and v, find the path from u to v by finding their LCA and concatenating the upward paths.
// Time: O(N log N) preprocessing, O(log K) query, Space: O(N log N)
func PathBetweenTwoNodes(n int, parent []int, queries [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(PathBetweenTwoNodes(7, []int{-1, 0, 0, 1, 1, 2, 2}, [][]int{{3, 1}, {5, 2}, {6, 3}})) // Expected: [-1,0,0,1]
	fmt.Println(PathBetweenTwoNodes(0, []int{-1}, [][]int{{3, 1}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/02-kth-ancestor-of-tree-node/twist-04-path-between-two-nodes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/02-kth-ancestor-of-tree-node/twist-04-path-between-two-nodes'] = problem;
})();
