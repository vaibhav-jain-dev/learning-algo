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
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input root=[3, 9, ..., 7] (length 7), the result is [[3], [9, 20], [15, 7]].'
    },
    {
        input: {
        "root": [
                1
        ]
},
        output: [[1]],
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input root=[1], the result is [[1]].'
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
            {
                title: 'Zigzag Level Order Traversal',
                difficulty: 'Medium',
                description: 'Traverse the tree level by level, but alternate the direction at each level: left-to-right, then right-to-left, then left-to-right, etc.',
                whyDifferent: 'Adds directional state management on top of BFS. You must track the current level parity and either reverse the level array or use a deque to build it in the correct order.',
                example: 'Tree [3,9,20,null,null,15,7]. Output: [[3],[20,9],[15,7]]. Level 0 is L->R, level 1 is R->L, level 2 is L->R.'
            },
            {
                title: 'Bottom-Up Level Order Traversal',
                difficulty: 'Easy',
                description: 'Return the level order traversal from bottom to top: the deepest level first and the root level last.',
                whyDifferent: 'The BFS itself is identical, but you must reverse the result at the end or build it differently. This is a simple twist that tests whether you can decouple traversal order from output order.',
                example: 'Tree [3,9,20,null,null,15,7]. Output: [[15,7],[9,20],[3]] instead of [[3],[9,20],[15,7]].'
            },
            {
                title: 'Level Order Using DFS',
                difficulty: 'Medium',
                description: 'Achieve the same level-grouped output but using DFS instead of BFS. Use the recursion depth to determine which level a node belongs to.',
                whyDifferent: 'DFS does not naturally process nodes level by level. You must pass the depth as a parameter and use it as an index into the result list. This demonstrates that level grouping does not require BFS.',
                example: 'Same output [[3],[9,20],[15,7]], but nodes are visited in DFS order: 3,9,20,15,7. Each node is placed into result[depth].'
            },
            {
                title: 'Level Order on a General Graph',
                difficulty: 'Hard',
                description: 'Perform level-order traversal on a general undirected graph (not a tree) from a given starting node. Nodes may have multiple parents and cycles exist.',
                whyDifferent: 'A tree has no cycles, so visited tracking is unnecessary. In a general graph, you must prevent revisiting nodes while still grouping them by BFS level (distance from source).',
                example: 'Graph: 1-2, 1-3, 2-3, 3-4. BFS from 1: [[1],[2,3],[4]]. Node 3 is level 1 (discovered from 1), not level 2 (from 2).'
            },
            {
                title: 'Right Side View from Level Order',
                difficulty: 'Medium',
                description: 'Using level order traversal, return only the rightmost node visible from each level (the "right side view" of the tree).',
                whyDifferent: 'You must extract just the last element from each level rather than collecting all elements. This can be optimized to avoid storing full levels by tracking only the last node processed per level.',
                example: 'Tree [3,9,20,null,null,15,7]. Level order: [[3],[9,20],[15,7]]. Right side view: [3,20,7].'
            }
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
