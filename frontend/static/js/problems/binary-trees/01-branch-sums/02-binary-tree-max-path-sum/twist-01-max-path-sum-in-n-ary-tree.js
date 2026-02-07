/**
 * Max Path Sum in N-ary Tree
 * Category: binary-trees
 * Difficulty: Very Hard
 * Algorithm: tree-max-path
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Path Sum in N-ary Tree',
        difficulty: 'Very Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Find the maximum path sum in an N-ary tree where each node can have any number of children. The path can go through any two children of a node. With binary trees you compare left vs right. With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.',
        problem: 'With binary trees you compare left vs right. With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.',
        hints: [
            'Consider: Find the maximum path sum in an N-ary tree where each node can have any number of children.',
            'The path can go through any two children of a node.',
            'Key insight: With binary trees you compare left vs right.',
            'With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2},"right":{"value":3}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def max_path_sum_in_n_ary_tree(tree):
    """
    Max Path Sum in N-ary Tree

    Find the maximum path sum in an N-ary tree where each node can have any number of children. The path can go through any two children of a node. With binary trees you compare left vs right. With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(max_path_sum_in_n_ary_tree({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 1
print(max_path_sum_in_n_ary_tree({"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}))  # Expected: 2
print(max_path_sum_in_n_ary_tree({"value": 1, "left": {"value": 2}, "right": {"value": 3}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// MaxPathSumInNAryTree solves the Max Path Sum in N-ary Tree problem.
// Find the maximum path sum in an N-ary tree where each node can have any number of children. The path can go through any two children of a node. With binary trees you compare left vs right. With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.
// Time: O(n), Space: O(n)
func MaxPathSumInNAryTree(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MaxPathSumInNAryTree({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 1
	fmt.Println(MaxPathSumInNAryTree({"value":-10,"left":{"value":9},"right":{"value":20,"left":{"value":15},"right":{"value":7}}})) // Expected: 2
	fmt.Println(MaxPathSumInNAryTree({"value":1,"left":{"value":2},"right":{"value":3}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-01-max-path-sum-in-n-ary-tree', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-01-max-path-sum-in-n-ary-tree'] = problem;
})();
