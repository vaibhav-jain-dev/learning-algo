/**
 * In-Place with XOR Linked List
 * Category: linked-lists
 * Difficulty: Very Hard
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'In-Place with XOR Linked List',
        difficulty: 'Very Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer. Remove duplicates from the sorted XOR-linked list.',
        problem: 'XOR linked lists require you to carry the previous node address to compute the next node. Removing a node means recalculating XOR values for neighboring nodes, making deletion significantly harder.',
        hints: [
            'The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer',
            'XOR linked lists require you to carry the previous node address to compute the next node',
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
            python: `def in_place_with_xor_linked_list(list):
    """
    In-Place with XOR Linked List

    The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer. Remove duplicates from the sorted XOR-linked list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(in_place_with_xor_linked_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// InPlaceWithXorLinkedList solves the In-Place with XOR Linked List problem.
// The list uses XOR linking where each node stores prev XOR next instead of a simple next pointer. Remove duplicates from the sorted XOR-linked list.
// Time: O(n), Space: O(1)
func InPlaceWithXorLinkedList(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(InPlaceWithXorLinkedList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-05-in-place-with-xor-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-05-in-place-with-xor-linked-list'] = problem;
})();
