/**
 * Path Sum to Target
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Path Sum to Target',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'Given a binary tree and a target sum, find all root-to-leaf paths where the sum of node values equals the target. A leaf is a node with no children. Return all paths as lists of node values from root to leaf.',
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
                "value": 5,
                "left": {
                        "value": 4,
                        "left": {
                                "value": 11,
                                "left": {
                                        "value": 7
                                },
                                "right": {
                                        "value": 2
                                }
                        }
                },
                "right": {
                        "value": 8,
                        "left": {
                                "value": 13
                        },
                        "right": {
                                "value": 4,
                                "left": {
                                        "value": 5
                                },
                                "right": {
                                        "value": 1
                                }
                        }
                }
        },
        "target": 22
},
        output: [[5, 4, 11, 2], [5, 8, 4, 5]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 5, \'left\': {\'value\': 4, \'left\': {\'value\': 11, \'left\': {\'value\': 7}, \'right\': {\'value\': 2}}}, \'right\': {\'value\': 8, \'left\': {\'value\': 13}, \'right\': {\'value\': 4, \'left\': {\'value\': 5}, \'right\': {\'value\': 1}}}}, target=22, the result is [[5, 4, 11, 2], [5, 8, 4, 5]].'
    },
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
        },
        "target": 4
},
        output: [[1, 3]],
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, target=4, the result is [[1, 3]].'
    }
        ],
        solutions: {
            python: `def pathSumToTarget(data):
    """
    Path Sum to Target

    Find all root-to-leaf paths where sum equals target.
    Uses DFS with backtracking to explore all paths.

    Time: O(n) - visit each node once
    Space: O(h) - recursion stack depth equals tree height
    """
    tree = data.get('tree')
    target = data.get('target')

    if not tree:
        return []

    result = []

    def dfs(node, current_path, current_sum):
        if not node:
            return

        # Add current node to path
        current_path.append(node['value'])
        current_sum += node['value']

        # Check if it's a leaf node
        left = node.get('left')
        right = node.get('right')

        if not left and not right:
            # Leaf node - check if sum equals target
            if current_sum == target:
                result.append(current_path[:])  # Make a copy
        else:
            # Continue DFS on children
            if left:
                dfs(left, current_path, current_sum)
            if right:
                dfs(right, current_path, current_sum)

        # Backtrack - remove current node from path
        current_path.pop()

    dfs(tree, [], 0)
    return result


# Test
if __name__ == "__main__":
    data = {
        "tree": {"value": 5, "left": {"value": 4, "left": {"value": 11, "left": {"value": 7}, "right": {"value": 2}}}, "right": {"value": 8, "left": {"value": 13}, "right": {"value": 4, "left": {"value": 5}, "right": {"value": 1}}}},
        "target": 22
    }
    print(pathSumToTarget(data))  # [[5, 4, 11, 2], [5, 8, 4, 5]]`,
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

// PathSumToTarget finds all root-to-leaf paths with sum equal to target
// Time: O(n), Space: O(h)
func PathSumToTarget(data map[string]interface{}) [][]int {
    treeData, _ := data["tree"].(map[string]interface{})
    target := int(data["target"].(float64))
    root := buildTree(treeData)

    var result [][]int
    var currentPath []int

    var dfs func(node *TreeNode, currentSum int)
    dfs = func(node *TreeNode, currentSum int) {
        if node == nil {
            return
        }

        currentPath = append(currentPath, node.Value)
        currentSum += node.Value

        // Check if leaf node
        if node.Left == nil && node.Right == nil {
            if currentSum == target {
                // Make a copy of the path
                pathCopy := make([]int, len(currentPath))
                copy(pathCopy, currentPath)
                result = append(result, pathCopy)
            }
        } else {
            dfs(node.Left, currentSum)
            dfs(node.Right, currentSum)
        }

        // Backtrack
        currentPath = currentPath[:len(currentPath)-1]
    }

    dfs(root, 0)
    return result
}

func main() {
    data := map[string]interface{}{
        "tree": map[string]interface{}{
            "value": float64(5),
            "left": map[string]interface{}{"value": float64(4), "left": map[string]interface{}{"value": float64(11), "left": map[string]interface{}{"value": float64(7)}, "right": map[string]interface{}{"value": float64(2)}}},
            "right": map[string]interface{}{"value": float64(8), "left": map[string]interface{}{"value": float64(13)}, "right": map[string]interface{}{"value": float64(4), "left": map[string]interface{}{"value": float64(5)}, "right": map[string]interface{}{"value": float64(1)}}},
        },
        "target": float64(22),
    }
    fmt.Println(PathSumToTarget(data)) // [[5 4 11 2] [5 8 4 5]]
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/01-path-sum-to-target', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/01-path-sum-to-target'] = problem;

})();
