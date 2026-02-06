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
            {
                title: 'Morris Postorder Traversal',
                difficulty: 'Very Hard',
                description: 'Implement postorder traversal using Morris threading with O(1) auxiliary space. This is significantly harder than Morris inorder or preorder.',
                whyDifferent: 'Morris inorder/preorder naturally yield their orders through the threading mechanism. Postorder requires processing nodes in reverse along right boundaries of left subtrees when removing threads, involving a linked-list reversal step within the traversal.',
                example: 'Tree: [1,2,3,4,5,6,7]. Morris postorder must produce [4,5,2,6,7,3,1] using O(1) space by reversing right-boundary chains.'
            },
            {
                title: 'Morris Traversal on a Threaded BST',
                difficulty: 'Hard',
                description: 'The BST is already threaded (null right pointers point to inorder successors). Perform inorder traversal using these existing threads without creating new ones.',
                whyDifferent: 'Standard Morris creates and removes threads temporarily. With pre-existing threads, you must distinguish real right children from thread pointers (typically via a boolean flag per node), changing the navigation logic entirely.',
                example: 'Pre-threaded tree: node 1 right-thread points to 2, node 3 right-thread points to 4. Traverse using existing threads without modification.'
            },
            {
                title: 'Morris Traversal with Modification Detection',
                difficulty: 'Hard',
                description: 'Another thread is concurrently reading the tree. Implement Morris traversal that detects if the tree was modified by another reader during traversal (since Morris temporarily modifies the tree).',
                whyDifferent: 'Morris traversal creates temporary modifications that could confuse concurrent readers. You need a mechanism to detect conflicts -- perhaps using version numbers or checksums -- and either retry or abort gracefully.',
                example: 'Thread A does Morris traversal. Thread B reads node.right and sees a thread pointer instead of null. Detection mechanism should flag this conflict.'
            },
            {
                title: 'Flatten BST to Linked List Using Morris',
                difficulty: 'Medium',
                description: 'Use Morris traversal to flatten a BST into a sorted linked list in-place using right pointers, with O(1) auxiliary space.',
                whyDifferent: 'Instead of just visiting nodes, you must permanently restructure the tree into a right-skewed chain during the traversal. The threading mechanism of Morris is repurposed for permanent modification rather than temporary navigation.',
                example: 'Tree: [4,2,6,1,3,5,7] -> Flattened: 1->2->3->4->5->6->7 (each node\'s left is null, right points to next).'
            },
            {
                title: 'Count BST Nodes Using O(1) Space',
                difficulty: 'Medium',
                description: 'Count the total number of nodes in a BST using Morris traversal, achieving O(1) space. Also compute the sum and average of all node values in the same pass.',
                whyDifferent: 'While the traversal mechanism is the same, aggregating statistics requires careful counting. The key challenge is that Morris visits some nodes twice (once when creating the thread, once when removing it), so you must only count on the correct visit.',
                example: 'Tree: [10,5,15,2,7]. Morris traversal visits 5 twice (thread creation and removal). Count on thread-removal visit only. Result: count=5, sum=39, avg=7.8.'
            }
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
