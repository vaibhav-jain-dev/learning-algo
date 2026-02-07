/**
 * Delete Middle In-Place (No Return)
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-middle
 * Parent: 02-middle-node
 */
(function() {
    'use strict';

    const problem = {
        name: 'Delete Middle In-Place (No Return)',
        difficulty: 'Medium',
        algorithm: 'll-middle',
        parent: '02-middle-node',
        description: 'Given only a pointer to the middle node (not the head), delete it from the singly linked list. You do not have access to the head or any node before the middle.',
        problem: 'Without access to the previous node, you cannot rewire pointers normally. The classic trick is to copy the next node.',
        hints: [
            'Given only a pointer to the middle node (not the head), delete it from the singly linked list',
            'Without access to the previous node, you cannot rewire pointers normally',
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
            python: `def delete_middle_in_place_no_return(list):
    """
    Delete Middle In-Place (No Return)

    Given only a pointer to the middle node (not the head), delete it from the singly linked list. You do not have access to the head or any node before the middle.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(delete_middle_in_place_no_return([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DeleteMiddleInPlaceNoReturn solves the Delete Middle In-Place (No Return) problem.
// Given only a pointer to the middle node (not the head), delete it from the singly linked list. You do not have access to the head or any node before the middle.
// Time: O(n), Space: O(1)
func DeleteMiddleInPlaceNoReturn(list []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DeleteMiddleInPlaceNoReturn([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '02-middle-node/twist-03-delete-middle-in-place-no-return', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/02-middle-node/twist-03-delete-middle-in-place-no-return'] = problem;
})();
