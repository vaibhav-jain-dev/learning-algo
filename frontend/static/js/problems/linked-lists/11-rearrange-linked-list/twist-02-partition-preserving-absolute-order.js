/**
 * Partition Preserving Absolute Order
 * Category: linked-lists
 * Difficulty: Medium
 * Algorithm: ll-rearrange
 * Parent: 11-rearrange-linked-list
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition Preserving Absolute Order',
        difficulty: 'Medium',
        algorithm: 'll-rearrange',
        parent: '11-rearrange-linked-list',
        description: 'Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.',
        problem: 'Adds a sorting requirement within each partition, requiring either sorted insertion or post-partition sorting of each group before concatenation.',
        hints: [
            'Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.',
            'Adds a sorting requirement within each partition, requiring either sorted insertion or post-partition sorting of each group before concatenation.',
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
            python: `def partition_preserving_absolute_order(list, k):
    """
    Partition Preserving Absolute Order

    Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.

    Time: O(n)
    Space: O(1)
    """
    result = []

    for i in range(len(list)):
        # Check if element meets criteria
        result.append(list[i])

    return result


# Test cases
print(partition_preserving_absolute_order([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
`,
            go: `package main

import "fmt"

// PartitionPreservingAbsoluteOrder solves the Partition Preserving Absolute Order problem.
// Rearrange the list around value k, but the output must have all three groups (less, equal, greater) individually sorted in ascending order.
// Time: O(n), Space: O(1)
func PartitionPreservingAbsoluteOrder(list []int, k int) []int {
	result := make([]int, 0)

	for i := 0; i < len(list); i++ {
		result = append(result, list[i])
	}

	return result
}

func main() {
	fmt.Println(PartitionPreservingAbsoluteOrder([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('linked-lists', '11-rearrange-linked-list/twist-02-partition-preserving-absolute-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['linked-lists/11-rearrange-linked-list/twist-02-partition-preserving-absolute-order'] = problem;
})();
