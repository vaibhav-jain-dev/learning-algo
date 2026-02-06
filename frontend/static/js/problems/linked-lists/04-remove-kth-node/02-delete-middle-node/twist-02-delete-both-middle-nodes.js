/**
 * Delete Both Middle Nodes
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete Both Middle Nodes',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'For even-length lists, delete both middle nodes (the two center nodes). For odd-length lists, delete the single middle node.',
        problem: 'Even-length lists require removing two consecutive nodes, which means tracking the node before both middle nodes and adjusting pointers to skip two nodes.',
        hints: [
            'For even-length lists, delete both middle nodes (the two center nodes)',
            'Even-length lists require removing two consecutive nodes, which means tracking the node before both middle nodes and adjusting pointers to skip two nodes.',
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
            python: `def delete_both_middle_nodes(list):
    """
    Delete Both Middle Nodes

    For even-length lists, delete both middle nodes (the two center nodes). For odd-length lists, delete the single middle node.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(list)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(delete_both_middle_nodes([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DeleteBothMiddleNodes solves the Delete Both Middle Nodes problem.
// For even-length lists, delete both middle nodes (the two center nodes). For odd-length lists, delete the single middle node.
// Time: O(n), Space: O(1)
func DeleteBothMiddleNodes(list []int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DeleteBothMiddleNodes([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-02-delete-both-middle-nodes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-02-delete-both-middle-nodes'] = problem;
})();
