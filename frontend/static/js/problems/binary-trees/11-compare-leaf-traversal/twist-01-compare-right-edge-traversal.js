/**
 * Compare Right-Edge Traversal
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Compare Right-Edge Traversal',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees. The right edge is the sequence of nodes visited by always going right from the root until reaching a null. Leaf traversal requires full tree DFS. Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.',
        problem: 'Leaf traversal requires full tree DFS. Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.',
        hints: [
            'Consider: Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees.',
            'The right edge is the sequence of nodes visited by always going right from the root until reaching a null.',
            'Key insight: Leaf traversal requires full tree DFS.',
            'Right-edge traversal is a simple linear path, but the conceptual shift from leaves (bottom of tree) to edges (side of tree) requires different thinking about what defines tree equivalence.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1 [1, 2, 3, null, null, null, 4]' },
                output: 'See explanation',
                explanation: 'Tree1 [1, 2, 3, null, null, null, 4]. Right edge: [1, 3, 4]. Tree2 [1, 5, 3, null, null, null, 4]. Right edge: [1, 3, 4]. Same right edge despite different structures.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def compare_right_edge_traversal(data):
    """
    Compare Right-Edge Traversal

    Instead of comparing leaf sequences, compare the right-edge sequences of two binary trees.
     The right edge is the sequence of nodes visited by always going right from the root until reaching a null.

    Approach: Leaf traversal requires full tree DFS

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Leaf traversal requires full tree DFS

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Compare Right-Edge Traversal
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1 [1, 2, 3, null, null, null, 4]
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

// CompareRightedgeTraversal solves: Compare Right-Edge Traversal
// Leaf traversal requires full tree DFS
// Time: O(n), Space: O(n)
func CompareRightedgeTraversal(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Compare Right-Edge Traversal
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
    // Example: Tree1 [1, 2, 3, null, null, null, 4]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-01-compare-right-edge-traversal', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-01-compare-right-edge-traversal'] = problem;
})();
