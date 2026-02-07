/**
 * Morris Preorder Traversal
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-iterative
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Preorder Traversal',
        difficulty: 'Hard',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack). Output nodes in preorder: root, left, right. Morris inorder processes the node when revisiting via the thread. Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.',
        problem: 'Morris inorder processes the node when revisiting via the thread. Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.',
        hints: [
            'Consider: Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack).',
            'Output nodes in preorder: root, left, right.',
            'Key insight: Morris inorder processes the node when revisiting via the thread.',
            'Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}}},
                output: [0],
                explanation: 'The morris preorder traversal for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2,"left":{"value":3}}}},
                output: [0,1],
                explanation: 'The morris preorder traversal for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def morris_preorder_traversal(tree):
    """
    Morris Preorder Traversal

    Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack). Output nodes in preorder: root, left, right. Morris inorder processes the node when revisiting via the thread. Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(morris_preorder_traversal({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: [0]
print(morris_preorder_traversal({"value": 1, "right": {"value": 2, "left": {"value": 3}}}))  # Expected: [0,1]
print(morris_preorder_traversal({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// MorrisPreorderTraversal solves the Morris Preorder Traversal problem.
// Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack). Output nodes in preorder: root, left, right. Morris inorder processes the node when revisiting via the thread. Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.
// Time: O(n), Space: O(n)
func MorrisPreorderTraversal(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(MorrisPreorderTraversal({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(MorrisPreorderTraversal({"value":1,"right":{"value":2,"left":{"value":3}}})) // Expected: [0,1]
	fmt.Println(MorrisPreorderTraversal({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-01-morris-preorder-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-01-morris-preorder-traversal'] = problem;
})();
