/**
 * Morris Traversal
 * Category: binary-search-trees
 * Difficulty: Hard
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Morris Traversal',
        difficulty: 'Hard',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Implement **Morris Traversal** to perform inorder and preorder tree traversals with **O(1) space complexity** (no stack, no recursion). Morris Traversal achieves constant space by temporarily modifying the tree structure - creating threads from the rightmost node of left subtrees back to their ancestors.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
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
                4,
                2,
                6,
                1,
                3,
                5,
                7
        ]
},
        output: [1, 2, 3, 4, 5, 6, 7],
        explanation: 'Processing the input data produces the output. For input tree=[4, 2, ..., 7] (length 7), the result is [1, ..., 7] (length 7).'
    },
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
        output: [4, 2, 5, 1, 3, 6],
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 6] (length 7), the result is [4, ..., 6] (length 6).'
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

def morrisInorder(root):
    """
    Morris Inorder Traversal - O(1) space complexity.

    Key idea: Use threaded binary tree. Create temporary links
    from rightmost node of left subtree back to current node.
    """
    result = []
    current = root

    while current:
        if current.left is None:
            # No left child, visit current and go right
            result.append(current.val)
            current = current.right
        else:
            # Find inorder predecessor (rightmost in left subtree)
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                # Create thread: link predecessor to current
                predecessor.right = current
                current = current.left
            else:
                # Thread exists, remove it and visit current
                predecessor.right = None
                result.append(current.val)
                current = current.right

    return result

def morrisPreorder(root):
    """
    Morris Preorder Traversal - O(1) space complexity.
    """
    result = []
    current = root

    while current:
        if current.left is None:
            result.append(current.val)
            current = current.right
        else:
            predecessor = current.left
            while predecessor.right and predecessor.right != current:
                predecessor = predecessor.right

            if predecessor.right is None:
                # Visit before going left (preorder)
                result.append(current.val)
                predecessor.right = current
                current = current.left
            else:
                predecessor.right = None
                current = current.right

    return result

def morrisTraversal(data):
    """
    Morris Traversal - Inorder traversal with O(1) space.

    Approach: Temporarily modify tree structure by creating
    threads from predecessors back to ancestors.

    Time: O(n)
    Space: O(1) - no stack or recursion needed
    """
    tree = data.get("tree", [])
    root = buildTree(tree)

    if not root:
        return []

    return morrisInorder(root)


# Test
if __name__ == "__main__":
    print(morrisTraversal({"tree": [4, 2, 6, 1, 3, 5, 7]}))
    print(morrisTraversal({"tree": [1, 2, 3, 4, 5, None, 6]}))`,
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

func morrisInorder(root *TreeNode) []int {
    var result []int
    current := root

    for current != nil {
        if current.Left == nil {
            result = append(result, current.Val)
            current = current.Right
        } else {
            // Find predecessor
            predecessor := current.Left
            for predecessor.Right != nil && predecessor.Right != current {
                predecessor = predecessor.Right
            }

            if predecessor.Right == nil {
                // Create thread
                predecessor.Right = current
                current = current.Left
            } else {
                // Remove thread, visit current
                predecessor.Right = nil
                result = append(result, current.Val)
                current = current.Right
            }
        }
    }

    return result
}

func morrisPreorder(root *TreeNode) []int {
    var result []int
    current := root

    for current != nil {
        if current.Left == nil {
            result = append(result, current.Val)
            current = current.Right
        } else {
            predecessor := current.Left
            for predecessor.Right != nil && predecessor.Right != current {
                predecessor = predecessor.Right
            }

            if predecessor.Right == nil {
                result = append(result, current.Val)
                predecessor.Right = current
                current = current.Left
            } else {
                predecessor.Right = nil
                current = current.Right
            }
        }
    }

    return result
}

func MorrisTraversal(data map[string]interface{}) []int {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return []int{}
    }

    return morrisInorder(root)
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{4.0, 2.0, 6.0, 1.0, 3.0, 5.0, 7.0},
    }
    fmt.Println(MorrisTraversal(data))
}`
        },
        twists: [
            { id: '04-bst-traversal/02-morris-traversal/twist-01-morris-postorder-traversal', name: 'Morris Postorder Traversal', difficulty: 'Very Hard' },
            { id: '04-bst-traversal/02-morris-traversal/twist-02-morris-traversal-on-a-threaded-bst', name: 'Morris Traversal on a Threaded BST', difficulty: 'Hard' },
            { id: '04-bst-traversal/02-morris-traversal/twist-03-morris-traversal-with-modification-detection', name: 'Morris Traversal with Modification Detection', difficulty: 'Hard' },
            { id: '04-bst-traversal/02-morris-traversal/twist-04-flatten-bst-to-linked-list-using-morris', name: 'Flatten BST to Linked List Using Morris', difficulty: 'Medium' },
            { id: '04-bst-traversal/02-morris-traversal/twist-05-count-bst-nodes-using-o1-space', name: 'Count BST Nodes Using O(1) Space', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/02-morris-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/02-morris-traversal'] = problem;

})();
