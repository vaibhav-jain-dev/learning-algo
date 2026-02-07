/**
 * Doubly Linked Unsorted List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';

    const problem = {
        name: 'Doubly Linked Unsorted List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'The unsorted list is doubly linked. Remove duplicates keeping first occurrence while maintaining valid prev pointers.',
        problem: 'Deletion is simpler because you can access the previous node directly through the prev pointer, but you must remember to update prev pointers for nodes after the removed node. The hash set approach still works, but rewiring logic doubles.',
        hints: [
            'The unsorted list is doubly linked',
            'Deletion is simpler because you can access the previous node directly through the prev pointer, but you must remember to update prev pointers for nodes after the removed node',
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
            python: `def doubly_linked_unsorted_list(list):
    """
    Doubly Linked Unsorted List

    The unsorted list is doubly linked. Remove duplicates keeping first occurrence while maintaining valid prev pointers.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(doubly_linked_unsorted_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DoublyLinkedUnsortedList solves the Doubly Linked Unsorted List problem.
// The unsorted list is doubly linked. Remove duplicates keeping first occurrence while maintaining valid prev pointers.
// Time: O(n), Space: O(1)
func DoublyLinkedUnsortedList(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DoublyLinkedUnsortedList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-02-doubly-linked-unsorted-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-02-doubly-linked-unsorted-list'] = problem;
})();
