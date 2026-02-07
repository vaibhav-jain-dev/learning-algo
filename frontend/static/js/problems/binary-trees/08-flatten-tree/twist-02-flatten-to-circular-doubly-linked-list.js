/**
 * Flatten to Circular Doubly Linked List
 * Category: binary-trees
 * Difficulty: Hard
 * Algorithm: tree-flatten
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
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},
                output: [0],
                explanation: 'The flatten to circular doubly linked list for this input yields [0].'
            },
            // Edge case
            {
                input: {"tree":{"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}}},
                output: [],
                explanation: 'Use the BST ordering property to navigate efficiently. At each node, the comparison determines whether to go left or right, reducing the search space by roughly half each step.'
            }
        ],
        solutions: {
            python: `def flatten_to_circular_doubly_linked_list(tree):
    """
    Flatten to Circular Doubly Linked List

    Flatten the binary tree to a sorted circular doubly linked list in-place. The leftmost node connects back to the rightmost node and vice versa. The circular connection adds complexity to the base case and the final linking step. You must connect the last node back to the first, requiring you to track both the head and tail of the flattened structure.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(tree)):
        # Check if element meets criteria
        result.append(tree[i])

    return result


# Test cases
print(flatten_to_circular_doubly_linked_list({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: [0]
print(flatten_to_circular_doubly_linked_list({"value": 1, "left": {"value": 2, "left": {"value": 4}, "right": {"value": 5}}, "right": {"value": 3, "left": {"value": 6}}}))  # Expected: []
`,
            go: `package main

import "fmt"

// FlattenToCircularDoublyLinkedList solves the Flatten to Circular Doubly Linked List problem.
// Flatten the binary tree to a sorted circular doubly linked list in-place. The leftmost node connects back to the rightmost node and vice versa. The circular connection adds complexity to the base case and the final linking step. You must connect the last node back to the first, requiring you to track both the head and tail of the flattened structure.
// Time: O(n), Space: O(n)
func FlattenToCircularDoublyLinkedList(tree *TreeNode) []int {
	result := make([]int, 0)

	for i := 0; i < len(tree); i++ {
		result = append(result, tree[i])
	}

	return result
}

func main() {
	fmt.Println(FlattenToCircularDoublyLinkedList({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: [0]
	fmt.Println(FlattenToCircularDoublyLinkedList({"value":1,"left":{"value":2,"left":{"value":4},"right":{"value":5}},"right":{"value":3,"left":{"value":6}}})) // Expected: []
}
`
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
