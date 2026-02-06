/**
 * Simplify Expression Tree
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Simplify Expression Tree',
        difficulty: 'Very Hard',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Simplify the expression tree by applying algebraic rules: x*1=x, x*0=0, x+0=x, x-0=x. Return the simplified tree (not a value). Instead of computing a numeric result, you transform the tree structure. Some subtrees collapse into single nodes, others remain unchanged. This requires pattern matching at each node and deciding whether to prune subtrees.',
        problem: 'Instead of computing a numeric result, you transform the tree structure. Some subtrees collapse into single nodes, others remain unchanged. This requires pattern matching at each node and deciding whether to prune subtrees.',
        hints: [
            'Consider: Simplify the expression tree by applying algebraic rules: x*1=x, x*0=0, x+0=x, x-0=x.',
            'Return the simplified tree (not a value).',
            'Key insight: Instead of computing a numeric result, you transform the tree structure.',
            'This requires pattern matching at each node and deciding whether to prune subtrees.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: * at root, + (left: x, right: 0), 1' },
                output: 'See explanation',
                explanation: 'Tree: * at root, + (left: x, right: 0), 1. Simplify x+0 to x, then x*1 to x. Result is a single leaf node x.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def simplify_expression_tree(data):
    """
    Simplify Expression Tree

    Simplify the expression tree by applying algebraic rules: x*1=x, x*0=0, x+0=x, x-0=x.
     Return the simplified tree (not a value).

    Approach: Instead of computing a numeric result, you transform the tree structure

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of computing a numeric result, you transform the tree structure

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Simplify Expression Tree
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: * at root, + (left: x, right: 0), 1
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

// SimplifyExpressionTree solves: Simplify Expression Tree
// Instead of computing a numeric result, you transform the tree structure
// Time: O(n), Space: O(n)
func SimplifyExpressionTree(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Simplify Expression Tree
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
    // Example: Tree: * at root, + (left: x, right: 0), 1
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-05-simplify-expression-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-05-simplify-expression-tree'] = problem;
})();
