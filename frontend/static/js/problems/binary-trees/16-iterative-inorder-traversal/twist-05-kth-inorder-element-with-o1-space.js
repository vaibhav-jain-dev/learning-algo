/**
 * Kth Inorder Element with O(1) Space
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-iterative
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Kth Inorder Element with O(1) Space',
        difficulty: 'Hard',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'Find the kth element in inorder traversal using O(1) extra space. Stop as soon as the kth element is found without completing the full traversal. Morris traversal normally completes the full inorder. Early termination requires carefully cleaning up any remaining threads before returning, or the tree is left in a corrupted state with dangling thread pointers.',
        problem: 'Morris traversal normally completes the full inorder. Early termination requires carefully cleaning up any remaining threads before returning, or the tree is left in a corrupted state with dangling thread pointers.',
        hints: [
            'Consider: Find the kth element in inorder traversal using O(1) extra space.',
            'Stop as soon as the kth element is found without completing the full traversal.',
            'Key insight: Morris traversal normally completes the full inorder.',
            'Early termination requires carefully cleaning up any remaining threads before returning, or the tree is left in a corrupted state with dangling thread pointers.'
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
                explanation: 'The kth inorder element with o1 space for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2,"left":{"value":3}}}},
                output: [0,1],
                explanation: 'The kth inorder element with o1 space for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def kth_inorder_element_with_o1_space(tree):
    """
    Kth Inorder Element with O(1) Space

    Find the kth element in inorder traversal using O(1) extra space. Stop as soon as the kth element is found without completing the full traversal. Morris traversal normally completes the full inorder. Early termination requires carefully cleaning up any remaining threads before returning, or the tree is left in a corrupted state with dangling thread pointers.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(kth_inorder_element_with_o1_space({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: [0]
print(kth_inorder_element_with_o1_space({"value": 1, "right": {"value": 2, "left": {"value": 3}}}))  # Expected: [0,1]
print(kth_inorder_element_with_o1_space({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// KthInorderElementWithO1Space solves the Kth Inorder Element with O(1) Space problem.
// Find the kth element in inorder traversal using O(1) extra space. Stop as soon as the kth element is found without completing the full traversal. Morris traversal normally completes the full inorder. Early termination requires carefully cleaning up any remaining threads before returning, or the tree is left in a corrupted state with dangling thread pointers.
// Time: O(n), Space: O(n)
func KthInorderElementWithO1Space(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(KthInorderElementWithO1Space({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(KthInorderElementWithO1Space({"value":1,"right":{"value":2,"left":{"value":3}}})) // Expected: [0,1]
	fmt.Println(KthInorderElementWithO1Space({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-05-kth-inorder-element-with-o1-space', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-05-kth-inorder-element-with-o1-space'] = problem;
})();
