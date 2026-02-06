/**
 * Closest Node to Target
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 15-find-nodes-distance-k
 */
(function() {
    'use strict';
    const problem = {
        name: 'Closest Node to Target',
        difficulty: 'Medium',
        algorithm: 'tree-distance',
        parent: '15-find-nodes-distance-k',
        description: 'Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance). Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes. This requires BFS from the target, stopping at the first special node encountered.',
        problem: 'Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes. This requires BFS from the target, stopping at the first special node encountered.',
        hints: [
            'Consider: Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance).',
            'Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3, 4, 5, 6, 7], target=4, special nodes={6, 7}.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, 6, 7], target=4, special nodes={6, 7}' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, 6, 7], target=4, special nodes={6, 7}. Distance from 4 to 6: 4->2->1->3->6 = 4. Distance from 4 to 7: 4->2->1->3->7 = 4. Closest is either 6 or 7 at distance 4.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def closest_node_to_target(data):
    """
    Closest Node to Target

    Given a target node and a set of special nodes, find which special node is closest to the target (minimum distance).

    Approach: Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Closest Node to Target
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5, 6, 7], target=4, special nodes={6, 7}
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

// ClosestNodeToTarget solves: Closest Node to Target
// Instead of finding all nodes at a fixed distance, you find the minimum distance to a subset of nodes
// Time: O(n), Space: O(n)
func ClosestNodeToTarget(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Closest Node to Target
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
    // Example: Tree [1, 2, 3, 4, 5, 6, 7], target=4, special nodes={6, 7}
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '15-find-nodes-distance-k/twist-03-closest-node-to-target', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/15-find-nodes-distance-k/twist-03-closest-node-to-target'] = problem;
})();
