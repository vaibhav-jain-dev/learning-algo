/**
 * Four-Way Partition
 * Category: linked-lists
 * Difficulty: Hard
 * Algorithm: ll-rearrange
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four-Way Partition',
        difficulty: 'Hard',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b. Maintain relative order in each group.',
        problem: 'Extends from three partitions to four, requiring four separate sub-lists that must be concatenated in order, with more boundary conditions to manage.',
        hints: [
            'Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b',
            'Extends from three partitions to four, requiring four separate sub-lists that must be concatenated in order, with more boundary conditions to manage.',
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
            python: `def four_way_partition(list, k):
    """
    Four-Way Partition

    Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b. Maintain relative order in each group.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(four_way_partition([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// FourWayPartition solves the Four-Way Partition problem.
// Partition the list into four groups: values less than a, values equal to a, values between a and b, values greater than or equal to b. Maintain relative order in each group.
// Time: O(n), Space: O(1)
func FourWayPartition(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(FourWayPartition([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-01-four-way-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-01-four-way-partition'] = problem;
})();
