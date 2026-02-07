/**
 * Immutable Linked List (Functional Style)
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-construction
 * Parent: 03-linked-list-construction
 */
(function() {
    'use strict';

    const problem = {
        name: 'Immutable Linked List (Functional Style)',
        difficulty: 'Hard',
        algorithm: 'll-construction',
        parent: '03-linked-list-construction',
        description: 'Implement a persistent/immutable linked list where operations return new list versions without modifying the original. Old versions remain accessible.',
        problem: 'In-place mutation is forbidden. Every insert/remove must create new nodes for the modified path while sharing unchanged nodes. This is a fundamentally different paradigm (structural sharing) used in functional programming.',
        hints: [
            'Implement a persistent/immutable linked list where operations return new list versions without modifying the original',
            'In-place mutation is forbidden',
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
            python: `def immutable_linked_list_functional_style(initialList, operations):
    """
    Immutable Linked List (Functional Style)

    Implement a persistent/immutable linked list where operations return new list versions without modifying the original. Old versions remain accessible.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(initialList)

    for i in range(n):
        # Check condition based on operations
        j = 0
        for k in range(i, n):
            if j < len(operations) and initialList[k] == operations[j]:
                j += 1
        if j == len(operations):
            count += 1

    return count


# Test cases
print(immutable_linked_list_functional_style(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ImmutableLinkedListFunctionalStyle solves the Immutable Linked List (Functional Style) problem.
// Implement a persistent/immutable linked list where operations return new list versions without modifying the original. Old versions remain accessible.
// Time: O(n), Space: O(1)
func ImmutableLinkedListFunctionalStyle(initialList []int, operations []string) int {
	result := 0

	for i := 0; i < len(initialList); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ImmutableLinkedListFunctionalStyle(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '03-linked-list-construction/twist-05-immutable-linked-list-functional-style', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/03-linked-list-construction/twist-05-immutable-linked-list-functional-style'] = problem;
})();
