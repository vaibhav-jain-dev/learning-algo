/**
 * Closest Path Sum
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';
    const problem = {
        name: 'Closest Path Sum',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'If no exact path sum equals the target, return the path whose sum is closest to the target. If there is a tie, return the shorter path. Changes from an exact match to an optimization problem. You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.',
        problem: 'Changes from an exact match to an optimization problem. You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.',
        hints: [
            'Consider: If no exact path sum equals the target, return the path whose sum is closest to the target.',
            'If there is a tie, return the shorter path.',
            'Key insight: Changes from an exact match to an optimization problem.',
            'You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2->3, 1->4' },
                output: 'See explanation',
                explanation: 'Tree: 1->2->3, 1->4. Target=5. Path 1->4=5 is exact match. If target=7, closest is 1->2->3=6 (diff=1).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def closest_path_sum(data):
    """
    Closest Path Sum

    If no exact path sum equals the target, return the path whose sum is closest to the target.
     If there is a tie, return the shorter path.

    Approach: Changes from an exact match to an optimization problem

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Changes from an exact match to an optimization problem

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Closest Path Sum
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->2->3, 1->4
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

// ClosestPathSum solves: Closest Path Sum
// Changes from an exact match to an optimization problem
// Time: O(n), Space: O(n)
func ClosestPathSum(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Closest Path Sum
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
    // Example: Tree: 1->2->3, 1->4
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-05-closest-path-sum', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-05-closest-path-sum'] = problem;
})();
