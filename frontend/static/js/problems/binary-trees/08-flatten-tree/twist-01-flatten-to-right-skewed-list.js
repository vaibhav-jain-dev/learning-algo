/**
 * Flatten to Right-Skewed List
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten to Right-Skewed List',
        difficulty: 'Medium',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node. The original uses inorder (left-to-right) order with a doubly-linked structure. Preorder requires processing root before children, and the single-direction (right-only) linking means you must handle the left subtree displacement carefully.',
        problem: 'The original uses inorder (left-to-right) order with a doubly-linked structure. Preorder requires processing root before children, and the single-direction (right-only) linking means you must handle the left subtree displacement carefully.',
        hints: [
            'Consider: Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node.',
            'The original uses inorder (left-to-right) order with a doubly-linked structure.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 5, 3, 4, null, 6] flattens to 1 -> 2 -> 3 -> 4 -> 5 -> 6 (all right pointers, all left pointers null).'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 5, 3, 4, null, 6] flattens to 1 -> 2 -> 3 -> 4 -> 5 -> 6 (all right pointers, all left pointers null)' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 5, 3, 4, null, 6] flattens to 1 -> 2 -> 3 -> 4 -> 5 -> 6 (all right pointers, all left pointers null).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def flatten_to_right_skewed_list(data):
    """
    Flatten to Right-Skewed List

    Flatten the binary tree into a right-skewed linked list following preorder traversal order, where every node has no left child and the right pointer points to the next node.

    Approach: The original uses inorder (left-to-right) order with a doubly-linked structure

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The original uses inorder (left-to-right) order with a doubly-linked structure

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Flatten to Right-Skewed List
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 5, 3, 4, null, 6] flattens to 1 -> 2 -> 3 -> 4 -> 5 -> 6 (all right pointers, all left pointers null)
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

// FlattenToRightskewedList solves: Flatten to Right-Skewed List
// The original uses inorder (left-to-right) order with a doubly-linked structure
// Time: O(n), Space: O(n)
func FlattenToRightskewedList(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Flatten to Right-Skewed List
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
    // Example: Tree [1, 2, 5, 3, 4, null, 6] flattens to 1 -> 2 -> 3 -> 4 -> 5 -> 6 (all right pointers, all left pointers null)
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-01-flatten-to-right-skewed-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-01-flatten-to-right-skewed-list'] = problem;
})();
