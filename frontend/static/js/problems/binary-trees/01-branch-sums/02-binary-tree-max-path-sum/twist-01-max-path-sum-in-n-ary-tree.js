/**
 * Max Path Sum in N-ary Tree
 * Category: binary-trees
 * Difficulty: Very Hard
 * Parent: 01-branch-sums/02-binary-tree-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Max Path Sum in N-ary Tree',
        difficulty: 'Very Hard',
        algorithm: 'tree-max-path',
        parent: '01-branch-sums/02-binary-tree-max-path-sum',
        description: 'Find the maximum path sum in an N-ary tree where each node can have any number of children. The path can go through any two children of a node. With binary trees you compare left vs right. With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.',
        problem: 'With binary trees you compare left vs right. With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.',
        hints: [
            'Consider: Find the maximum path sum in an N-ary tree where each node can have any number of children.',
            'The path can go through any two children of a node.',
            'Key insight: With binary trees you compare left vs right.',
            'With N-ary, you must find the top-2 child path sums to form the best through-path at each node, requiring sorting or a two-pass approach over children.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Node(1, children=[Node(5), Node(-3), Node(4)])' },
                output: 'See explanation',
                explanation: 'Node(1, children=[Node(5), Node(-3), Node(4)]). Best path: 5->1->4=10. Must pick top-2 from N children.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def max_path_sum_in_n_ary_tree(data):
    """
    Max Path Sum in N-ary Tree

    Find the maximum path sum in an N-ary tree where each node can have any number of children.
     The path can go through any two children of a node.

    Approach: With binary trees you compare left vs right

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: With binary trees you compare left vs right

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Max Path Sum in N-ary Tree
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Node(1, children=[Node(5), Node(-3), Node(4)])
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

// MaxPathSumInNaryTree solves: Max Path Sum in N-ary Tree
// With binary trees you compare left vs right
// Time: O(n), Space: O(n)
func MaxPathSumInNaryTree(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Max Path Sum in N-ary Tree
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
    // Example: Node(1, children=[Node(5), Node(-3), Node(4)])
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '01-branch-sums/02-binary-tree-max-path-sum/twist-01-max-path-sum-in-n-ary-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/01-branch-sums/02-binary-tree-max-path-sum/twist-01-max-path-sum-in-n-ary-tree'] = problem;
})();
