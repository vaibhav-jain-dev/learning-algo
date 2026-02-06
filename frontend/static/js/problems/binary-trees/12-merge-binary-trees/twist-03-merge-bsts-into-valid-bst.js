/**
 * Merge BSTs into Valid BST
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge BSTs into Valid BST',
        difficulty: 'Hard',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Given two BSTs, merge them into a single valid BST (not just overlaying positions). The result must maintain BST ordering. Simple position-based merging does not preserve BST ordering. You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.',
        problem: 'Simple position-based merging does not preserve BST ordering. You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.',
        hints: [
            'Consider: Given two BSTs, merge them into a single valid BST (not just overlaying positions).',
            'The result must maintain BST ordering.',
            'Key insight: Simple position-based merging does not preserve BST ordering.',
            'You must extract all values from both trees, sort them, and build a balanced BST from the merged sorted array, which is a completely different approach.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'BST1 [3, 1, 5], BST2 [4, 2, 6]' },
                output: 'See explanation',
                explanation: 'BST1 [3, 1, 5], BST2 [4, 2, 6]. Position-merge would give [7, 3, 11] which is not a valid BST. Correct merge: sorted values [1,2,3,4,5,6], build balanced BST [3, 1, 5, null, 2, 4, 6].'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def merge_bsts_into_valid_bst(data):
    """
    Merge BSTs into Valid BST

    Given two BSTs, merge them into a single valid BST (not just overlaying positions).
     The result must maintain BST ordering.

    Approach: Simple position-based merging does not preserve BST ordering

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Simple position-based merging does not preserve BST ordering

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Merge BSTs into Valid BST
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: BST1 [3, 1, 5], BST2 [4, 2, 6]
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

// MergeBstsIntoValidBst solves: Merge BSTs into Valid BST
// Simple position-based merging does not preserve BST ordering
// Time: O(n), Space: O(n)
func MergeBstsIntoValidBst(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Merge BSTs into Valid BST
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
    // Example: BST1 [3, 1, 5], BST2 [4, 2, 6]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-03-merge-bsts-into-valid-bst', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-03-merge-bsts-into-valid-bst'] = problem;
})();
