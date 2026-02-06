/**
 * Preorder Successor
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 05-find-successor
 */
(function() {
    'use strict';
    const problem = {
        name: 'Preorder Successor',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        parent: '05-find-successor',
        description: 'Find the preorder successor instead of the in-order successor. Preorder visits: node, left, right. Preorder successor logic is different: if the node has a left child, successor is the left child. If it has only a right child, successor is the right child. If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.',
        problem: 'Preorder successor logic is different: if the node has a left child, successor is the left child. If it has only a right child, successor is the right child. If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.',
        hints: [
            'Consider: Find the preorder successor instead of the in-order successor.',
            'Preorder visits: node, left, right.',
            'Key insight: Preorder successor logic is different: if the node has a left child, successor is the left child.',
            'If it is a leaf, walk up to find the first ancestor whose right subtree has not been visited.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Preorder: 1,2,4,6,5,3' },
                output: 'See explanation',
                explanation: 'Preorder: 1,2,4,6,5,3. Preorder successor of 6 is 5. Preorder successor of 5 is 3.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def preorder_successor(data):
    """
    Preorder Successor

    Find the preorder successor instead of the in-order successor.
     Preorder visits: node, left, right.

    Approach: Preorder successor logic is different: if the node has a left child, successor is the left child

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Preorder successor logic is different: if the node has a left child, successor is the left child

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Preorder Successor
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Preorder: 1,2,4,6,5,3
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

// PreorderSuccessor solves: Preorder Successor
// Preorder successor logic is different: if the node has a left child, successor is the left child
// Time: O(n), Space: O(n)
func PreorderSuccessor(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Preorder Successor
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
    // Example: Preorder: 1,2,4,6,5,3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor/twist-04-preorder-successor', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor/twist-04-preorder-successor'] = problem;
})();
