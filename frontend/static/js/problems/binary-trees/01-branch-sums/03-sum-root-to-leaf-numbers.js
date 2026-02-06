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
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 1, \'left\': {\'value\': 2}, \'right\': {\'value\': 3}}, the result is 25.'
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
        explanation: 'Using depth-first search, we explore all paths to find the solution. For input tree={\'value\': 4, \'left\': {\'value\': 9, \'left\': {\'value\': 5}, \'right\': {\'value\': 1}}, \'right\': {\'value\': 0}}, the result is 1026.'
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
            {
                title: 'Binary Root-to-Leaf Numbers',
                difficulty: 'Medium',
                description: 'Instead of decimal digits, each node contains a binary digit (0 or 1). Each root-to-leaf path represents a binary number. Return the sum of all binary numbers.',
                whyDifferent: 'The formula changes from num*10+digit to num*2+digit. Conceptually similar but tests whether you understand the generalization to any base, not just base 10.',
                example: 'Tree: 1->0, 1->1. Paths: 10 (binary=2), 11 (binary=3). Sum=5.'
            },
            {
                title: 'N-ary Tree Concatenated Numbers',
                difficulty: 'Medium',
                description: 'Extend to an N-ary tree where each node has 0-9 digit values and can have any number of children. Sum all root-to-leaf numbers.',
                whyDifferent: 'Leaf detection changes and the branching factor is variable. You must iterate over children arrays rather than checking left/right, and manage the multiplication across all branches.',
                example: 'Node(4, children=[Node(9, children=[Node(5), Node(1)]), Node(0)]). Same result as base but different tree structure.'
            },
            {
                title: 'Iterative with Level-Order',
                difficulty: 'Medium',
                description: 'Solve using BFS (level-order traversal) instead of DFS. Track the running number for each node in the queue.',
                whyDifferent: 'BFS processes nodes level by level, so you must store the accumulated number with each node in the queue. Leaf detection happens when dequeuing, not when recursing.',
                example: 'Queue: [(root,0)] -> process 4, enqueue (9,49), (0,40) -> etc.'
            },
            {
                title: 'Multi-Digit Node Values',
                difficulty: 'Hard',
                description: 'Nodes can contain multi-digit numbers (e.g., 12, 345). The path concatenation uses the full number, not just a single digit.',
                whyDifferent: 'The formula changes from num*10+digit to num*(10^numDigits)+value. You need to compute the number of digits in each node value to shift correctly.',
                example: 'Tree: 12->34. Path represents number 1234, not 12*10+34=154. Must shift by number of digits.'
            },
            {
                title: 'Space-Constrained Threaded Approach',
                difficulty: 'Hard',
                description: 'Solve the problem using Morris traversal (O(1) space, excluding output). You cannot use recursion or an explicit stack.',
                whyDifferent: 'Morris traversal modifies tree pointers temporarily. The challenge is maintaining the running number correctly when following threaded links back up, since you revisit nodes.',
                example: 'Same input/output but achieved without recursion stack. Must undo thread links and adjust the running number when backtracking.'
            },
            {
                title: 'Reverse: Leaf-to-Root Numbers',
                difficulty: 'Medium',
                description: 'Instead of root-to-leaf, form numbers from leaf-to-root. The leaf digit is the most significant digit.',
                whyDifferent: 'You cannot build the number top-down anymore. You need to know the depth of each leaf first to determine the place value of the root digit, or collect digits and reverse.',
                example: 'Tree: 1->2, 1->3. Leaf-to-root paths: 21 and 31. Sum=52 (instead of 12+13=25).'
            }
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
