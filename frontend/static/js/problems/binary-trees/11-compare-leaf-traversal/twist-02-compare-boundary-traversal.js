/**
 * Compare Boundary Traversal
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Compare Boundary Traversal',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Compare the full boundary traversals of two trees. The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates. Boundary traversal combines three different traversal patterns into one sequence. You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).',
        problem: 'Boundary traversal combines three different traversal patterns into one sequence. You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).',
        hints: [
            'Consider: Compare the full boundary traversals of two trees.',
            'The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates.',
            'Key insight: Boundary traversal combines three different traversal patterns into one sequence.',
            'You must handle corner cases where a node is part of multiple boundaries (e.g., leftmost leaf is both left edge and leaf).'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, 6, 7]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, 6, 7]. Boundary: [1, 2, 4, 5, 6, 7, 3]. Left edge: [1, 2, 4], Leaves: [4, 5, 6, 7], Right edge: [7, 3, 1], deduplicated.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def compare_boundary_traversal(data):
    """
    Compare Boundary Traversal

    Compare the full boundary traversals of two trees.
     The boundary includes left edge (top-down), leaves (left-to-right), and right edge (bottom-up), without duplicates.

    Approach: Boundary traversal combines three different traversal patterns into one sequence

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Boundary traversal combines three different traversal patterns into one sequence

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Compare Boundary Traversal
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5, 6, 7]
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

// CompareBoundaryTraversal solves: Compare Boundary Traversal
// Boundary traversal combines three different traversal patterns into one sequence
// Time: O(n), Space: O(n)
func CompareBoundaryTraversal(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Compare Boundary Traversal
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
    // Example: Tree [1, 2, 3, 4, 5, 6, 7]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-02-compare-boundary-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-02-compare-boundary-traversal'] = problem;
})();
