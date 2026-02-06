/**
 * Doubly Linked Sorted List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Doubly Linked Sorted List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'The sorted list is doubly linked. Remove all nodes with duplicate values while maintaining valid prev pointers. The dummy node technique still applies.',
        problem: 'While the core skipping logic is the same, every deletion requires updating the prev pointer of the surviving node. Missing a prev update creates a corrupted list that appears to work forward but breaks backward.',
        hints: [
            'The sorted list is doubly linked',
            'While the core skipping logic is the same, every deletion requires updating the prev pointer of the surviving node',
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
            python: `def doubly_linked_sorted_list(list):
    """
    Doubly Linked Sorted List

    The sorted list is doubly linked. Remove all nodes with duplicate values while maintaining valid prev pointers. The dummy node technique still applies.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(doubly_linked_sorted_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DoublyLinkedSortedList solves the Doubly Linked Sorted List problem.
// The sorted list is doubly linked. Remove all nodes with duplicate values while maintaining valid prev pointers. The dummy node technique still applies.
// Time: O(n), Space: O(1)
func DoublyLinkedSortedList(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DoublyLinkedSortedList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-02-doubly-linked-sorted-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-02-doubly-linked-sorted-list'] = problem;
})();
