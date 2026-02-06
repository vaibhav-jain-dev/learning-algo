/**
 * Iterative Balance Check
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Balance Check',
        difficulty: 'Medium',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Determine if the tree is height-balanced without using recursion. Use iterative postorder traversal. Recursion naturally returns height bottom-up. Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.',
        problem: 'Recursion naturally returns height bottom-up. Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.',
        hints: [
            'Consider: Determine if the tree is height-balanced without using recursion.',
            'Use iterative postorder traversal.',
            'Key insight: Recursion naturally returns height bottom-up.',
            'Iteratively, you must use a stack for postorder traversal and a hash map to store computed heights, checking the balance condition when processing each node.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Process leaves first (height 0), store in map' },
                output: 'See explanation',
                explanation: 'Process leaves first (height 0), store in map. When processing parent, look up children heights in map.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_balance_check(data):
    """
    Iterative Balance Check

    Determine if the tree is height-balanced without using recursion.
     Use iterative postorder traversal.

    Approach: Recursion naturally returns height bottom-up

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Recursion naturally returns height bottom-up

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative Balance Check
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Process leaves first (height 0), store in map
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

// IterativeBalanceCheck solves: Iterative Balance Check
// Recursion naturally returns height bottom-up
// Time: O(n), Space: O(n)
func IterativeBalanceCheck(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative Balance Check
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
    // Example: Process leaves first (height 0), store in map
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-02-iterative-balance-check', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-02-iterative-balance-check'] = problem;
})();
