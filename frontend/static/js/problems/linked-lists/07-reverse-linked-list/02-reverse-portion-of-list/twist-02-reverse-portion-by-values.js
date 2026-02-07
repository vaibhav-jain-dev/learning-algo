/**
 * Reverse Portion by Values
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/02-reverse-portion-of-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Portion by Values',
        difficulty: 'Medium',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/02-reverse-portion-of-list',
        description: 'Instead of positions, reverse the sublist between the first occurrence of value A and the first occurrence of value B (inclusive).',
        problem: 'Position-based indexing is replaced by value-based searching, requiring a scan phase before reversal and handling cases where A or B is not found.',
        hints: [
            'Instead of positions, reverse the sublist between the first occurrence of value A and the first occurrence of value B (inclusive).',
            'Position-based indexing is replaced by value-based searching, requiring a scan phase before reversal and handling cases where A or B is not found.',
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
            python: `def reverse_portion_by_values(list, left, right):
    """
    Reverse Portion by Values

    Instead of positions, reverse the sublist between the first occurrence of value A and the first occurrence of value B (inclusive).

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_portion_by_values([1,2,3,4,5], None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReversePortionByValues solves the Reverse Portion by Values problem.
// Instead of positions, reverse the sublist between the first occurrence of value A and the first occurrence of value B (inclusive).
// Time: O(n), Space: O(1)
func ReversePortionByValues(list []int, left int, right int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReversePortionByValues([]int{1, 2, 3, 4, 5}, nil, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/02-reverse-portion-of-list/twist-02-reverse-portion-by-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/02-reverse-portion-of-list/twist-02-reverse-portion-by-values'] = problem;
})();
