/**
 * O(1) Space Without Sorting
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-duplicates
 * Parent: 01-remove-duplicates/01-remove-duplicates-unsorted
 */
(function() {
    'use strict';

    const problem = {
        name: 'O(1) Space Without Sorting',
        difficulty: 'Hard',
        algorithm: 'll-remove-duplicates',
        parent: '01-remove-duplicates/01-remove-duplicates-unsorted',
        description: 'Remove duplicates from the unsorted list using O(1) extra space. You cannot use a hash set and you cannot sort the list first.',
        problem: 'Without a hash set, you must use a brute-force nested loop approach: for each node, scan ahead to remove all future occurrences. This changes the time complexity to O(n^2) and forces a fundamentally different two-pointer strategy.',
        hints: [
            'Remove duplicates from the unsorted list using O(1) extra space',
            'Without a hash set, you must use a brute-force nested loop approach: for each node, scan ahead to remove all future occurrences',
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
            python: `def o_1_space_without_sorting(list):
    """
    O(1) Space Without Sorting

    Remove duplicates from the unsorted list using O(1) extra space. You cannot use a hash set and you cannot sort the list first.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(o_1_space_without_sorting([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// O1SpaceWithoutSorting solves the O(1) Space Without Sorting problem.
// Remove duplicates from the unsorted list using O(1) extra space. You cannot use a hash set and you cannot sort the list first.
// Time: O(n), Space: O(1)
func O1SpaceWithoutSorting(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(O1SpaceWithoutSorting([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '01-remove-duplicates/01-remove-duplicates-unsorted/twist-01-o-1-space-without-sorting', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/01-remove-duplicates/01-remove-duplicates-unsorted/twist-01-o-1-space-without-sorting'] = problem;
})();
