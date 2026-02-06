/**
 * Multi-Digit Node Values
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 01-branch-sums/03-sum-root-to-leaf-numbers
 */
(function() {
    'use strict';
    const problem = {
        name: 'Multi-Digit Node Values',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/03-sum-root-to-leaf-numbers',
        description: 'Nodes can contain multi-digit numbers (e.g., 12, 345). The path concatenation uses the full number, not just a single digit. The formula changes from num*10+digit to num*(10^numDigits)+value. You need to compute the number of digits in each node value to shift correctly.',
        problem: 'The formula changes from num*10+digit to num*(10^numDigits)+value. You need to compute the number of digits in each node value to shift correctly.',
        hints: [
            'Consider: Nodes can contain multi-digit numbers (e.g., 12, 345).',
            'The path concatenation uses the full number, not just a single digit.',
            'Key insight: The formula changes from num*10+digit to num*(10^numDigits)+value.',
            'You need to compute the number of digits in each node value to shift correctly.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 12->34' },
                output: 'See explanation',
                explanation: 'Tree: 12->34. Path represents number 1234, not 12*10+34=154. Must shift by number of digits.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def multi_digit_node_values(data):
    """
    Multi-Digit Node Values

    Nodes can contain multi-digit numbers (e.
    g.
    , 12, 345).
     The path concatenation uses the full number, not just a single digit.

    Approach: The formula changes from num*10+digit to num*(10^numDigits)+value

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The formula changes from num*10+digit to num*(10^numDigits)+value

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Multi-Digit Node Values
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 12->34
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

// MultidigitNodeValues solves: Multi-Digit Node Values
// The formula changes from num*10+digit to num*(10^numDigits)+value
// Time: O(n), Space: O(n)
func MultidigitNodeValues(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Multi-Digit Node Values
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
    // Example: Tree: 12->34
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers/twist-04-multi-digit-node-values', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers/twist-04-multi-digit-node-values'] = problem;
})();
