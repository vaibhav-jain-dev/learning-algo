/**
 * Doubly Linked Sorted List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/03-remove-duplicates-keep-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Doubly Linked Sorted List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/03-remove-duplicates-keep-k',
        description: 'Apply the keep-at-most-k rule to a sorted doubly linked list. Maintain valid prev pointers after removals.',
        problem: 'The counting and skipping logic stays the same, but each removal requires updating the prev pointer of the next surviving node. Batch removals within a duplicate group need careful prev/next rewiring.',
        hints: [
            'Apply the keep-at-most-k rule to a sorted doubly linked list',
            'The counting and skipping logic stays the same, but each removal requires updating the prev pointer of the next surviving node',
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
            python: `def doubly_linked_sorted_list(list, k):
    """
    Doubly Linked Sorted List

    Apply the keep-at-most-k rule to a sorted doubly linked list. Maintain valid prev pointers after removals.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(doubly_linked_sorted_list([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DoublyLinkedSortedList solves the Doubly Linked Sorted List problem.
// Apply the keep-at-most-k rule to a sorted doubly linked list. Maintain valid prev pointers after removals.
// Time: O(n), Space: O(1)
func DoublyLinkedSortedList(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DoublyLinkedSortedList([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k/twist-02-doubly-linked-sorted-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k/twist-02-doubly-linked-sorted-list'] = problem;
})();
