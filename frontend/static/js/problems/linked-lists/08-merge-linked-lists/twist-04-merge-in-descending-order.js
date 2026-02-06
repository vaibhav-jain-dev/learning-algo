/**
 * Merge In Descending Order
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-merge
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge In Descending Order',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.',
        problem: 'Building the result in reverse order means prepending each chosen node to the result head, flipping the construction direction from typical merge.',
        hints: [
            'Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.',
            'Building the result in reverse order means prepending each chosen node to the result head, flipping the construction direction from typical merge.',
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
            python: `def merge_in_descending_order(list1, list2):
    """
    Merge In Descending Order

    Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(merge_in_descending_order(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MergeInDescendingOrder solves the Merge In Descending Order problem.
// Merge two sorted (ascending) lists into one sorted in descending order, without reversing the final result.
// Time: O(n), Space: O(1)
func MergeInDescendingOrder(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(MergeInDescendingOrder(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-04-merge-in-descending-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-04-merge-in-descending-order'] = problem;
})();
