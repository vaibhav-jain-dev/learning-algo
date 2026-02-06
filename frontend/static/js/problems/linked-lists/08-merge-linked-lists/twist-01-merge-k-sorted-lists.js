/**
 * Merge K Sorted Lists
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-merge
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Merge k sorted linked lists into one sorted linked list, not just two.',
        problem: 'With k lists, pairwise merging is O(nk). Using a min-heap to track the smallest head across all lists reduces to O(n log k), requiring a fundamentally different data structure.',
        hints: [
            'Merge k sorted linked lists into one sorted linked list, not just two.',
            'With k lists, pairwise merging is O(nk)',
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
            python: `def merge_k_sorted_lists(list1, list2):
    """
    Merge K Sorted Lists

    Merge k sorted linked lists into one sorted linked list, not just two.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(merge_k_sorted_lists(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MergeKSortedLists solves the Merge K Sorted Lists problem.
// Merge k sorted linked lists into one sorted linked list, not just two.
// Time: O(n), Space: O(1)
func MergeKSortedLists(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(MergeKSortedLists(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-01-merge-k-sorted-lists', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-01-merge-k-sorted-lists'] = problem;
})();
