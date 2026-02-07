/**
 * Maximum Depth of Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Depth of Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths',
        description: 'Given the root of a binary tree, return its maximum depth. A binary tree\'s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.',
        problem: 'Use depth-first search to explore all possible paths. Start from the root/source, go as deep as possible before backtracking. Track visited nodes to avoid cycles. This achieves O(n) time with O(h) space.',
        complexity: {
            time: 'O(n)',
            space: 'O(h)'
        },
        hints: [
            'Preorder: process node, then left, then right.',
            'Inorder: process left, then node, then right (gives sorted order in BST).',
            'Postorder: process left, then right, then node.',
            'Use recursion or explicit stack.',
            'Pass accumulated values through parameters or return values.'
        ],
        examples: [
    {
        input: {
        "tree": {
                "value": 3,
                "left": {
                        "value": 9
                },
                "right": {
                        "value": 20,
                        "left": {
                                "value": 15
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 3,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "right": {
                        "value": 2
                }
        }
},
        output: 2,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `def maximumDepthOfBinaryTree(data):
    """
    Maximum Depth of Binary Tree

    Return the number of nodes along the longest path from root
    to the farthest leaf node.

    Key insight: The depth of a node is 1 + max(left_depth, right_depth)

    Time: O(n) - visit each node once
    Space: O(h) - recursion stack depth equals tree height
    """
    tree = data.get('tree')

    def dfs(node):
        if not node:
            return 0

        left_depth = dfs(node.get('left'))
        right_depth = dfs(node.get('right'))

        # Current node adds 1 to the max depth of its subtrees
        return 1 + max(left_depth, right_depth)

    return dfs(tree)


# Test
if __name__ == "__main__":
    data1 = {"tree": {"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}}
    print(maximumDepthOfBinaryTree(data1))  # 3

    data2 = {"tree": {"value": 1, "right": {"value": 2}}}
    print(maximumDepthOfBinaryTree(data2))  # 2`,
            go: `package main

import "fmt"

// TreeNode represents a node in the binary tree
type TreeNode struct {
    Value int
    Left  *TreeNode
    Right *TreeNode
}

// buildTree converts map data to TreeNode structure
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

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

// MaximumDepthOfBinaryTree returns the maximum depth of the tree
// Time: O(n), Space: O(h)
func MaximumDepthOfBinaryTree(data map[string]interface{}) int {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    var dfs func(node *TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil {
            return 0
        }

        leftDepth := dfs(node.Left)
        rightDepth := dfs(node.Right)

        return 1 + max(leftDepth, rightDepth)
    }

    return dfs(root)
}

func main() {
    data := map[string]interface{}{
        "tree": map[string]interface{}{
            "value": float64(3),
            "left":  map[string]interface{}{"value": float64(9)},
            "right": map[string]interface{}{
                "value": float64(20),
                "left":  map[string]interface{}{"value": float64(15)},
                "right": map[string]interface{}{"value": float64(7)},
            },
        },
    }
    fmt.Println(MaximumDepthOfBinaryTree(data)) // 3
}`
        },
        twists: [
            { id: '02-node-depths/01-maximum-depth/twist-01-iterative-maximum-depth', name: 'Iterative Maximum Depth', difficulty: 'Easy' },
            { id: '02-node-depths/01-maximum-depth/twist-02-n-ary-tree-maximum-depth', name: 'N-ary Tree Maximum Depth', difficulty: 'Easy' },
            { id: '02-node-depths/01-maximum-depth/twist-03-maximum-depth-with-o1-space', name: 'Maximum Depth with O(1) Space', difficulty: 'Hard' },
            { id: '02-node-depths/01-maximum-depth/twist-04-conceptual-trap-depth-vs-height', name: 'Conceptual Trap: Depth vs Height', difficulty: 'Easy' },
            { id: '02-node-depths/01-maximum-depth/twist-05-streaming-depth-updates', name: 'Streaming Depth Updates', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth'] = problem;

})();
