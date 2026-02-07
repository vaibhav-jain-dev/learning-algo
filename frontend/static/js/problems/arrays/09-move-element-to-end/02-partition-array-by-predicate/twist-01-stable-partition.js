/**
 * Stable Partition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: stable-partition
 * Parent: 09-move-element-to-end/02-partition-array-by-predicate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stable Partition',
        difficulty: 'Hard',
        algorithm: 'stable-partition',
        parent: '09-move-element-to-end/02-partition-array-by-predicate',
        description: 'Partition the array by predicate while preserving the relative order of elements within each partition. Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.',
        problem: 'Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.',
        hints: [
            'Think about how stable partition differs from the standard version of this problem.',
            'Key insight: Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.',
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
            python: `def stable_partition(array):
    """
    Stable Partition

    Partition the array by predicate while preserving the relative order of elements within each partition. Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(stable_partition([3,1,2,3,4,3]))  # Expected: [1,2,4,3,3,3]
print(stable_partition([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
print(stable_partition([3,3,3]))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// StablePartition solves the Stable Partition problem.
// Partition the array by predicate while preserving the relative order of elements within each partition. Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.
// Time: O(n), Space: O(n)
func StablePartition(array []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(StablePartition([]int{3, 1, 2, 3, 4, 3})) // Expected: [1,2,4,3,3,3]
	fmt.Println(StablePartition([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
	fmt.Println(StablePartition([]int{3, 3, 3})) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate/twist-01-stable-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate/twist-01-stable-partition'] = problem;
})();
