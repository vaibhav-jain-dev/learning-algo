/**
 * Interleaved Leaf Comparison
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 11-compare-leaf-traversal
 */
(function() {
    'use strict';
    const problem = {
        name: 'Interleaved Leaf Comparison',
        difficulty: 'Hard',
        algorithm: 'tree-dfs',
        parent: '11-compare-leaf-traversal',
        description: 'Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first. Collecting all leaves uses O(n) space. Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily. This is an exercise in generator-based thinking and early termination.',
        problem: 'Collecting all leaves uses O(n) space. Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily. This is an exercise in generator-based thinking and early termination.',
        hints: [
            'Consider: Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first.',
            'Collecting all leaves uses O(n) space.',
            'Key insight: Using coroutines or iterators, you yield one leaf at a time from each tree and compare lazily.',
            'This is an exercise in generator-based thinking and early termination.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1 has 1000 leaves, Tree2 has 1000 leaves but the first leaf differs' },
                output: 'See explanation',
                explanation: 'Tree1 has 1000 leaves, Tree2 has 1000 leaves but the first leaf differs. The iterator approach compares just the first leaf and returns false immediately without traversing either full tree.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def interleaved_leaf_comparison(data):
    """
    Interleaved Leaf Comparison

    Compare leaf traversals of two trees one leaf at a time using iterators (generators), stopping as soon as a mismatch is found, without collecting all leaves first.

    Approach: Collecting all leaves uses O(n) space

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Collecting all leaves uses O(n) space

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Interleaved Leaf Comparison
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1 has 1000 leaves, Tree2 has 1000 leaves but the first leaf differs
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

// InterleavedLeafComparison solves: Interleaved Leaf Comparison
// Collecting all leaves uses O(n) space
// Time: O(n), Space: O(n)
func InterleavedLeafComparison(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Interleaved Leaf Comparison
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
    // Example: Tree1 has 1000 leaves, Tree2 has 1000 leaves but the first leaf differs
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '11-compare-leaf-traversal/twist-04-interleaved-leaf-comparison', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/11-compare-leaf-traversal/twist-04-interleaved-leaf-comparison'] = problem;
})();
