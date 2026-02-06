/**
 * Largest BST Subtree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-validation
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest BST Subtree',
        difficulty: 'Medium',
        algorithm: 'bst-validation',
        parent: '03-validate-bst',
        description: 'Given the root of a binary tree, find the largest subtree which is a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes. A **Binary Search Tree (BST)** is a tree in which all the nodes follow the below properties: - The left subtree values are less than the value of their parent node - The right subtree values are greater than the value of their parent node Return the size of the largest BST subtree.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
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
                1,
                8,
                null,
                7
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[10, 5, ..., 7] (length 7), the result is 3.'
    },
    {
        input: {
        "tree": [
                2,
                1,
                3
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input tree=[2, 1, 3], the result is 3.'
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

def largestBstSubtree(data):
    """
    Largest BST Subtree

    Approach: Post-order traversal. For each node, check if subtree
    is valid BST and track size. Return tuple (is_bst, size, min, max).

    Time: O(n)
    Space: O(h) recursion stack
    """
    tree = data.get("tree", [])
    root = buildTree(tree)

    if not root:
        return 0

    max_size = [0]

    def helper(node):
        """
        Returns (is_bst, size, min_val, max_val)
        """
        if not node:
            return (True, 0, float('inf'), float('-inf'))

        left_bst, left_size, left_min, left_max = helper(node.left)
        right_bst, right_size, right_min, right_max = helper(node.right)

        # Check if current subtree is BST
        if left_bst and right_bst and left_max < node.val < right_min:
            size = left_size + right_size + 1
            max_size[0] = max(max_size[0], size)
            return (True, size, min(left_min, node.val), max(right_max, node.val))
        else:
            return (False, 0, 0, 0)

    helper(root)
    return max_size[0]


# Test
if __name__ == "__main__":
    print(largestBstSubtree({"tree": [10, 5, 15, 1, 8, None, 7]}))
    print(largestBstSubtree({"tree": [2, 1, 3]}))`,
            go: `package main

import (
    "fmt"
    "math"
)

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

type BSTInfo struct {
    isBST bool
    size  int
    minV  int
    maxV  int
}

func LargestBstSubtree(data map[string]interface{}) int {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return 0
    }

    maxSize := 0

    var helper func(node *TreeNode) BSTInfo
    helper = func(node *TreeNode) BSTInfo {
        if node == nil {
            return BSTInfo{true, 0, math.MaxInt32, math.MinInt32}
        }

        left := helper(node.Left)
        right := helper(node.Right)

        if left.isBST && right.isBST && left.maxV < node.Val && node.Val < right.minV {
            size := left.size + right.size + 1
            if size > maxSize {
                maxSize = size
            }
            minV := left.minV
            if node.Val < minV {
                minV = node.Val
            }
            maxV := right.maxV
            if node.Val > maxV {
                maxV = node.Val
            }
            return BSTInfo{true, size, minV, maxV}
        }

        return BSTInfo{false, 0, 0, 0}
    }

    helper(root)
    return maxSize
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{10.0, 5.0, 15.0, 1.0, 8.0, nil, 7.0},
    }
    fmt.Println(LargestBstSubtree(data))
}`
        },
        twists: [
            { id: '03-validate-bst/02-largest-bst-subtree/twist-01-largest-bst-subtree-by-height', name: 'Largest BST Subtree by Height', difficulty: 'Medium' },
            { id: '03-validate-bst/02-largest-bst-subtree/twist-02-largest-almost-bst-subtree', name: 'Largest Almost-BST Subtree', difficulty: 'Hard' },
            { id: '03-validate-bst/02-largest-bst-subtree/twist-03-all-maximal-bst-subtrees', name: 'All Maximal BST Subtrees', difficulty: 'Hard' },
            { id: '03-validate-bst/02-largest-bst-subtree/twist-04-minimum-nodes-to-remove-for-full-bst', name: 'Minimum Nodes to Remove for Full BST', difficulty: 'Very Hard' },
            { id: '03-validate-bst/02-largest-bst-subtree/twist-05-largest-bst-subtree-with-augmented-nodes', name: 'Largest BST Subtree with Augmented Nodes', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/02-largest-bst-subtree', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/02-largest-bst-subtree'] = problem;

})();
