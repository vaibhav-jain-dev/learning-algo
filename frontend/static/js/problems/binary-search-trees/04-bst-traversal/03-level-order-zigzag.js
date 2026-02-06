/**
 * Binary Tree Zigzag Level Order Traversal
 * Category: binary-search-trees
 * Difficulty: Medium
 * Algorithm: bst-traversal
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Zigzag Level Order Traversal',
        difficulty: 'Medium',
        algorithm: 'bst-traversal',
        parent: '04-bst-traversal',
        description: 'Given the root of a binary tree, return the **zigzag level order traversal** of its nodes\' values. (i.e., from left to right, then right to left for the next level and alternate between).',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
                3,
                9,
                20,
                null,
                null,
                15,
                7
        ]
},
        output: [[3], [20, 9], [15, 7]],
        explanation: 'Processing the input data produces the output. For input tree=[3, 9, ..., 7] (length 7), the result is [[3], [20, 9], [15, 7]].'
    },
    {
        input: {
        "tree": [
                1,
                2,
                3,
                4,
                5,
                6,
                7
        ]
},
        output: [[1], [3, 2], [4, 5, 6, 7]],
        explanation: 'Processing the input data produces the output. For input tree=[1, 2, ..., 7] (length 7), the result is [[1], [3, 2], [4, 5, 6, 7]].'
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

def binaryTreeZigzagLevelOrderTraversal(data):
    """
    Binary Tree Zigzag Level Order Traversal

    Approach: BFS with level-by-level processing. Alternate
    direction of adding values at each level.

    Time: O(n)
    Space: O(n)
    """
    tree = data.get("tree", [])
    root = buildTree(tree)

    if not root:
        return []

    result = []
    queue = deque([root])
    left_to_right = True

    while queue:
        level_size = len(queue)
        level_values = deque()

        for _ in range(level_size):
            node = queue.popleft()

            # Add to front or back based on direction
            if left_to_right:
                level_values.append(node.val)
            else:
                level_values.appendleft(node.val)

            # Add children for next level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(list(level_values))
        left_to_right = not left_to_right

    return result


# Test
if __name__ == "__main__":
    print(binaryTreeZigzagLevelOrderTraversal({"tree": [3, 9, 20, None, None, 15, 7]}))
    print(binaryTreeZigzagLevelOrderTraversal({"tree": [1, 2, 3, 4, 5, 6, 7]}))`,
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

func BinaryTreeZigzagLevelOrderTraversal(data map[string]interface{}) [][]int {
    treeArr := data["tree"].([]interface{})
    root := buildTree(treeArr)

    if root == nil {
        return [][]int{}
    }

    var result [][]int
    queue := []*TreeNode{root}
    leftToRight := true

    for len(queue) > 0 {
        levelSize := len(queue)
        level := make([]int, levelSize)

        for i := 0; i < levelSize; i++ {
            node := queue[0]
            queue = queue[1:]

            // Determine index based on direction
            idx := i
            if !leftToRight {
                idx = levelSize - 1 - i
            }
            level[idx] = node.Val

            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }

        result = append(result, level)
        leftToRight = !leftToRight
    }

    return result
}

func main() {
    data := map[string]interface{}{
        "tree": []interface{}{3.0, 9.0, 20.0, nil, nil, 15.0, 7.0},
    }
    fmt.Println(BinaryTreeZigzagLevelOrderTraversal(data))
}`
        },
        twists: [
            {
                title: 'Spiral Order with K-Level Groups',
                difficulty: 'Medium',
                description: 'Instead of alternating direction every level, alternate direction every K levels. For example, with K=2, go left-to-right for 2 levels, then right-to-left for 2 levels.',
                whyDifferent: 'The simple toggle becomes a counter-based state machine. You must track how many levels have been processed in the current direction before flipping, adding a modular arithmetic dimension to the level processing.',
                example: 'Tree: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], K=2 -> [[1],[2,3],[7,6,5,4],[8,9,10,11,12,13,14,15]].'
            },
            {
                title: 'Zigzag Traversal Using Two Stacks',
                difficulty: 'Medium',
                description: 'Implement zigzag level order using two stacks instead of a deque. One stack processes left-to-right levels, the other right-to-left.',
                whyDifferent: 'Using two stacks changes the fundamental data structure from BFS with a queue to an alternating stack approach. You push children to the other stack in a specific order depending on the current direction, which is a different mental model.',
                example: 'Tree: [1,2,3,4,5,6,7]. Stack1 processes level 0 (push right then left for even levels). Stack2 processes level 1 (push left then right for odd levels).'
            },
            {
                title: 'Zigzag with Column Index',
                difficulty: 'Hard',
                description: 'Perform zigzag level order traversal but additionally return the column index of each node. Column index follows vertical order conventions (root=0, left child=parent-1, right child=parent+1).',
                whyDifferent: 'Tracking column indices through the zigzag complicates the bookkeeping significantly. The visual position of a node in the zigzag output does not correspond to its column index, requiring dual tracking of BFS level and vertical position.',
                example: 'Tree: [3,9,20,null,null,15,7]. Zigzag: [[3@col0], [20@col1, 9@col-1], [15@col0, 7@col2]].'
            },
            {
                title: 'Zigzag Level Order on N-ary Tree',
                difficulty: 'Medium',
                description: 'Extend zigzag level order traversal to an N-ary tree where each node can have any number of children.',
                whyDifferent: 'Binary trees have exactly two children to manage. N-ary trees require iterating over a variable-length children list, and the reversal logic must account for reversing all children rather than just swapping left/right.',
                example: 'N-ary tree: root=1 with children [2,3,4], node 2 has children [5,6]. Zigzag: [[1], [4,3,2], [5,6]].'
            },
            {
                title: 'Anti-Zigzag: Reconstruct Tree from Zigzag Output',
                difficulty: 'Hard',
                description: 'Given the zigzag level order traversal output (array of arrays), reconstruct the original binary tree.',
                whyDifferent: 'This is the reverse problem. You must undo the alternating reversal to recover the true left-to-right order at each level, then build the tree level by level connecting parents to children in the correct order.',
                example: 'Zigzag output: [[3],[20,9],[15,7]] -> Tree: [3,9,20,null,null,15,7]. Must un-reverse odd levels before connecting children.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-search-trees', '04-bst-traversal/03-level-order-zigzag', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-search-trees/04-bst-traversal/03-level-order-zigzag'] = problem;

})();
