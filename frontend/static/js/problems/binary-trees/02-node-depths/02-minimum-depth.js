/**
 * Minimum Depth of Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Depth of Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths',
        description: 'Given a binary tree, find its minimum depth. The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node. **Note:** A leaf is a node with no children.',
        problem: 'Use BFS (level-order traversal) to process the tree level by level. Use a queue to track nodes at the current level.',
        complexity: {
            time: 'O(n)',
            space: 'O(w)'
        },
        hints: [
            'Use a queue initialized with the root.',
            'Process all nodes at current level before moving to next.',
            'Track level by processing queue size nodes at a time.',
            'Useful for finding level-wise properties.',
            'Can be used to find shortest path in tree.'
        ],
        examples: [
    {
        input: {
        "tree": {
                "value": 3,
                "left": {
                        "value": 9
                },
                "right": {
                        "value": 20,
                        "left": {
                                "value": 15
                        },
                        "right": {
                                "value": 7
                        }
                }
        }
},
        output: 2,
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "tree": {
                "value": 2,
                "right": {
                        "value": 3,
                        "right": {
                                "value": 4,
                                "right": {
                                        "value": 5,
                                        "right": {
                                                "value": 6
                                        }
                                }
                        }
                }
        }
},
        output: 5,
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `def minimumDepthOfBinaryTree(data):
    """
    Minimum Depth of Binary Tree

    Return the number of nodes along the shortest path from root
    to the nearest leaf node. Uses BFS for optimal performance -
    returns as soon as the first leaf is found.

    Key insight: BFS finds the shortest path naturally by exploring
    level by level.

    Time: O(n) - worst case visits all nodes
    Space: O(w) - queue stores nodes at widest level
    """
    from collections import deque

    tree = data.get('tree')

    if not tree:
        return 0

    queue = deque([(tree, 1)])  # (node, depth)

    while queue:
        node, depth = queue.popleft()

        left = node.get('left')
        right = node.get('right')

        # If leaf node, we found the minimum depth
        if not left and not right:
            return depth

        # Add children to queue
        if left:
            queue.append((left, depth + 1))
        if right:
            queue.append((right, depth + 1))

    return 0


# Test
if __name__ == "__main__":
    data1 = {"tree": {"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}}
    print(minimumDepthOfBinaryTree(data1))  # 2

    data2 = {"tree": {"value": 2, "right": {"value": 3, "right": {"value": 4, "right": {"value": 5, "right": {"value": 6}}}}}}
    print(minimumDepthOfBinaryTree(data2))  # 5`,
            go: `package main

import "fmt"

// TreeNode represents a node in the binary tree
type TreeNode struct {
    Value int
    Left  *TreeNode
    Right *TreeNode
}

// buildTree converts map data to TreeNode structure
func buildTree(data map[string]interface{}) *TreeNode {
    if data == nil {
        return nil
    }
    node := &TreeNode{Value: int(data["value"].(float64))}
    if left, ok := data["left"].(map[string]interface{}); ok {
        node.Left = buildTree(left)
    }
    if right, ok := data["right"].(map[string]interface{}); ok {
        node.Right = buildTree(right)
    }
    return node
}

// queueItem holds a node and its depth for BFS
type queueItem struct {
    node  *TreeNode
    depth int
}

// MinimumDepthOfBinaryTree returns the minimum depth using BFS
// Time: O(n), Space: O(w)
func MinimumDepthOfBinaryTree(data map[string]interface{}) int {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return 0
    }

    queue := []queueItem{{root, 1}}

    for len(queue) > 0 {
        item := queue[0]
        queue = queue[1:]

        node, depth := item.node, item.depth

        // If leaf node, return current depth
        if node.Left == nil && node.Right == nil {
            return depth
        }

        // Add children to queue
        if node.Left != nil {
            queue = append(queue, queueItem{node.Left, depth + 1})
        }
        if node.Right != nil {
            queue = append(queue, queueItem{node.Right, depth + 1})
        }
    }

    return 0
}

func main() {
    data := map[string]interface{}{
        "tree": map[string]interface{}{
            "value": float64(3),
            "left":  map[string]interface{}{"value": float64(9)},
            "right": map[string]interface{}{
                "value": float64(20),
                "left":  map[string]interface{}{"value": float64(15)},
                "right": map[string]interface{}{"value": float64(7)},
            },
        },
    }
    fmt.Println(MinimumDepthOfBinaryTree(data)) // 2
}`
        },
        twists: [
            { id: '02-node-depths/02-minimum-depth/twist-01-dfs-minimum-depth', name: 'DFS Minimum Depth', difficulty: 'Easy' },
            { id: '02-node-depths/02-minimum-depth/twist-02-n-ary-tree-minimum-depth', name: 'N-ary Tree Minimum Depth', difficulty: 'Easy' },
            { id: '02-node-depths/02-minimum-depth/twist-03-conceptual-trap-single-child-node', name: 'Conceptual Trap: Single-Child Node', difficulty: 'Medium' },
            { id: '02-node-depths/02-minimum-depth/twist-04-minimum-depth-with-early-termination-dfs', name: 'Minimum Depth with Early Termination DFS', difficulty: 'Medium' },
            { id: '02-node-depths/02-minimum-depth/twist-05-count-nodes-at-minimum-depth', name: 'Count Nodes at Minimum Depth', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth'] = problem;

})();
