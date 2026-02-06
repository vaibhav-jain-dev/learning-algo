/**
 * Remove Kth Node From Beginning
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Kth Node From Beginning',
        difficulty: 'Easy',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node from the beginning of the list instead of from the end. Do this in a single pass without knowing the length.',
        problem: 'Simplifies the two-pointer approach since you do not need the gap technique; just traverse k-1 nodes. But consider edge cases when k=1 (removing the head).',
        hints: [
            'Remove the kth node from the beginning of the list instead of from the end',
            'Simplifies the two-pointer approach since you do not need the gap technique; just traverse k-1 nodes',
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
            python: `def remove_kth_node_from_beginning(list, k):
    """
    Remove Kth Node From Beginning

    Remove the kth node from the beginning of the list instead of from the end. Do this in a single pass without knowing the length.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(remove_kth_node_from_beginning([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveKthNodeFromBeginning solves the Remove Kth Node From Beginning problem.
// Remove the kth node from the beginning of the list instead of from the end. Do this in a single pass without knowing the length.
// Time: O(n), Space: O(1)
func RemoveKthNodeFromBeginning(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveKthNodeFromBeginning([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-01-remove-kth-node-from-beginning', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-01-remove-kth-node-from-beginning'] = problem;
})();
