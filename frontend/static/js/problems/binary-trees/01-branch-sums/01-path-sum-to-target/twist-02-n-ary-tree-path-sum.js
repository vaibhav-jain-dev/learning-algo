/**
 * N-ary Tree Path Sum
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';
    const problem = {
        name: 'N-ary Tree Path Sum',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children. Instead of checking left/right children, you must iterate over a variable-length children array. Leaf detection changes from "no left and no right" to "empty children array".',
        problem: 'Instead of checking left/right children, you must iterate over a variable-length children array. Leaf detection changes from "no left and no right" to "empty children array".',
        hints: [
            'Consider: Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children.',
            'Instead of checking left/right children, you must iterate over a variable-length children array.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2, children=[Node(4)]), Node(6)]), target=7.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Node(1, children=[Node(2, children=[Node(4)]), Node(6)]), target=7' },
                output: 'See explanation',
                explanation: 'Node(1, children=[Node(2, children=[Node(4)]), Node(6)]), target=7. Result: [[1,2,4], [1,6]].'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_path_sum(data):
    """
    N-ary Tree Path Sum

    Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children.

    Approach: Instead of checking left/right children, you must iterate over a variable-length children array

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of checking left/right children, you must iterate over a variable-length children array

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement N-ary Tree Path Sum
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Node(1, children=[Node(2, children=[Node(4)]), Node(6)]), target=7
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

// NaryTreePathSum solves: N-ary Tree Path Sum
// Instead of checking left/right children, you must iterate over a variable-length children array
// Time: O(n), Space: O(n)
func NaryTreePathSum(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement N-ary Tree Path Sum
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
    // Example: Node(1, children=[Node(2, children=[Node(4)]), Node(6)]), target=7
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-02-n-ary-tree-path-sum', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-02-n-ary-tree-path-sum'] = problem;
})();
