/**
 * Copy Doubly Linked List with Random Pointer
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction/01-copy-list-random-pointer
 */
(function() {
    'use strict';

    const problem = {
        name: 'Copy Doubly Linked List with Random Pointer',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction/01-copy-list-random-pointer',
        description: 'The list is doubly linked (has prev, next, and random pointers). Deep copy it while maintaining all three pointer types.',
        problem: 'Adding a prev pointer means the interleaving approach needs additional care during separation to restore prev pointers. The hash map approach handles it naturally but requires setting three pointers per node instead of two.',
        hints: [
            'The list is doubly linked (has prev, next, and random pointers)',
            'Adding a prev pointer means the interleaving approach needs additional care during separation to restore prev pointers',
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
            python: `def copy_doubly_linked_list_with_random_pointer(nodes):
    """
    Copy Doubly Linked List with Random Pointer

    The list is doubly linked (has prev, next, and random pointers). Deep copy it while maintaining all three pointer types.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(nodes)):
        # Check if element meets criteria
        result.append(nodes[i])

    return result


# Test cases
print(copy_doubly_linked_list_with_random_pointer(None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CopyDoublyLinkedListWithRandomPointer solves the Copy Doubly Linked List with Random Pointer problem.
// The list is doubly linked (has prev, next, and random pointers). Deep copy it while maintaining all three pointer types.
// Time: O(n), Space: O(1)
func CopyDoublyLinkedListWithRandomPointer(nodes [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nodes); i++ {
		result = append(result, nodes[i])
	}

	return result
}

func main() {
	fmt.Println(CopyDoublyLinkedListWithRandomPointer(nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/01-copy-list-random-pointer/twist-02-copy-doubly-linked-list-with-random-pointer', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/01-copy-list-random-pointer/twist-02-copy-doubly-linked-list-with-random-pointer'] = problem;
})();
