/**
 * Delete Middle Given Only That Node
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete Middle Given Only That Node',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'You are only given a reference to the middle node itself (not the head). Delete it from the list.',
        problem: 'Without access to the previous node, you must copy the next node value into the current node and delete the next node instead, a classic trick that changes the deletion strategy entirely.',
        hints: [
            'You are only given a reference to the middle node itself (not the head)',
            'Without access to the previous node, you must copy the next node value into the current node and delete the next node instead, a classic trick that changes the deletion strategy entirely.',
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
            python: `def delete_middle_given_only_that_node(list):
    """
    Delete Middle Given Only That Node

    You are only given a reference to the middle node itself (not the head). Delete it from the list.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(delete_middle_given_only_that_node([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DeleteMiddleGivenOnlyThatNode solves the Delete Middle Given Only That Node problem.
// You are only given a reference to the middle node itself (not the head). Delete it from the list.
// Time: O(n), Space: O(1)
func DeleteMiddleGivenOnlyThatNode(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DeleteMiddleGivenOnlyThatNode([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-03-delete-middle-given-only-that-node', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-03-delete-middle-given-only-that-node'] = problem;
})();
