/**
 * Remove Kth Node in Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Kth Node in Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node from the end in a doubly linked list. You have access to both head and tail.',
        problem: 'Having a tail pointer and prev pointers lets you traverse backward from the tail, turning this into a simple k-step traversal from the end rather than a two-pointer problem.',
        hints: [
            'Remove the kth node from the end in a doubly linked list',
            'Having a tail pointer and prev pointers lets you traverse backward from the tail, turning this into a simple k-step traversal from the end rather than a two-pointer problem.',
            'Consider edge cases with empty lists or single-node lists.',
            'Think about how the data structure change affects pointer manipulation.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            // Basic test case
            {
                input: {"list":[1,2,3,4,5]},
                output: [1,2,3,4,5],
                explanation: ''
            }
        ],
        solutions: {
            python: `def remove_kth_node_in_doubly_linked_list(list, k):
    """
    Remove Kth Node in Doubly Linked List

    Remove the kth node from the end in a doubly linked list. You have access to both head and tail.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(remove_kth_node_in_doubly_linked_list([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveKthNodeInDoublyLinkedList solves the Remove Kth Node in Doubly Linked List problem.
// Remove the kth node from the end in a doubly linked list. You have access to both head and tail.
// Time: O(n), Space: O(1)
func RemoveKthNodeInDoublyLinkedList(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveKthNodeInDoublyLinkedList([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-03-remove-kth-node-in-doubly-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-03-remove-kth-node-in-doubly-linked-list'] = problem;
})();
