/**
 * Minimum Depth with Early Termination DFS
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Minimum Depth with Early Termination DFS',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree. Standard DFS explores all nodes. By passing the current best minimum as a parameter, you can prune entire subtrees, improving average-case performance though worst-case remains O(n).',
        problem: 'Standard DFS explores all nodes. By passing the current best minimum as a parameter, you can prune entire subtrees, improving average-case performance though worst-case remains O(n).',
        hints: [
            'Consider: Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree.',
            'Standard DFS explores all nodes.',
            'Think about how the base case differs from the original problem.',
            'Review the example: If left subtree leaf at depth 2, skip right subtree branches deeper than depth 2.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'If left subtree leaf at depth 2, skip right subtree branches deeper than depth 2' },
                output: 'See explanation',
                explanation: 'If left subtree leaf at depth 2, skip right subtree branches deeper than depth 2.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def minimum_depth_with_early_termination_dfs(data):
    """
    Minimum Depth with Early Termination DFS

    Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree.

    Approach: Standard DFS explores all nodes

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Standard DFS explores all nodes

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Minimum Depth with Early Termination DFS
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: If left subtree leaf at depth 2, skip right subtree branches deeper than depth 2
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

// MinimumDepthWithEarlyTerminationDfs solves: Minimum Depth with Early Termination DFS
// Standard DFS explores all nodes
// Time: O(n), Space: O(n)
func MinimumDepthWithEarlyTerminationDfs(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Minimum Depth with Early Termination DFS
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
    // Example: If left subtree leaf at depth 2, skip right subtree branches deeper than depth 2
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-04-minimum-depth-with-early-termination-dfs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-04-minimum-depth-with-early-termination-dfs'] = problem;
})();
