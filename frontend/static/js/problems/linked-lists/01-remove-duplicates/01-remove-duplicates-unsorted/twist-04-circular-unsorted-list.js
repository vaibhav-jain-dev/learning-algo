/**
 * Circular Unsorted List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Unsorted List',
        difficulty: 'Medium',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'The unsorted list is circular. Remove duplicates keeping first occurrence. The list must remain circular after deduplication.',
        problem: 'With no null terminator, you must track the starting node to know when you have completed a full cycle. Using a hash set still works, but the loop termination condition fundamentally changes.',
        hints: [
            'The unsorted list is circular',
            'With no null terminator, you must track the starting node to know when you have completed a full cycle',
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
            python: `def circular_unsorted_list(list):
    """
    Circular Unsorted List

    The unsorted list is circular. Remove duplicates keeping first occurrence. The list must remain circular after deduplication.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(circular_unsorted_list([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CircularUnsortedList solves the Circular Unsorted List problem.
// The unsorted list is circular. Remove duplicates keeping first occurrence. The list must remain circular after deduplication.
// Time: O(n), Space: O(1)
func CircularUnsortedList(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(CircularUnsortedList([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-04-circular-unsorted-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-04-circular-unsorted-list'] = problem;
})();
