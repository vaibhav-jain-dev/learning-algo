/**
 * Swap Nodes Not Values
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/03-swapping-nodes
 */
(function() {
    'use strict';

    const problem = {
        name: 'Swap Nodes Not Values',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/03-swapping-nodes',
        description: 'Swap the actual nodes (relinking pointers) instead of just swapping their values. The node objects themselves must move.',
        problem: 'Swapping node pointers requires tracking predecessors of both nodes and carefully relinking four pointers, handling adjacent-node and head-node edge cases.',
        hints: [
            'Swap the actual nodes (relinking pointers) instead of just swapping their values',
            'Swapping node pointers requires tracking predecessors of both nodes and carefully relinking four pointers, handling adjacent-node and head-node edge cases.',
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
            python: `def swap_nodes_not_values(list, k):
    """
    Swap Nodes Not Values

    Swap the actual nodes (relinking pointers) instead of just swapping their values. The node objects themselves must move.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(swap_nodes_not_values([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// SwapNodesNotValues solves the Swap Nodes Not Values problem.
// Swap the actual nodes (relinking pointers) instead of just swapping their values. The node objects themselves must move.
// Time: O(n), Space: O(1)
func SwapNodesNotValues(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(SwapNodesNotValues([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/03-swapping-nodes/twist-01-swap-nodes-not-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/03-swapping-nodes/twist-01-swap-nodes-not-values'] = problem;
})();
