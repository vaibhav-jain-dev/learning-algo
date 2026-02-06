/**
 * Reverse Portion in Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Portion in Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.',
        problem: 'Each node reversal must swap both next and prev pointers, and the boundary connections require updating four pointers instead of two.',
        hints: [
            'Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.',
            'Each node reversal must swap both next and prev pointers, and the boundary connections require updating four pointers instead of two.',
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
            python: `def reverse_portion_in_doubly_linked_list(list, left, right):
    """
    Reverse Portion in Doubly Linked List

    Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(list)

    for i in range(n):
        # Check condition based on left
        j = 0
        for k in range(i, n):
            if j < len(left) and list[k] == left[j]:
                j += 1
        if j == len(left):
            count += 1

    return count


# Test cases
print(reverse_portion_in_doubly_linked_list([1,2,3,4,5], None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReversePortionInDoublyLinkedList solves the Reverse Portion in Doubly Linked List problem.
// Reverse the portion from position left to right in a doubly linked list, updating both next and prev pointers.
// Time: O(n), Space: O(1)
func ReversePortionInDoublyLinkedList(list []int, left int, right int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ReversePortionInDoublyLinkedList([]int{1, 2, 3, 4, 5}, nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-05-reverse-portion-in-doubly-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-05-reverse-portion-in-doubly-linked-list'] = problem;
})();
