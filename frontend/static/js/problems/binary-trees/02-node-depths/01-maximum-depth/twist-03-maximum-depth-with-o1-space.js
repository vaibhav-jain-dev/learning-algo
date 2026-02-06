/**
 * Maximum Depth with O(1) Space
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Maximum Depth with O(1) Space',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'Find the maximum depth without recursion and without using any auxiliary data structure (no stack, no queue). Use Morris traversal. Morris traversal does not inherently track depth. You must compute depth by counting thread link hops or maintaining a running depth counter that adjusts when following threads back up.',
        problem: 'Morris traversal does not inherently track depth. You must compute depth by counting thread link hops or maintaining a running depth counter that adjusts when following threads back up.',
        hints: [
            'Consider: Find the maximum depth without recursion and without using any auxiliary data structure (no stack, no queue).',
            'Use Morris traversal.',
            'Key insight: Morris traversal does not inherently track depth.',
            'You must compute depth by counting thread link hops or maintaining a running depth counter that adjusts when following threads back up.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Same result as base problem, but space usage is O(1) excluding the return value' },
                output: 'See explanation',
                explanation: 'Same result as base problem, but space usage is O(1) excluding the return value.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def maximum_depth_with_o_1_space(data):
    """
    Maximum Depth with O(1) Space

    Find the maximum depth without recursion and without using any auxiliary data structure (no stack, no queue).
     Use Morris traversal.

    Approach: Morris traversal does not inherently track depth

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Morris traversal does not inherently track depth

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Maximum Depth with O(1) Space
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Same result as base problem, but space usage is O(1) excluding the return value
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

// MaximumDepthWithO1Space solves: Maximum Depth with O(1) Space
// Morris traversal does not inherently track depth
// Time: O(n), Space: O(n)
func MaximumDepthWithO1Space(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Maximum Depth with O(1) Space
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
    // Example: Same result as base problem, but space usage is O(1) excluding the return value
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-03-maximum-depth-with-o1-space', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-03-maximum-depth-with-o1-space'] = problem;
})();
