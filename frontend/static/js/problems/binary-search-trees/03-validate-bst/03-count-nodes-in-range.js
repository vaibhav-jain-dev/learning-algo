/**
 * Count Nodes in Range
 * Category: binary-search-trees
 * Difficulty: Easy
 * Algorithm: bst-range
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Nodes in Range',
        difficulty: 'Easy',
        algorithm: 'bst-range',
        parent: '03-validate-bst',
        description: 'Given the root node of a binary search tree and two integers low and high, return the **count of nodes** whose values are in the inclusive range [low, high]. **Variant:** Also implement a version that returns the **sum of values** of nodes in the range.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n) worst, O(log n + k) average',
            space: 'O(h)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
        "tree": [
                10,
                5,
                15,
                3,
                7,
                null,
                18
        ],
        "low": 7,
        "high": 15
},
        output: {"count": 3, "sum": 32},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 18] (length 7), low=7, high=15, the result is {\'count\': 3, \'sum\': 32}.'
    },
    {
        input: {
        "tree": [
                10,
                5,
                15,
                3,
                7,
                13,
                18,
                1,
                null,
                6
        ],
        "low": 6,
        "high": 10
},
        output: {"count": 3, "sum": 23},
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 6] (length 10), low=6, high=10, the result is {\'count\': 3, \'sum\': 23}.'
    }
        ],
        solutions: {
            python: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def buildTree(arr):
    """Build tree from level-order array."""
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = deque([root])
    i = 1
    while queue and i < len(arr):
        node = queue.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

def countNodesInRange(data):
    """
    Count Nodes in Range

    Approach: Use BST property to prune search. Only traverse
    subtrees that could contain values in range [low, high].

    Time: O(n) worst case, O(log n + k) average where k is result count
    Space: O(h) recursion stack
    """
    tree = data.get("tree", [])
    low = data.get("low", 0)
    high = data.get("high", 0)

    root = buildTree(tree)

    if not root:
        return {"count": 0, "sum": 0}

    count = [0]
    total_sum = [0]

    def traverse(node):
        if not node:
            return

        # If current value is in range, count it
        if low <= node.val <= high:
            count[0] += 1
            total_sum[0] += node.val

        # Prune: only go left if there might be values >= low
        if node.val > low:
            traverse(node.left)

        # Prune: only go right if there might be values <= high
        if node.val < high:
            traverse(node.right)

    traverse(root)

    return {"count": count[0], "sum": total_sum[0]}


# Test
if __name__ == "__main__":
    print(countNodesInRange({"tree": [10, 5, 15, 3, 7, None, 18], "low": 7, "high": 15}))
    print(countNodesInRange({"tree": [10, 5, 15, 3, 7, 13, 18, 1, None, 6], "low": 6, "high": 10}))`,
            go: `package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func buildTree(arr []interface{}) *TreeNode {
    if len(arr) == 0 || arr[0] == nil {
        return nil
    }
    root := &TreeNode{Val: int(arr[0].(float64))}
    queue := []*TreeNode{root}
    i := 1
    for len(queue) > 0 && i < len(arr) {
        node := queue[0]
        queue = queue[1:]
        if i < len(arr) && arr[i] != nil {
            node.Left = &TreeNode{Val: int(arr[i].(float64))}
            queue = append(queue, node.Left)
        }
        i++
        if i < len(arr) && arr[i] != nil {
            node.Right = &TreeNode{Val: int(arr[i].(float64))}
            queue = append(queue, node.Right)
        }
        i++
    }
    return root
}

func CountNodesInRange(data map[string]interface{}) map[string]int {
    treeArr := data["tree"].([]interface{})
    low := int(data["low"].(float64))
    high := int(data["high"].(float64))

    root := buildTree(treeArr)

    if root == nil {
        return map[string]int{"count": 0, "sum": 0}
    }

    count := 0
    sum := 0

    var traverse func(node *TreeNode)
    traverse = func(node *TreeNode) {
        if node == nil {
            return
        }

        // If current value is in range
        if node.Val >= low && node.Val <= high {
            count++
            sum += node.Val
        }

        // Prune: only go left if there might be values >= low
        if node.Val > low {
            traverse(node.Left)
        }

        // Prune: only go right if there might be values <= high
        if node.Val < high {
            traverse(node.Right)
        }
    }

    traverse(root)

    return map[string]int{"count": count, "sum": sum}
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{10.0, 5.0, 15.0, 3.0, 7.0, nil, 18.0},
        "low":  7.0,
        "high": 15.0,
    }
    fmt.Println(CountNodesInRange(data))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/03-count-nodes-in-range', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/03-count-nodes-in-range'] = problem;

})();
