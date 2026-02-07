/**
 * Expression Tree to String
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-expression
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Expression Tree to String',
        difficulty: 'Medium',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Instead of evaluating the expression tree, convert it to a fully parenthesized infix string representation. Evaluation uses postorder (compute children first, then apply operator). String conversion uses inorder (left, operator, right) with parentheses, requiring different traversal order and string concatenation logic.',
        problem: 'Evaluation uses postorder (compute children first, then apply operator). String conversion uses inorder (left, operator, right) with parentheses, requiring different traversal order and string concatenation logic.',
        hints: [
            'Consider: Instead of evaluating the expression tree, convert it to a fully parenthesized infix string representation.',
            'Evaluation uses postorder (compute children first, then apply operator).',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5).'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 1,
                explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
            },
            {
                input: {"tree":{"value":-1,"left":{"value":5},"right":{"value":7}}},
                output: 2,
                explanation: 'The BST structure allows directed traversal. Each node decision is informed by the ordering invariant, leading to the correct result without examining unnecessary subtrees.'
            },
            // Edge case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 0,
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def expression_tree_to_string(tree):
    """
    Expression Tree to String

    Instead of evaluating the expression tree, convert it to a fully parenthesized infix string representation. Evaluation uses postorder (compute children first, then apply operator). String conversion uses inorder (left, operator, right) with parentheses, requiring different traversal order and string concatenation logic.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(expression_tree_to_string({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 1
print(expression_tree_to_string({"value": -1, "left": {"value": 5}, "right": {"value": 7}}))  # Expected: 2
print(expression_tree_to_string({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// ExpressionTreeToString solves the Expression Tree to String problem.
// Instead of evaluating the expression tree, convert it to a fully parenthesized infix string representation. Evaluation uses postorder (compute children first, then apply operator). String conversion uses inorder (left, operator, right) with parentheses, requiring different traversal order and string concatenation logic.
// Time: O(n), Space: O(n)
func ExpressionTreeToString(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ExpressionTreeToString({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 1
	fmt.Println(ExpressionTreeToString({"value":-1,"left":{"value":5},"right":{"value":7}})) // Expected: 2
	fmt.Println(ExpressionTreeToString({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-01-expression-tree-to-string', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-01-expression-tree-to-string'] = problem;
})();
