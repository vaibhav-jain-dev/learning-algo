/**
 * Any-to-Any Path Sum
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 01-branch-sums/01-path-sum-to-target
 */
(function() {
    'use strict';
    const problem = {
        name: 'Any-to-Any Path Sum',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/01-path-sum-to-target',
        description: 'Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf). Paths must go downward only. You need prefix sums to track all possible start points. At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.',
        problem: 'You need prefix sums to track all possible start points. At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.',
        hints: [
            'Consider: Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf).',
            'Paths must go downward only.',
            'Key insight: You need prefix sums to track all possible start points.',
            'At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 10->5->3, 10->5->2, target=8' },
                output: 'See explanation',
                explanation: 'Tree: 10->5->3, 10->5->2, target=8. Path 5->3=8 is valid even though it does not start at root.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def any_to_any_path_sum(data):
    """
    Any-to-Any Path Sum

    Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf).
     Paths must go downward only.

    Approach: You need prefix sums to track all possible start points

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: You need prefix sums to track all possible start points

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Any-to-Any Path Sum
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 10->5->3, 10->5->2, target=8
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

// AnytoanyPathSum solves: Any-to-Any Path Sum
// You need prefix sums to track all possible start points
// Time: O(n), Space: O(n)
func AnytoanyPathSum(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Any-to-Any Path Sum
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
    // Example: Tree: 10->5->3, 10->5->2, target=8
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target/twist-01-any-to-any-path-sum', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target/twist-01-any-to-any-path-sum'] = problem;
})();
