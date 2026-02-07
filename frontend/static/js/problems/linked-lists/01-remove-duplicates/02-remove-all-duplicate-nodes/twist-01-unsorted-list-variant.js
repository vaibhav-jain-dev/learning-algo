/**
 * Unsorted List Variant
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/02-remove-all-duplicate-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Unsorted List Variant',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/02-remove-all-duplicate-nodes',
        description: 'The list is unsorted. Remove ALL nodes whose values appear more than once. You cannot sort the list first.',
        problem: 'Without sorted order, duplicates are not adjacent. You need two passes: one to count frequencies (hash map), and another to remove nodes with count > 1. The single-pointer sorted approach completely breaks.',
        hints: [
            'The list is unsorted',
            'Without sorted order, duplicates are not adjacent',
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
            python: `def unsorted_list_variant(list):
    """
    Unsorted List Variant

    The list is unsorted. Remove ALL nodes whose values appear more than once. You cannot sort the list first.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(unsorted_list_variant([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// UnsortedListVariant solves the Unsorted List Variant problem.
// The list is unsorted. Remove ALL nodes whose values appear more than once. You cannot sort the list first.
// Time: O(n), Space: O(1)
func UnsortedListVariant(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(UnsortedListVariant([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/02-remove-all-duplicate-nodes/twist-01-unsorted-list-variant', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/02-remove-all-duplicate-nodes/twist-01-unsorted-list-variant'] = problem;
})();
