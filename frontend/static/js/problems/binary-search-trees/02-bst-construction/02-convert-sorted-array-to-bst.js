/**
 * Convert Sorted Array to BST
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-construction-balanced
 */
(function() {
    'use strict';

    const problem = {
        name: 'Convert Sorted Array to BST',
        difficulty: 'Medium',
        algorithm: 'bst-construction-balanced',
        parent: '02-bst-construction',
        description: 'Given an integer array nums where the elements are sorted in **ascending order**, convert it to a **height-balanced** binary search tree. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(log n) recursion stack'
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
        "nums": [
                -10,
                -3,
                0,
                5,
                9
        ]
},
        output: [0, -3, 9, -10, null, 5],
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
    },
    {
        input: {
        "nums": [
                1,
                2,
                3,
                4,
                5,
                6,
                7
        ]
},
        output: [4, 2, 6, 1, 3, 5, 7],
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

def convertSortedArrayToBst(data):
    """
    Convert Sorted Array to Height-Balanced BST

    Approach: Use middle element as root for balanced tree,
    recursively build left and right subtrees.

    Time: O(n)
    Space: O(log n) recursion stack
    """
    nums = data.get("nums", [])

    if not nums:
        return []

    def build(left, right):
        if left > right:
            return None

        mid = (left + right) // 2
        node = TreeNode(nums[mid])
        node.left = build(left, mid - 1)
        node.right = build(mid + 1, right)
        return node

    root = build(0, len(nums) - 1)

    # Convert tree to level-order array for output
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


# Test
if __name__ == "__main__":
    print(convertSortedArrayToBst({"nums": [-10, -3, 0, 5, 9]}))
    print(convertSortedArrayToBst({"nums": [1, 2, 3, 4, 5, 6, 7]}))`,
            go: `package main

import "fmt"

type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

func ConvertSortedArrayToBst(data map[string]interface{}) []interface{} {
    numsInterface := data["nums"].([]interface{})
    nums := make([]int, len(numsInterface))
    for i, v := range numsInterface {
        nums[i] = int(v.(float64))
    }

    if len(nums) == 0 {
        return []interface{}{}
    }

    var build func(left, right int) *TreeNode
    build = func(left, right int) *TreeNode {
        if left > right {
            return nil
        }
        mid := (left + right) / 2
        node := &TreeNode{Val: nums[mid]}
        node.Left = build(left, mid-1)
        node.Right = build(mid+1, right)
        return node
    }

    root := build(0, len(nums)-1)

    // Convert to level-order array
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

func main() {
    data := map[string]interface{}{
        "nums": []interface{}{-10.0, -3.0, 0.0, 5.0, 9.0},
    }
    fmt.Println(ConvertSortedArrayToBst(data))
}`
        },
        twists: [
            { id: '02-bst-construction/02-convert-sorted-array-to-bst/twist-01-convert-sorted-linked-list-to-bst', name: 'Convert Sorted Linked List to BST', difficulty: 'Medium' },
            { id: '02-bst-construction/02-convert-sorted-array-to-bst/twist-02-all-possible-height-balanced-bsts', name: 'All Possible Height-Balanced BSTs', difficulty: 'Hard' },
            { id: '02-bst-construction/02-convert-sorted-array-to-bst/twist-03-convert-sorted-array-to-weight-balanced-bst', name: 'Convert Sorted Array to Weight-Balanced BST', difficulty: 'Hard' },
            { id: '02-bst-construction/02-convert-sorted-array-to-bst/twist-04-iterative-sorted-array-to-bst', name: 'Iterative Sorted Array to BST', difficulty: 'Medium' },
            { id: '02-bst-construction/02-convert-sorted-array-to-bst/twist-05-sorted-array-to-bst-with-minimum-rotations', name: 'Sorted Array to BST with Minimum Rotations', difficulty: 'Very Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '02-bst-construction/02-convert-sorted-array-to-bst', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/02-bst-construction/02-convert-sorted-array-to-bst'] = problem;

})();
