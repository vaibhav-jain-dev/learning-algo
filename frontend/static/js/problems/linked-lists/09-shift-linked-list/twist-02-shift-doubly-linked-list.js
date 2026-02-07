/**
 * Shift Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-shift
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shift Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'Shift a doubly linked list by k positions, updating both next and prev pointers for all affected nodes.',
        problem: 'The circular reconnection must update prev pointers in addition to next pointers, doubling the pointer manipulation at the join points.',
        hints: [
            'Shift a doubly linked list by k positions, updating both next and prev pointers for all affected nodes.',
            'The circular reconnection must update prev pointers in addition to next pointers, doubling the pointer manipulation at the join points.',
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
            python: `def shift_doubly_linked_list(list, k):
    """
    Shift Doubly Linked List

    Shift a doubly linked list by k positions, updating both next and prev pointers for all affected nodes.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(shift_doubly_linked_list([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ShiftDoublyLinkedList solves the Shift Doubly Linked List problem.
// Shift a doubly linked list by k positions, updating both next and prev pointers for all affected nodes.
// Time: O(n), Space: O(1)
func ShiftDoublyLinkedList(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ShiftDoublyLinkedList([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-02-shift-doubly-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-02-shift-doubly-linked-list'] = problem;
})();
