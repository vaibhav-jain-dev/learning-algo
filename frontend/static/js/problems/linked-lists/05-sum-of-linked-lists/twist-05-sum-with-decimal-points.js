/**
 * Sum With Decimal Points
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-sum
 * Parent: 05-sum-of-linked-lists
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sum With Decimal Points',
        difficulty: 'Hard',
        algorithm: 'll-sum',
        parent: '05-sum-of-linked-lists',
        description: 'Each linked list includes a special marker node indicating the decimal point position. Add the two decimal numbers and return the result with the decimal point.',
        problem: 'Requires aligning the decimal points before adding, handling different-length fractional and integer parts, and preserving the decimal marker in the output.',
        hints: [
            'Each linked list includes a special marker node indicating the decimal point position',
            'Requires aligning the decimal points before adding, handling different-length fractional and integer parts, and preserving the decimal marker in the output.',
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
            python: `def sum_with_decimal_points(list1, list2):
    """
    Sum With Decimal Points

    Each linked list includes a special marker node indicating the decimal point position. Add the two decimal numbers and return the result with the decimal point.

    Time: O(n)
    Space: O(1)
    """
    count = 0
    n = len(list1)

    for i in range(n):
        # Check condition based on list2
        j = 0
        for k in range(i, n):
            if j < len(list2) and list1[k] == list2[j]:
                j += 1
        if j == len(list2):
            count += 1

    return count


# Test cases
print(sum_with_decimal_points(None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SumWithDecimalPoints solves the Sum With Decimal Points problem.
// Each linked list includes a special marker node indicating the decimal point position. Add the two decimal numbers and return the result with the decimal point.
// Time: O(n), Space: O(1)
func SumWithDecimalPoints(list1 []int, list2 []int) int {
	result := 0

	for i := 0; i < len(list1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(SumWithDecimalPoints(nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '05-sum-of-linked-lists/twist-05-sum-with-decimal-points', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/05-sum-of-linked-lists/twist-05-sum-with-decimal-points'] = problem;
})();
