/**
 * Conceptual Trap: Balanced vs Complete
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 06-height-balanced
 */
(function() {
    'use strict';
    const problem = {
        name: 'Conceptual Trap: Balanced vs Complete',
        difficulty: 'Easy',
        algorithm: 'tree-balanced',
        parent: '06-height-balanced',
        description: 'Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference. Tests understanding of tree properties. A complete tree is always height-balanced, but a height-balanced tree is NOT necessarily complete (it can have gaps at the last level as long as heights differ by at most 1).',
        problem: 'Tests understanding of tree properties. A complete tree is always height-balanced, but a height-balanced tree is NOT necessarily complete (it can have gaps at the last level as long as heights differ by at most 1).',
        hints: [
            'Consider: Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference.',
            'Tests understanding of tree properties.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree: 1->2->4, 1->3->null,6.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1->2->4, 1->3->null,6' },
                output: 'See explanation',
                explanation: 'Tree: 1->2->4, 1->3->null,6. Height-balanced (heights 2 vs 2) but NOT complete (level 2 has a gap).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def conceptual_trap_balanced_vs_complete(data):
    """
    Conceptual Trap: Balanced vs Complete

    Is every height-balanced tree also a complete binary tree? Is every complete binary tree height-balanced? Explain the difference.

    Approach: Tests understanding of tree properties

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Tests understanding of tree properties

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Conceptual Trap: Balanced vs Complete
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1->2->4, 1->3->null,6
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

// ConceptualTrapBalancedVsComplete solves: Conceptual Trap: Balanced vs Complete
// Tests understanding of tree properties
// Time: O(n), Space: O(n)
func ConceptualTrapBalancedVsComplete(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Conceptual Trap: Balanced vs Complete
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
    // Example: Tree: 1->2->4, 1->3->null,6
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '06-height-balanced/twist-05-conceptual-trap-balanced-vs-complete', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/06-height-balanced/twist-05-conceptual-trap-balanced-vs-complete'] = problem;
})();
