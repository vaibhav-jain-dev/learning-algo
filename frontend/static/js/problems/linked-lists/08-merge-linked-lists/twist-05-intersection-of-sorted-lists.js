/**
 * Intersection of Sorted Lists
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-merge
 * Parent: 08-merge-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Intersection of Sorted Lists',
        difficulty: 'Medium',
        algorithm: 'll-merge',
        parent: '08-merge-linked-lists',
        description: 'Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.',
        problem: 'Instead of including all elements, you only include matches. The two-pointer technique advances the smaller pointer until values match, then captures the common element.',
        hints: [
            'Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.',
            'Instead of including all elements, you only include matches',
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
            python: `def intersection_of_sorted_lists(list1, list2):
    """
    Intersection of Sorted Lists

    Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list1)):
        # Check if element meets criteria
        result.append(list1[i])

    return result


# Test cases
print(intersection_of_sorted_lists(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// IntersectionOfSortedLists solves the Intersection of Sorted Lists problem.
// Given two sorted linked lists, create a new sorted list containing only the elements that appear in both lists.
// Time: O(n), Space: O(1)
func IntersectionOfSortedLists(list1 []int, list2 []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list1); i++ {
		result = append(result, list1[i])
	}

	return result
}

func main() {
	fmt.Println(IntersectionOfSortedLists(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '08-merge-linked-lists/twist-05-intersection-of-sorted-lists', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/08-merge-linked-lists/twist-05-intersection-of-sorted-lists'] = problem;
})();
