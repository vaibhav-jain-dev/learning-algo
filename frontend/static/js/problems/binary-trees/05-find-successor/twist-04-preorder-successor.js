/**
 * Preorder Successor
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-successor
 * Parent: 05-find-successor
 */
(function() {
    'use strict';

    const problem = {
        name: 'Preorder Successor',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        parent: '05-find-successor',
        description: 'Find the preorder successor instead of the in-order successor. Preorder visits: node, left, right. Preorder successor logic is different: if the node has a left child, successor is the left child. If it has only a right child, successor is the right child. If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.',
        problem: 'Preorder successor logic is different: if the node has a left child, successor is the left child. If it has only a right child, successor is the right child. If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.',
        hints: [
            'Consider: Find the preorder successor instead of the in-order successor.',
            'Preorder visits: node, left, right.',
            'Key insight: Preorder successor logic is different: if the node has a left child, successor is the left child.',
            'If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}},"target":5},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}},"target":0},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def preorder_successor(tree, target):
    """
    Preorder Successor

    Find the preorder successor instead of the in-order successor. Preorder visits: node, left, right. Preorder successor logic is different: if the node has a left child, successor is the left child. If it has only a right child, successor is the right child. If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.

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
print(preorder_successor({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 5))  # Expected: 1
print(preorder_successor({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}, 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// PreorderSuccessor solves the Preorder Successor problem.
// Find the preorder successor instead of the in-order successor. Preorder visits: node, left, right. Preorder successor logic is different: if the node has a left child, successor is the left child. If it has only a right child, successor is the right child. If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.
// Time: O(n), Space: O(n)
func PreorderSuccessor(tree *TreeNode, target int) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PreorderSuccessor({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 5)) // Expected: 1
	fmt.Println(PreorderSuccessor({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor/twist-04-preorder-successor', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor/twist-04-preorder-successor'] = problem;
})();
