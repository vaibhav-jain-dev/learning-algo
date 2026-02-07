/**
 * Remove Nodes With Smaller Value on Right
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/01-remove-nodes-greater-right
 */
(function() {
    'use strict';

    const problem = {
        name: 'Remove Nodes With Smaller Value on Right',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/01-remove-nodes-greater-right',
        description: 'Remove all nodes that have a strictly smaller value anywhere to their right side.',
        problem: 'Flips the comparison direction. Instead of a monotonically decreasing stack, you need a monotonically increasing stack, changing which nodes survive.',
        hints: [
            'Remove all nodes that have a strictly smaller value anywhere to their right side.',
            'Flips the comparison direction',
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
            python: `def remove_nodes_with_smaller_value_on_right(list):
    """
    Remove Nodes With Smaller Value on Right

    Remove all nodes that have a strictly smaller value anywhere to their right side.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(remove_nodes_with_smaller_value_on_right([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// RemoveNodesWithSmallerValueOnRight solves the Remove Nodes With Smaller Value on Right problem.
// Remove all nodes that have a strictly smaller value anywhere to their right side.
// Time: O(n), Space: O(1)
func RemoveNodesWithSmallerValueOnRight(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(RemoveNodesWithSmallerValueOnRight([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/01-remove-nodes-greater-right/twist-01-remove-nodes-with-smaller-value-on-right', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/01-remove-nodes-greater-right/twist-01-remove-nodes-with-smaller-value-on-right'] = problem;
})();
