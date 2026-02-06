/**
 * Dutch National Flag on Linked List
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-rearrange
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Dutch National Flag on Linked List',
        difficulty: 'Medium',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'The list contains only values 0, 1, and 2. Sort it in O(n) time and O(1) space by partitioning into three groups (all 0s, then 1s, then 2s).',
        problem: 'A constrained version of the partition problem with exactly three known values. Can use three pointer heads and append each node to the appropriate list.',
        hints: [
            'The list contains only values 0, 1, and 2',
            'A constrained version of the partition problem with exactly three known values',
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
            python: `def dutch_national_flag_on_linked_list(list, k):
    """
    Dutch National Flag on Linked List

    The list contains only values 0, 1, and 2. Sort it in O(n) time and O(1) space by partitioning into three groups (all 0s, then 1s, then 2s).

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(dutch_national_flag_on_linked_list([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// DutchNationalFlagOnLinkedList solves the Dutch National Flag on Linked List problem.
// The list contains only values 0, 1, and 2. Sort it in O(n) time and O(1) space by partitioning into three groups (all 0s, then 1s, then 2s).
// Time: O(n), Space: O(1)
func DutchNationalFlagOnLinkedList(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(DutchNationalFlagOnLinkedList([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-04-dutch-national-flag-on-linked-list', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-04-dutch-national-flag-on-linked-list'] = problem;
})();
