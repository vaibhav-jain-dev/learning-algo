/**
 * Iterative with Level-Order
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 01-branch-sums/03-sum-root-to-leaf-numbers
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative with Level-Order',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums/03-sum-root-to-leaf-numbers',
        description: 'Solve using BFS (level-order traversal) instead of DFS. Track the running number for each node in the queue. BFS processes nodes level by level, so you must store the accumulated number with each node in the queue. Leaf detection happens when dequeuing, not when recursing.',
        problem: 'BFS processes nodes level by level, so you must store the accumulated number with each node in the queue. Leaf detection happens when dequeuing, not when recursing.',
        hints: [
            'Consider: Solve using BFS (level-order traversal) instead of DFS.',
            'Track the running number for each node in the queue.',
            'Key insight: BFS processes nodes level by level, so you must store the accumulated number with each node in the queue.',
            'Leaf detection happens when dequeuing, not when recursing.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Queue: [(root,0)] -> process 4, enqueue (9,49), (0,40) -> etc' },
                output: 'See explanation',
                explanation: 'Queue: [(root,0)] -> process 4, enqueue (9,49), (0,40) -> etc.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_with_level_order(data):
    """
    Iterative with Level-Order

    Solve using BFS (level-order traversal) instead of DFS.
     Track the running number for each node in the queue.

    Approach: BFS processes nodes level by level, so you must store the accumulated number with each node in the queue

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: BFS processes nodes level by level, so you must store the accumulated number with each node in the queue

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative with Level-Order
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Queue: [(root,0)] -> process 4, enqueue (9,49), (0,40) -> etc
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

// IterativeWithLevelorder solves: Iterative with Level-Order
// BFS processes nodes level by level, so you must store the accumulated number with each node in the queue
// Time: O(n), Space: O(n)
func IterativeWithLevelorder(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative with Level-Order
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
    // Example: Queue: [(root,0)] -> process 4, enqueue (9,49), (0,40) -> etc
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers/twist-03-iterative-with-level-order', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers/twist-03-iterative-with-level-order'] = problem;
})();
