/**
 * Merge with Custom Operation
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge with Custom Operation',
        difficulty: 'Medium',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist. The traversal structure is identical but the merge operation changes. This tests whether you can parameterize the merge function and highlights that the tree-merging pattern is independent of the value combination strategy.',
        problem: 'The traversal structure is identical but the merge operation changes. This tests whether you can parameterize the merge function and highlights that the tree-merging pattern is independent of the value combination strategy.',
        hints: [
            'Consider: Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist.',
            'The traversal structure is identical but the merge operation changes.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree1 [1, 3, 2], Tree2 [2, 1, 3].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1 [1, 3, 2], Tree2 [2, 1, 3]' },
                output: 'See explanation',
                explanation: 'Tree1 [1, 3, 2], Tree2 [2, 1, 3]. Merged (max): [2, 3, 3]. Node-by-node: max(1,2)=2, max(3,1)=3, max(2,3)=3.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def merge_with_custom_operation(data):
    """
    Merge with Custom Operation

    Instead of summing overlapping node values, apply a custom operation: take the maximum of the two values when both nodes exist.

    Approach: The traversal structure is identical but the merge operation changes

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The traversal structure is identical but the merge operation changes

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Merge with Custom Operation
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1 [1, 3, 2], Tree2 [2, 1, 3]
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

// MergeWithCustomOperation solves: Merge with Custom Operation
// The traversal structure is identical but the merge operation changes
// Time: O(n), Space: O(n)
func MergeWithCustomOperation(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Merge with Custom Operation
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
    // Example: Tree1 [1, 3, 2], Tree2 [2, 1, 3]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-01-merge-with-custom-operation', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-01-merge-with-custom-operation'] = problem;
})();
