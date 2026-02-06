/**
 * Iterative Maximum Depth
 * Category: binary-trees
 * Difficulty: Easy
 * Parent: 02-node-depths/01-maximum-depth
 */
(function() {
    'use strict';
    const problem = {
        name: 'Iterative Maximum Depth',
        difficulty: 'Easy',
        algorithm: 'tree-dfs',
        parent: '02-node-depths/01-maximum-depth',
        description: 'Find the maximum depth of the binary tree using BFS (level-order traversal) instead of recursion. Count the number of levels. BFS naturally counts levels. Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.',
        problem: 'BFS naturally counts levels. Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.',
        hints: [
            'Consider: Find the maximum depth of the binary tree using BFS (level-order traversal) instead of recursion.',
            'Count the number of levels.',
            'Key insight: BFS naturally counts levels.',
            'Instead of recursive max(left, right)+1, you increment a depth counter each time you process a complete level from the queue.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Queue processes level by level' },
                output: 'See explanation',
                explanation: 'Queue processes level by level. After 3 levels are exhausted, return 3.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def iterative_maximum_depth(data):
    """
    Iterative Maximum Depth

    Find the maximum depth of the binary tree using BFS (level-order traversal) instead of recursion.
     Count the number of levels.

    Approach: BFS naturally counts levels

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: BFS naturally counts levels

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Iterative Maximum Depth
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Queue processes level by level
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

// IterativeMaximumDepth solves: Iterative Maximum Depth
// BFS naturally counts levels
// Time: O(n), Space: O(n)
func IterativeMaximumDepth(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Iterative Maximum Depth
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
    // Example: Queue processes level by level
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '02-node-depths/01-maximum-depth/twist-01-iterative-maximum-depth', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/02-node-depths/01-maximum-depth/twist-01-iterative-maximum-depth'] = problem;
})();
