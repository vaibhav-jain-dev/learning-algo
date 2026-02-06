/**
 * Median of Levels
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 02-node-depths/03-average-of-levels
 */
(function() {
    'use strict';
    const problem = {
        name: 'Median of Levels',
        difficulty: 'Hard',
        algorithm: 'tree-bfs',
        parent: '02-node-depths/03-average-of-levels',
        description: 'Instead of the average, compute the median of node values at each level. Average only needs sum and count. Median requires storing all values at each level, sorting them, and picking the middle. This changes space complexity significantly.',
        problem: 'Average only needs sum and count. Median requires storing all values at each level, sorting them, and picking the middle. This changes space complexity significantly.',
        hints: [
            'Consider: Instead of the average, compute the median of node values at each level.',
            'Average only needs sum and count.',
            'Key insight: Median requires storing all values at each level, sorting them, and picking the middle.',
            'This changes space complexity significantly.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Level with values [9, 20]: median = 14' },
                output: 'See explanation',
                explanation: 'Level with values [9, 20]: median = 14.5. Level with [15, 7]: median = 11.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def median_of_levels(data):
    """
    Median of Levels

    Instead of the average, compute the median of node values at each level.

    Approach: Average only needs sum and count

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Average only needs sum and count

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Median of Levels
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Level with values [9, 20]: median = 14
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

// MedianOfLevels solves: Median of Levels
// Average only needs sum and count
// Time: O(n), Space: O(n)
func MedianOfLevels(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Median of Levels
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
    // Example: Level with values [9, 20]: median = 14
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/03-average-of-levels/twist-02-median-of-levels', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/03-average-of-levels/twist-02-median-of-levels'] = problem;
})();
