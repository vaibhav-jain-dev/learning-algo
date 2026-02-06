/**
 * Detect If Already Inverted
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 03-invert-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Detect If Already Inverted',
        difficulty: 'Medium',
        algorithm: 'tree-invert',
        parent: '03-invert-tree',
        description: 'Given two trees, determine if one is the inversion of the other without actually inverting either tree. Instead of modifying the tree, you compare two trees simultaneously. At each node, the left of tree1 must match the right of tree2 and vice versa. This is a comparison, not a transformation.',
        problem: 'Instead of modifying the tree, you compare two trees simultaneously. At each node, the left of tree1 must match the right of tree2 and vice versa. This is a comparison, not a transformation.',
        hints: [
            'Consider: Given two trees, determine if one is the inversion of the other without actually inverting either tree.',
            'Instead of modifying the tree, you compare two trees simultaneously.',
            'Key insight: At each node, the left of tree1 must match the right of tree2 and vice versa.',
            'This is a comparison, not a transformation.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1: 1->2,3' },
                output: 'See explanation',
                explanation: 'Tree1: 1->2,3. Tree2: 1->3,2. Return true (tree2 is the inversion of tree1).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def detect_if_already_inverted(data):
    """
    Detect If Already Inverted

    Given two trees, determine if one is the inversion of the other without actually inverting either tree.

    Approach: Instead of modifying the tree, you compare two trees simultaneously

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of modifying the tree, you compare two trees simultaneously

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Detect If Already Inverted
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1: 1->2,3
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

// DetectIfAlreadyInverted solves: Detect If Already Inverted
// Instead of modifying the tree, you compare two trees simultaneously
// Time: O(n), Space: O(n)
func DetectIfAlreadyInverted(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Detect If Already Inverted
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
    // Example: Tree1: 1->2,3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree/twist-04-detect-if-already-inverted', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree/twist-04-detect-if-already-inverted'] = problem;
})();
