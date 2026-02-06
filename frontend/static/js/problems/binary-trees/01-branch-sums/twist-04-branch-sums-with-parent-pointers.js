/**
 * Branch Sums with Parent Pointers
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 01-branch-sums
 */
(function() {
    'use strict';
    const problem = {
        name: 'Branch Sums with Parent Pointers',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'Each node has a parent pointer. Given any leaf node, compute its branch sum by walking up to the root instead of down from the root. Reverses the direction of thinking: instead of top-down DFS passing sums down, you walk bottom-up from each leaf accumulating values toward the root.',
        problem: 'Reverses the direction of thinking: instead of top-down DFS passing sums down, you walk bottom-up from each leaf accumulating values toward the root.',
        hints: [
            'Consider: Each node has a parent pointer.',
            'Reverses the direction of thinking: instead of top-down DFS passing sums down, you walk bottom-up from each leaf accumulating values toward the root.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Given leaf node with value 8, walk up: 8->4->2->1, branch sum = 15.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Given leaf node with value 8, walk up: 8->4->2->1, branch sum = 15' },
                output: 'See explanation',
                explanation: 'Given leaf node with value 8, walk up: 8->4->2->1, branch sum = 15.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def branch_sums_with_parent_pointers(data):
    """
    Branch Sums with Parent Pointers

    Each node has a parent pointer.
     Given any leaf node, compute its branch sum by walking up to the root instead of down from the root.

    Approach: Reverses the direction of thinking: instead of top-down DFS passing sums down, you walk bottom-up from each leaf accumulating values toward the root

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Reverses the direction of thinking: instead of top-down DFS passing sums down, you walk bottom-up from each leaf accumulating values toward the root

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Branch Sums with Parent Pointers
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Given leaf node with value 8, walk up: 8->4->2->1, branch sum = 15
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

// BranchSumsWithParentPointers solves: Branch Sums with Parent Pointers
// Reverses the direction of thinking: instead of top-down DFS passing sums down, you walk bottom-up from each leaf accumulating values toward the root
// Time: O(n), Space: O(n)
func BranchSumsWithParentPointers(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Branch Sums with Parent Pointers
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
    // Example: Given leaf node with value 8, walk up: 8->4->2->1, branch sum = 15
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/twist-04-branch-sums-with-parent-pointers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/twist-04-branch-sums-with-parent-pointers'] = problem;
})();
