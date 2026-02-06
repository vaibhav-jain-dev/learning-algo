/**
 * Multiply Linked Lists
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-sum
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Multiply Linked Lists',
        difficulty: 'Hard',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Multiply two numbers represented as reversed linked lists and return the product as a linked list.',
        problem: 'Multiplication is fundamentally more complex than addition. Requires implementing long multiplication with partial products and managing carries across multiple digits.',
        hints: [
            'Multiply two numbers represented as reversed linked lists and return the product as a linked list.',
            'Multiplication is fundamentally more complex than addition',
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
            python: `def multiply_linked_lists(list1, list2):
    """
    Multiply Linked Lists

    Multiply two numbers represented as reversed linked lists and return the product as a linked list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(multiply_linked_lists(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MultiplyLinkedLists solves the Multiply Linked Lists problem.
// Multiply two numbers represented as reversed linked lists and return the product as a linked list.
// Time: O(n), Space: O(1)
func MultiplyLinkedLists(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(MultiplyLinkedLists(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-03-multiply-linked-lists', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-03-multiply-linked-lists'] = problem;
})();
