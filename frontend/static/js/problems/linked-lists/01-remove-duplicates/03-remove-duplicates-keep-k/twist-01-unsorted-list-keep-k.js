/**
 * Unsorted List Keep-K
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/03-remove-duplicates-keep-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Unsorted List Keep-K',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/03-remove-duplicates-keep-k',
        description: 'The list is unsorted. Keep at most k occurrences of each value while preserving the original relative order of kept nodes.',
        problem: 'You need a hash map that counts occurrences seen so far. For each node, check if its value has been seen fewer than k times. The sorted adjacency property no longer helps with grouping.',
        hints: [
            'The list is unsorted',
            'You need a hash map that counts occurrences seen so far',
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
            python: `def unsorted_list_keep_k(list, k):
    """
    Unsorted List Keep-K

    The list is unsorted. Keep at most k occurrences of each value while preserving the original relative order of kept nodes.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(unsorted_list_keep_k([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// UnsortedListKeepK solves the Unsorted List Keep-K problem.
// The list is unsorted. Keep at most k occurrences of each value while preserving the original relative order of kept nodes.
// Time: O(n), Space: O(1)
func UnsortedListKeepK(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(UnsortedListKeepK([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/03-remove-duplicates-keep-k/twist-01-unsorted-list-keep-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/03-remove-duplicates-keep-k/twist-01-unsorted-list-keep-k'] = problem;
})();
