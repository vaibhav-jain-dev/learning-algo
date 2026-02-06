/**
 * Return the Diameter Path
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 04-binary-tree-diameter
 */
(function() {
    'use strict';
    const problem = {
        name: 'Return the Diameter Path',
        difficulty: 'Hard',
        algorithm: 'tree-diameter',
        parent: '04-binary-tree-diameter',
        description: 'Instead of returning the diameter length, return the actual list of node values along the longest path. Tracking the length is O(1) per node, but reconstructing the actual path requires storing and merging path arrays at each node. The postorder logic must return both height and the path to the deepest leaf.',
        problem: 'Tracking the length is O(1) per node, but reconstructing the actual path requires storing and merging path arrays at each node. The postorder logic must return both height and the path to the deepest leaf.',
        hints: [
            'Consider: Instead of returning the diameter length, return the actual list of node values along the longest path.',
            'Tracking the length is O(1) per node, but reconstructing the actual path requires storing and merging path arrays at each node.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree from base problem: return [8, 7, 3, 4, 5, 6] as the diameter path.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree from base problem: return [8, 7, 3, 4, 5, 6] as the diameter path' },
                output: 'See explanation',
                explanation: 'Tree from base problem: return [8, 7, 3, 4, 5, 6] as the diameter path.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def return_the_diameter_path(data):
    """
    Return the Diameter Path

    Instead of returning the diameter length, return the actual list of node values along the longest path.

    Approach: Tracking the length is O(1) per node, but reconstructing the actual path requires storing and merging path arrays at each node

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Tracking the length is O(1) per node, but reconstructing the actual path requires storing and merging path arrays at each node

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Return the Diameter Path
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree from base problem: return [8, 7, 3, 4, 5, 6] as the diameter path
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

// ReturnTheDiameterPath solves: Return the Diameter Path
// Tracking the length is O(1) per node, but reconstructing the actual path requires storing and merging path arrays at each node
// Time: O(n), Space: O(n)
func ReturnTheDiameterPath(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Return the Diameter Path
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
    // Example: Tree from base problem: return [8, 7, 3, 4, 5, 6] as the diameter path
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '04-binary-tree-diameter/twist-04-return-the-diameter-path', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/04-binary-tree-diameter/twist-04-return-the-diameter-path'] = problem;
})();
