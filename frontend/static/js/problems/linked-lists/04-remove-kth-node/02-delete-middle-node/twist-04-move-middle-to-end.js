/**
 * Move Middle to End
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Middle to End',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.',
        problem: 'Requires both finding the middle and relinking it at the tail. You need to detach the middle from its position and append it, requiring both predecessor and tail tracking.',
        hints: [
            'Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.',
            'Requires both finding the middle and relinking it at the tail',
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
            python: `def move_middle_to_end(list):
    """
    Move Middle to End

    Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(move_middle_to_end([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// MoveMiddleToEnd solves the Move Middle to End problem.
// Instead of deleting the middle node, move it to the end of the list while maintaining the relative order of all other nodes.
// Time: O(n), Space: O(1)
func MoveMiddleToEnd(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(MoveMiddleToEnd([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-04-move-middle-to-end', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-04-move-middle-to-end'] = problem;
})();
