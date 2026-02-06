/**
 * Iterative Inversion with BFS
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 03-invert-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Inversion with BFS',
        difficulty: 'Easy',
        algorithm: 'tree-invert',
        parent: '03-invert-tree',
        description: 'Invert the binary tree using a queue-based BFS approach instead of recursion. Swap children at each node as you process it. Recursion naturally handles the tree bottom-up or top-down. With BFS, you process level by level and must swap children explicitly when dequeuing each node. The order of processing differs but the result is the same.',
        problem: 'Recursion naturally handles the tree bottom-up or top-down. With BFS, you process level by level and must swap children explicitly when dequeuing each node. The order of processing differs but the result is the same.',
        hints: [
            'Consider: Invert the binary tree using a queue-based BFS approach instead of recursion.',
            'Swap children at each node as you process it.',
            'Key insight: Recursion naturally handles the tree bottom-up or top-down.',
            'The order of processing differs but the result is the same.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Queue: [1]' },
                output: 'See explanation',
                explanation: 'Queue: [1]. Dequeue 1, swap children (2,3)->(3,2), enqueue 3,2. Continue per level.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_inversion_with_bfs(data):
    """
    Iterative Inversion with BFS

    Invert the binary tree using a queue-based BFS approach instead of recursion.
     Swap children at each node as you process it.

    Approach: Recursion naturally handles the tree bottom-up or top-down

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Recursion naturally handles the tree bottom-up or top-down

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative Inversion with BFS
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Queue: [1]
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

// IterativeInversionWithBfs solves: Iterative Inversion with BFS
// Recursion naturally handles the tree bottom-up or top-down
// Time: O(n), Space: O(n)
func IterativeInversionWithBfs(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative Inversion with BFS
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
    // Example: Queue: [1]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree/twist-01-iterative-inversion-with-bfs', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree/twist-01-iterative-inversion-with-bfs'] = problem;
})();
