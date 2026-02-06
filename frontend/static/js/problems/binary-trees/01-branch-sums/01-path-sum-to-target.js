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
        twists: [
            {
                title: 'Any-to-Any Path Sum',
                difficulty: 'Hard',
                description: 'Find all paths that sum to the target, but the path can start and end at any node (not just root-to-leaf). Paths must go downward only.',
                whyDifferent: 'You need prefix sums to track all possible start points. At each node, check if currentSum - target exists in the prefix sum map, requiring a hash map approach instead of simple backtracking.',
                example: 'Tree: 10->5->3, 10->5->2, target=8. Path 5->3=8 is valid even though it does not start at root.'
            },
            {
                title: 'N-ary Tree Path Sum',
                difficulty: 'Medium',
                description: 'Find all root-to-leaf paths summing to target in an N-ary tree where each node can have any number of children.',
                whyDifferent: 'Instead of checking left/right children, you must iterate over a variable-length children array. Leaf detection changes from "no left and no right" to "empty children array".',
                example: 'Node(1, children=[Node(2, children=[Node(4)]), Node(6)]), target=7. Result: [[1,2,4], [1,6]].'
            },
            {
                title: 'Path Sum Count Only',
                difficulty: 'Medium',
                description: 'Instead of returning all paths, return only the count of root-to-leaf paths that sum to the target. Optimize to avoid storing paths.',
                whyDifferent: 'Eliminates the need for backtracking path arrays. You only need a counter, which simplifies space usage but requires careful thought about when to increment.',
                example: 'Same tree as base, target=22. Output: 2 (instead of [[5,4,11,2],[5,8,4,5]]).'
            },
            {
                title: 'Iterative Path Sum with Stack',
                difficulty: 'Medium',
                description: 'Solve the path sum to target problem without recursion, using an explicit stack that tracks the current path and running sum.',
                whyDifferent: 'Backtracking is natural in recursion but must be manually managed with a stack. You need to carefully detect when to pop path elements as you backtrack through the iterative traversal.',
                example: 'Stack stores (node, currentSum, pathSoFar). When popping, no automatic cleanup happens like in recursion.'
            },
            {
                title: 'Closest Path Sum',
                difficulty: 'Medium',
                description: 'If no exact path sum equals the target, return the path whose sum is closest to the target. If there is a tie, return the shorter path.',
                whyDifferent: 'Changes from an exact match to an optimization problem. You must track the best candidate path and its difference from target throughout the entire traversal, never pruning early.',
                example: 'Tree: 1->2->3, 1->4. Target=5. Path 1->4=5 is exact match. If target=7, closest is 1->2->3=6 (diff=1).'
            }
        ],
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
