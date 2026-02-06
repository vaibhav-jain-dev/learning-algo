/**
 * Invert Without Modifying Original
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 03-invert-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Invert Without Modifying Original',
        difficulty: 'Medium',
        algorithm: 'tree-invert',
        parent: '03-invert-tree',
        description: 'Create a new inverted tree without modifying the original tree. Return the root of the new tree. You must allocate new nodes instead of swapping pointers in place. Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.',
        problem: 'You must allocate new nodes instead of swapping pointers in place. Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.',
        hints: [
            'Consider: Create a new inverted tree without modifying the original tree.',
            'Return the root of the new tree.',
            'Key insight: You must allocate new nodes instead of swapping pointers in place.',
            'Each recursive call creates a new node with swapped children, resulting in O(n) additional space for the new tree.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Original tree remains unchanged' },
                output: 'See explanation',
                explanation: 'Original tree remains unchanged. New tree is returned with all left/right swapped.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def invert_without_modifying_original(data):
    """
    Invert Without Modifying Original

    Create a new inverted tree without modifying the original tree.
     Return the root of the new tree.

    Approach: You must allocate new nodes instead of swapping pointers in place

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: You must allocate new nodes instead of swapping pointers in place

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Invert Without Modifying Original
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Original tree remains unchanged
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

// InvertWithoutModifyingOriginal solves: Invert Without Modifying Original
// You must allocate new nodes instead of swapping pointers in place
// Time: O(n), Space: O(n)
func InvertWithoutModifyingOriginal(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Invert Without Modifying Original
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
    // Example: Original tree remains unchanged
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '03-invert-tree/twist-05-invert-without-modifying-original', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/03-invert-tree/twist-05-invert-without-modifying-original'] = problem;
})();
