/**
 * Flatten to Right-Skewed List
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-flatten
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten to Right-Skewed List',
        difficulty: 'Medium',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node. The original uses inorder (left-to-right) order with a doubly-linked structure. Preorder requires processing root before children, and the single-direction (right-only) linking means you must handle the left subtree displacement carefully.',
        problem: 'The original uses inorder (left-to-right) order with a doubly-linked structure. Preorder requires processing root before children, and the single-direction (right-only) linking means you must handle the left subtree displacement carefully.',
        hints: [
            'Consider: Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node.',
            'The original uses inorder (left-to-right) order with a doubly-linked structure.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 5, 3, 4, null, 6] flattens to 1 -> 2 -> 3 -> 4 -> 5 -> 6 (all right pointers, all left pointers null).'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},
                output: [0],
                explanation: 'The flatten to right skewed list for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def flatten_to_right_skewed_list(tree):
    """
    Flatten to Right-Skewed List

    Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node. The original uses inorder (left-to-right) order with a doubly-linked structure. Preorder requires processing root before children, and the single-direction (right-only) linking means you must handle the left subtree displacement carefully.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(flatten_to_right_skewed_list({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: [0]
print(flatten_to_right_skewed_list({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// FlattenToRightSkewedList solves the Flatten to Right-Skewed List problem.
// Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node. The original uses inorder (left-to-right) order with a doubly-linked structure. Preorder requires processing root before children, and the single-direction (right-only) linking means you must handle the left subtree displacement carefully.
// Time: O(n), Space: O(n)
func FlattenToRightSkewedList(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(FlattenToRightSkewedList({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: [0]
	fmt.Println(FlattenToRightSkewedList({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-01-flatten-to-right-skewed-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-01-flatten-to-right-skewed-list'] = problem;
})();
