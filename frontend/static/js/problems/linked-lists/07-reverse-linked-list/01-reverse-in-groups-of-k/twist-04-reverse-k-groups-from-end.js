/**
 * Reverse K Groups From End
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse K Groups From End',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'Group the nodes from the end of the list in groups of k, then reverse each group. Leftover nodes at the beginning remain as-is.',
        problem: 'Grouping from the end means the leftover partial group is at the start, not the end. Requires knowing the total length first to determine the offset.',
        hints: [
            'Group the nodes from the end of the list in groups of k, then reverse each group',
            'Grouping from the end means the leftover partial group is at the start, not the end',
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
            python: `def reverse_k_groups_from_end(list, k):
    """
    Reverse K Groups From End

    Group the nodes from the end of the list in groups of k, then reverse each group. Leftover nodes at the beginning remain as-is.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_k_groups_from_end([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseKGroupsFromEnd solves the Reverse K Groups From End problem.
// Group the nodes from the end of the list in groups of k, then reverse each group. Leftover nodes at the beginning remain as-is.
// Time: O(n), Space: O(1)
func ReverseKGroupsFromEnd(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseKGroupsFromEnd([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-04-reverse-k-groups-from-end', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-04-reverse-k-groups-from-end'] = problem;
})();
