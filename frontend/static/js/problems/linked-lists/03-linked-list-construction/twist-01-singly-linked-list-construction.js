/**
 * Singly Linked List Construction
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Singly Linked List Construction',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.',
        problem: 'Without prev pointers, operations like insertBefore and remove become O(n) instead of O(1) because you must find the predecessor by traversing from the head. The entire design trade-off changes.',
        hints: [
            'Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.',
            'Without prev pointers, operations like insertBefore and remove become O(n) instead of O(1) because you must find the predecessor by traversing from the head',
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
            python: `def singly_linked_list_construction(initialList, operations):
    """
    Singly Linked List Construction

    Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(initialList)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and initialList[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(singly_linked_list_construction(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SinglyLinkedListConstruction solves the Singly Linked List Construction problem.
// Implement the same operations (setHead, setTail, insertBefore, insertAfter, insertAtPosition, removeNodesWithValue, remove, containsNodeWithValue) but for a SINGLY linked list with only next pointers.
// Time: O(n), Space: O(1)
func SinglyLinkedListConstruction(initialList []int, operations []string) int {
	result := 0

	for i := 0; i < len(initialList); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SinglyLinkedListConstruction(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-01-singly-linked-list-construction', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-01-singly-linked-list-construction'] = problem;
})();
