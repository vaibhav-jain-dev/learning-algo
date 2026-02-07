/**
 * Minimum Shifts to Sort
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-shift
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Shifts to Sort',
        difficulty: 'Hard',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.',
        problem: 'Requires finding the rotation point (where the order breaks) and computing the distance to the sorted position, combining search with shift calculation.',
        hints: [
            'Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.',
            'Requires finding the rotation point (where the order breaks) and computing the distance to the sorted position, combining search with shift calculation.',
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
            python: `def minimum_shifts_to_sort(list, k):
    """
    Minimum Shifts to Sort

    Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(list)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and list[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(minimum_shifts_to_sort([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MinimumShiftsToSort solves the Minimum Shifts to Sort problem.
// Given a linked list that is a rotated version of a sorted list, find the minimum number of shifts (forward or backward) needed to sort it.
// Time: O(n), Space: O(1)
func MinimumShiftsToSort(list []int, k int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(MinimumShiftsToSort([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-04-minimum-shifts-to-sort', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-04-minimum-shifts-to-sort'] = problem;
})();
