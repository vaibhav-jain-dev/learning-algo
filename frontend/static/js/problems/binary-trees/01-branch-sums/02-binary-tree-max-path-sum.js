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
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, the result is 6.'
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
        explanation: 'Traversing the tree structure, we process nodes to compute the result. For input tree={\'value\': -10, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 42.'
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
            {
                title: 'Max Path Sum in N-ary Tree',
                difficulty: 'Very Hard',
                description: 'Find the maximum path sum in an N-ary tree where each node can have any number of children. The path can go through any two children of a node.',
                whyDifferent: 'With binary trees you compare left vs right. With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.',
                example: 'Node(1, children=[Node(5), Node(-3), Node(4)]). Best path: 5->1->4=10. Must pick top-2 from N children.'
            },
            {
                title: 'Return the Actual Path',
                difficulty: 'Hard',
                description: 'Instead of returning just the maximum sum, return the actual sequence of node values that form the maximum path.',
                whyDifferent: 'Tracking the sum is O(1) state per node, but reconstructing the path requires storing path segments at each node and merging them. The postorder logic must return both sum and path.',
                example: 'Tree: -10->9, -10->20->15, -10->20->7. Output: [15, 20, 7] with sum 42.'
            },
            {
                title: 'Max Path Sum with Exactly K Nodes',
                difficulty: 'Very Hard',
                description: 'Find the maximum path sum where the path must contain exactly K nodes. The path still follows parent-child connections.',
                whyDifferent: 'Adds a constraint dimension. At each node you must track the best sum for each possible path length (1..K), turning a simple DFS into a problem requiring dynamic programming on the tree.',
                example: 'Tree: 1->2->3, 1->4. K=3. Path 3->2->1=6. Path 2->1->4=7. Answer: 7.'
            },
            {
                title: 'Concurrent Tree Modification',
                difficulty: 'Hard',
                description: 'While computing the max path sum, node values can be updated by another thread. Design a solution that handles concurrent modifications safely.',
                whyDifferent: 'Forces thinking about read consistency, locking strategies, or snapshot isolation. A simple DFS may read stale values partway through traversal, producing incorrect results.',
                example: 'During traversal, node value 20 is changed to -5. Result depends on whether you read old or new value.'
            },
            {
                title: 'Output Prediction Trap',
                difficulty: 'Medium',
                description: 'Given tree [-1, -2, -3], what is the max path sum? Many people incorrectly say 0 (empty path) or -1. The path must contain at least one node.',
                whyDifferent: 'Tests understanding of the constraint that the path must be non-empty. When all values are negative, the answer is the single largest (least negative) value, not zero.',
                example: 'Tree: -1->-2, -1->-3. Answer: -1 (the root alone). Not 0, not -2, not -6.'
            }
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
