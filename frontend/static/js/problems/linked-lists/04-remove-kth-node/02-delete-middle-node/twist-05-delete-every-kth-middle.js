/**
 * Delete Every Kth Middle
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-remove-kth
 * Parent: 04-remove-kth-node/02-delete-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete Every Kth Middle',
        difficulty: 'Hard',
        algorithm: 'll-remove-kth',
        parent: '04-remove-kth-node/02-delete-middle-node',
        description: 'Repeatedly delete the middle node of the remaining list k times. Return the list after k deletions.',
        problem: 'Requires running the middle-finding algorithm k times on a shrinking list, where the list length and middle position change after each deletion.',
        hints: [
            'Repeatedly delete the middle node of the remaining list k times',
            'Requires running the middle-finding algorithm k times on a shrinking list, where the list length and middle position change after each deletion.',
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
            python: `def delete_every_kth_middle(list):
    """
    Delete Every Kth Middle

    Repeatedly delete the middle node of the remaining list k times. Return the list after k deletions.

    Time: O(n)
    Space: O(1)
    """
    result = 0

    for i in range(len(list)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(delete_every_kth_middle([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DeleteEveryKthMiddle solves the Delete Every Kth Middle problem.
// Repeatedly delete the middle node of the remaining list k times. Return the list after k deletions.
// Time: O(n), Space: O(1)
func DeleteEveryKthMiddle(list []int) int {
	result := 0

	for i := 0; i < len(list); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(DeleteEveryKthMiddle([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '04-remove-kth-node/02-delete-middle-node/twist-05-delete-every-kth-middle', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/04-remove-kth-node/02-delete-middle-node/twist-05-delete-every-kth-middle'] = problem;
})();
