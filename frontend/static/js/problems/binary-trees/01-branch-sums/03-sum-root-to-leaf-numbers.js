/**
 * Sum Root to Leaf Numbers
 * Category: binary-trees
 * Difficulty: Medium
 * Algorithm: tree-dfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum Root to Leaf Numbers',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '01-branch-sums',
        description: 'You are given the root of a binary tree containing digits from 0 to 9 only. Each root-to-leaf path in the tree represents a number formed by concatenating the digits. Return the total sum of all root-to-leaf numbers.',
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
        output: 25,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "tree": {
                "value": 4,
                "left": {
                        "value": 9,
                        "left": {
                                "value": 5
                        },
                        "right": {
                                "value": 1
                        }
                },
                "right": {
                        "value": 0
                }
        }
},
        output: 1026,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `def sumRootToLeafNumbers(data):
    """
    Sum Root to Leaf Numbers

    Each root-to-leaf path represents a number formed by concatenating
    the node values. Return the sum of all such numbers.

    Example: Path 1->2->3 represents number 123

    Key insight: As we traverse, multiply current number by 10 and add
    the new digit: num = num * 10 + node.value

    Time: O(n) - visit each node once
    Space: O(h) - recursion stack depth equals tree height
    """
    tree = data.get('tree')

    if not tree:
        return 0

    total_sum = 0

    def dfs(node, current_num):
        nonlocal total_sum

        if not node:
            return

        # Build the number: shift left and add current digit
        current_num = current_num * 10 + node['value']

        left = node.get('left')
        right = node.get('right')

        # If leaf node, add the complete number to total
        if not left and not right:
            total_sum += current_num
        else:
            # Continue traversal
            if left:
                dfs(left, current_num)
            if right:
                dfs(right, current_num)

    dfs(tree, 0)
    return total_sum


# Test
if __name__ == "__main__":
    data1 = {"tree": {"value": 1, "left": {"value": 2}, "right": {"value": 3}}}
    print(sumRootToLeafNumbers(data1))  # 25 (12 + 13)

    data2 = {"tree": {"value": 4, "left": {"value": 9, "left": {"value": 5}, "right": {"value": 1}}, "right": {"value": 0}}}
    print(sumRootToLeafNumbers(data2))  # 1026 (495 + 491 + 40)`,
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

// SumRootToLeafNumbers calculates the sum of all root-to-leaf numbers
// Time: O(n), Space: O(h)
func SumRootToLeafNumbers(data map[string]interface{}) int {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    totalSum := 0

    var dfs func(node *TreeNode, currentNum int)
    dfs = func(node *TreeNode, currentNum int) {
        if node == nil {
            return
        }

        // Build the number: shift left and add current digit
        currentNum = currentNum*10 + node.Value

        // If leaf node, add complete number to total
        if node.Left == nil && node.Right == nil {
            totalSum += currentNum
        } else {
            dfs(node.Left, currentNum)
            dfs(node.Right, currentNum)
        }
    }

    dfs(root, 0)
    return totalSum
}

func main() {
    data := map[string]interface{}{
        "tree": map[string]interface{}{
            "value": float64(4),
            "left": map[string]interface{}{
                "value": float64(9),
                "left":  map[string]interface{}{"value": float64(5)},
                "right": map[string]interface{}{"value": float64(1)},
            },
            "right": map[string]interface{}{"value": float64(0)},
        },
    }
    fmt.Println(SumRootToLeafNumbers(data)) // 1026
}`
        },
        twists: [
            { id: '01-branch-sums/03-sum-root-to-leaf-numbers/twist-01-binary-root-to-leaf-numbers', name: 'Binary Root-to-Leaf Numbers', difficulty: 'Medium' },
            { id: '01-branch-sums/03-sum-root-to-leaf-numbers/twist-02-n-ary-tree-concatenated-numbers', name: 'N-ary Tree Concatenated Numbers', difficulty: 'Medium' },
            { id: '01-branch-sums/03-sum-root-to-leaf-numbers/twist-03-iterative-with-level-order', name: 'Iterative with Level-Order', difficulty: 'Medium' },
            { id: '01-branch-sums/03-sum-root-to-leaf-numbers/twist-04-multi-digit-node-values', name: 'Multi-Digit Node Values', difficulty: 'Hard' },
            { id: '01-branch-sums/03-sum-root-to-leaf-numbers/twist-05-space-constrained-threaded-approach', name: 'Space-Constrained Threaded Approach', difficulty: 'Hard' },
            { id: '01-branch-sums/03-sum-root-to-leaf-numbers/twist-06-reverse-leaf-to-root-numbers', name: 'Reverse: Leaf-to-Root Numbers', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/03-sum-root-to-leaf-numbers', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/03-sum-root-to-leaf-numbers'] = problem;

})();
