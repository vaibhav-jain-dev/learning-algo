/**
 * Weighted Node Depths
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 02-node-depths
 */
(function() {
    'use strict';
    const problem = {
        name: 'Weighted Node Depths',
        difficulty: 'Medium',
        algorithm: 'tree-dfs',
        parent: '02-node-depths',
        description: 'Each node has a weight. The contribution of a node is weight * depth. Return the weighted depth sum. You cannot just count depth; you must multiply by each node\'s value. This changes the accumulation logic and prevents simple level-counting optimizations.',
        problem: 'You cannot just count depth; you must multiply by each node\'s value. This changes the accumulation logic and prevents simple level-counting optimizations.',
        hints: [
            'Consider: Each node has a weight.',
            'The contribution of a node is weight * depth.',
            'Key insight: Return the weighted depth sum.',
            'This changes the accumulation logic and prevents simple level-counting optimizations.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: 1(w=3)->2(w=1)->4(w=2)' },
                output: 'See explanation',
                explanation: 'Tree: 1(w=3)->2(w=1)->4(w=2). Weighted depths: 3*0 + 1*1 + 2*2 = 5.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def weighted_node_depths(data):
    """
    Weighted Node Depths

    Each node has a weight.
     The contribution of a node is weight * depth.
     Return the weighted depth sum.

    Approach: You cannot just count depth; you must multiply by each node's value

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: You cannot just count depth; you must multiply by each nodes value

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Weighted Node Depths
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: 1(w=3)->2(w=1)->4(w=2)
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

// WeightedNodeDepths solves: Weighted Node Depths
// You cannot just count depth; you must multiply by each node's value
// Time: O(n), Space: O(n)
func WeightedNodeDepths(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Weighted Node Depths
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
    // Example: Tree: 1(w=3)->2(w=1)->4(w=2)
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/twist-03-weighted-node-depths', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/twist-03-weighted-node-depths'] = problem;
})();
