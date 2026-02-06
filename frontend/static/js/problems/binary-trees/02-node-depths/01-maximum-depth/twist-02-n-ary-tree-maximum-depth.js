/**
 * N-ary Tree Maximum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'N-ary Tree Maximum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'Find the maximum depth of an N-ary tree where each node has a variable number of children. Instead of max(left, right), you take the max over all children. Leaf detection is an empty children array rather than null left/right pointers.',
        problem: 'Instead of max(left, right), you take the max over all children. Leaf detection is an empty children array rather than null left/right pointers.',
        hints: [
            'Consider: Find the maximum depth of an N-ary tree where each node has a variable number of children.',
            'Instead of max(left, right), you take the max over all children.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4)]).'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4)])' },
                output: 'See explanation',
                explanation: 'Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4)]). Max depth: 3 (path 1->2->5).'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def n_ary_tree_maximum_depth(data):
    """
    N-ary Tree Maximum Depth

    Find the maximum depth of an N-ary tree where each node has a variable number of children.

    Approach: Instead of max(left, right), you take the max over all children

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Instead of max(left, right), you take the max over all children

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement N-ary Tree Maximum Depth
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4)])
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

// NaryTreeMaximumDepth solves: N-ary Tree Maximum Depth
// Instead of max(left, right), you take the max over all children
// Time: O(n), Space: O(n)
func NaryTreeMaximumDepth(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement N-ary Tree Maximum Depth
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
    // Example: Node(1, children=[Node(2, children=[Node(5)]), Node(3), Node(4)])
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-02-n-ary-tree-maximum-depth', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-02-n-ary-tree-maximum-depth'] = problem;
})();
