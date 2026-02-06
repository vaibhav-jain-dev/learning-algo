/**
 * Concurrent Tree Modification
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Concurrent Tree Modification',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'While computing the max path sum, node values can be updated by another thread. Design a solution that handles concurrent modifications safely. Forces thinking about read consistency, locking strategies, or snapshot isolation. A simple DFS may read stale values partway through traversal, producing incorrect results.',
        problem: 'Forces thinking about read consistency, locking strategies, or snapshot isolation. A simple DFS may read stale values partway through traversal, producing incorrect results.',
        hints: [
            'Consider: While computing the max path sum, node values can be updated by another thread.',
            'Design a solution that handles concurrent modifications safely.',
            'Key insight: Forces thinking about read consistency, locking strategies, or snapshot isolation.',
            'A simple DFS may read stale values partway through traversal, producing incorrect results.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'During traversal, node value 20 is changed to -5' },
                output: 'See explanation',
                explanation: 'During traversal, node value 20 is changed to -5. Result depends on whether you read old or new value.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def concurrent_tree_modification(data):
    """
    Concurrent Tree Modification

    While computing the max path sum, node values can be updated by another thread.
     Design a solution that handles concurrent modifications safely.

    Approach: Forces thinking about read consistency, locking strategies, or snapshot isolation

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Forces thinking about read consistency, locking strategies, or snapshot isolation

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Concurrent Tree Modification
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: During traversal, node value 20 is changed to -5
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

// ConcurrentTreeModification solves: Concurrent Tree Modification
// Forces thinking about read consistency, locking strategies, or snapshot isolation
// Time: O(n), Space: O(n)
func ConcurrentTreeModification(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Concurrent Tree Modification
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
    // Example: During traversal, node value 20 is changed to -5
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-04-concurrent-tree-modification', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-04-concurrent-tree-modification'] = problem;
})();
