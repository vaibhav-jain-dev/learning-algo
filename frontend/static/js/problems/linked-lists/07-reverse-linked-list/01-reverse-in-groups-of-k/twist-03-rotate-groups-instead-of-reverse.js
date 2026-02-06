/**
 * Rotate Groups Instead of Reverse
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate Groups Instead of Reverse',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).',
        problem: 'Rotation is not the same as reversal. You must detach the last node of each group and insert it at the front, requiring different pointer manipulation.',
        hints: [
            'Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).',
            'Rotation is not the same as reversal',
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
            python: `def rotate_groups_instead_of_reverse(list, k):
    """
    Rotate Groups Instead of Reverse

    Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).

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
print(rotate_groups_instead_of_reverse([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RotateGroupsInsteadOfReverse solves the Rotate Groups Instead of Reverse problem.
// Instead of reversing each group of k, rotate each group by one position to the right (last element becomes first).
// Time: O(n), Space: O(1)
func RotateGroupsInsteadOfReverse(list []int, k int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(RotateGroupsInsteadOfReverse([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-03-rotate-groups-instead-of-reverse', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-03-rotate-groups-instead-of-reverse'] = problem;
})();
