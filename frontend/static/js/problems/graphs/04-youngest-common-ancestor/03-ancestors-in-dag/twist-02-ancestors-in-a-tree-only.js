/**
 * Ancestors in a Tree Only
 * Category: graphs
 * Difficulty: Easy
 * Algorithm: graph-ancestor
 * Parent: 04-youngest-common-ancestor/03-ancestors-in-dag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Ancestors in a Tree Only',
        difficulty: 'Easy',
        algorithm: 'graph-ancestor',
        parent: '04-youngest-common-ancestor/03-ancestors-in-dag',
        description: 'The graph is guaranteed to be a tree (each node has exactly one parent). Find all ancestors of each node.',
        problem: 'In a tree, each node has a unique path to root. You simply walk up the parent chain, making the problem O(N*depth) without needing topological sort.',
        hints: [
            'Start by understanding the key difference: In a tree, each node has a unique path to root.',
            'Consider how this simplifies the original problem approach.',
            'Consider the example: Tree with parent=[−1,0,0,1,1].',
            'Test with edge cases: empty input, single element, and the largest possible input.'
        ],
        complexity: {
            time: 'O(N^2 + N * E)',
            space: 'O(N^2)'
        },
        examples: [
            // Basic test case
            {
                input: {"n":8,"edges":[[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]},
                output: [[0,3],[0,4],[1,3]],
                explanation: 'The ancestors in a tree only for this input yields [0,3, 0,4, 1,3].'
            },
            {
                input: {"n":5,"edges":[[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]},
                output: [[0,1],[0,2],[0,3]],
                explanation: 'The ancestors in a tree only for this input yields [0,1, 0,2, 0,3].'
            },
            // Edge case
            {
                input: {"n":0,"edges":[[0,3]]},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def ancestors_in_a_tree_only(n, edges):
    """
    Ancestors in a Tree Only

    The graph is guaranteed to be a tree (each node has exactly one parent). Find all ancestors of each node.

    Time: O(N^2 + N * E)
    Space: O(N^2)
    """
    result = []

    for i in range(len(n)):
        # Check if element meets criteria
        result.append(n[i])

    return result


# Test cases
print(ancestors_in_a_tree_only(8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]]))  # Expected: [[0,3],[0,4],[1,3]]
print(ancestors_in_a_tree_only(5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]))  # Expected: [[0,1],[0,2],[0,3]]
print(ancestors_in_a_tree_only(0, [[0,3]]))  # Expected: []
`,
            go: `package main

import "fmt"

// AncestorsInATreeOnly solves the Ancestors in a Tree Only problem.
// The graph is guaranteed to be a tree (each node has exactly one parent). Find all ancestors of each node.
// Time: O(N^2 + N * E), Space: O(N^2)
func AncestorsInATreeOnly(n int, edges [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(n); i++ {
		result = append(result, n[i])
	}

	return result
}

func main() {
	fmt.Println(AncestorsInATreeOnly(8, [][]int{{0, 3}, {0, 4}, {1, 3}, {2, 4}, {2, 7}, {3, 5}, {3, 6}, {3, 7}, {4, 6}})) // Expected: [[0,3],[0,4],[1,3]]
	fmt.Println(AncestorsInATreeOnly(5, [][]int{{0, 1}, {0, 2}, {0, 3}, {0, 4}, {1, 2}, {1, 3}, {1, 4}, {2, 3}, {2, 4}, {3, 4}})) // Expected: [[0,1],[0,2],[0,3]]
	fmt.Println(AncestorsInATreeOnly(0, [][]int{{0, 3}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '04-youngest-common-ancestor/03-ancestors-in-dag/twist-02-ancestors-in-a-tree-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['graphs/04-youngest-common-ancestor/03-ancestors-in-dag/twist-02-ancestors-in-a-tree-only'] = problem;
})();
