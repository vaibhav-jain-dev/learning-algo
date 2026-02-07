/**
 * Recover Binary Search Tree
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-repair
 */
(function() {
    'use strict';

    const problem = {
        name: 'Recover Binary Search Tree',
        difficulty: 'Medium',
        algorithm: 'bst-repair',
        parent: '03-validate-bst',
        description: 'You are given the root of a binary search tree (BST), where the values of **exactly two** nodes of the tree were swapped by mistake. Recover the tree without changing its structure.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(h) with recursion, O(1) with Morris'
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
                3,
                null,
                null,
                2
        ]
},
        output: [3, 1, null, null, 2],
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    },
    {
        input: {
        "tree": [
                3,
                1,
                4,
                null,
                null,
                2
        ]
},
        output: [2, 1, 4, null, null, 3],
        explanation: 'Process the tree recursively. For each subtree, the BST property guarantees all left descendants are smaller and right descendants are larger, enabling efficient computation.'
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

def treeToArray(root):
    """Convert tree back to level-order array."""
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        node = queue.popleft()
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    # Remove trailing Nones
    while result and result[-1] is None:
        result.pop()
    return result

def recoverBinarySearchTree(data):
    """
    Recover Binary Search Tree

    Approach: In-order traversal finds swapped nodes. In valid BST,
    inorder gives sorted sequence. Find two violations and swap.

    Time: O(n)
    Space: O(h) recursion stack
    """
    tree = data.get("tree", [])
    root = buildTree(tree)

    if not root:
        return []

    # Find the two swapped nodes using inorder traversal
    first = None  # First node that's wrong (larger than successor)
    second = None  # Second node that's wrong (smaller than predecessor)
    prev = None

    def inorder(node):
        nonlocal first, second, prev
        if not node:
            return

        inorder(node.left)

        # Check for violation
        if prev and prev.val > node.val:
            if first is None:
                first = prev  # First violation
            second = node  # Update second (handles adjacent and non-adjacent cases)

        prev = node
        inorder(node.right)

    inorder(root)

    # Swap the values of the two nodes
    if first and second:
        first.val, second.val = second.val, first.val

    return treeToArray(root)


# Test
if __name__ == "__main__":
    print(recoverBinarySearchTree({"tree": [1, 3, None, None, 2]}))
    print(recoverBinarySearchTree({"tree": [3, 1, 4, None, None, 2]}))`,
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

func treeToArray(root *TreeNode) []interface{} {
    if root == nil {
        return []interface{}{}
    }
    var result []interface{}
    queue := []*TreeNode{root}
    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        if node != nil {
            result = append(result, node.Val)
            queue = append(queue, node.Left)
            queue = append(queue, node.Right)
        } else {
            result = append(result, nil)
        }
    }
    // Remove trailing nils
    for len(result) > 0 && result[len(result)-1] == nil {
        result = result[:len(result)-1]
    }
    return result
}

func RecoverBinarySearchTree(data map[string]interface{}) []interface{} {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return []interface{}{}
    }

    var first, second, prev *TreeNode

    var inorder func(node *TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        inorder(node.Left)

        if prev != nil && prev.Val > node.Val {
            if first == nil {
                first = prev
            }
            second = node
        }
        prev = node

        inorder(node.Right)
    }

    inorder(root)

    // Swap values
    if first != nil && second != nil {
        first.Val, second.Val = second.Val, first.Val
    }

    return treeToArray(root)
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{1.0, 3.0, nil, nil, 2.0},
    }
    fmt.Println(RecoverBinarySearchTree(data))
}`
        },
        twists: [
            { id: '03-validate-bst/01-recover-bst/twist-01-recover-bst-with-k-swapped-nodes', name: 'Recover BST with K Swapped Nodes', difficulty: 'Very Hard' },
            { id: '03-validate-bst/01-recover-bst/twist-02-recover-bst-using-o1-space', name: 'Recover BST Using O(1) Space', difficulty: 'Hard' },
            { id: '03-validate-bst/01-recover-bst/twist-03-detect-how-many-nodes-are-swapped', name: 'Detect How Many Nodes Are Swapped', difficulty: 'Medium' },
            { id: '03-validate-bst/01-recover-bst/twist-04-recover-bst-by-moving-nodes-not-swapping-values', name: 'Recover BST by Moving Nodes (Not Swapping Values)', difficulty: 'Very Hard' },
            { id: '03-validate-bst/01-recover-bst/twist-05-verify-recovery-is-unique', name: 'Verify Recovery is Unique', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '03-validate-bst/01-recover-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/03-validate-bst/01-recover-bst'] = problem;

})();
