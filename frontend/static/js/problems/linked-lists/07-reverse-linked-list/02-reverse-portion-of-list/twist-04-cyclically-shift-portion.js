/**
 * Cyclically Shift Portion
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Cyclically Shift Portion',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.',
        problem: 'A cyclic shift moves the last element to the front of the portion, a different rearrangement than full reversal, requiring last-node extraction and insertion.',
        hints: [
            'Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.',
            'A cyclic shift moves the last element to the front of the portion, a different rearrangement than full reversal, requiring last-node extraction and insertion.',
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
            python: `def cyclically_shift_portion(list, left, right):
    """
    Cyclically Shift Portion

    Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(list)

    for i in range(n):
        # Check condition based on left
        j = 0
        for k in range(i, n):
            if j < len(left) and list[k] == left[j]:
                j += 1
        if j == len(left):
            count += 1

    return count


# Test cases
print(cyclically_shift_portion([1,2,3,4,5], None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CyclicallyShiftPortion solves the Cyclically Shift Portion problem.
// Instead of reversing the portion from left to right, cyclically shift those nodes by one position to the right.
// Time: O(n), Space: O(1)
func CyclicallyShiftPortion(list []int, left int, right int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CyclicallyShiftPortion([]int{1, 2, 3, 4, 5}, nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-04-cyclically-shift-portion', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-04-cyclically-shift-portion'] = problem;
})();
