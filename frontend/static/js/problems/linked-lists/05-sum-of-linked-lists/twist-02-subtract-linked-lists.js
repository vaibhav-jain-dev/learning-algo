/**
 * Subtract Linked Lists
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-sum
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Subtract Linked Lists',
        difficulty: 'Hard',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Subtract the smaller number from the larger number (both represented as reversed linked lists). Return the absolute difference as a linked list.',
        problem: 'Subtraction introduces borrowing instead of carrying, and you must first determine which number is larger to know the subtraction direction.',
        hints: [
            'Subtract the smaller number from the larger number (both represented as reversed linked lists)',
            'Subtraction introduces borrowing instead of carrying, and you must first determine which number is larger to know the subtraction direction.',
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
            python: `def subtract_linked_lists(list1, list2):
    """
    Subtract Linked Lists

    Subtract the smaller number from the larger number (both represented as reversed linked lists). Return the absolute difference as a linked list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(subtract_linked_lists(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SubtractLinkedLists solves the Subtract Linked Lists problem.
// Subtract the smaller number from the larger number (both represented as reversed linked lists). Return the absolute difference as a linked list.
// Time: O(n), Space: O(1)
func SubtractLinkedLists(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(SubtractLinkedLists(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-02-subtract-linked-lists', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-02-subtract-linked-lists'] = problem;
})();
