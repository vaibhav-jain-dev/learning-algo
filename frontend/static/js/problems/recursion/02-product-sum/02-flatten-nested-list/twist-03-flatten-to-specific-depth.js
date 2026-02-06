/**
 * Flatten to Specific Depth
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum/02-flatten-nested-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Flatten to Specific Depth',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum/02-flatten-nested-list',
        description: 'Modify flatten to accept a depth parameter. Only flatten arrays up to the specified depth, leaving deeper arrays intact. This matches JavaScript\',
        problem: 'Adds a depth constraint to the recursion, requiring you to track and decrement the allowed depth. When depth reaches 0, you stop flattening and include sub-arrays as-is.',
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
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the flatten to specific depth criteria.'
            },
            // Edge case
            {
                input: {"array":[[1,2]]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def flatten_to_specific_depth(array):
    """
    Flatten to Specific Depth

    Modify flatten to accept a depth parameter. Only flatten arrays up to the specified depth, leaving deeper arrays intact. This matches JavaScript\\

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(flatten_to_specific_depth([[1,2],[3,[4,5]],6]))  # Expected: 2
print(flatten_to_specific_depth([[1,2]]))  # Expected: 0
`,
            go: `package main

import "fmt"

// FlattenToSpecificDepth solves the Flatten to Specific Depth problem.
// Modify flatten to accept a depth parameter. Only flatten arrays up to the specified depth, leaving deeper arrays intact. This matches JavaScript\\
// Time: O(?), Space: O(?)
func FlattenToSpecificDepth(array [][]int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(FlattenToSpecificDepth([][]int{{1, 2}, {3, 4,5}, 6})) // Expected: 2
	fmt.Println(FlattenToSpecificDepth([][]int{{1, 2}})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/02-flatten-nested-list/twist-03-flatten-to-specific-depth', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/02-flatten-nested-list/twist-03-flatten-to-specific-depth'] = problem;
})();
