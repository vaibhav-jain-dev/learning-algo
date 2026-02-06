/**
 * Successor Without Parent Pointers
 * Category: binary-trees
 * Difficulty: Medium
 * Parent: 05-find-successor
 */
(function() {
    'use strict';
    const problem = {
        name: 'Successor Without Parent Pointers',
        difficulty: 'Medium',
        algorithm: 'tree-successor',
        parent: '05-find-successor',
        description: 'Find the in-order successor when nodes do NOT have parent pointers. You only have the root of the tree and the target value. Without parent pointers, you cannot walk up. You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.',
        problem: 'Without parent pointers, you cannot walk up. You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.',
        hints: [
            'Consider: Find the in-order successor when nodes do NOT have parent pointers.',
            'You only have the root of the tree and the target value.',
            'Key insight: Without parent pointers, you cannot walk up.',
            'You must traverse from the root, tracking the last node where you went left (potential successor) while searching for the target.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree rooted at 1' },
                output: 'See explanation',
                explanation: 'Tree rooted at 1. To find successor of 5, search from root, tracking last left-turn ancestor.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def successor_without_parent_pointers(data):
    """
    Successor Without Parent Pointers

    Find the in-order successor when nodes do NOT have parent pointers.
     You only have the root of the tree and the target value.

    Approach: Without parent pointers, you cannot walk up

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: Without parent pointers, you cannot walk up

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Successor Without Parent Pointers
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree rooted at 1
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

// SuccessorWithoutParentPointers solves: Successor Without Parent Pointers
// Without parent pointers, you cannot walk up
// Time: O(n), Space: O(n)
func SuccessorWithoutParentPointers(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Successor Without Parent Pointers
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
    // Example: Tree rooted at 1
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '05-find-successor/twist-02-successor-without-parent-pointers', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/05-find-successor/twist-02-successor-without-parent-pointers'] = problem;
})();
