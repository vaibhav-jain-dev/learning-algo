/**
 * Iterative Inorder with Stack
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-iterative
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Inorder with Stack',
        difficulty: 'Medium',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'Implement inorder traversal iteratively using an explicit stack (O(h) space). Compare the approach with Morris traversal. The stack-based approach is more intuitive: push all left children, pop and process, then move to right child. It uses O(h) space but does not modify the tree, trading space for simplicity and safety.',
        problem: 'The stack-based approach is more intuitive: push all left children, pop and process, then move to right child. It uses O(h) space but does not modify the tree, trading space for simplicity and safety.',
        hints: [
            'Consider: Implement inorder traversal iteratively using an explicit stack (O(h) space).',
            'Compare the approach with Morris traversal.',
            'Key insight: The stack-based approach is more intuitive: push all left children, pop and process, then move to right child.',
            'It uses O(h) space but does not modify the tree, trading space for simplicity and safety.'
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
                explanation: 'The iterative inorder with stack for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2,"left":{"value":3}}}},
                output: [0,1],
                explanation: 'The iterative inorder with stack for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_inorder_with_stack(tree):
    """
    Iterative Inorder with Stack

    Implement inorder traversal iteratively using an explicit stack (O(h) space). Compare the approach with Morris traversal. The stack-based approach is more intuitive: push all left children, pop and process, then move to right child. It uses O(h) space but does not modify the tree, trading space for simplicity and safety.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(iterative_inorder_with_stack({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: [0]
print(iterative_inorder_with_stack({"value": 1, "right": {"value": 2, "left": {"value": 3}}}))  # Expected: [0,1]
print(iterative_inorder_with_stack({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// IterativeInorderWithStack solves the Iterative Inorder with Stack problem.
// Implement inorder traversal iteratively using an explicit stack (O(h) space). Compare the approach with Morris traversal. The stack-based approach is more intuitive: push all left children, pop and process, then move to right child. It uses O(h) space but does not modify the tree, trading space for simplicity and safety.
// Time: O(n), Space: O(n)
func IterativeInorderWithStack(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(IterativeInorderWithStack({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(IterativeInorderWithStack({"value":1,"right":{"value":2,"left":{"value":3}}})) // Expected: [0,1]
	fmt.Println(IterativeInorderWithStack({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-03-iterative-inorder-with-stack', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-03-iterative-inorder-with-stack'] = problem;
})();
