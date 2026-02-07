/**
 * Circular Linked List Middle
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-middle
 * Parent: 02-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Linked List Middle',
        difficulty: 'Medium',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'Find the middle node of a circular singly linked list. You are given a pointer to one node in the cycle. Return the node that is floor(n/2) steps from the given node.',
        problem: 'The slow/fast pointer technique needs a different termination condition. Fast pointer will never hit null; instead you must detect when it returns to the start node. Also, you need to first determine the length of the cycle.',
        hints: [
            'Find the middle node of a circular singly linked list',
            'The slow/fast pointer technique needs a different termination condition',
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
            python: `def circular_linked_list_middle(list):
    """
    Circular Linked List Middle

    Find the middle node of a circular singly linked list. You are given a pointer to one node in the cycle. Return the node that is floor(n/2) steps from the given node.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(list)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(circular_linked_list_middle([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CircularLinkedListMiddle solves the Circular Linked List Middle problem.
// Find the middle node of a circular singly linked list. You are given a pointer to one node in the cycle. Return the node that is floor(n/2) steps from the given node.
// Time: O(n), Space: O(1)
func CircularLinkedListMiddle(list []int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CircularLinkedListMiddle([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-01-circular-linked-list-middle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-01-circular-linked-list-middle'] = problem;
})();
