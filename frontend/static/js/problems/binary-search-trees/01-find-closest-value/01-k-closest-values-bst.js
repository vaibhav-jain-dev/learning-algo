/**
 * K Closest Values in BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-search
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Values in BST',
        difficulty: 'Medium',
        algorithm: 'bst-search',
        parent: '01-find-closest-value',
        description: 'Given the root of a binary search tree, a target value, and an integer k, return the k values in the BST that are closest to the target. You may return the answer in any order. You are guaranteed to have only one unique set of k closest values in the BST.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n log k) or O(log n + k)',
            space: 'O(k + h)'
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
                5,
                1,
                3
        ],
        "target": 3.7,
        "k": 2
},
        output: [4, 3],
        explanation: 'Processing the input data produces the output. For input tree=[4, 2, 5, 1, 3], target=3.7, k=2, the result is [4, 3].'
    },
    {
        input: {
        "tree": [
                8,
                4,
                12,
                2,
                6,
                10,
                14,
                1,
                3,
                5,
                7
        ],
        "target": 6.5,
        "k": 4
},
        output: [6, 7, 5, 8],
        explanation: 'Processing the input data produces the output. For input tree=[8, 4, ..., 7] (length 11), target=6.5, k=4, the result is [6, 7, 5, 8].'
    }
        ],
        solutions: {
            python: `import heapq
from collections import deque

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

def kClosestValuesInBst(data):
    """
    K Closest Values in BST

    Approach: Use a max-heap of size k to track k closest values.
    We use negative differences for max-heap behavior in Python's min-heap.

    Time: O(n log k)
    Space: O(k + h) where h is tree height
    """
    tree = data.get("tree", [])
    target = data.get("target", 0)
    k = data.get("k", 1)

    root = buildTree(tree)
    if not root:
        return []

    # Max-heap (use negative diff for max-heap behavior)
    # Store (-diff, value)
    max_heap = []

    def inorder(node):
        if not node:
            return
        inorder(node.left)

        diff = abs(node.val - target)
        if len(max_heap) < k:
            heapq.heappush(max_heap, (-diff, node.val))
        elif diff < -max_heap[0][0]:
            heapq.heapreplace(max_heap, (-diff, node.val))

        inorder(node.right)

    inorder(root)

    return [val for _, val in max_heap]


# Test
if __name__ == "__main__":
    print(kClosestValuesInBst({"tree": [4, 2, 5, 1, 3], "target": 3.7, "k": 2}))`,
            go: `package main

import (
    "container/heap"
    "fmt"
    "math"
)

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

// MaxHeap for tracking k closest values
type Item struct {
    diff  float64
    value int
}

type MaxHeap []Item

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i].diff > h[j].diff } // Max heap
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(Item)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func buildTree(arr []interface{}) *TreeNode {
    if len(arr) == 0 {
        return nil
    }
    if arr[0] == nil {
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

func KClosestValuesInBst(data map[string]interface{}) []int {
    treeArr := data["tree"].([]interface{})
    target := data["target"].(float64)
    k := int(data["k"].(float64))

    root := buildTree(treeArr)
    if root == nil {
        return []int{}
    }

    h := &MaxHeap{}
    heap.Init(h)

    var inorder func(node *TreeNode)
    inorder = func(node *TreeNode) {
        if node == nil {
            return
        }
        inorder(node.Left)

        diff := math.Abs(float64(node.Val) - target)
        if h.Len() < k {
            heap.Push(h, Item{diff: diff, value: node.Val})
        } else if diff < (*h)[0].diff {
            heap.Pop(h)
            heap.Push(h, Item{diff: diff, value: node.Val})
        }

        inorder(node.Right)
    }

    inorder(root)

    result := make([]int, h.Len())
    for i := 0; i < len(result); i++ {
        result[i] = (*h)[i].value
    }
    return result
}

func main() {
    data := map[string]interface{}{
        "tree":   []interface{}{4.0, 2.0, 5.0, 1.0, 3.0},
        "target": 3.7,
        "k":      2.0,
    }
    fmt.Println(KClosestValuesInBst(data))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '01-find-closest-value/01-k-closest-values-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/01-find-closest-value/01-k-closest-values-bst'] = problem;

})();
