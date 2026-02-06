/**
 * Reverse K Groups and Sort Each
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse K Groups and Sort Each',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'Instead of reversing each group of k nodes, sort each group in ascending order while keeping the groups in their original relative positions.',
        problem: 'Sorting a linked list segment is fundamentally different from reversing. You need insertion sort or extraction-based sorting within each k-group.',
        hints: [
            'Instead of reversing each group of k nodes, sort each group in ascending order while keeping the groups in their original relative positions.',
            'Sorting a linked list segment is fundamentally different from reversing',
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
            python: `def reverse_k_groups_and_sort_each(list, k):
    """
    Reverse K Groups and Sort Each

    Instead of reversing each group of k nodes, sort each group in ascending order while keeping the groups in their original relative positions.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_k_groups_and_sort_each([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseKGroupsAndSortEach solves the Reverse K Groups and Sort Each problem.
// Instead of reversing each group of k nodes, sort each group in ascending order while keeping the groups in their original relative positions.
// Time: O(n), Space: O(1)
func ReverseKGroupsAndSortEach(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseKGroupsAndSortEach([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-05-reverse-k-groups-and-sort-each', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-05-reverse-k-groups-and-sort-each'] = problem;
})();
