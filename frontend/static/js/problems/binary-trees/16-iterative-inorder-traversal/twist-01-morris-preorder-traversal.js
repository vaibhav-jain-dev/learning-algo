/**
 * Morris Preorder Traversal
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 16-iterative-inorder-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Morris Preorder Traversal',
        difficulty: 'Hard',
        algorithm: 'tree-iterative',
        parent: '16-iterative-inorder-traversal',
        description: 'Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack). Output nodes in preorder: root, left, right. Morris inorder processes the node when revisiting via the thread. Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.',
        problem: 'Morris inorder processes the node when revisiting via the thread. Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.',
        hints: [
            'Consider: Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack).',
            'Output nodes in preorder: root, left, right.',
            'Key insight: Morris inorder processes the node when revisiting via the thread.',
            'Morris preorder processes the node when first visiting it (before creating the thread), changing when you add to the result relative to the threading logic.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [4, 2, 6, 1, 3, 5, 7]' },
                output: 'See explanation',
                explanation: 'Tree [4, 2, 6, 1, 3, 5, 7]. Preorder: [4, 2, 1, 3, 6, 5, 7]. The node is processed on first visit, not when the inorder predecessor thread is found.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def morris_preorder_traversal(data):
    """
    Morris Preorder Traversal

    Implement preorder traversal using Morris traversal (O(1) space, no recursion, no stack).
     Output nodes in preorder: root, left, right.

    Approach: Morris inorder processes the node when revisiting via the thread

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Morris inorder processes the node when revisiting via the thread

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Morris Preorder Traversal
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [4, 2, 6, 1, 3, 5, 7]
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

// MorrisPreorderTraversal solves: Morris Preorder Traversal
// Morris inorder processes the node when revisiting via the thread
// Time: O(n), Space: O(n)
func MorrisPreorderTraversal(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Morris Preorder Traversal
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
    // Example: Tree [4, 2, 6, 1, 3, 5, 7]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '16-iterative-inorder-traversal/twist-01-morris-preorder-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/16-iterative-inorder-traversal/twist-01-morris-preorder-traversal'] = problem;
})();
