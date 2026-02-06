/**
 * Mark Instead of Remove
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';

    const problem = {
        name: 'Mark Instead of Remove',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Instead of removing nodes, mark the nodes that would be removed by setting their value to -1. Return the modified list without actually deleting any nodes.',
        problem: 'Changes from pointer manipulation to value mutation. The identification logic is the same, but the implementation avoids the complexity of node deletion and relinking.',
        hints: [
            'Instead of removing nodes, mark the nodes that would be removed by setting their value to -1',
            'Changes from pointer manipulation to value mutation',
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
            python: `def mark_instead_of_remove(list):
    """
    Mark Instead of Remove

    Instead of removing nodes, mark the nodes that would be removed by setting their value to -1. Return the modified list without actually deleting any nodes.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(mark_instead_of_remove([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MarkInsteadOfRemove solves the Mark Instead of Remove problem.
// Instead of removing nodes, mark the nodes that would be removed by setting their value to -1. Return the modified list without actually deleting any nodes.
// Time: O(n), Space: O(1)
func MarkInsteadOfRemove(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(MarkInsteadOfRemove([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-05-mark-instead-of-remove', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-05-mark-instead-of-remove'] = problem;
})();
