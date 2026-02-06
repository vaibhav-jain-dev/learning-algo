/**
 * Build Expression Tree from Postfix
 * Category: binary-trees
 * Difficulty: Hard
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
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Postfix: ["2", "3", "*", "4", "5", "-", "+"]' },
                output: 'See explanation',
                explanation: 'Postfix: ["2", "3", "*", "4", "5", "-", "+"]. Build tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def build_expression_tree_from_postfix(data):
    """
    Build Expression Tree from Postfix

    Given a postfix (reverse Polish notation) expression as an array of tokens, build the corresponding expression tree.

    Approach: This is the inverse problem: construction instead of evaluation

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: This is the inverse problem: construction instead of evaluation

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Build Expression Tree from Postfix
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Postfix: ["2", "3", "*", "4", "5", "-", "+"]
    print("See problem description for test cases")`,
            go: `package main

import "fmt"

// TreeNode represents a node in the binary tree
type TreeNode struct {
    Value int
    Left  *TreeNode
    Right *TreeNode
}

func buildTree(data map[string]interface{}) *TreeNode {
    if data == nil {
        return nil
    }
    node := &TreeNode{Value: int(data["value"].(float64))}
    if left, ok := data["left"].(map[string]interface{}); ok {
        node.Left = buildTree(left)
    }
    if right, ok := data["right"].(map[string]interface{}); ok {
        node.Right = buildTree(right)
    }
    return node
}

// BuildExpressionTreeFromPostfix solves: Build Expression Tree from Postfix
// This is the inverse problem: construction instead of evaluation
// Time: O(n), Space: O(n)
func BuildExpressionTreeFromPostfix(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Build Expression Tree from Postfix
    var solve func(node *TreeNode) interface{}
    solve = func(node *TreeNode) interface{} {
        if node == nil {
            return nil
        }

        solve(node.Left)
        solve(node.Right)

        return nil
    }

    return solve(root)
}

func main() {
    // Example: Postfix: [2, 3, *, 4, 5, -, +]
    fmt.Println("See problem description for test cases")
}`
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
