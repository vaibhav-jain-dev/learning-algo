/**
 * Path Sum Count Only
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';
    const problem = {
        name: 'Path Sum Count Only',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'Instead of returning all paths, return only the count of root-to-leaf paths that sum to the target. Optimize to avoid storing paths. Eliminates the need for backtracking path arrays. You only need a counter, which simplifies space usage but requires careful thought about when to increment.',
        problem: 'Eliminates the need for backtracking path arrays. You only need a counter, which simplifies space usage but requires careful thought about when to increment.',
        hints: [
            'Consider: Instead of returning all paths, return only the count of root-to-leaf paths that sum to the target.',
            'Optimize to avoid storing paths.',
            'Key insight: Eliminates the need for backtracking path arrays.',
            'You only need a counter, which simplifies space usage but requires careful thought about when to increment.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Same tree as base, target=22' },
                output: 'See explanation',
                explanation: 'Same tree as base, target=22. Output: 2 (instead of [[5,4,11,2],[5,8,4,5]]).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def path_sum_count_only(data):
    """
    Path Sum Count Only

    Instead of returning all paths, return only the count of root-to-leaf paths that sum to the target.
     Optimize to avoid storing paths.

    Approach: Eliminates the need for backtracking path arrays

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Eliminates the need for backtracking path arrays

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Path Sum Count Only
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Same tree as base, target=22
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

// PathSumCountOnly solves: Path Sum Count Only
// Eliminates the need for backtracking path arrays
// Time: O(n), Space: O(n)
func PathSumCountOnly(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Path Sum Count Only
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
    // Example: Same tree as base, target=22
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-03-path-sum-count-only', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-03-path-sum-count-only'] = problem;
})();
