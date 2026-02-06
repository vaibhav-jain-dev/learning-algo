/**
 * Count Branches by Sum Range
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums
 */
(function() {
    'use strict';
    const problem = {
        name: 'Count Branches by Sum Range',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi]. Changes from a "find all" to a "count with filter" problem. You can prune early if the running sum already exceeds hi and all remaining node values are positive.',
        problem: 'Changes from a "find all" to a "count with filter" problem. You can prune early if the running sum already exceeds hi and all remaining node values are positive.',
        hints: [
            'Consider: Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi].',
            'Changes from a "find all" to a "count with filter" problem.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: 1->2->4, 1->3.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2->4, 1->3' },
                output: 'See explanation',
                explanation: 'Tree: 1->2->4, 1->3. Range [4,6] => 1 (only branch 1->3=4 is in range, 1->2->4=7 is out).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def count_branches_by_sum_range(data):
    """
    Count Branches by Sum Range

    Instead of returning all branch sums, return the count of branches whose sum falls within a given range [lo, hi].

    Approach: Changes from a "find all" to a "count with filter" problem

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Changes from a "find all" to a "count with filter" problem

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Count Branches by Sum Range
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->2->4, 1->3
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

// CountBranchesBySumRange solves: Count Branches by Sum Range
// Changes from a find all to a count with filter problem
// Time: O(n), Space: O(n)
func CountBranchesBySumRange(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Count Branches by Sum Range
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
    // Example: Tree: 1->2->4, 1->3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/twist-05-count-branches-by-sum-range', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/twist-05-count-branches-by-sum-range'] = problem;
})();
