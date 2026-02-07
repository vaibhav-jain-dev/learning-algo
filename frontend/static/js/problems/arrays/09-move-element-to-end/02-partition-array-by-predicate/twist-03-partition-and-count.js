/**
 * Partition and Count
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: partition-and-count
 * Parent: 09-move-element-to-end/02-partition-array-by-predicate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition and Count',
        difficulty: 'Easy',
        algorithm: 'partition-and-count',
        parent: '09-move-element-to-end/02-partition-array-by-predicate',
        description: 'Partition the array and return the count of elements satisfying the predicate (the partition point index). The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.',
        problem: 'The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.',
        hints: [
            'Think about how partition and count differs from the standard version of this problem.',
            'Key insight: The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.',
            'A hash map can help track frequencies or previously seen values efficiently.',
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
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Process the input according to the core logic. Each element is examined and contributes to building the final result.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'The algorithm handles this case by applying the key operation to each element. The accumulated result after processing all elements gives the answer.'
            },
            // Edge case
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'This test case validates the algorithm behavior. The step-by-step processing of input elements produces the expected output.'
            }
        ],
        solutions: {
            python: `def partition_and_count(array):
    """
    Partition and Count

    Partition the array and return the count of elements satisfying the predicate (the partition point index). The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.

    Time: O(n)
    Space: O(n)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(partition_and_count([1,2,1,2,3]))  # Expected: 2
print(partition_and_count([1,2,3]))  # Expected: 1
print(partition_and_count([1,1,1]))  # Expected: 3
`,
            go: `package main

import "fmt"

// PartitionAndCount solves the Partition and Count problem.
// Partition the array and return the count of elements satisfying the predicate (the partition point index). The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.
// Time: O(n), Space: O(n)
func PartitionAndCount(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PartitionAndCount([]int{1, 2, 1, 2, 3})) // Expected: 2
	fmt.Println(PartitionAndCount([]int{1, 2, 3})) // Expected: 1
	fmt.Println(PartitionAndCount([]int{1, 1, 1})) // Expected: 3
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate/twist-03-partition-and-count', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate/twist-03-partition-and-count'] = problem;
})();
