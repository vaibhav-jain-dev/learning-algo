/**
 * Flatten by Levels
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten by Levels',
        difficulty: 'Hard',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Flatten the binary tree into a linked list following level-order (BFS) instead of inorder. Each node right-pointer points to the next node in BFS order. Level-order is not naturally recursive like inorder. You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.',
        problem: 'Level-order is not naturally recursive like inorder. You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.',
        hints: [
            'Consider: Flatten the binary tree into a linked list following level-order (BFS) instead of inorder.',
            'Each node right-pointer points to the next node in BFS order.',
            'Key insight: Level-order is not naturally recursive like inorder.',
            'You need a queue-based approach or a clever way to link nodes across different subtrees at the same level, which breaks the recursive divide-and-conquer pattern.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, 6, 7]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, 6, 7]. Level-order flatten: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def flatten_by_levels(data):
    """
    Flatten by Levels

    Flatten the binary tree into a linked list following level-order (BFS) instead of inorder.
     Each node right-pointer points to the next node in BFS order.

    Approach: Level-order is not naturally recursive like inorder

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Level-order is not naturally recursive like inorder

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Flatten by Levels
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

// FlattenByLevels solves: Flatten by Levels
// Level-order is not naturally recursive like inorder
// Time: O(n), Space: O(n)
func FlattenByLevels(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Flatten by Levels
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
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-03-flatten-by-levels', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-03-flatten-by-levels'] = problem;
})();
