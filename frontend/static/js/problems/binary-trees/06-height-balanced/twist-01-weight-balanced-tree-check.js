/**
 * Weight-Balanced Tree Check
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';
    const problem = {
        name: 'Weight-Balanced Tree Check',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1. Height-balanced compares subtree heights. Weight-balanced compares subtree node counts. The recursive return value changes from height to count, and the balance condition applies to counts instead.',
        problem: 'Height-balanced compares subtree heights. Weight-balanced compares subtree node counts. The recursive return value changes from height to count, and the balance condition applies to counts instead.',
        hints: [
            'Consider: Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1.',
            'Height-balanced compares subtree heights.',
            'Key insight: Weight-balanced compares subtree node counts.',
            'The recursive return value changes from height to count, and the balance condition applies to counts instead.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2->4, 1->3' },
                output: 'See explanation',
                explanation: 'Tree: 1->2->4, 1->3. Left subtree has 2 nodes, right has 1. Difference is 1, so weight-balanced.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def weight_balanced_tree_check(data):
    """
    Weight-Balanced Tree Check

    Instead of height-balanced, check if the tree is weight-balanced: for each node, the number of nodes in the left subtree and right subtree differ by at most 1.

    Approach: Height-balanced compares subtree heights

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Height-balanced compares subtree heights

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Weight-Balanced Tree Check
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->2->4, 1->3
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

// WeightbalancedTreeCheck solves: Weight-Balanced Tree Check
// Height-balanced compares subtree heights
// Time: O(n), Space: O(n)
func WeightbalancedTreeCheck(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Weight-Balanced Tree Check
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
    // Example: Tree: 1->2->4, 1->3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-01-weight-balanced-tree-check', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-01-weight-balanced-tree-check'] = problem;
})();
