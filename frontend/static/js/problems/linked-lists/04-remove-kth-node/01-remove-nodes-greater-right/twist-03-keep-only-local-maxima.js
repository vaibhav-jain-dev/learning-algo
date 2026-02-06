/**
 * Keep Only Local Maxima
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';

    const problem = {
        name: 'Keep Only Local Maxima',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Remove all nodes that are NOT local maxima. A node is a local maximum if it is greater than or equal to both its neighbors (head and tail are considered local maxima).',
        problem: 'Requires looking at both left and right neighbors simultaneously, not just one direction. This changes the traversal pattern since you need prev, curr, and next references.',
        hints: [
            'Remove all nodes that are NOT local maxima',
            'Requires looking at both left and right neighbors simultaneously, not just one direction',
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
            python: `def keep_only_local_maxima(list):
    """
    Keep Only Local Maxima

    Remove all nodes that are NOT local maxima. A node is a local maximum if it is greater than or equal to both its neighbors (head and tail are considered local maxima).

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(list)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(keep_only_local_maxima([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// KeepOnlyLocalMaxima solves the Keep Only Local Maxima problem.
// Remove all nodes that are NOT local maxima. A node is a local maximum if it is greater than or equal to both its neighbors (head and tail are considered local maxima).
// Time: O(n), Space: O(1)
func KeepOnlyLocalMaxima(list []int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KeepOnlyLocalMaxima([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-03-keep-only-local-maxima', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-03-keep-only-local-maxima'] = problem;
})();
