/**
 * Streaming Branch Sums
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 01-branch-sums
 */
(function() {
    'use strict';
    const problem = {
        name: 'Streaming Branch Sums',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'Nodes are added to the tree one at a time via an insert stream. After each insertion, output the current list of branch sums without re-traversing the entire tree. Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.',
        problem: 'Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.',
        hints: [
            'Consider: Nodes are added to the tree one at a time via an insert stream.',
            'Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Insert 1 (root) => [1].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Insert 1 (root) => [1]' },
                output: 'See explanation',
                explanation: 'Insert 1 (root) => [1]. Insert 2 (left of 1) => [3]. Insert 3 (right of 1) => [3, 4].'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def streaming_branch_sums(data):
    """
    Streaming Branch Sums

    Nodes are added to the tree one at a time via an insert stream.
     After each insertion, output the current list of branch sums without re-traversing the entire tree.

    Approach: Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Streaming Branch Sums
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Insert 1 (root) => [1]
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

// StreamingBranchSums solves: Streaming Branch Sums
// Instead of a one-shot traversal, you need to maintain state about existing branch sums and efficiently update them when a leaf gains a child or a new leaf appears
// Time: O(n), Space: O(n)
func StreamingBranchSums(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Streaming Branch Sums
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
    // Example: Insert 1 (root) => [1]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/twist-03-streaming-branch-sums', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/twist-03-streaming-branch-sums'] = problem;
})();
