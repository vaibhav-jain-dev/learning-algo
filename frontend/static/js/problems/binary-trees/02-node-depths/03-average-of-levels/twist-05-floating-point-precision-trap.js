/**
 * Floating Point Precision Trap
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 02-node-depths/03-average-of-levels
 */
(function() {
    'use strict';
    const problem = {
        name: 'Floating Point Precision Trap',
        difficulty: 'Medium',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/03-average-of-levels',
        description: 'Level has node values summing to a very large number (e.g., 2^53 + 1). How do you compute the average without losing precision? Forces thinking about floating-point limitations. Naive sum/count can lose precision with large numbers. You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.',
        problem: 'Forces thinking about floating-point limitations. Naive sum/count can lose precision with large numbers. You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.',
        hints: [
            'Consider: Level has node values summing to a very large number (e.g., 2^53 + 1).',
            'How do you compute the average without losing precision?.',
            'Key insight: Forces thinking about floating-point limitations.',
            'You may need incremental averaging: avg = avg + (val - avg)/count to avoid overflow.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Level values: [Number' },
                output: 'See explanation',
                explanation: 'Level values: [Number.MAX_SAFE_INTEGER, 1]. Naive sum overflows. Incremental: avg = MAX_SAFE_INT, then avg + (1-avg)/2.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def floating_point_precision_trap(data):
    """
    Floating Point Precision Trap

    Level has node values summing to a very large number (e.
    g.
    , 2^53 + 1).
     How do you compute the average without losing precision?

    Approach: Forces thinking about floating-point limitations

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Forces thinking about floating-point limitations

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Floating Point Precision Trap
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Level values: [Number
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

// FloatingPointPrecisionTrap solves: Floating Point Precision Trap
// Forces thinking about floating-point limitations
// Time: O(n), Space: O(n)
func FloatingPointPrecisionTrap(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Floating Point Precision Trap
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
    // Example: Level values: [Number
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/03-average-of-levels/twist-05-floating-point-precision-trap', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/03-average-of-levels/twist-05-floating-point-precision-trap'] = problem;
})();
