/**
 * Expression Tree to String
 * Category: binary-trees
 * Difficulty: Medium
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
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5)' },
                output: 'See explanation',
                explanation: 'Tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5). Output: "((2 * 3) + (4 - 5))" = "((2*3)+(4-5))".'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def expression_tree_to_string(data):
    """
    Expression Tree to String

    Instead of evaluating the expression tree, convert it to a fully parenthesized infix string representation.

    Approach: Evaluation uses postorder (compute children first, then apply operator)

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Evaluation uses postorder (compute children first, then apply operator)

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Expression Tree to String
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5)
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

// ExpressionTreeToString solves: Expression Tree to String
// Evaluation uses postorder (compute children first, then apply operator)
// Time: O(n), Space: O(n)
func ExpressionTreeToString(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Expression Tree to String
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
    // Example: Tree: + at root, * (left: 2, right: 3), - (left: 4, right: 5)
    fmt.Println("See problem description for test cases")
}`
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
