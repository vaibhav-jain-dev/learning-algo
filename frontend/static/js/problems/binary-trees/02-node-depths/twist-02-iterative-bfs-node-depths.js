/**
 * Iterative BFS Node Depths
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 02-node-depths
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative BFS Node Depths',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths',
        description: 'Compute sum of node depths using BFS (level-order traversal) instead of DFS. Use the level number as the depth. BFS naturally tracks depth by level. Instead of passing depth as a recursive parameter, you use the queue level counter. All nodes at level k contribute k to the sum.',
        problem: 'BFS naturally tracks depth by level. Instead of passing depth as a recursive parameter, you use the queue level counter. All nodes at level k contribute k to the sum.',
        hints: [
            'Consider: Compute sum of node depths using BFS (level-order traversal) instead of DFS.',
            'Use the level number as the depth.',
            'Key insight: BFS naturally tracks depth by level.',
            'All nodes at level k contribute k to the sum.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Level 0: 1 node (depth 0)' },
                output: 'See explanation',
                explanation: 'Level 0: 1 node (depth 0). Level 1: 2 nodes (depth 2). Level 2: 4 nodes (depth 8). Total: 10.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_bfs_node_depths(data):
    """
    Iterative BFS Node Depths

    Compute sum of node depths using BFS (level-order traversal) instead of DFS.
     Use the level number as the depth.

    Approach: BFS naturally tracks depth by level

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: BFS naturally tracks depth by level

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative BFS Node Depths
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Level 0: 1 node (depth 0)
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

// IterativeBfsNodeDepths solves: Iterative BFS Node Depths
// BFS naturally tracks depth by level
// Time: O(n), Space: O(n)
func IterativeBfsNodeDepths(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative BFS Node Depths
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
    // Example: Level 0: 1 node (depth 0)
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/twist-02-iterative-bfs-node-depths', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/twist-02-iterative-bfs-node-depths'] = problem;
})();
