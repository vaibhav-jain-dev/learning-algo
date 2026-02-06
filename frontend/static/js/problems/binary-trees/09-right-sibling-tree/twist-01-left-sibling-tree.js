/**
 * Left Sibling Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Left Sibling Tree',
        difficulty: 'Medium',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Transform the tree so each node\'s left pointer points to its left sibling (the node immediately to its left on the same level) instead of its left child. The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level. The original right pointers must remain, so you lose left children instead of right children.',
        problem: 'The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level. The original right pointers must remain, so you lose left children instead of right children.',
        hints: [
            'Consider: Transform the tree so each node\'s left pointer points to its left sibling (the node immediately to its left on the same level) instead of its left child.',
            'The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3, 4, 5, 6, 7].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, 6, 7]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, 6, 7]. After transform: node 3.left = 2 (sibling), node 5.left = 4 (sibling), node 7.left = 6 (sibling). Node 2.left = null (no left sibling).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def left_sibling_tree(data):
    """
    Left Sibling Tree

    Transform the tree so each node's left pointer points to its left sibling (the node immediately to its left on the same level) instead of its left child.

    Approach: The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Left Sibling Tree
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5, 6, 7]
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

// LeftSiblingTree solves: Left Sibling Tree
// The mirror transformation requires connecting nodes to their left sibling, meaning you process right-to-left at each level
// Time: O(n), Space: O(n)
func LeftSiblingTree(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Left Sibling Tree
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
    // Example: Tree [1, 2, 3, 4, 5, 6, 7]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-01-left-sibling-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-01-left-sibling-tree'] = problem;
})();
