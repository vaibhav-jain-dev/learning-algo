/**
 * Leaf Traversal with Depth
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Leaf Traversal with Depth',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Compare two trees leaf traversals where each leaf is represented as a (value, depth) pair. Both values and depths must match. Two trees can have the same leaf values in the same order but at different depths. Adding depth as a comparison criterion means structurally different trees with same leaf values will be distinguished.',
        problem: 'Two trees can have the same leaf values in the same order but at different depths. Adding depth as a comparison criterion means structurally different trees with same leaf values will be distinguished.',
        hints: [
            'Consider: Compare two trees leaf traversals where each leaf is represented as a (value, depth) pair.',
            'Both values and depths must match.',
            'Key insight: Two trees can have the same leaf values in the same order but at different depths.',
            'Adding depth as a comparison criterion means structurally different trees with same leaf values will be distinguished.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1 [1, 2, 3] has leaves (2, depth=1), (3, depth=1)' },
                output: 'See explanation',
                explanation: 'Tree1 [1, 2, 3] has leaves (2, depth=1), (3, depth=1). Tree2 [1, null, 2, null, 3] has leaves (3, depth=2). Different despite leaf value 3 appearing in both.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def leaf_traversal_with_depth(data):
    """
    Leaf Traversal with Depth

    Compare two trees leaf traversals where each leaf is represented as a (value, depth) pair.
     Both values and depths must match.

    Approach: Two trees can have the same leaf values in the same order but at different depths

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Two trees can have the same leaf values in the same order but at different depths

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Leaf Traversal with Depth
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1 [1, 2, 3] has leaves (2, depth=1), (3, depth=1)
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

// LeafTraversalWithDepth solves: Leaf Traversal with Depth
// Two trees can have the same leaf values in the same order but at different depths
// Time: O(n), Space: O(n)
func LeafTraversalWithDepth(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Leaf Traversal with Depth
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
    // Example: Tree1 [1, 2, 3] has leaves (2, depth=1), (3, depth=1)
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-03-leaf-traversal-with-depth', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-03-leaf-traversal-with-depth'] = problem;
})();
