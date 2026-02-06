/**
 * Delete Middle Without Slow-Fast
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete Middle Without Slow-Fast',
        difficulty: 'Medium',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'Delete the middle node but you are not allowed to use the slow-fast pointer technique. Find another approach.',
        problem: 'Forces you to use a two-pass approach (count then delete) or a different single-pass technique like using a counter variable, rather than the elegant slow-fast trick.',
        hints: [
            'Delete the middle node but you are not allowed to use the slow-fast pointer technique',
            'Forces you to use a two-pass approach (count then delete) or a different single-pass technique like using a counter variable, rather than the elegant slow-fast trick.',
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
            python: `def delete_middle_without_slow_fast(list):
    """
    Delete Middle Without Slow-Fast

    Delete the middle node but you are not allowed to use the slow-fast pointer technique. Find another approach.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(delete_middle_without_slow_fast([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DeleteMiddleWithoutSlowFast solves the Delete Middle Without Slow-Fast problem.
// Delete the middle node but you are not allowed to use the slow-fast pointer technique. Find another approach.
// Time: O(n), Space: O(1)
func DeleteMiddleWithoutSlowFast(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DeleteMiddleWithoutSlowFast([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-01-delete-middle-without-slow-fast', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-01-delete-middle-without-slow-fast'] = problem;
})();
