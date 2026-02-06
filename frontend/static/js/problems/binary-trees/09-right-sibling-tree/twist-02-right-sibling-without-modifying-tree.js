/**
 * Right Sibling Without Modifying Tree
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 09-right-sibling-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Right Sibling Without Modifying Tree',
        difficulty: 'Medium',
        algorithm: 'tree-sibling',
        parent: '09-right-sibling-tree',
        description: 'Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure. The original problem modifies pointers in-place. Building an external mapping means the tree stays intact, requiring a level-order traversal to identify siblings and store relationships separately.',
        problem: 'The original problem modifies pointers in-place. Building an external mapping means the tree stays intact, requiring a level-order traversal to identify siblings and store relationships separately.',
        hints: [
            'Consider: Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure.',
            'The original problem modifies pointers in-place.',
            'Think about how the base case differs from the original problem.',
            'Review the example: Tree [1, 2, 3, 4, 5, 6, 7].'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [1, 2, 3, 4, 5, 6, 7]' },
                output: 'See explanation',
                explanation: 'Tree [1, 2, 3, 4, 5, 6, 7]. Output: {2: 3, 4: 5, 5: 6, 6: 7, 1: null, 3: null, 7: null}.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def right_sibling_without_modifying_tree(data):
    """
    Right Sibling Without Modifying Tree

    Return a mapping (dictionary) from each node value to its right sibling value without modifying the original tree structure.

    Approach: The original problem modifies pointers in-place

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The original problem modifies pointers in-place

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Right Sibling Without Modifying Tree
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [1, 2, 3, 4, 5, 6, 7]
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

// RightSiblingWithoutModifyingTree solves: Right Sibling Without Modifying Tree
// The original problem modifies pointers in-place
// Time: O(n), Space: O(n)
func RightSiblingWithoutModifyingTree(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Right Sibling Without Modifying Tree
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
    // Example: Tree [1, 2, 3, 4, 5, 6, 7]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '09-right-sibling-tree/twist-02-right-sibling-without-modifying-tree', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/09-right-sibling-tree/twist-02-right-sibling-without-modifying-tree'] = problem;
})();
