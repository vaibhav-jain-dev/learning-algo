/**
 * BST Iterator
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-iterator
 */
(function() {
    'use strict';

    const problem = {
        name: 'BST Iterator',
        difficulty: 'Medium',
        algorithm: 'bst-iterator',
        parent: '02-bst-construction',
        description: 'Implement the BSTIterator class that represents an iterator over the **in-order traversal** of a binary search tree (BST): - BSTIterator(TreeNode root) Initializes an object with the root of the BST. - int next() Returns the next smallest number in the BST. You may assume next() calls will always be valid. - boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false. The pointer should be initialized to a non-existent number smal.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(1) amortized for next(), O(1) for hasNext()',
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
                7,
                3,
                15,
                null,
                null,
                9,
                20
        ]
},
        output: [3, 7, 9, 15, 20],
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
    if arr[0] is None:
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

class BSTIterator:
    """
    BST Iterator using controlled recursion with stack.

    Maintains a stack of nodes to enable O(h) space
    with O(1) amortized time for next().
    """
    def __init__(self, root):
        self.stack = []
        self._push_left(root)

    def _push_left(self, node):
        """Push all left children onto stack."""
        while node:
            self.stack.append(node)
            node = node.left

    def next(self):
        """Return next smallest value. O(1) amortized."""
        node = self.stack.pop()
        if node.right:
            self._push_left(node.right)
        return node.val

    def hasNext(self):
        """Check if more elements exist. O(1)."""
        return len(self.stack) > 0

def bstIterator(data):
    """
    BST Iterator - returns all values via iterator in sorted order.

    Time: O(1) amortized for next(), O(1) for hasNext()
    Space: O(h) where h is tree height
    """
    tree = data.get("tree", [])

    root = buildTree(tree)
    if not root:
        return []

    iterator = BSTIterator(root)
    result = []

    while iterator.hasNext():
        result.append(iterator.next())

    return result


# Test
if __name__ == "__main__":
    print(bstIterator({"tree": [7, 3, 15, None, None, 9, 20]}))`,
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

// BSTIterator implements an iterator over BST in-order traversal
type BSTIterator struct {
    stack []*TreeNode
}

func NewBSTIterator(root *TreeNode) *BSTIterator {
    iter := &BSTIterator{stack: []*TreeNode{}}
    iter.pushLeft(root)
    return iter
}

func (iter *BSTIterator) pushLeft(node *TreeNode) {
    for node != nil {
        iter.stack = append(iter.stack, node)
        node = node.Left
    }
}

func (iter *BSTIterator) Next() int {
    n := len(iter.stack)
    node := iter.stack[n-1]
    iter.stack = iter.stack[:n-1]
    if node.Right != nil {
        iter.pushLeft(node.Right)
    }
    return node.Val
}

func (iter *BSTIterator) HasNext() bool {
    return len(iter.stack) > 0
}

func BstIterator(data map[string]interface{}) []int {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return []int{}
    }

    iter := NewBSTIterator(root)
    var result []int

    for iter.HasNext() {
        result = append(result, iter.Next())
    }

    return result
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{7.0, 3.0, 15.0, nil, nil, 9.0, 20.0},
    }
    fmt.Println(BstIterator(data))
}`
        },
        twists: [
            { id: '02-bst-construction/01-bst-iterator/twist-01-bidirectional-bst-iterator', name: 'Bidirectional BST Iterator', difficulty: 'Hard' },
            { id: '02-bst-construction/01-bst-iterator/twist-02-bst-iterator-with-peek', name: 'BST Iterator with Peek', difficulty: 'Medium' },
            { id: '02-bst-construction/01-bst-iterator/twist-03-bst-iterator-starting-from-a-given-value', name: 'BST Iterator Starting from a Given Value', difficulty: 'Medium' },
            { id: '02-bst-construction/01-bst-iterator/twist-04-merge-two-bst-iterators', name: 'Merge Two BST Iterators', difficulty: 'Hard' },
            { id: '02-bst-construction/01-bst-iterator/twist-05-bst-iterator-resilient-to-modifications', name: 'BST Iterator Resilient to Modifications', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/01-bst-iterator', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/01-bst-iterator'] = problem;

})();
