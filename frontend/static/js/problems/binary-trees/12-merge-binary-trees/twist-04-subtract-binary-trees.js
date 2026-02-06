/**
 * Subtract Binary Trees
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';
    const problem = {
        name: 'Subtract Binary Trees',
        difficulty: 'Easy',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Instead of adding corresponding values, subtract tree2 from tree1. If a node exists only in tree2, negate its value. Subtraction is not commutative, so the order of operands matters. When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.',
        problem: 'Subtraction is not commutative, so the order of operands matters. When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.',
        hints: [
            'Consider: Instead of adding corresponding values, subtract tree2 from tree1.',
            'If a node exists only in tree2, negate its value.',
            'Key insight: Subtraction is not commutative, so the order of operands matters.',
            'When only tree2 has a node, you must negate it (not just copy), and this asymmetry tests careful handling of the one-tree-present cases.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1 [5, 3, 8], Tree2 [2, 4, null, 1]' },
                output: 'See explanation',
                explanation: 'Tree1 [5, 3, 8], Tree2 [2, 4, null, 1]. Subtracted: [3, -1, 8, -1]. Node values: 5-2=3, 3-4=-1, 8-0=8, 0-1=-1.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def subtract_binary_trees(data):
    """
    Subtract Binary Trees

    Instead of adding corresponding values, subtract tree2 from tree1.
     If a node exists only in tree2, negate its value.

    Approach: Subtraction is not commutative, so the order of operands matters

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Subtraction is not commutative, so the order of operands matters

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Subtract Binary Trees
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1 [5, 3, 8], Tree2 [2, 4, null, 1]
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

// SubtractBinaryTrees solves: Subtract Binary Trees
// Subtraction is not commutative, so the order of operands matters
// Time: O(n), Space: O(n)
func SubtractBinaryTrees(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Subtract Binary Trees
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
    // Example: Tree1 [5, 3, 8], Tree2 [2, 4, null, 1]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-04-subtract-binary-trees', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-04-subtract-binary-trees'] = problem;
})();
