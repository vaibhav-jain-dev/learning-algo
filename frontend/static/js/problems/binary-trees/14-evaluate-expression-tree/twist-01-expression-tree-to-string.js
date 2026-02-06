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
                explanation: 'For this input, there is 1 valid position that satisfy the expression tree to string criteria.'
            },
            {
                input: {"tree":{"value":-1,"left":{"value":5},"right":{"value":7}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the expression tree to string criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
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
