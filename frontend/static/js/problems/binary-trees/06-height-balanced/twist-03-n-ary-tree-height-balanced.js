/**
 * N-ary Tree Height-Balanced
 * Category: binary-trees
 * Difficulty: Medium
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
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Node(1, children=[Node(2, children=[Node(4)]), Node(3)])' },
                output: 'See explanation',
                explanation: 'Node(1, children=[Node(2, children=[Node(4)]), Node(3)]). Heights: [2, 1]. Diff=1, balanced.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_height_balanced(data):
    """
    N-ary Tree Height-Balanced

    Check if an N-ary tree is height-balanced: for each node, the difference between the tallest and shortest child subtree heights is at most 1.

    Approach: With binary trees you compare two heights

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: With binary trees you compare two heights

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement N-ary Tree Height-Balanced
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Node(1, children=[Node(2, children=[Node(4)]), Node(3)])
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

// NaryTreeHeightbalanced solves: N-ary Tree Height-Balanced
// With binary trees you compare two heights
// Time: O(n), Space: O(n)
func NaryTreeHeightbalanced(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement N-ary Tree Height-Balanced
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
    // Example: Node(1, children=[Node(2, children=[Node(4)]), Node(3)])
    fmt.Println("See problem description for test cases")
}`
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
