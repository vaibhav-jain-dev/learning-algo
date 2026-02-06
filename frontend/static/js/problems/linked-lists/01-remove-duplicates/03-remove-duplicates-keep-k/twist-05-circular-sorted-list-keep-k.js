/**
 * Circular Sorted List Keep-K
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/03-remove-duplicates-keep-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Sorted List Keep-K',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/03-remove-duplicates-keep-k',
        description: 'The sorted list is circular. Keep at most k occurrences. The "sorted" property means values increase around the cycle with one wrap-around point.',
        problem: 'You must find the wrap-around point (where the value decreases) to establish a logical start. Duplicate groups might span the wrap-around point, complicating the count logic.',
        hints: [
            'The sorted list is circular',
            'You must find the wrap-around point (where the value decreases) to establish a logical start',
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
            python: `def circular_sorted_list_keep_k(list, k):
    """
    Circular Sorted List Keep-K

    The sorted list is circular. Keep at most k occurrences. The "sorted" property means values increase around the cycle with one wrap-around point.

    Time: O(n)
    Space: O(1)
    """
    n = len(list)
    m = len(k)
    doubled = list + list
    j = 0

    for i in range(min(2 * n, 2 * n)):
        if j < m and doubled[i] == k[j]:
            j += 1
        if j == m:
            return True

    return False


# Test cases
print(circular_sorted_list_keep_k([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CircularSortedListKeepK solves the Circular Sorted List Keep-K problem.
// The sorted list is circular. Keep at most k occurrences. The "sorted" property means values increase around the cycle with one wrap-around point.
// Time: O(n), Space: O(1)
func CircularSortedListKeepK(list []int, k int) []int {
	n := len(list)
	m := len(k)
	j := 0

	for i := 0; i < 2*n && j < m; i++ {
		if list[i%n] == k[j] {
			j++
		}
	}

	return j == m
}

func main() {
	fmt.Println(CircularSortedListKeepK([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k/twist-05-circular-sorted-list-keep-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k/twist-05-circular-sorted-list-keep-k'] = problem;
})();
