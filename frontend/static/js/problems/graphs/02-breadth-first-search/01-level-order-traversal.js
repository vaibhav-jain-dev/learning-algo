/**
 * Binary Tree Level Order Traversal
 * Category: graphs
 * Difficulty: Medium
 * Algorithm: graph-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        algorithm: 'graph-bfs',
        parent: '02-breadth-first-search',
        description: 'Given the root of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level).',
        problem: 'Use breadth-first search to explore nodes level by level. This ensures the shortest path is found first in unweighted scenarios. Use a queue to manage the frontier. This achieves O(N) time with O(W) space.',
        complexity: {
            time: 'O(N)',
            space: 'O(W)'
        },
        hints: [
            'Use a queue to process nodes level by level.',
            'BFS naturally finds shortest paths in unweighted graphs.',
            'Track distance or level for each node.',
            'Mark nodes as visited when adding to queue, not when processing.',
            'Consider bidirectional BFS for optimization.'
        ],
        examples: [
    {
        input: {
        "root": [
                3,
                9,
                20,
                null,
                null,
                15,
                7
        ]
},
        output: [[3], [9, 20], [15, 7]],
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "root": [
                1
        ]
},
        output: [[1]],
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root):
    """
    Binary Tree Level Order Traversal - BFS with queue.

    Time: O(N) where N is number of nodes
    Space: O(W) where W is maximum width of tree
    """
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        level_size = len(queue)
        current_level = []

        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)

            # Add children to queue for next level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(current_level)

    return result


# Test
if __name__ == "__main__":
    # Build tree: [3, 9, 20, null, null, 15, 7]
    #       3
    #      / \\
    #     9  20
    #       /  \\
    #      15   7
    root = TreeNode(3)
    root.left = TreeNode(9)
    root.right = TreeNode(20)
    root.right.left = TreeNode(15)
    root.right.right = TreeNode(7)

    print(levelOrder(root))  # Output: [[3], [9, 20], [15, 7]]`,
            go: `package main

import "fmt"

// TreeNode represents a binary tree node
type TreeNode struct {
    Val   int
    Left  *TreeNode
    Right *TreeNode
}

// levelOrder performs level order traversal using BFS.
// Time: O(N), Space: O(W) where W is max width
func levelOrder(root *TreeNode) [][]int {
    if root == nil {
        return [][]int{}
    }

    result := [][]int{}
    queue := []*TreeNode{root}

    for len(queue) > 0 {
        levelSize := len(queue)
        currentLevel := []int{}

        // Process all nodes at current level
        for i := 0; i < levelSize; i++ {
            node := queue[0]
            queue = queue[1:]
            currentLevel = append(currentLevel, node.Val)

            // Add children to queue for next level
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }

        result = append(result, currentLevel)
    }

    return result
}

func main() {
    // Build tree: [3, 9, 20, null, null, 15, 7]
    root := &TreeNode{Val: 3}
    root.Left = &TreeNode{Val: 9}
    root.Right = &TreeNode{Val: 20}
    root.Right.Left = &TreeNode{Val: 15}
    root.Right.Right = &TreeNode{Val: 7}

    fmt.Println(levelOrder(root)) // Output: [[3] [9 20] [15 7]]
}`
        },
        twists: [
            { id: '02-breadth-first-search/01-level-order-traversal/twist-01-zigzag-level-order-traversal', name: 'Zigzag Level Order Traversal', difficulty: 'Medium' },
            { id: '02-breadth-first-search/01-level-order-traversal/twist-02-bottom-up-level-order-traversal', name: 'Bottom-Up Level Order Traversal', difficulty: 'Easy' },
            { id: '02-breadth-first-search/01-level-order-traversal/twist-03-level-order-using-dfs', name: 'Level Order Using DFS', difficulty: 'Medium' },
            { id: '02-breadth-first-search/01-level-order-traversal/twist-04-level-order-on-a-general-graph', name: 'Level Order on a General Graph', difficulty: 'Hard' },
            { id: '02-breadth-first-search/01-level-order-traversal/twist-05-right-side-view-from-level-order', name: 'Right Side View from Level Order', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('graphs', '02-breadth-first-search/01-level-order-traversal', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['graphs/02-breadth-first-search/01-level-order-traversal'] = problem;

})();
