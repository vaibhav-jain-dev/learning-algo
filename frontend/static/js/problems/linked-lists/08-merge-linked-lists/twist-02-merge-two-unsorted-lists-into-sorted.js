/**
 * Merge Two Unsorted Lists Into Sorted
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-merge
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Two Unsorted Lists Into Sorted',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.',
        problem: 'Cannot use the merge step directly since inputs are unsorted. Must either sort each list first (merge sort on linked lists) or collect all values and sort.',
        hints: [
            'Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.',
            'Cannot use the merge step directly since inputs are unsorted',
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
            python: `def merge_two_unsorted_lists_into_sorted(list1, list2):
    """
    Merge Two Unsorted Lists Into Sorted

    Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(merge_two_unsorted_lists_into_sorted(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MergeTwoUnsortedListsIntoSorted solves the Merge Two Unsorted Lists Into Sorted problem.
// Given two unsorted linked lists, produce a single sorted linked list containing all elements from both.
// Time: O(n), Space: O(1)
func MergeTwoUnsortedListsIntoSorted(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(MergeTwoUnsortedListsIntoSorted(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-02-merge-two-unsorted-lists-into-sorted', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-02-merge-two-unsorted-lists-into-sorted'] = problem;
})();
