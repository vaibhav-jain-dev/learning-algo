/**
 * N-ary Tree Path Sum
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'N-ary Tree Path Sum',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children. Instead of checking left/right children, you must iterate over a variable-length children array. Leaf detection changes from "no left and no right" to "empty children array".',
        problem: 'Instead of checking left/right children, you must iterate over a variable-length children array. Leaf detection changes from "no left and no right" to "empty children array".',
        hints: [
            'Consider: Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children.',
            'Instead of checking left/right children, you must iterate over a variable-length children array.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2, children=[Node(4)]), Node(6)]), target=7.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}},"target":22},
                output: 1,
                explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}},"target":4},
                output: 2,
                explanation: 'Process nodes systematically using the chosen traversal strategy. The visited set prevents infinite loops in cyclic graphs. Aggregate results across all components for the final answer.'
            },
            // Edge case
            {
                input: {"tree":{"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}},"target":0},
                output: 0,
                explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_path_sum(tree, target):
    """
    N-ary Tree Path Sum

    Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children. Instead of checking left/right children, you must iterate over a variable-length children array. Leaf detection changes from "no left and no right" to "empty children array".

    Time: O(n)
    Space: O(n)
    """
    count = 0
    n = len(tree)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and tree[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(n_ary_tree_path_sum({"value": 5, "left": {"value": 4, "left": {"value": 11, "left": {"value": 7}, "right": {"value": 2}}}, "right": {"value": 8, "left": {"value": 13}, "right": {"value": 4, "left": {"value": 5}, "right": {"value": 1}}}}, 22))  # Expected: 1
print(n_ary_tree_path_sum({"value": 1, "left": {"value": 2}, "right": {"value": 3}}, 4))  # Expected: 2
print(n_ary_tree_path_sum({"value": 5, "left": {"value": 4, "left": {"value": 11, "left": {"value": 7}, "right": {"value": 2}}}, "right": {"value": 8, "left": {"value": 13}, "right": {"value": 4, "left": {"value": 5}, "right": {"value": 1}}}}, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// NAryTreePathSum solves the N-ary Tree Path Sum problem.
// Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children. Instead of checking left/right children, you must iterate over a variable-length children array. Leaf detection changes from "no left and no right" to "empty children array".
// Time: O(n), Space: O(n)
func NAryTreePathSum(tree *TreeNode, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NAryTreePathSum({"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}}, 22)) // Expected: 1
	fmt.Println(NAryTreePathSum({"value":1,"left":{"value":2},"right":{"value":3}}, 4)) // Expected: 2
	fmt.Println(NAryTreePathSum({"value":5,"left":{"value":4,"left":{"value":11,"left":{"value":7},"right":{"value":2}}},"right":{"value":8,"left":{"value":13},"right":{"value":4,"left":{"value":5},"right":{"value":1}}}}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-02-n-ary-tree-path-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-02-n-ary-tree-path-sum'] = problem;
})();
