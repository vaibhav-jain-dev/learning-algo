/**
 * Rightmost Non-Null at Each Level
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Rightmost Non-Null at Each Level',
        difficulty: 'Easy',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree. This simplifies to a right-side view problem. You only need the last node per level rather than linking all siblings, which can be solved with either BFS (last element per level) or DFS (right-first traversal).',
        problem: 'This simplifies to a right-side view problem. You only need the last node per level rather than linking all siblings, which can be solved with either BFS (last element per level) or DFS (right-first traversal).',
        hints: [
            'Consider: Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree.',
            'This simplifies to a right-side view problem.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3, 4, 5, null, 7].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, null, 7]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, null, 7]. Right view: [1, 3, 7]. These are the rightmost nodes at levels 0, 1, 2.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def rightmost_non_null_at_each_level(data):
    """
    Rightmost Non-Null at Each Level

    Instead of connecting siblings, return a list of the rightmost non-null node value at each level of the tree.

    Approach: This simplifies to a right-side view problem

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: This simplifies to a right-side view problem

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Rightmost Non-Null at Each Level
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5, null, 7]
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

// RightmostNonnullAtEachLevel solves: Rightmost Non-Null at Each Level
// This simplifies to a right-side view problem
// Time: O(n), Space: O(n)
func RightmostNonnullAtEachLevel(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Rightmost Non-Null at Each Level
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
    // Example: Tree [1, 2, 3, 4, 5, null, 7]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-05-rightmost-non-null-at-each-level', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-05-rightmost-non-null-at-each-level'] = problem;
})();
