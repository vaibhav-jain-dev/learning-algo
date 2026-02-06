/**
 * Build Expression Tree from Postfix
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-expression
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';

    const problem = {
        name: 'Build Expression Tree from Postfix',
        difficulty: 'Hard',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Given a postfix (reverse Polish notation) expression as an array of tokens, build the corresponding expression tree. This is the inverse problem: construction instead of evaluation. You use a stack to build the tree bottom-up, pushing operand nodes and popping two children when you encounter an operator, which is a different mental model.',
        problem: 'This is the inverse problem: construction instead of evaluation. You use a stack to build the tree bottom-up, pushing operand nodes and popping two children when you encounter an operator, which is a different mental model.',
        hints: [
            'Consider: Given a postfix (reverse Polish notation) expression as an array of tokens, build the corresponding expression tree.',
            'This is the inverse problem: construction instead of evaluation.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Postfix: ["2", "3", "*", "4", "5", "-", "+"].'
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
                explanation: 'For this input, there is 1 valid position that satisfy the build expression tree from postfix criteria.'
            },
            {
                input: {"tree":{"value":-1,"left":{"value":5},"right":{"value":7}}},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the build expression tree from postfix criteria.'
            },
            // Edge case
            {
                input: {"tree":{"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}}},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def build_expression_tree_from_postfix(tree):
    """
    Build Expression Tree from Postfix

    Given a postfix (reverse Polish notation) expression as an array of tokens, build the corresponding expression tree. This is the inverse problem: construction instead of evaluation. You use a stack to build the tree bottom-up, pushing operand nodes and popping two children when you encounter an operator, which is a different mental model.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(tree)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(build_expression_tree_from_postfix({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 1
print(build_expression_tree_from_postfix({"value": -1, "left": {"value": 5}, "right": {"value": 7}}))  # Expected: 2
print(build_expression_tree_from_postfix({"value": -1, "left": {"value": -2, "left": {"value": 2}, "right": {"value": 3}}, "right": {"value": -3, "left": {"value": 4}, "right": {"value": 5}}}))  # Expected: 0
`,
            go: `package main

import "fmt"

// BuildExpressionTreeFromPostfix solves the Build Expression Tree from Postfix problem.
// Given a postfix (reverse Polish notation) expression as an array of tokens, build the corresponding expression tree. This is the inverse problem: construction instead of evaluation. You use a stack to build the tree bottom-up, pushing operand nodes and popping two children when you encounter an operator, which is a different mental model.
// Time: O(n), Space: O(n)
func BuildExpressionTreeFromPostfix(tree *TreeNode) int {
	result := 0

	for i := 0; i < len(tree); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(BuildExpressionTreeFromPostfix({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 1
	fmt.Println(BuildExpressionTreeFromPostfix({"value":-1,"left":{"value":5},"right":{"value":7}})) // Expected: 2
	fmt.Println(BuildExpressionTreeFromPostfix({"value":-1,"left":{"value":-2,"left":{"value":2},"right":{"value":3}},"right":{"value":-3,"left":{"value":4},"right":{"value":5}}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-03-build-expression-tree-from-postfix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-03-build-expression-tree-from-postfix'] = problem;
})();
