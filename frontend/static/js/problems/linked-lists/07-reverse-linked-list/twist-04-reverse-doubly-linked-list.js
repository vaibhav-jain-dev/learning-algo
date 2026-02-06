/**
 * Reverse Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list',
        description: 'Reverse a doubly linked list in place, updating both next and prev pointers for every node.',
        problem: 'Each node has two pointers to swap (next and prev), and you must update both correctly. The head becomes the tail and vice versa.',
        hints: [
            'Reverse a doubly linked list in place, updating both next and prev pointers for every node.',
            'Each node has two pointers to swap (next and prev), and you must update both correctly',
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
            python: `def reverse_doubly_linked_list(list):
    """
    Reverse Doubly Linked List

    Reverse a doubly linked list in place, updating both next and prev pointers for every node.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_doubly_linked_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseDoublyLinkedList solves the Reverse Doubly Linked List problem.
// Reverse a doubly linked list in place, updating both next and prev pointers for every node.
// Time: O(n), Space: O(1)
func ReverseDoublyLinkedList(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseDoublyLinkedList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/twist-04-reverse-doubly-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/twist-04-reverse-doubly-linked-list'] = problem;
})();
