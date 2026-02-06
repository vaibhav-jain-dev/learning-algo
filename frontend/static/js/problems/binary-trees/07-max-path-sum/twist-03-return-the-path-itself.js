/**
 * Return the Path Itself
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 07-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return the Path Itself',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '07-max-path-sum',
        description: 'Instead of just the maximum sum, return the actual list of node values forming the maximum path. Tracking the optimal sum is a scalar comparison. Tracking the actual path requires storing path segments at each recursive step and merging left-path + node + right-path when updating the global best.',
        problem: 'Tracking the optimal sum is a scalar comparison. Tracking the actual path requires storing path segments at each recursive step and merging left-path + node + right-path when updating the global best.',
        hints: [
            'Consider: Instead of just the maximum sum, return the actual list of node values forming the maximum path.',
            'Tracking the optimal sum is a scalar comparison.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: -10->9, -10->20->15, -10->20->7.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: -10->9, -10->20->15, -10->20->7' },
                output: 'See explanation',
                explanation: 'Tree: -10->9, -10->20->15, -10->20->7. Max path: [15, 20, 7]. Return [15, 20, 7] with sum 42.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def return_the_path_itself(data):
    """
    Return the Path Itself

    Instead of just the maximum sum, return the actual list of node values forming the maximum path.

    Approach: Tracking the optimal sum is a scalar comparison

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Tracking the optimal sum is a scalar comparison

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Return the Path Itself
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

// ReturnThePathItself solves: Return the Path Itself
// Tracking the optimal sum is a scalar comparison
// Time: O(n), Space: O(n)
func ReturnThePathItself(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Return the Path Itself
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
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum/twist-03-return-the-path-itself', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum/twist-03-return-the-path-itself'] = problem;
})();
