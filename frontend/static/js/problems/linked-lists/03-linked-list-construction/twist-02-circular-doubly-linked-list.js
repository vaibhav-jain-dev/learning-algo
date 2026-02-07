/**
 * Circular Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail. All operations must maintain the circular invariant.',
        problem: 'There is no null in the circular structure. Setting head or tail has ripple effects on the circular connections. Empty list and single-node list edge cases become trickier since head.prev and head.next both point to itself.',
        hints: [
            'Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail',
            'There is no null in the circular structure',
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
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def circular_doubly_linked_list(initialList, operations):
    """
    Circular Doubly Linked List

    Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail. All operations must maintain the circular invariant.

    Time: O(n)
    Space: O(1)
    """
    n = len(initialList)
    m = len(operations)
    doubled = initialList + initialList
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == operations[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(circular_doubly_linked_list(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CircularDoublyLinkedList solves the Circular Doubly Linked List problem.
// Modify the construction to support a circular doubly linked list where tail.next = head and head.prev = tail. All operations must maintain the circular invariant.
// Time: O(n), Space: O(1)
func CircularDoublyLinkedList(initialList []int, operations []string) int {
	n := len(initialList)
	m := len(operations)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if initialList[i%n] == operations[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(CircularDoublyLinkedList(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-02-circular-doubly-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-02-circular-doubly-linked-list'] = problem;
})();
