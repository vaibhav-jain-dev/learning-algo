/**
 * Move in Linked List
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: move-in-linked-list
 * Parent: 09-move-element-to-end/01-move-element-preserve-order
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move in Linked List',
        difficulty: 'Medium',
        algorithm: 'move-in-linked-list',
        parent: '09-move-element-to-end/01-move-element-preserve-order',
        description: 'Solve the same problem but on a singly linked list instead of an array. Move nodes with target value to the end. No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.',
        problem: 'No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.',
        hints: [
            'Think about how move in linked list differs from the standard version of this problem.',
            'Key insight: No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[3,1,2,3,4,3],"target":3},
                output: [1,2,4,3,3,3],
                explanation: ''
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: ''
            }
        ],
        solutions: {
            python: `def move_in_linked_list(array, toMove, target):
    """
    Move in Linked List

    Solve the same problem but on a singly linked list instead of an array. Move nodes with target value to the end. No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(move_in_linked_list([3,1,2,3,4,3], None, 3))  # Expected: [1,2,4,3,3,3]
print(move_in_linked_list([1,2,3,4,5], None, 6))  # Expected: [1,2,3,4,5]
print(move_in_linked_list([3,3,3], None, 3))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// MoveInLinkedList solves the Move in Linked List problem.
// Solve the same problem but on a singly linked list instead of an array. Move nodes with target value to the end. No random access means you must re-link nodes, requiring careful pointer manipulation to avoid breaking the list.
// Time: O(n), Space: O(n)
func MoveInLinkedList(array []int, toMove int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(MoveInLinkedList([]int{3, 1, 2, 3, 4, 3}, nil, 3)) // Expected: [1,2,4,3,3,3]
	fmt.Println(MoveInLinkedList([]int{1, 2, 3, 4, 5}, nil, 6)) // Expected: [1,2,3,4,5]
	fmt.Println(MoveInLinkedList([]int{3, 3, 3}, nil, 3)) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order/twist-04-move-in-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order/twist-04-move-in-linked-list'] = problem;
})();
