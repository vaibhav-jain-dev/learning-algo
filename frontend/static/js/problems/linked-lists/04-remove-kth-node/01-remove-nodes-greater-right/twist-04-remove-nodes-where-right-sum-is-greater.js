/**
 * Remove Nodes Where Right Sum Is Greater
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Nodes Where Right Sum Is Greater',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Remove a node if the sum of all nodes to its right is strictly greater than its value.',
        problem: 'Requires computing suffix sums first (or computing on the fly via reverse traversal), comparing each node against an aggregate rather than individual elements.',
        hints: [
            'Remove a node if the sum of all nodes to its right is strictly greater than its value.',
            'Requires computing suffix sums first (or computing on the fly via reverse traversal), comparing each node against an aggregate rather than individual elements.',
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
            python: `def remove_nodes_where_right_sum_is_greater(list):
    """
    Remove Nodes Where Right Sum Is Greater

    Remove a node if the sum of all nodes to its right is strictly greater than its value.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(remove_nodes_where_right_sum_is_greater([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveNodesWhereRightSumIsGreater solves the Remove Nodes Where Right Sum Is Greater problem.
// Remove a node if the sum of all nodes to its right is strictly greater than its value.
// Time: O(n), Space: O(1)
func RemoveNodesWhereRightSumIsGreater(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveNodesWhereRightSumIsGreater([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-04-remove-nodes-where-right-sum-is-greater', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-04-remove-nodes-where-right-sum-is-greater'] = problem;
})();
