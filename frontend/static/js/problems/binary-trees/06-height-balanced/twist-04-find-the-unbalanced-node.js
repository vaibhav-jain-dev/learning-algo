/**
 * Find the Unbalanced Node
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';
    const problem = {
        name: 'Find the Unbalanced Node',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated. Return null if the tree is balanced. Changes from a boolean check to finding a specific node. You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.',
        problem: 'Changes from a boolean check to finding a specific node. You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.',
        hints: [
            'Consider: Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated.',
            'Return null if the tree is balanced.',
            'Key insight: Changes from a boolean check to finding a specific node.',
            'You must continue traversal even after finding an imbalance to find the deepest one, rather than returning early.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Unbalanced tree: 1->2->4->6, 1->3' },
                output: 'See explanation',
                explanation: 'Unbalanced tree: 1->2->4->6, 1->3. Node 2 (heights 2 vs 0) and node 1 (heights 3 vs 1) are both unbalanced. Deepest is node 2.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def find_the_unbalanced_node(data):
    """
    Find the Unbalanced Node

    Instead of returning true/false, return the deepest node in the tree where the height-balanced property is violated.
     Return null if the tree is balanced.

    Approach: Changes from a boolean check to finding a specific node

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Changes from a boolean check to finding a specific node

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Find the Unbalanced Node
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Unbalanced tree: 1->2->4->6, 1->3
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

// FindTheUnbalancedNode solves: Find the Unbalanced Node
// Changes from a boolean check to finding a specific node
// Time: O(n), Space: O(n)
func FindTheUnbalancedNode(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Find the Unbalanced Node
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
    // Example: Unbalanced tree: 1->2->4->6, 1->3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-04-find-the-unbalanced-node', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-04-find-the-unbalanced-node'] = problem;
})();
