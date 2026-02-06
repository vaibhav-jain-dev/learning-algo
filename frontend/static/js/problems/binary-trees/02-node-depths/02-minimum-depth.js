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
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 3, \'left\': {\'value\': 9}, \'right\': {\'value\': 20, \'left\': {\'value\': 15}, \'right\': {\'value\': 7}}}, the result is 2.'
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
        explanation: 'Using breadth-first search, we explore level by level to find the optimal solution. For input tree={\'value\': 2, \'right\': {\'value\': 3, \'right\': {\'value\': 4, \'right\': {\'value\': 5, \'right\': {\'value\': 6}}}}}, the result is 5.'
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
            {
                title: 'DFS Minimum Depth',
                difficulty: 'Easy',
                description: 'Solve minimum depth using DFS (recursion) instead of BFS. Be careful about the definition of minimum depth when one child is null.',
                whyDifferent: 'Unlike BFS which naturally finds the first leaf, DFS must explore the entire tree. The critical trap: if a node has only one child, the null child does NOT count as a leaf, so you cannot just take min(left, right)+1.',
                example: 'Tree: 1->null, 1->2->3. Min depth is 3 (leaf at 3), NOT 1. The root is not a leaf despite having a null left child.'
            },
            {
                title: 'N-ary Tree Minimum Depth',
                difficulty: 'Easy',
                description: 'Find the minimum depth of an N-ary tree where each node can have any number of children.',
                whyDifferent: 'Leaf detection becomes checking for an empty children array. With BFS, the approach is similar, but with DFS you must take the min over all children, not just left/right.',
                example: 'Node(1, children=[Node(2), Node(3, children=[Node(4)])]). Min depth: 2 (path 1->2).'
            },
            {
                title: 'Conceptual Trap: Single-Child Node',
                difficulty: 'Medium',
                description: 'Predict the output: Tree has root=1 with only a right child=2 which has only a right child=3. What is the minimum depth?',
                whyDifferent: 'Many people incorrectly answer 1, thinking the null left child of the root makes depth 1. But a leaf must have NO children. Node 1 has a right child, so it is not a leaf. The minimum depth is 3.',
                example: 'Tree: 1->null(left), 1->2->null(left), 1->2->3. Answer: 3, NOT 1.'
            },
            {
                title: 'Minimum Depth with Early Termination DFS',
                difficulty: 'Medium',
                description: 'Optimize DFS to prune branches: if the current depth already exceeds the best known minimum depth, stop exploring that subtree.',
                whyDifferent: 'Standard DFS explores all nodes. By passing the current best minimum as a parameter, you can prune entire subtrees, improving average-case performance though worst-case remains O(n).',
                example: 'If left subtree leaf at depth 2, skip right subtree branches deeper than depth 2.'
            },
            {
                title: 'Count Nodes at Minimum Depth',
                difficulty: 'Medium',
                description: 'Instead of returning the minimum depth, return the count of leaf nodes at the minimum depth level.',
                whyDifferent: 'Changes from a "find minimum" to a "count at minimum" problem. You first need to determine the minimum depth, then count leaves at that depth, or do both in a single BFS pass.',
                example: 'Tree: 1->2, 1->3, both are leaves at depth 2. Min depth=2, count=2.'
            }
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
