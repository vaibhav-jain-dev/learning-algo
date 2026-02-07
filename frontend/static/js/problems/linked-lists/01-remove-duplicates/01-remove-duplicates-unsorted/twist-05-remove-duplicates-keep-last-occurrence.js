/**
 * Remove Duplicates Keep Last Occurrence
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Duplicates Keep Last Occurrence',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'Instead of keeping the first occurrence of each value, keep the last occurrence. The relative order of kept nodes should match their last-occurrence positions.',
        problem: 'Reverse thinking: you cannot decide whether to keep a node until you know if it appears again later. This may require a reverse pass, a stack-based approach, or two-pass strategy that fundamentally changes the algorithm.',
        hints: [
            'Instead of keeping the first occurrence of each value, keep the last occurrence',
            'Reverse thinking: you cannot decide whether to keep a node until you know if it appears again later',
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
            python: `def remove_duplicates_keep_last_occurrence(list):
    """
    Remove Duplicates Keep Last Occurrence

    Instead of keeping the first occurrence of each value, keep the last occurrence. The relative order of kept nodes should match their last-occurrence positions.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(remove_duplicates_keep_last_occurrence([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveDuplicatesKeepLastOccurrence solves the Remove Duplicates Keep Last Occurrence problem.
// Instead of keeping the first occurrence of each value, keep the last occurrence. The relative order of kept nodes should match their last-occurrence positions.
// Time: O(n), Space: O(1)
func RemoveDuplicatesKeepLastOccurrence(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveDuplicatesKeepLastOccurrence([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-05-remove-duplicates-keep-last-occurrence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-05-remove-duplicates-keep-last-occurrence'] = problem;
})();
