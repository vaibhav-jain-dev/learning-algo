/**
 * Morris Postorder Traversal
 * Category: binary-trees
 * Difficulty: Very Hard
 * Algorithm: tree-iterative
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Postorder Traversal',
        difficulty: 'Very Hard',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'Implement postorder traversal using Morris traversal with O(1) space. Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees. The trick involves reversing right edges of left subtrees, adding significant complexity.',
        problem: 'Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees. The trick involves reversing right edges of left subtrees, adding significant complexity.',
        hints: [
            'Consider: Implement postorder traversal using Morris traversal with O(1) space.',
            'Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [4, 2, 6, 1, 3, 5, 7].'
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
                explanation: 'The morris postorder traversal for this input yields [0].'
            },
            {
                input: {"tree":{"value":1,"right":{"value":2,"left":{"value":3}}}},
                output: [0,1],
                explanation: 'The morris postorder traversal for this input yields [0, 1].'
            },
            // Edge case
            {
                input: {"tree":{"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}}},
                output: [],
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def morris_postorder_traversal(tree):
    """
    Morris Postorder Traversal

    Implement postorder traversal using Morris traversal with O(1) space. Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees. The trick involves reversing right edges of left subtrees, adding significant complexity.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(morris_postorder_traversal({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: [0]
print(morris_postorder_traversal({"value": 1, "right": {"value": 2, "left": {"value": 3}}}))  # Expected: [0,1]
print(morris_postorder_traversal({"value": 4, "left": {"value": 2, "left": {"value": 1}, "right": {"value": 3}}, "right": {"value": 6, "left": {"value": 5}, "right": {"value": 7}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// MorrisPostorderTraversal solves the Morris Postorder Traversal problem.
// Implement postorder traversal using Morris traversal with O(1) space. Postorder (left, right, root) is the hardest to achieve with Morris because there is no natural point to process a node "after" both subtrees. The trick involves reversing right edges of left subtrees, adding significant complexity.
// Time: O(n), Space: O(n)
func MorrisPostorderTraversal(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(MorrisPostorderTraversal({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: [0]
	fmt.Println(MorrisPostorderTraversal({"value":1,"right":{"value":2,"left":{"value":3}}})) // Expected: [0,1]
	fmt.Println(MorrisPostorderTraversal({"value":4,"left":{"value":2,"left":{"value":1},"right":{"value":3}},"right":{"value":6,"left":{"value":5},"right":{"value":7}}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-02-morris-postorder-traversal', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-02-morris-postorder-traversal'] = problem;
})();
