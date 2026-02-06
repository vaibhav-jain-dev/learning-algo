/**
 * Binary Root-to-Leaf Numbers
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/03-sum-root-to-leaf-numbers
 */
(function() {
    'use strict';
    const problem = {
        name: 'Binary Root-to-Leaf Numbers',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/03-sum-root-to-leaf-numbers',
        description: 'Instead of decimal digits, each node contains a binary digit (0 or 1). Each root-to-leaf path represents a binary number. Return the sum of all binary numbers. The formula changes from num*10+digit to num*2+digit. Conceptually similar but tests whether you understand the generalization to any base, not just base 10.',
        problem: 'The formula changes from num*10+digit to num*2+digit. Conceptually similar but tests whether you understand the generalization to any base, not just base 10.',
        hints: [
            'Consider: Instead of decimal digits, each node contains a binary digit (0 or 1).',
            'Each root-to-leaf path represents a binary number.',
            'Key insight: Return the sum of all binary numbers.',
            'Conceptually similar but tests whether you understand the generalization to any base, not just base 10.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->0, 1->1' },
                output: 'See explanation',
                explanation: 'Tree: 1->0, 1->1. Paths: 10 (binary=2), 11 (binary=3). Sum=5.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def binary_root_to_leaf_numbers(data):
    """
    Binary Root-to-Leaf Numbers

    Instead of decimal digits, each node contains a binary digit (0 or 1).
     Each root-to-leaf path represents a binary number.
     Return the sum of all binary numbers.

    Approach: The formula changes from num*10+digit to num*2+digit

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The formula changes from num*10+digit to num*2+digit

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Binary Root-to-Leaf Numbers
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->0, 1->1
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

// BinaryRoottoleafNumbers solves: Binary Root-to-Leaf Numbers
// The formula changes from num*10+digit to num*2+digit
// Time: O(n), Space: O(n)
func BinaryRoottoleafNumbers(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Binary Root-to-Leaf Numbers
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
    // Example: Tree: 1->0, 1->1
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers/twist-01-binary-root-to-leaf-numbers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers/twist-01-binary-root-to-leaf-numbers'] = problem;
})();
