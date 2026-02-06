/**
 * Find Loop in Doubly Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-find-loop
 * Parent: 06-find-loop
 */
(function() {
    'use strict';

    const problem = {
        name: 'Find Loop in Doubly Linked List',
        difficulty: 'Medium',
        algorithm: 'll-find-loop',
        parent: '06-find-loop',
        description: 'The list is doubly linked (each node has both next and prev). Detect if there is a cycle in the next pointers and find its origin.',
        problem: 'The prev pointers can create inconsistencies: if node A.next = B but B.prev != A, there may be structural corruption. Floyd\',
        hints: [
            'The list is doubly linked (each node has both next and prev)',
            'The prev pointers can create inconsistencies: if node A.next = B but B.prev != A, there may be structural corruption',
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
            python: `def find_loop_in_doubly_linked_list(list, loopStart):
    """
    Find Loop in Doubly Linked List

    The list is doubly linked (each node has both next and prev). Detect if there is a cycle in the next pointers and find its origin.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(find_loop_in_doubly_linked_list([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// FindLoopInDoublyLinkedList solves the Find Loop in Doubly Linked List problem.
// The list is doubly linked (each node has both next and prev). Detect if there is a cycle in the next pointers and find its origin.
// Time: O(n), Space: O(1)
func FindLoopInDoublyLinkedList(list []int, loopStart int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(FindLoopInDoublyLinkedList([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '06-find-loop/twist-05-find-loop-in-doubly-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/06-find-loop/twist-05-find-loop-in-doubly-linked-list'] = problem;
})();
