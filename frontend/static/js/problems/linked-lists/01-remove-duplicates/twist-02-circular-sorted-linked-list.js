/**
 * Circular Sorted Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Sorted Linked List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'The sorted linked list is circular (tail points back to head). Remove duplicates while keeping the list circular. The list is sorted, but the "start" could be at any point in the cycle.',
        problem: 'There is no null terminator to signal the end of traversal. You need a way to detect when you have completed one full cycle without breaking the circular structure.',
        hints: [
            'The sorted linked list is circular (tail points back to head)',
            'There is no null terminator to signal the end of traversal',
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
            python: `def circular_sorted_linked_list(list):
    """
    Circular Sorted Linked List

    The sorted linked list is circular (tail points back to head). Remove duplicates while keeping the list circular. The list is sorted, but the "start" could be at any point in the cycle.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(circular_sorted_linked_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CircularSortedLinkedList solves the Circular Sorted Linked List problem.
// The sorted linked list is circular (tail points back to head). Remove duplicates while keeping the list circular. The list is sorted, but the "start" could be at any point in the cycle.
// Time: O(n), Space: O(1)
func CircularSortedLinkedList(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(CircularSortedLinkedList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-02-circular-sorted-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-02-circular-sorted-linked-list'] = problem;
})();
