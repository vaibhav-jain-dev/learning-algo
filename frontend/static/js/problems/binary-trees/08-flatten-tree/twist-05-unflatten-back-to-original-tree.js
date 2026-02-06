/**
 * Unflatten Back to Original Tree
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Unflatten Back to Original Tree',
        difficulty: 'Very Hard',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Given a flattened doubly linked list and the original tree structure (as a separate shape descriptor), reconstruct the original binary tree. This is the inverse operation. You must map a linear sequence back to a tree structure, which requires knowing the original shape. Without the shape, reconstruction is impossible, highlighting why flattening loses structural information.',
        problem: 'This is the inverse operation. You must map a linear sequence back to a tree structure, which requires knowing the original shape. Without the shape, reconstruction is impossible, highlighting why flattening loses structural information.',
        hints: [
            'Consider: Given a flattened doubly linked list and the original tree structure (as a separate shape descriptor), reconstruct the original binary tree.',
            'This is the inverse operation.',
            'Key insight: You must map a linear sequence back to a tree structure, which requires knowing the original shape.',
            'Without the shape, reconstruction is impossible, highlighting why flattening loses structural information.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Linked list: 1 <-> 2 <-> 3 <-> 4 <-> 5' },
                output: 'See explanation',
                explanation: 'Linked list: 1 <-> 2 <-> 3 <-> 4 <-> 5. Shape: root has left subtree of size 2 and right subtree of size 2. Reconstructed: [3, 1, 4, null, 2, null, 5].'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def unflatten_back_to_original_tree(data):
    """
    Unflatten Back to Original Tree

    Given a flattened doubly linked list and the original tree structure (as a separate shape descriptor), reconstruct the original binary tree.

    Approach: This is the inverse operation

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: This is the inverse operation

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Unflatten Back to Original Tree
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Linked list: 1 <-> 2 <-> 3 <-> 4 <-> 5
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

// UnflattenBackToOriginalTree solves: Unflatten Back to Original Tree
// This is the inverse operation
// Time: O(n), Space: O(n)
func UnflattenBackToOriginalTree(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Unflatten Back to Original Tree
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
    // Example: Linked list: 1 <-> 2 <-> 3 <-> 4 <-> 5
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-05-unflatten-back-to-original-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-05-unflatten-back-to-original-tree'] = problem;
})();
