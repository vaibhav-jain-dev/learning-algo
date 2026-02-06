/**
 * Reverse: Leaf-to-Root Numbers
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/03-sum-root-to-leaf-numbers
 */
(function() {
    'use strict';
    const problem = {
        name: 'Reverse: Leaf-to-Root Numbers',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/03-sum-root-to-leaf-numbers',
        description: 'Instead of root-to-leaf, form numbers from leaf-to-root. The leaf digit is the most significant digit. You cannot build the number top-down anymore. You need to know the depth of each leaf first to determine the place value of the root digit, or collect digits and reverse.',
        problem: 'You cannot build the number top-down anymore. You need to know the depth of each leaf first to determine the place value of the root digit, or collect digits and reverse.',
        hints: [
            'Consider: Instead of root-to-leaf, form numbers from leaf-to-root.',
            'The leaf digit is the most significant digit.',
            'Key insight: You cannot build the number top-down anymore.',
            'You need to know the depth of each leaf first to determine the place value of the root digit, or collect digits and reverse.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2, 1->3' },
                output: 'See explanation',
                explanation: 'Tree: 1->2, 1->3. Leaf-to-root paths: 21 and 31. Sum=52 (instead of 12+13=25).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def reverse_leaf_to_root_numbers(data):
    """
    Reverse: Leaf-to-Root Numbers

    Instead of root-to-leaf, form numbers from leaf-to-root.
     The leaf digit is the most significant digit.

    Approach: You cannot build the number top-down anymore

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: You cannot build the number top-down anymore

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Reverse: Leaf-to-Root Numbers
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->2, 1->3
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

// ReverseLeaftorootNumbers solves: Reverse: Leaf-to-Root Numbers
// You cannot build the number top-down anymore
// Time: O(n), Space: O(n)
func ReverseLeaftorootNumbers(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Reverse: Leaf-to-Root Numbers
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
    // Example: Tree: 1->2, 1->3
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers/twist-06-reverse-leaf-to-root-numbers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers/twist-06-reverse-leaf-to-root-numbers'] = problem;
})();
