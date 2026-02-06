/**
 * Invert N-ary Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 03-invert-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Invert N-ary Tree',
        difficulty: 'Medium',
        algorithm: 'tree-invert',
        parent: '03-invert-tree',
        description: 'Invert an N-ary tree by reversing the order of children at every node. Instead of swapping left/right, you must reverse an entire children array at each node. The recursive structure changes from swap(left,right) to children.reverse().',
        problem: 'Instead of swapping left/right, you must reverse an entire children array at each node. The recursive structure changes from swap(left,right) to children.reverse().',
        hints: [
            'Consider: Invert an N-ary tree by reversing the order of children at every node.',
            'Instead of swapping left/right, you must reverse an entire children array at each node.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[A, B, C]) becomes Node(1, children=[C, B, A]), applied recursively.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Node(1, children=[A, B, C]) becomes Node(1, children=[C, B, A]), applied recursively' },
                output: 'See explanation',
                explanation: 'Node(1, children=[A, B, C]) becomes Node(1, children=[C, B, A]), applied recursively.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def invert_n_ary_tree(data):
    """
    Invert N-ary Tree

    Invert an N-ary tree by reversing the order of children at every node.

    Approach: Instead of swapping left/right, you must reverse an entire children array at each node

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of swapping left/right, you must reverse an entire children array at each node

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Invert N-ary Tree
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Node(1, children=[A, B, C]) becomes Node(1, children=[C, B, A]), applied recursively
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

// InvertNaryTree solves: Invert N-ary Tree
// Instead of swapping left/right, you must reverse an entire children array at each node
// Time: O(n), Space: O(n)
func InvertNaryTree(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Invert N-ary Tree
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
    // Example: Node(1, children=[A, B, C]) becomes Node(1, children=[C, B, A]), applied recursively
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree/twist-02-invert-n-ary-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree/twist-02-invert-n-ary-tree'] = problem;
})();
