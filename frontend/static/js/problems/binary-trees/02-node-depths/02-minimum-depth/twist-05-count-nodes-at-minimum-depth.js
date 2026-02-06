/**
 * Count Nodes at Minimum Depth
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Nodes at Minimum Depth',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level. Changes from a "find minimum" to a "count at minimum" problem. You first need to determine the minimum depth, then count leaves at that depth, or do both in a single BFS pass.',
        problem: 'Changes from a "find minimum" to a "count at minimum" problem. You first need to determine the minimum depth, then count leaves at that depth, or do both in a single BFS pass.',
        hints: [
            'Consider: Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level.',
            'Changes from a "find minimum" to a "count at minimum" problem.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: 1->2, 1->3, both are leaves at depth 2.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2, 1->3, both are leaves at depth 2' },
                output: 'See explanation',
                explanation: 'Tree: 1->2, 1->3, both are leaves at depth 2. Min depth=2, count=2.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def count_nodes_at_minimum_depth(data):
    """
    Count Nodes at Minimum Depth

    Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level.

    Approach: Changes from a "find minimum" to a "count at minimum" problem

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Changes from a "find minimum" to a "count at minimum" problem

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Count Nodes at Minimum Depth
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->2, 1->3, both are leaves at depth 2
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

// CountNodesAtMinimumDepth solves: Count Nodes at Minimum Depth
// Changes from a find minimum to a count at minimum problem
// Time: O(n), Space: O(n)
func CountNodesAtMinimumDepth(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Count Nodes at Minimum Depth
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
    // Example: Tree: 1->2, 1->3, both are leaves at depth 2
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-05-count-nodes-at-minimum-depth', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-05-count-nodes-at-minimum-depth'] = problem;
})();
