/**
 * N-ary Tree Diameter
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-diameter
 * Parent: 04-binary-tree-diameter
 */
(function() {
    'use strict';

    const problem = {
        name: 'N-ary Tree Diameter',
        difficulty: 'Hard',
        algorithm: 'tree-diameter',
        parent: '04-binary-tree-diameter',
        description: 'Find the diameter of an N-ary tree where each node can have any number of children. In a binary tree, the diameter through a node is leftHeight + rightHeight. In an N-ary tree, you must find the two tallest subtrees among all children to compute the through-path, requiring sorting or tracking top-2 heights.',
        problem: 'In a binary tree, the diameter through a node is leftHeight + rightHeight. In an N-ary tree, you must find the two tallest subtrees among all children to compute the through-path, requiring sorting or tracking top-2 heights.',
        hints: [
            'Consider: Find the diameter of an N-ary tree where each node can have any number of children.',
            'In a binary tree, the diameter through a node is leftHeight + rightHeight.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4, children=[Node(6, children=[Node(7)])])]).'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_diameter(tree):
    """
    N-ary Tree Diameter

    Find the diameter of an N-ary tree where each node can have any number of children. In a binary tree, the diameter through a node is leftHeight + rightHeight. In an N-ary tree, you must find the two tallest subtrees among all children to compute the through-path, requiring sorting or tracking top-2 heights.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(n_ary_tree_diameter({"value": 1, "left": {"value": 3, "left": {"value": 7, "left": {"value": 8}}, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 2}}))  # Expected: 1
print(n_ary_tree_diameter({"value": 1, "left": {"value": 3, "left": {"value": 7, "left": {"value": 8}}, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}, "right": {"value": 2}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// NAryTreeDiameter solves the N-ary Tree Diameter problem.
// Find the diameter of an N-ary tree where each node can have any number of children. In a binary tree, the diameter through a node is leftHeight + rightHeight. In an N-ary tree, you must find the two tallest subtrees among all children to compute the through-path, requiring sorting or tracking top-2 heights.
// Time: O(n), Space: O(n)
func NAryTreeDiameter(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NAryTreeDiameter({"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}})) // Expected: 1
	fmt.Println(NAryTreeDiameter({"value":1,"left":{"value":3,"left":{"value":7,"left":{"value":8}},"right":{"value":4,"right":{"value":5,"right":{"value":6}}}},"right":{"value":2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '04-binary-tree-diameter/twist-01-n-ary-tree-diameter', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/04-binary-tree-diameter/twist-01-n-ary-tree-diameter'] = problem;
})();
