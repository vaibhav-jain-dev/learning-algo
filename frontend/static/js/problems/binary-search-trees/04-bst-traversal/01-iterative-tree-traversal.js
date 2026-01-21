/**
 * Iterative Tree Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Tree Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Implement **in-order**, **pre-order**, and **post-order** tree traversals **iteratively** using explicit stacks (without recursion). For a binary tree, implement: 1. inorderIterative(root) - returns inorder traversal 2. preorderIterative(root) - returns preorder traversal 3. postorderIterative(root) - returns postorder traversal',
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
                1,
                2,
                3,
                4,
                5,
                null,
                6
        ]
},
        output: {"inorder": [4, 2, 5, 1, 3, 6], "preorder": [1, 2, 4, 5, 3, 6], "postorder": [4, 5, 2, 6, 3, 1]},
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 6] (length 7), the result is {\'inorder\': [4, 2, 5, 1, 3, 6], \'preorder\': [1, 2, 4, 5, 3, 6], \'postorder\': [4, 5, 2, 6, 3, 1]}.'
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

def inorderIterative(root):
    """Iterative inorder traversal: Left -> Root -> Right"""
    result = []
    stack = []
    current = root

    while current or stack:
        # Go to leftmost node
        while current:
            stack.append(current)
            current = current.left

        # Process current node
        current = stack.pop()
        result.append(current.val)

        # Move to right subtree
        current = current.right

    return result

def preorderIterative(root):
    """Iterative preorder traversal: Root -> Left -> Right"""
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        # Push right first so left is processed first
        if node.right:
            stack.append(node.right)
        if node.left:
            stack.append(node.left)

    return result

def postorderIterative(root):
    """Iterative postorder traversal: Left -> Right -> Root"""
    if not root:
        return []

    result = []
    stack = [root]

    while stack:
        node = stack.pop()
        result.append(node.val)

        # Push left first, then right (reverse of preorder)
        if node.left:
            stack.append(node.left)
        if node.right:
            stack.append(node.right)

    # Reverse to get postorder
    return result[::-1]

def iterativeTreeTraversal(data):
    """
    Iterative Tree Traversal - All three traversals using stacks.

    Time: O(n) for each traversal
    Space: O(h) where h is tree height
    """
    tree = data.get("tree", [])
    root = buildTree(tree)

    if not root:
        return {"inorder": [], "preorder": [], "postorder": []}

    return {
        "inorder": inorderIterative(root),
        "preorder": preorderIterative(root),
        "postorder": postorderIterative(root)
    }


# Test
if __name__ == "__main__":
    print(iterativeTreeTraversal({"tree": [1, 2, 3, 4, 5, None, 6]}))`,
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

func inorderIterative(root *TreeNode) []int {
    var result []int
    var stack []*TreeNode
    current := root

    for current != nil || len(stack) > 0 {
        for current != nil {
            stack = append(stack, current)
            current = current.Left
        }
        current = stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        result = append(result, current.Val)
        current = current.Right
    }

    return result
}

func preorderIterative(root *TreeNode) []int {
    if root == nil {
        return []int{}
    }

    var result []int
    stack := []*TreeNode{root}

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        result = append(result, node.Val)

        if node.Right != nil {
            stack = append(stack, node.Right)
        }
        if node.Left != nil {
            stack = append(stack, node.Left)
        }
    }

    return result
}

func postorderIterative(root *TreeNode) []int {
    if root == nil {
        return []int{}
    }

    var result []int
    stack := []*TreeNode{root}

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        result = append(result, node.Val)

        if node.Left != nil {
            stack = append(stack, node.Left)
        }
        if node.Right != nil {
            stack = append(stack, node.Right)
        }
    }

    // Reverse
    for i, j := 0, len(result)-1; i < j; i, j = i+1, j-1 {
        result[i], result[j] = result[j], result[i]
    }

    return result
}

func IterativeTreeTraversal(data map[string]interface{}) map[string][]int {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return map[string][]int{"inorder": {}, "preorder": {}, "postorder": {}}
    }

    return map[string][]int{
        "inorder":   inorderIterative(root),
        "preorder":  preorderIterative(root),
        "postorder": postorderIterative(root),
    }
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{1.0, 2.0, 3.0, 4.0, 5.0, nil, 6.0},
    }
    fmt.Println(IterativeTreeTraversal(data))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/01-iterative-tree-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/01-iterative-tree-traversal'] = problem;

})();
