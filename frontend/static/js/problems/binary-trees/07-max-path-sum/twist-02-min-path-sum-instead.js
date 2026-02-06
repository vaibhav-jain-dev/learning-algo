/**
 * Min Path Sum Instead
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 07-max-path-sum
 */
(function() {
    'use strict';
    const problem = {
        name: 'Min Path Sum Instead',
        difficulty: 'Medium',
        algorithm: 'tree-max-path',
        parent: '07-max-path-sum',
        description: 'Find the minimum path sum in the tree. The path still follows parent-child connections and must contain at least one node. The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0). Forces re-thinking the optimization direction and the handling of all-positive trees.',
        problem: 'The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0). Forces re-thinking the optimization direction and the handling of all-positive trees.',
        hints: [
            'Consider: Find the minimum path sum in the tree.',
            'The path still follows parent-child connections and must contain at least one node.',
            'Key insight: The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0).',
            'Forces re-thinking the optimization direction and the handling of all-positive trees.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree: -10->9, -10->20->15, -10->20->7' },
                output: 'See explanation',
                explanation: 'Tree: -10->9, -10->20->15, -10->20->7. Min path: -10 (just the root). All other paths are less negative.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def min_path_sum_instead(data):
    """
    Min Path Sum Instead

    Find the minimum path sum in the tree.
     The path still follows parent-child connections and must contain at least one node.

    Approach: The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0)

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0)

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Min Path Sum Instead
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree: -10->9, -10->20->15, -10->20->7
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

// MinPathSumInstead solves: Min Path Sum Instead
// The pruning logic reverses: instead of ignoring negative branches (max with 0), you ignore positive branches (min with 0)
// Time: O(n), Space: O(n)
func MinPathSumInstead(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Min Path Sum Instead
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
    // Example: Tree: -10->9, -10->20->15, -10->20->7
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '07-max-path-sum/twist-02-min-path-sum-instead', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/07-max-path-sum/twist-02-min-path-sum-instead'] = problem;
})();
