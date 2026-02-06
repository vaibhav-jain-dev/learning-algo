/**
 * Merge Three Binary Trees
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge Three Binary Trees',
        difficulty: 'Medium',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Merge three binary trees by summing corresponding node values. If a position exists in any tree, include it in the result. With two trees, you have 2^2 - 1 = 3 cases per node (both exist, only left, only right). With three trees, you have 2^3 - 1 = 7 cases, significantly increasing the conditional logic at each step.',
        problem: 'With two trees, you have 2^2 - 1 = 3 cases per node (both exist, only left, only right). With three trees, you have 2^3 - 1 = 7 cases, significantly increasing the conditional logic at each step.',
        hints: [
            'Consider: Merge three binary trees by summing corresponding node values.',
            'If a position exists in any tree, include it in the result.',
            'Key insight: With two trees, you have 2^2 - 1 = 3 cases per node (both exist, only left, only right).',
            'With three trees, you have 2^3 - 1 = 7 cases, significantly increasing the conditional logic at each step.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1 [1, 2], Tree2 [3, null, 4], Tree3 [5, 6, 7]' },
                output: 'See explanation',
                explanation: 'Tree1 [1, 2], Tree2 [3, null, 4], Tree3 [5, 6, 7]. Merged: [9, 8, 11]. Root: 1+3+5=9, Left: 2+0+6=8, Right: 0+4+7=11.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def merge_three_binary_trees(data):
    """
    Merge Three Binary Trees

    Merge three binary trees by summing corresponding node values.
     If a position exists in any tree, include it in the result.

    Approach: With two trees, you have 2^2 - 1 = 3 cases per node (both exist, only left, only right)

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: With two trees, you have 2^2 - 1 = 3 cases per node (both exist, only left, only right)

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Merge Three Binary Trees
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1 [1, 2], Tree2 [3, null, 4], Tree3 [5, 6, 7]
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

// MergeThreeBinaryTrees solves: Merge Three Binary Trees
// With two trees, you have 2^2 - 1 = 3 cases per node (both exist, only left, only right)
// Time: O(n), Space: O(n)
func MergeThreeBinaryTrees(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Merge Three Binary Trees
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
    // Example: Tree1 [1, 2], Tree2 [3, null, 4], Tree3 [5, 6, 7]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-02-merge-three-binary-trees', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-02-merge-three-binary-trees'] = problem;
})();
