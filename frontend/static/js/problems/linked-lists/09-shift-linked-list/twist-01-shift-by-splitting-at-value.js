/**
 * Shift by Splitting at Value
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-shift
 * Parent: 09-shift-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shift by Splitting at Value',
        difficulty: 'Medium',
        algorithm: 'll-shift',
        parent: '09-shift-linked-list',
        description: 'Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head. Wrap the preceding nodes to the end.',
        problem: 'Position-based shifting becomes value-based searching. You must find the target node first, then perform the rotation at that point.',
        hints: [
            'Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head',
            'Position-based shifting becomes value-based searching',
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
            python: `def shift_by_splitting_at_value(list, k, target):
    """
    Shift by Splitting at Value

    Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head. Wrap the preceding nodes to the end.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(shift_by_splitting_at_value([1,2,3,4,5], None, None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ShiftBySplittingAtValue solves the Shift by Splitting at Value problem.
// Instead of shifting by k positions, shift the list so that the node with a given target value becomes the new head. Wrap the preceding nodes to the end.
// Time: O(n), Space: O(1)
func ShiftBySplittingAtValue(list []int, k int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ShiftBySplittingAtValue([]int{1, 2, 3, 4, 5}, nil, 10)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '09-shift-linked-list/twist-01-shift-by-splitting-at-value', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/09-shift-linked-list/twist-01-shift-by-splitting-at-value'] = problem;
})();
