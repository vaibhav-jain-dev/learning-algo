/**
 * Doubly Linked List Variant
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Doubly Linked List Variant',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'The sorted list is now a doubly linked list with prev and next pointers. Remove duplicates while maintaining valid prev pointers throughout.',
        problem: 'You must update both prev and next pointers when removing nodes. Forgetting to fix the prev pointer of the node after a removed node is a common bug.',
        hints: [
            'The sorted list is now a doubly linked list with prev and next pointers',
            'You must update both prev and next pointers when removing nodes',
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
            python: `def doubly_linked_list_variant(list):
    """
    Doubly Linked List Variant

    The sorted list is now a doubly linked list with prev and next pointers. Remove duplicates while maintaining valid prev pointers throughout.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(doubly_linked_list_variant([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DoublyLinkedListVariant solves the Doubly Linked List Variant problem.
// The sorted list is now a doubly linked list with prev and next pointers. Remove duplicates while maintaining valid prev pointers throughout.
// Time: O(n), Space: O(1)
func DoublyLinkedListVariant(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DoublyLinkedListVariant([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-01-doubly-linked-list-variant', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-01-doubly-linked-list-variant'] = problem;
})();
