/**
 * Shift Circular Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-shift
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shift Circular Linked List',
        difficulty: 'Medium',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'The list is already circular. Shift it by k positions and return the new head. The tail already points to the head.',
        problem: 'No need to make the list circular first. You just need to find the new head position, which is (length - k % length) steps from current head, and update head reference.',
        hints: [
            'The list is already circular',
            'No need to make the list circular first',
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
            python: `def shift_circular_linked_list(list, k):
    """
    Shift Circular Linked List

    The list is already circular. Shift it by k positions and return the new head. The tail already points to the head.

    Time: O(n)
    Space: O(1)
    """
    n = len(list)
    m = len(k)
    doubled = list + list
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == k[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(shift_circular_linked_list([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ShiftCircularLinkedList solves the Shift Circular Linked List problem.
// The list is already circular. Shift it by k positions and return the new head. The tail already points to the head.
// Time: O(n), Space: O(1)
func ShiftCircularLinkedList(list []int, k int) []int {
	n := len(list)
	m := len(k)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if list[i%n] == k[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(ShiftCircularLinkedList([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-03-shift-circular-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-03-shift-circular-linked-list'] = problem;
})();
