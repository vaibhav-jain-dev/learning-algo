/**
 * Binary Tree Maximum Path Sum
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-max-path
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums',
        description: 'Given a binary tree, find the maximum path sum. A path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain at least one node and does not need to go through the root.',
        problem: 'Use DFS (preorder, inorder, or postorder) to traverse the tree. Choose the traversal order based on when you need to process the node relative to its children.',
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
                "value": 1,
                "left": {
                        "value": 2
                },
                "right": {
                        "value": 3
                }
        }
},
        output: 6,
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    },
    {
        input: {
        "tree": {
                "value": -10,
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
        output: 42,
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
    }
        ],
        solutions: {
            python: `def binaryTreeMaximumPathSum(data):
    """
    Binary Tree Maximum Path Sum

    Find the maximum path sum in a binary tree. The path can start
    and end at any node but must follow parent-child connections.

    Key insight: At each node, we have two choices:
    1. Include node in a path passing through it (node + left + right)
    2. Return the max single-branch path for parent to use

    Time: O(n) - visit each node once
    Space: O(h) - recursion stack depth equals tree height
    """
    tree = data.get('tree')

    if not tree:
        return 0

    max_sum = float('-inf')

    def dfs(node):
        nonlocal max_sum

        if not node:
            return 0

        # Get max path sum from left and right subtrees
        # Use max with 0 to ignore negative paths
        left_max = max(0, dfs(node.get('left')))
        right_max = max(0, dfs(node.get('right')))

        # Path through current node (could be the answer)
        current_path_sum = node['value'] + left_max + right_max
        max_sum = max(max_sum, current_path_sum)

        # Return max single branch path for parent
        # Parent can only use one branch, not both
        return node['value'] + max(left_max, right_max)

    dfs(tree)
    return max_sum


# Test
if __name__ == "__main__":
    data1 = {"tree": {"value": 1, "left": {"value": 2}, "right": {"value": 3}}}
    print(binaryTreeMaximumPathSum(data1))  # 6

    data2 = {"tree": {"value": -10, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}}
    print(binaryTreeMaximumPathSum(data2))  # 42`,
            go: `package main

import (
    "fmt"
    "math"
)

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

// BinaryTreeMaximumPathSum finds the maximum path sum in a binary tree
// Time: O(n), Space: O(h)
func BinaryTreeMaximumPathSum(data map[string]interface{}) int {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    maxSum := math.MinInt32

    var dfs func(node *TreeNode) int
    dfs = func(node *TreeNode) int {
        if node == nil {
            return 0
        }

        // Get max path sum from subtrees (ignore negative paths)
        leftMax := max(0, dfs(node.Left))
        rightMax := max(0, dfs(node.Right))

        // Path through current node
        currentPathSum := node.Value + leftMax + rightMax
        maxSum = max(maxSum, currentPathSum)

        // Return max single branch for parent
        return node.Value + max(leftMax, rightMax)
    }

    dfs(root)
    return maxSum
}

func main() {
    data := map[string]interface{}{
        "tree": map[string]interface{}{
            "value": float64(-10),
            "left":  map[string]interface{}{"value": float64(9)},
            "right": map[string]interface{}{
                "value": float64(20),
                "left":  map[string]interface{}{"value": float64(15)},
                "right": map[string]interface{}{"value": float64(7)},
            },
        },
    }
    fmt.Println(BinaryTreeMaximumPathSum(data)) // 42
}`
        },
        twists: [
            { id: '01-branch-sums/02-binary-tree-max-path-sum/twist-01-max-path-sum-in-n-ary-tree', name: 'Max Path Sum in N-ary Tree', difficulty: 'Very Hard' },
            { id: '01-branch-sums/02-binary-tree-max-path-sum/twist-02-return-the-actual-path', name: 'Return the Actual Path', difficulty: 'Hard' },
            { id: '01-branch-sums/02-binary-tree-max-path-sum/twist-03-max-path-sum-with-exactly-k-nodes', name: 'Max Path Sum with Exactly K Nodes', difficulty: 'Very Hard' },
            { id: '01-branch-sums/02-binary-tree-max-path-sum/twist-04-concurrent-tree-modification', name: 'Concurrent Tree Modification', difficulty: 'Hard' },
            { id: '01-branch-sums/02-binary-tree-max-path-sum/twist-05-output-prediction-trap', name: 'Output Prediction Trap', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum'] = problem;

})();
