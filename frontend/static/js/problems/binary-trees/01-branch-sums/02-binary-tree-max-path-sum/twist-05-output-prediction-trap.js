/**
 * Output Prediction Trap
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Output Prediction Trap',
        difficulty: 'Medium',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Given tree [-1, -2, -3], what is the max path sum? Many people incorrectly say 0 (empty path) or -1. The path must contain at least one node. Tests understanding of the constraint that the path must be non-empty. When all values are negative, the answer is the single largest (least negative) value, not zero.',
        problem: 'Tests understanding of the constraint that the path must be non-empty. When all values are negative, the answer is the single largest (least negative) value, not zero.',
        hints: [
            'Consider: Given tree [-1, -2, -3], what is the max path sum? Many people incorrectly say 0 (empty path) or -1.',
            'The path must contain at least one node.',
            'Key insight: Tests understanding of the constraint that the path must be non-empty.',
            'When all values are negative, the answer is the single largest (least negative) value, not zero.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: -1->-2, -1->-3' },
                output: 'See explanation',
                explanation: 'Tree: -1->-2, -1->-3. Answer: -1 (the root alone). Not 0, not -2, not -6.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def output_prediction_trap(data):
    """
    Output Prediction Trap

    Given tree [-1, -2, -3], what is the max path sum? Many people incorrectly say 0 (empty path) or -1.
     The path must contain at least one node.

    Approach: Tests understanding of the constraint that the path must be non-empty

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Tests understanding of the constraint that the path must be non-empty

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Output Prediction Trap
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: -1->-2, -1->-3
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

// OutputPredictionTrap solves: Output Prediction Trap
// Tests understanding of the constraint that the path must be non-empty
// Time: O(n), Space: O(n)
func OutputPredictionTrap(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Output Prediction Trap
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
    // Example: Tree: -1->-2, -1->-3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-05-output-prediction-trap', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-05-output-prediction-trap'] = problem;
})();
