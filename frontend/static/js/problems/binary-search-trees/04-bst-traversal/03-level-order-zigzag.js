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
        problem: 'Leverage the BST property (left < root < right) to guide your decisions. At each node, the ordering property tells you which subtree to explore or how to restructure. This achieves O(n) time with O(n) space.',
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
        explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
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
            { id: '04-bst-traversal/03-level-order-zigzag/twist-01-spiral-order-with-k-level-groups', name: 'Spiral Order with K-Level Groups', difficulty: 'Medium' },
            { id: '04-bst-traversal/03-level-order-zigzag/twist-02-zigzag-traversal-using-two-stacks', name: 'Zigzag Traversal Using Two Stacks', difficulty: 'Medium' },
            { id: '04-bst-traversal/03-level-order-zigzag/twist-03-zigzag-with-column-index', name: 'Zigzag with Column Index', difficulty: 'Hard' },
            { id: '04-bst-traversal/03-level-order-zigzag/twist-04-zigzag-level-order-on-n-ary-tree', name: 'Zigzag Level Order on N-ary Tree', difficulty: 'Medium' },
            { id: '04-bst-traversal/03-level-order-zigzag/twist-05-anti-zigzag-reconstruct-tree-from-zigzag-output', name: 'Anti-Zigzag: Reconstruct Tree from Zigzag Output', difficulty: 'Hard' }
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
