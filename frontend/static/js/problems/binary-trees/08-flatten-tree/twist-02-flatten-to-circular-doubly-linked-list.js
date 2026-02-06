/**
 * Flatten to Circular Doubly Linked List
 * Category: binary-trees
 * Difficulty: Hard
 * Parent: 08-flatten-tree
 */
(function() {
    'use strict';
    const problem = {
        name: 'Flatten to Circular Doubly Linked List',
        difficulty: 'Hard',
        algorithm: 'tree-flatten',
        parent: '08-flatten-tree',
        description: 'Flatten the binary tree to a sorted circular doubly linked list in-place. The leftmost node connects back to the rightmost node and vice versa. The circular connection adds complexity to the base case and the final linking step. You must connect the last node back to the first, requiring you to track both the head and tail of the flattened structure.',
        problem: 'The circular connection adds complexity to the base case and the final linking step. You must connect the last node back to the first, requiring you to track both the head and tail of the flattened structure.',
        hints: [
            'Consider: Flatten the binary tree to a sorted circular doubly linked list in-place.',
            'The leftmost node connects back to the rightmost node and vice versa.',
            'Key insight: The circular connection adds complexity to the base case and the final linking step.',
            'You must connect the last node back to the first, requiring you to track both the head and tail of the flattened structure.'
        ],
        complexity: { time: 'O(n)', space: 'O(n)' },
        examples: [
            {
                input: { description: 'Tree [4, 2, 5, 1, 3]' },
                output: 'See explanation',
                explanation: 'Tree [4, 2, 5, 1, 3]. Flattened: 1 <-> 2 <-> 3 <-> 4 <-> 5 <-> (back to 1). The last node 5 right-points to 1, and 1 left-points to 5.'
            },
            {
                input: { description: 'Edge case with minimal input' },
                output: 'See explanation',
                explanation: 'Apply the same logic to the smallest valid input to verify correctness of base cases.'
            }
        ],
        solutions: {
            python: `def flatten_to_circular_doubly_linked_list(data):
    """
    Flatten to Circular Doubly Linked List

    Flatten the binary tree to a sorted circular doubly linked list in-place.
     The leftmost node connects back to the rightmost node and vice versa.

    Approach: The circular connection adds complexity to the base case and the final linking step

    Time: O(n) - process each node once
    Space: O(n) - storage for results
    """
    tree = data.get('tree')
    if not tree:
        return None

    # Key insight: The circular connection adds complexity to the base case and the final linking step

    def solve(node):
        if not node:
            return None

        left = node.get('left')
        right = node.get('right')

        left_result = solve(left)
        right_result = solve(right)

        # TODO: Implement Flatten to Circular Doubly Linked List
        return None  # Replace with actual logic

    return solve(tree)


# Test
if __name__ == "__main__":
    # Example: Tree [4, 2, 5, 1, 3]
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

// FlattenToCircularDoublyLinkedList solves: Flatten to Circular Doubly Linked List
// The circular connection adds complexity to the base case and the final linking step
// Time: O(n), Space: O(n)
func FlattenToCircularDoublyLinkedList(data map[string]interface{}) interface{} {
    treeData, _ := data["tree"].(map[string]interface{})
    root := buildTree(treeData)

    if root == nil {
        return nil
    }

    // TODO: Implement Flatten to Circular Doubly Linked List
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
    // Example: Tree [4, 2, 5, 1, 3]
    fmt.Println("See problem description for test cases")
}`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('binary-trees', '08-flatten-tree/twist-02-flatten-to-circular-doubly-linked-list', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['binary-trees/08-flatten-tree/twist-02-flatten-to-circular-doubly-linked-list'] = problem;
})();
