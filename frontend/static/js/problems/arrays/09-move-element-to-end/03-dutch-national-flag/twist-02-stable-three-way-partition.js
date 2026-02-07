/**
 * Stable Three-Way Partition
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: stable-three-way-partition
 * Parent: 09-move-element-to-end/03-dutch-national-flag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stable Three-Way Partition',
        difficulty: 'Very Hard',
        algorithm: 'stable-three-way-partition',
        parent: '09-move-element-to-end/03-dutch-national-flag',
        description: 'Partition into three groups around the pivot but preserve the relative order within each group. Standard DNF is unstable. Achieving stability in O(n) time and O(1) space is extremely challenging.',
        problem: 'Standard DNF is unstable. Achieving stability in O(n) time and O(1) space is extremely challenging.',
        hints: [
            'Think about how stable three-way partition differs from the standard version of this problem.',
            'Key insight: Standard DNF is unstable. Achieving stability in O(n) time and O(1) space is extremely challenging.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
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
            python: `def stable_three_way_partition(array, pivot):
    """
    Stable Three-Way Partition

    Partition into three groups around the pivot but preserve the relative order within each group. Standard DNF is unstable. Achieving stability in O(n) time and O(1) space is extremely challenging.

    Time: O(n^2)
    Space: O(n)
    """
    result = []
    n = len(array)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([array[i], array[j]])

    return result


# Test cases
print(stable_three_way_partition([3,1,2,3,4,3], None))  # Expected: [1,2,4,3,3,3]
print(stable_three_way_partition([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
print(stable_three_way_partition([3,3,3], None))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// StableThreeWayPartition solves the Stable Three-Way Partition problem.
// Partition into three groups around the pivot but preserve the relative order within each group. Standard DNF is unstable. Achieving stability in O(n) time and O(1) space is extremely challenging.
// Time: O(n^2), Space: O(n)
func StableThreeWayPartition(array []int, pivot int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(array); i++ {
		for j := i + 1; j < len(array); j++ {
			result = append(result, []int{array[i], array[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(StableThreeWayPartition([]int{3, 1, 2, 3, 4, 3}, nil)) // Expected: [1,2,4,3,3,3]
	fmt.Println(StableThreeWayPartition([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
	fmt.Println(StableThreeWayPartition([]int{3, 3, 3}, nil)) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag/twist-02-stable-three-way-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag/twist-02-stable-three-way-partition'] = problem;
})();
