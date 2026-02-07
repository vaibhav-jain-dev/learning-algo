/**
 * Flatten with Path Tracking
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten with Path Tracking',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'While flattening, also record the index path to each element. Return pairs of (value, path) where path is an array of indices.',
        problem: 'Requires maintaining additional state through the recursion: the current index path. This transforms a simple traversal into one that tracks positional context, useful for debugging or reconstructing the original structure.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[[1,2],[3,[4,5]],6]},
                output: [0,1,2],
                explanation: 'The flatten with path tracking for this input yields [0, 1, 2].'
            },
            // Edge case
            {
                input: {"array":[[1,2]]},
                output: [],
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def flatten_with_path_tracking(array):
    """
    Flatten with Path Tracking

    While flattening, also record the index path to each element. Return pairs of (value, path) where path is an array of indices.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(flatten_with_path_tracking([[1,2],[3,[4,5]],6]))  # Expected: [0,1,2]
print(flatten_with_path_tracking([[1,2]]))  # Expected: []
`,
            go: `package main

import "fmt"

// FlattenWithPathTracking solves the Flatten with Path Tracking problem.
// While flattening, also record the index path to each element. Return pairs of (value, path) where path is an array of indices.
// Time: O(?), Space: O(?)
func FlattenWithPathTracking(array [][]int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(FlattenWithPathTracking([][]int{{1, 2}, {3, 4,5}, 6})) // Expected: [0,1,2]
	fmt.Println(FlattenWithPathTracking([][]int{{1, 2}})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-05-flatten-with-path-tracking', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-05-flatten-with-path-tracking'] = problem;
})();
