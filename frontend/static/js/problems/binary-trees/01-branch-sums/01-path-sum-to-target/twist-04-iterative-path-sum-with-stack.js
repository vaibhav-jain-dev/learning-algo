/**
 * Iterative Path Sum with Stack
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Path Sum with Stack',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'Solve the path sum to target problem without recursion, using an explicit stack that tracks the current path and running sum. Backtracking is natural in recursion but must be manually managed with a stack. You need to carefully detect when to pop path elements as you backtrack through the iterative traversal.',
        problem: 'Backtracking is natural in recursion but must be manually managed with a stack. You need to carefully detect when to pop path elements as you backtrack through the iterative traversal.',
        hints: [
            'Consider: Solve the path sum to target problem without recursion, using an explicit stack that tracks the current path and running sum.',
            'Backtracking is natural in recursion but must be manually managed with a stack.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Stack stores (node, currentSum, pathSoFar).'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Stack stores (node, currentSum, pathSoFar)' },
                output: 'See explanation',
                explanation: 'Stack stores (node, currentSum, pathSoFar). When popping, no automatic cleanup happens like in recursion.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_path_sum_with_stack(data):
    """
    Iterative Path Sum with Stack

    Solve the path sum to target problem without recursion, using an explicit stack that tracks the current path and running sum.

    Approach: Backtracking is natural in recursion but must be manually managed with a stack

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Backtracking is natural in recursion but must be manually managed with a stack

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative Path Sum with Stack
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Stack stores (node, currentSum, pathSoFar)
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

// IterativePathSumWithStack solves: Iterative Path Sum with Stack
// Backtracking is natural in recursion but must be manually managed with a stack
// Time: O(n), Space: O(n)
func IterativePathSumWithStack(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative Path Sum with Stack
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
    // Example: Stack stores (node, currentSum, pathSoFar)
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-04-iterative-path-sum-with-stack', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-04-iterative-path-sum-with-stack'] = problem;
})();
