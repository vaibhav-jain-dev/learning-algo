/**
 * Evaluate with Variables
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 14-evaluate-expression-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Evaluate with Variables',
        difficulty: 'Medium',
        algorithm: 'tree-expression',
        parent: '14-evaluate-expression-tree',
        description: 'Leaf nodes can contain variable names (strings) in addition to numbers. Given a dictionary mapping variable names to values, evaluate the expression tree. Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up. This adds a lookup layer and error handling for undefined variables to the base case.',
        problem: 'Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up. This adds a lookup layer and error handling for undefined variables to the base case.',
        hints: [
            'Consider: Leaf nodes can contain variable names (strings) in addition to numbers.',
            'Given a dictionary mapping variable names to values, evaluate the expression tree.',
            'Key insight: Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up.',
            'This adds a lookup layer and error handling for undefined variables to the base case.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: + at root, left leaf "x", right leaf 3' },
                output: 'See explanation',
                explanation: 'Tree: + at root, left leaf "x", right leaf 3. Variables: {x: 7}. Result: 7 + 3 = 10.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def evaluate_with_variables(data):
    """
    Evaluate with Variables

    Leaf nodes can contain variable names (strings) in addition to numbers.
     Given a dictionary mapping variable names to values, evaluate the expression tree.

    Approach: Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Evaluate with Variables
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: + at root, left leaf "x", right leaf 3
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

// EvaluateWithVariables solves: Evaluate with Variables
// Leaf node handling branches: if it is a number, use it directly; if it is a variable, look it up
// Time: O(n), Space: O(n)
func EvaluateWithVariables(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Evaluate with Variables
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
    // Example: Tree: + at root, left leaf x, right leaf 3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '14-evaluate-expression-tree/twist-02-evaluate-with-variables', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/14-evaluate-expression-tree/twist-02-evaluate-with-variables'] = problem;
})();
