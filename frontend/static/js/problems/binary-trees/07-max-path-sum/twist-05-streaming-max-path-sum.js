/**
 * Streaming Max Path Sum
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 07-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Streaming Max Path Sum',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '07-max-path-sum',
        description: 'Node values can be updated at any time. After each update, report the new maximum path sum without full re-traversal. A single node value change can affect all paths through it. You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.',
        problem: 'A single node value change can affect all paths through it. You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.',
        hints: [
            'Consider: Node values can be updated at any time.',
            'After each update, report the new maximum path sum without full re-traversal.',
            'Key insight: A single node value change can affect all paths through it.',
            'You need an efficient data structure to propagate changes upward, potentially using heavy-light decomposition or Euler tour techniques.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Initial max path sum: 42' },
                output: 'See explanation',
                explanation: 'Initial max path sum: 42. Update node 15 to -100. New max path sum needs recomputation along affected paths.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def streaming_max_path_sum(data):
    """
    Streaming Max Path Sum

    Node values can be updated at any time.
     After each update, report the new maximum path sum without full re-traversal.

    Approach: A single node value change can affect all paths through it

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: A single node value change can affect all paths through it

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Streaming Max Path Sum
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Initial max path sum: 42
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

// StreamingMaxPathSum solves: Streaming Max Path Sum
// A single node value change can affect all paths through it
// Time: O(n), Space: O(n)
func StreamingMaxPathSum(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Streaming Max Path Sum
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
    // Example: Initial max path sum: 42
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum/twist-05-streaming-max-path-sum', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum/twist-05-streaming-max-path-sum'] = problem;
})();
