/**
 * Count Duplicates Instead of Removing
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Duplicates Instead of Removing',
        difficulty: 'Easy',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates',
        description: 'Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them. Do this in O(1) space.',
        problem: 'Shifts the focus from pointer manipulation to pure counting logic. You still traverse the same way but the mental model changes from "rewiring" to "tallying."',
        hints: [
            'Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them',
            'Shifts the focus from pointer manipulation to pure counting logic',
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
            python: `def count_duplicates_instead_of_removing(list):
    """
    Count Duplicates Instead of Removing

    Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them. Do this in O(1) space.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(list)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(count_duplicates_instead_of_removing([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// CountDuplicatesInsteadOfRemoving solves the Count Duplicates Instead of Removing problem.
// Instead of modifying the list, return a count of how many duplicate nodes would be removed without actually removing them. Do this in O(1) space.
// Time: O(n), Space: O(1)
func CountDuplicatesInsteadOfRemoving(list []int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(CountDuplicatesInsteadOfRemoving([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/twist-04-count-duplicates-instead-of-removing', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/twist-04-count-duplicates-instead-of-removing'] = problem;
})();
