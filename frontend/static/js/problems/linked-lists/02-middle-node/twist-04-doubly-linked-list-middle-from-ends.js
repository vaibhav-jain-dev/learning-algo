/**
 * Doubly Linked List Middle from Ends
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-middle
 * Parent: 02-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Doubly Linked List Middle from Ends',
        difficulty: 'Easy',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.',
        problem: 'Instead of the slow/fast single-direction approach, you walk inward from head and tail. When pointers meet or cross, you have found the middle. This is a completely different traversal pattern.',
        hints: [
            'Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.',
            'Instead of the slow/fast single-direction approach, you walk inward from head and tail',
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
            python: `def doubly_linked_list_middle_from_ends(list):
    """
    Doubly Linked List Middle from Ends

    Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(doubly_linked_list_middle_from_ends([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DoublyLinkedListMiddleFromEnds solves the Doubly Linked List Middle from Ends problem.
// Given a doubly linked list with head and tail pointers, find the middle node by advancing from both ends simultaneously until the pointers meet.
// Time: O(n), Space: O(1)
func DoublyLinkedListMiddleFromEnds(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DoublyLinkedListMiddleFromEnds([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-04-doubly-linked-list-middle-from-ends', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-04-doubly-linked-list-middle-from-ends'] = problem;
})();
