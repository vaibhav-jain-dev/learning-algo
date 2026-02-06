/**
 * Return the Actual Path
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return the Actual Path',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path. Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them. The postorder logic must return both sum and path.',
        problem: 'Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them. The postorder logic must return both sum and path.',
        hints: [
            'Consider: Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path.',
            'Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: -10->9, -10->20->15, -10->20->7.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: -10->9, -10->20->15, -10->20->7' },
                output: 'See explanation',
                explanation: 'Tree: -10->9, -10->20->15, -10->20->7. Output: [15, 20, 7] with sum 42.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def return_the_actual_path(data):
    """
    Return the Actual Path

    Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path.

    Approach: Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Return the Actual Path
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: -10->9, -10->20->15, -10->20->7
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

// ReturnTheActualPath solves: Return the Actual Path
// Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them
// Time: O(n), Space: O(n)
func ReturnTheActualPath(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Return the Actual Path
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
    // Example: Tree: -10->9, -10->20->15, -10->20->7
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-02-return-the-actual-path', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-02-return-the-actual-path'] = problem;
})();
