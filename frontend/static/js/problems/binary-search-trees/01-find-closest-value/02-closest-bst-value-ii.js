/**
 * Inorder Predecessor and Successor
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'Inorder Predecessor and Successor',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given the root of a binary search tree and a target value, find the **inorder predecessor** and **inorder successor** of the target value. - **Inorder predecessor**: The largest value in the BST that is smaller than target - **Inorder successor**: The smallest value in the BST that is greater than target If the predecessor or successor does not exist, return -1 for that value.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(h)',
            space: 'O(1) iterative, O(h) recursive'
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
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ],
        "target": 4
},
        output: {"predecessor": 3, "successor": 5},
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=4, the result is {\'predecessor\': 3, \'successor\': 5}.'
    },
    {
        input: {
        "tree": [
                5,
                3,
                7,
                2,
                4,
                6,
                8
        ],
        "target": 1
},
        output: {"predecessor": -1, "successor": 2},
        explanation: 'Processing the input data produces the output. For input tree=[5, 3, ..., 8] (length 7), target=1, the result is {\'predecessor\': -1, \'successor\': 2}.'
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
    if not arr:
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

def inorderPredecessorAndSuccessor(data):
    """
    Inorder Predecessor and Successor

    Approach: Traverse the BST, using BST property to find
    predecessor (largest value < target) and successor (smallest value > target).

    Time: O(h) where h is tree height
    Space: O(1) iterative
    """
    tree = data.get("tree", [])
    target = data.get("target", 0)

    root = buildTree(tree)
    if not root:
        return {"predecessor": -1, "successor": -1}

    predecessor = -1
    successor = -1

    # Find predecessor: largest value less than target
    node = root
    while node:
        if node.val < target:
            predecessor = node.val
            node = node.right
        else:
            node = node.left

    # Find successor: smallest value greater than target
    node = root
    while node:
        if node.val > target:
            successor = node.val
            node = node.left
        else:
            node = node.right

    return {"predecessor": predecessor, "successor": successor}


# Test
if __name__ == "__main__":
    print(inorderPredecessorAndSuccessor({"tree": [5, 3, 7, 2, 4, 6, 8], "target": 4}))
    print(inorderPredecessorAndSuccessor({"tree": [5, 3, 7, 2, 4, 6, 8], "target": 1}))`,
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

func InorderPredecessorAndSuccessor(data map[string]interface{}) map[string]int {
    treeArr := data["tree"].([]interface{})
    target := int(data["target"].(float64))

    root := buildTree(treeArr)
    if root == nil {
        return map[string]int{"predecessor": -1, "successor": -1}
    }

    predecessor := -1
    successor := -1

    // Find predecessor: largest value less than target
    node := root
    for node != nil {
        if node.Val < target {
            predecessor = node.Val
            node = node.Right
        } else {
            node = node.Left
        }
    }

    // Find successor: smallest value greater than target
    node = root
    for node != nil {
        if node.Val > target {
            successor = node.Val
            node = node.Left
        } else {
            node = node.Right
        }
    }

    return map[string]int{"predecessor": predecessor, "successor": successor}
}

func main() {
    data := map[string]interface{}{
        "tree":   []interface{}{5.0, 3.0, 7.0, 2.0, 4.0, 6.0, 8.0},
        "target": 4.0,
    }
    fmt.Println(InorderPredecessorAndSuccessor(data))
}`
        },
        twists: [
            {
                title: 'Kth Predecessor and Kth Successor',
                difficulty: 'Hard',
                description: 'Instead of finding the immediate predecessor and successor, find the kth predecessor (kth largest value smaller than target) and kth successor (kth smallest value larger than target).',
                whyDifferent: 'You cannot simply track a single candidate while traversing. You need to maintain k candidates, which may require a stack-based or augmented approach rather than a simple greedy search.',
                example: 'Tree: [10,5,15,2,7,12,20,1,3], target=10, k=2 -> predecessor=5, successor=15. The 2nd predecessor is 5 (after 7), 2nd successor is 15 (after 12).'
            },
            {
                title: 'Predecessor and Successor with Node Deletion',
                difficulty: 'Medium',
                description: 'Find the inorder predecessor and successor, then delete the target node if it exists. Return the predecessor, successor, and the modified tree.',
                whyDifferent: 'Combining search with mutation requires careful ordering. The predecessor/successor relationship may change after deletion, so you must find them first, then handle the deletion cases (leaf, one child, two children).',
                example: 'Tree: [5,3,7,2,4,6,8], target=5 -> predecessor=4, successor=6, new tree root becomes 6 with restructured children.'
            },
            {
                title: 'Predecessor and Successor in Threaded BST',
                difficulty: 'Hard',
                description: 'The BST is threaded (null right pointers point to inorder successor, null left pointers point to inorder predecessor). Find predecessor and successor using only thread pointers, no stack.',
                whyDifferent: 'Threaded trees change the traversal paradigm entirely. You follow thread links instead of using a stack or recursion, requiring you to distinguish between real children and thread pointers.',
                example: 'Same logical result as base problem but traversal follows thread pointers instead of using recursive calls.'
            },
            {
                title: 'All Predecessors and Successors Within Range',
                difficulty: 'Medium',
                description: 'Find all inorder predecessors within distance D below the target and all successors within distance D above the target.',
                whyDifferent: 'Instead of finding exactly one predecessor and one successor, you must collect a variable-length set. This requires continuing the search beyond the first match and knowing when to stop.',
                example: 'Tree: [10,5,15,2,7,12,20], target=10, D=5 -> predecessors=[7,5], successors=[12,15]. All values within 5 of target on each side.'
            },
            {
                title: 'Predecessor and Successor with Parent Pointers',
                difficulty: 'Easy',
                description: 'Each node has a parent pointer. Given a direct reference to the target node (not the value), find its inorder predecessor and successor by traversing the tree using parent pointers.',
                whyDifferent: 'With parent pointers, you navigate up and down rather than from the root. The successor of a node with no right child is the first ancestor where the node is in its left subtree, which is a fundamentally different traversal pattern.',
                example: 'Given direct pointer to node 4 in tree [5,3,7,2,4,6,8] -> predecessor=3 (go up to parent), successor=5 (go up until we are a left child).'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/02-closest-bst-value-ii', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/02-closest-bst-value-ii'] = problem;

})();
