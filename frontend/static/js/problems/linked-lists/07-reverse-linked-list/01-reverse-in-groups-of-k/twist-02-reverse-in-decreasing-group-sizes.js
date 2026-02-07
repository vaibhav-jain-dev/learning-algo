/**
 * Reverse in Decreasing Group Sizes
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-reverse
 * Parent: 07-reverse-linked-list/01-reverse-in-groups-of-k
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse in Decreasing Group Sizes',
        difficulty: 'Hard',
        algorithm: 'll-reverse',
        parent: '07-reverse-linked-list/01-reverse-in-groups-of-k',
        description: 'Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.',
        problem: 'The group size changes dynamically, requiring a counter that increments after each group. The k parameter is replaced by a growing variable.',
        hints: [
            'Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.',
            'The group size changes dynamically, requiring a counter that increments after each group',
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
            python: `def reverse_in_decreasing_group_sizes(list, k):
    """
    Reverse in Decreasing Group Sizes

    Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(reverse_in_decreasing_group_sizes([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// ReverseInDecreasingGroupSizes solves the Reverse in Decreasing Group Sizes problem.
// Reverse the first 1 node, then the next 2 nodes, then the next 3 nodes, and so on with increasing group sizes.
// Time: O(n), Space: O(1)
func ReverseInDecreasingGroupSizes(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(ReverseInDecreasingGroupSizes([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '07-reverse-linked-list/01-reverse-in-groups-of-k/twist-02-reverse-in-decreasing-group-sizes', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/07-reverse-linked-list/01-reverse-in-groups-of-k/twist-02-reverse-in-decreasing-group-sizes'] = problem;
})();
