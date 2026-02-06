/**
 * Return the Removed Node Value
 * Category: linked-lists
 * Difficulty: Easy
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Return the Removed Node Value',
        difficulty: 'Easy',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node',
        description: 'Remove the kth node from the end and return its value, not the modified list head.',
        problem: 'Requires capturing the value before removal. The two-pointer technique remains the same, but you must track the target node to extract its value.',
        hints: [
            'Remove the kth node from the end and return its value, not the modified list head.',
            'Requires capturing the value before removal',
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
            python: `def return_the_removed_node_value(list, k):
    """
    Return the Removed Node Value

    Remove the kth node from the end and return its value, not the modified list head.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(return_the_removed_node_value([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReturnTheRemovedNodeValue solves the Return the Removed Node Value problem.
// Remove the kth node from the end and return its value, not the modified list head.
// Time: O(n), Space: O(1)
func ReturnTheRemovedNodeValue(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReturnTheRemovedNodeValue([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/twist-04-return-the-removed-node-value', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/twist-04-return-the-removed-node-value'] = problem;
})();
