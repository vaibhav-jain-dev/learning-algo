/**
 * Merge with Structure Priority
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 12-merge-binary-trees
 */
(function() {
    'use strict';
    const problem = {
        name: 'Merge with Structure Priority',
        difficulty: 'Hard',
        algorithm: 'tree-merge',
        parent: '12-merge-binary-trees',
        description: 'Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree). Only use tree2 nodes where tree1 has no node. This is not a value merge but a structural overlay. Tree1 takes priority, and tree2 fills gaps. You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.',
        problem: 'This is not a value merge but a structural overlay. Tree1 takes priority, and tree2 fills gaps. You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.',
        hints: [
            'Consider: Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree).',
            'Only use tree2 nodes where tree1 has no node.',
            'Key insight: This is not a value merge but a structural overlay.',
            'You must stop descending into tree2 branches that are shadowed by tree1, which changes the recursion logic.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree1 [1, 2, null, 3], Tree2 [5, 6, 7, 8, 9]' },
                output: 'See explanation',
                explanation: 'Tree1 [1, 2, null, 3], Tree2 [5, 6, 7, 8, 9]. Result: [1, 2, 7, 3, null, null, null]. Tree1 structure preserved where it exists; tree2 right subtree (7) fills the gap.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def merge_with_structure_priority(data):
    """
    Merge with Structure Priority

    Merge two trees, but when both trees have a node at the same position, use tree1 value and tree1 structure (ignore tree2 subtree).
     Only use tree2 nodes where tree1 has no node.

    Approach: This is not a value merge but a structural overlay

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: This is not a value merge but a structural overlay

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Merge with Structure Priority
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree1 [1, 2, null, 3], Tree2 [5, 6, 7, 8, 9]
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

// MergeWithStructurePriority solves: Merge with Structure Priority
// This is not a value merge but a structural overlay
// Time: O(n), Space: O(n)
func MergeWithStructurePriority(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Merge with Structure Priority
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
    // Example: Tree1 [1, 2, null, 3], Tree2 [5, 6, 7, 8, 9]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '12-merge-binary-trees/twist-05-merge-with-structure-priority', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/12-merge-binary-trees/twist-05-merge-with-structure-priority'] = problem;
})();
