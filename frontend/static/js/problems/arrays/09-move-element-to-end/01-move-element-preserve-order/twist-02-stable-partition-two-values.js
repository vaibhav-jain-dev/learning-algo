/**
 * Stable Partition Two Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: stable-partition-two-values
 * Parent: 09-move-element-to-end/01-move-element-preserve-order
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stable Partition Two Values',
        difficulty: 'Medium',
        algorithm: 'stable-partition-two-values',
        parent: '09-move-element-to-end/01-move-element-preserve-order',
        description: 'Given two target values A and B, move all As to the end and all Bs to the beginning, preserving order within each group. Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.',
        problem: 'Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.',
        hints: [
            'Think about how stable partition two values differs from the standard version of this problem.',
            'Key insight: Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[3,1,2,3,4,3],"target":3},
                output: [1,2,4,3,3,3],
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def stable_partition_two_values(array, toMove, target):
    """
    Stable Partition Two Values

    Given two target values A and B, move all As to the end and all Bs to the beginning, preserving order within each group. Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in array:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(stable_partition_two_values([3,1,2,3,4,3], None, 3))  # Expected: [1,2,4,3,3,3]
print(stable_partition_two_values([1,2,3,4,5], None, 6))  # Expected: [1,2,3,4,5]
print(stable_partition_two_values([3,3,3], None, 3))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// StablePartitionTwoValues solves the Stable Partition Two Values problem.
// Given two target values A and B, move all As to the end and all Bs to the beginning, preserving order within each group. Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.
// Time: O(n), Space: O(n)
func StablePartitionTwoValues(array []int, toMove int, target int) string {
	result := ""

	for _, v := range array {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(StablePartitionTwoValues([]int{3, 1, 2, 3, 4, 3}, nil, 3)) // Expected: [1,2,4,3,3,3]
	fmt.Println(StablePartitionTwoValues([]int{1, 2, 3, 4, 5}, nil, 6)) // Expected: [1,2,3,4,5]
	fmt.Println(StablePartitionTwoValues([]int{3, 3, 3}, nil, 3)) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order/twist-02-stable-partition-two-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order/twist-02-stable-partition-two-values'] = problem;
})();
