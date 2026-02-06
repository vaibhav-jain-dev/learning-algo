/**
 * Iterative Branch Sums
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Branch Sums',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'Compute branch sums without recursion, using an explicit stack. Maintain left-to-right ordering of results. Recursion naturally passes the running sum down the call stack. Iteratively, you must pair each node with its accumulated sum on the stack, and push right before left to maintain order.',
        problem: 'Recursion naturally passes the running sum down the call stack. Iteratively, you must pair each node with its accumulated sum on the stack, and push right before left to maintain order.',
        hints: [
            'Consider: Compute branch sums without recursion, using an explicit stack.',
            'Maintain left-to-right ordering of results.',
            'Key insight: Recursion naturally passes the running sum down the call stack.',
            'Iteratively, you must pair each node with its accumulated sum on the stack, and push right before left to maintain order.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Same tree as base problem, but solved with a stack of (node, runningSum) pairs' },
                output: 'See explanation',
                explanation: 'Same tree as base problem, but solved with a stack of (node, runningSum) pairs.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_branch_sums(data):
    """
    Iterative Branch Sums

    Compute branch sums without recursion, using an explicit stack.
     Maintain left-to-right ordering of results.

    Approach: Recursion naturally passes the running sum down the call stack

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Recursion naturally passes the running sum down the call stack

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative Branch Sums
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Same tree as base problem, but solved with a stack of (node, runningSum) pairs
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

// IterativeBranchSums solves: Iterative Branch Sums
// Recursion naturally passes the running sum down the call stack
// Time: O(n), Space: O(n)
func IterativeBranchSums(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative Branch Sums
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
    // Example: Same tree as base problem, but solved with a stack of (node, runningSum) pairs
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/twist-02-iterative-branch-sums', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/twist-02-iterative-branch-sums'] = problem;
})();
