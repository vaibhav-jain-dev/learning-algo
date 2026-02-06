/**
 * N-ary Tree Minimum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 02-node-depths/02-minimum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'N-ary Tree Minimum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/02-minimum-depth',
        description: 'Find the minimum depth of an N-ary tree where each node can have any number of children. Leaf detection becomes checking for an empty children array. With BFS, the approach is similar, but with DFS you must take the min over all children, not just left/right.',
        problem: 'Leaf detection becomes checking for an empty children array. With BFS, the approach is similar, but with DFS you must take the min over all children, not just left/right.',
        hints: [
            'Consider: Find the minimum depth of an N-ary tree where each node can have any number of children.',
            'Leaf detection becomes checking for an empty children array.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2), Node(3, children=[Node(4)])]).'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Node(1, children=[Node(2), Node(3, children=[Node(4)])])' },
                output: 'See explanation',
                explanation: 'Node(1, children=[Node(2), Node(3, children=[Node(4)])]). Min depth: 2 (path 1->2).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_minimum_depth(data):
    """
    N-ary Tree Minimum Depth

    Find the minimum depth of an N-ary tree where each node can have any number of children.

    Approach: Leaf detection becomes checking for an empty children array

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Leaf detection becomes checking for an empty children array

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement N-ary Tree Minimum Depth
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Node(1, children=[Node(2), Node(3, children=[Node(4)])])
    print("See problem description for test cases")`,
            go: `package main

import "fmt"

// TreeNode represents a node in the binary tree
type TreeNode struct {
    Value int
    Left  *TreeNode
    Right *TreeNode
}

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

// NaryTreeMinimumDepth solves: N-ary Tree Minimum Depth
// Leaf detection becomes checking for an empty children array
// Time: O(n), Space: O(n)
func NaryTreeMinimumDepth(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement N-ary Tree Minimum Depth
    var solve func(node *TreeNode) interface{}
    solve = func(node *TreeNode) interface{} {
        if node == nil {
            return nil
        }

        solve(node.Left)
        solve(node.Right)

        return nil
    }

    return solve(root)
}

func main() {
    // Example: Node(1, children=[Node(2), Node(3, children=[Node(4)])])
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/02-minimum-depth/twist-02-n-ary-tree-minimum-depth', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/02-minimum-depth/twist-02-n-ary-tree-minimum-depth'] = problem;
})();
