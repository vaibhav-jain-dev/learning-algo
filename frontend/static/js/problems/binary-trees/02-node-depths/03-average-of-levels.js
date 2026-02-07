/**
 * Average of Levels in Binary Tree
 * Category: binary-trees
 * Difficulty: Easy
 * Algorithm: tree-bfs
 */
(function() {
    'use strict';

    const problem = {
        name: 'Average of Levels in Binary Tree',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths',
        description: 'Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10^-5 of the actual answer will be accepted.',
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
        output: [3.0, 14.5, 11.0],
        explanation: 'Start traversal from each unvisited node. For each connected component found, compute the required property (size, path, validity). Mark nodes as visited to avoid re-processing.'
    },
    {
        input: {
        "tree": {
                "value": 1,
                "left": {
                        "value": 2,
                        "left": {
                                "value": 4
                        },
                        "right": {
                                "value": 5
                        }
                },
                "right": {
                        "value": 3,
                        "right": {
                                "value": 6
                        }
                }
        }
},
        output: [1.0, 2.5, 5.0],
        explanation: 'The traversal explores all reachable nodes from the starting point. Each edge is examined once, and the algorithm tracks the required state (distance, parent, color) at each node.'
    }
        ],
        solutions: {
            python: `def averageOfLevelsInBinaryTree(data):
    """
    Average of Levels in Binary Tree

    Return the average value of nodes at each level.
    Uses BFS to process nodes level by level.

    Key insight: Process all nodes at current level before moving
    to the next level. Use queue size to track level boundaries.

    Time: O(n) - visit each node once
    Space: O(w) - queue stores nodes at widest level
    """
    from collections import deque

    tree = data.get('tree')

    if not tree:
        return []

    result = []
    queue = deque([tree])

    while queue:
        level_size = len(queue)
        level_sum = 0

        # Process all nodes at current level
        for _ in range(level_size):
            node = queue.popleft()
            level_sum += node['value']

            # Add children for next level
            if node.get('left'):
                queue.append(node['left'])
            if node.get('right'):
                queue.append(node['right'])

        # Calculate and store average for this level
        result.append(level_sum / level_size)

    return result


# Test
if __name__ == "__main__":
    data1 = {"tree": {"value": 3, "left": {"value": 9}, "right": {"value": 20, "left": {"value": 15}, "right": {"value": 7}}}}
    print(averageOfLevelsInBinaryTree(data1))  # [3.0, 14.5, 11.0]

    data2 = {"tree": {"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "right": {"value": 6}}}}
    print(averageOfLevelsInBinaryTree(data2))  # [1.0, 2.5, 5.0]`,
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

// AverageOfLevelsInBinaryTree returns average value at each level
// Time: O(n), Space: O(w)
func AverageOfLevelsInBinaryTree(data map[string]interface{}) []float64 {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return []float64{}
    }

    var result []float64
    queue := []*TreeNode{root}

    for len(queue) > 0 {
        levelSize := len(queue)
        levelSum := 0

        // Process all nodes at current level
        for i := 0; i < levelSize; i++ {
            node := queue[0]
            queue = queue[1:]

            levelSum += node.Value

            // Add children for next level
            if node.Left != nil {
                queue = append(queue, node.Left)
            }
            if node.Right != nil {
                queue = append(queue, node.Right)
            }
        }

        // Calculate and store average for this level
        result = append(result, float64(levelSum)/float64(levelSize))
    }

    return result
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
    fmt.Println(AverageOfLevelsInBinaryTree(data)) // [3 14.5 11]
}`
        },
        twists: [
            { id: '02-node-depths/03-average-of-levels/twist-01-dfs-average-of-levels', name: 'DFS Average of Levels', difficulty: 'Medium' },
            { id: '02-node-depths/03-average-of-levels/twist-02-median-of-levels', name: 'Median of Levels', difficulty: 'Hard' },
            { id: '02-node-depths/03-average-of-levels/twist-03-n-ary-tree-average-of-levels', name: 'N-ary Tree Average of Levels', difficulty: 'Easy' },
            { id: '02-node-depths/03-average-of-levels/twist-04-streaming-level-averages', name: 'Streaming Level Averages', difficulty: 'Hard' },
            { id: '02-node-depths/03-average-of-levels/twist-05-floating-point-precision-trap', name: 'Floating Point Precision Trap', difficulty: 'Medium' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/03-average-of-levels', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/03-average-of-levels'] = problem;

})();
