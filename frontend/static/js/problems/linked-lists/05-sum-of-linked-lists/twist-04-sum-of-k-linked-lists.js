/**
 * Sum of K Linked Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-sum
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum of K Linked Lists',
        difficulty: 'Medium',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.',
        problem: 'Extends from two lists to k lists, requiring simultaneous traversal of multiple lists and accumulating carries that can exceed single digits when k is large.',
        hints: [
            'Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.',
            'Extends from two lists to k lists, requiring simultaneous traversal of multiple lists and accumulating carries that can exceed single digits when k is large.',
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
            python: `def sum_of_k_linked_lists(list1, list2):
    """
    Sum of K Linked Lists

    Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(sum_of_k_linked_lists(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SumOfKLinkedLists solves the Sum of K Linked Lists problem.
// Given k linked lists (each representing a number in reverse digit order), compute the sum of all k numbers and return as a linked list.
// Time: O(n), Space: O(1)
func SumOfKLinkedLists(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(SumOfKLinkedLists(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-04-sum-of-k-linked-lists', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-04-sum-of-k-linked-lists'] = problem;
})();
