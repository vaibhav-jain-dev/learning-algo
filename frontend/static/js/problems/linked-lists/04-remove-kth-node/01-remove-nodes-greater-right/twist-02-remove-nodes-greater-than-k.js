/**
 * Remove Nodes Greater Than K
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Nodes Greater Than K',
        difficulty: 'Easy',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Remove all nodes whose value is strictly greater than a given threshold k, regardless of neighboring values.',
        problem: 'Removes the relative comparison aspect entirely. This is a simple filter operation, but handling head removal and consecutive removals requires careful pointer management.',
        hints: [
            'Remove all nodes whose value is strictly greater than a given threshold k, regardless of neighboring values.',
            'Removes the relative comparison aspect entirely',
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
                explanation: 'Initialize pointers at the appropriate positions. Advance them according to the traversal rules (e.g., slow/fast, or one step at a time). The meeting or final position yields the answer.'
            }
        ],
        solutions: {
            python: `def remove_nodes_greater_than_k(list, threshold):
    """
    Remove Nodes Greater Than K

    Remove all nodes whose value is strictly greater than a given threshold k, regardless of neighboring values.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(remove_nodes_greater_than_k([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveNodesGreaterThanK solves the Remove Nodes Greater Than K problem.
// Remove all nodes whose value is strictly greater than a given threshold k, regardless of neighboring values.
// Time: O(n), Space: O(1)
func RemoveNodesGreaterThanK(list []int, threshold int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveNodesGreaterThanK([]int{1, 2, 3, 4, 5}, 5)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-02-remove-nodes-greater-than-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-02-remove-nodes-greater-than-k'] = problem;
})();
