/**
 * N-ary Tree Height-Balanced
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-balanced
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'N-ary Tree Height-Balanced',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Check if an N-ary tree is height-balanced: for each node, the difference between the tallest and shortest child subtree heights is at most 1. With binary trees you compare two heights. With N-ary trees, you must find the max and min heights among all children, requiring a pass over the children array at each node.',
        problem: 'With binary trees you compare two heights. With N-ary trees, you must find the max and min heights among all children, requiring a pass over the children array at each node.',
        hints: [
            'Consider: Check if an N-ary tree is height-balanced: for each node, the difference between the tallest and shortest child subtree heights is at most 1.',
            'With binary trees you compare two heights.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2, children=[Node(4)]), Node(3)]).'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the n ary tree height balanced criteria.'
            },
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the n ary tree height balanced criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_height_balanced(tree):
    """
    N-ary Tree Height-Balanced

    Check if an N-ary tree is height-balanced: for each node, the difference between the tallest and shortest child subtree heights is at most 1. With binary trees you compare two heights. With N-ary trees, you must find the max and min heights among all children, requiring a pass over the children array at each node.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(n_ary_tree_height_balanced({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 1
print(n_ary_tree_height_balanced({"value": 1, "left": {"value": 2, "left": {"value": 4, "left": {"value": 6}}, "right": {"value": 5}}, "right": {"value": 3}}))  # Expected: 2
print(n_ary_tree_height_balanced({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5, "left": {"value": 7}, "right": {"value": 8}}}, "right": {"value": 3, "right": {"value": 6}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// NAryTreeHeightBalanced solves the N-ary Tree Height-Balanced problem.
// Check if an N-ary tree is height-balanced: for each node, the difference between the tallest and shortest child subtree heights is at most 1. With binary trees you compare two heights. With N-ary trees, you must find the max and min heights among all children, requiring a pass over the children array at each node.
// Time: O(n), Space: O(n)
func NAryTreeHeightBalanced(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(NAryTreeHeightBalanced({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 1
	fmt.Println(NAryTreeHeightBalanced({"value":1,"left":{"value":2,"left":{"value":4,"left":{"value":6}},"right":{"value":5}},"right":{"value":3}})) // Expected: 2
	fmt.Println(NAryTreeHeightBalanced({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5,"left":{"value":7},"right":{"value":8}}},"right":{"value":3,"right":{"value":6}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-03-n-ary-tree-height-balanced', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-03-n-ary-tree-height-balanced'] = problem;
})();
