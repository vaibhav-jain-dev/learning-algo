/**
 * Evaluate with Short-Circuit
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Evaluate with Short-Circuit',
        difficulty: 'Hard',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Add logical operators AND (&&) and OR (||) to the expression tree. Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1. Standard arithmetic always evaluates both children. Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.',
        problem: 'Standard arithmetic always evaluates both children. Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.',
        hints: [
            'Consider: Add logical operators AND (&&) and OR (||) to the expression tree.',
            'Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1.',
            'Key insight: Standard arithmetic always evaluates both children.',
            'Short-circuit evaluation conditionally skips the right subtree based on the left result, introducing lazy evaluation into the tree traversal.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: AND at root, left: 0, right: (expensive computation)' },
                output: 'See explanation',
                explanation: 'Tree: AND at root, left: 0, right: (expensive computation). Short-circuit returns 0 without evaluating the right subtree at all.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def evaluate_with_short_circuit(data):
    """
    Evaluate with Short-Circuit

    Add logical operators AND (&&) and OR (||) to the expression tree.
     Implement short-circuit evaluation: AND returns 0 immediately if left is 0, OR returns 1 immediately if left is 1.

    Approach: Standard arithmetic always evaluates both children

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Standard arithmetic always evaluates both children

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Evaluate with Short-Circuit
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: AND at root, left: 0, right: (expensive computation)
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

// EvaluateWithShortcircuit solves: Evaluate with Short-Circuit
// Standard arithmetic always evaluates both children
// Time: O(n), Space: O(n)
func EvaluateWithShortcircuit(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Evaluate with Short-Circuit
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
    // Example: Tree: AND at root, left: 0, right: (expensive computation)
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-04-evaluate-with-short-circuit', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-04-evaluate-with-short-circuit'] = problem;
})();
