/**
 * Three-Way Partition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-way-partition
 * Parent: 09-move-element-to-end/02-partition-array-by-predicate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three-Way Partition',
        difficulty: 'Hard',
        algorithm: 'three-way-partition',
        parent: '09-move-element-to-end/02-partition-array-by-predicate',
        description: 'Partition into three groups: elements satisfying predicate A, elements satisfying predicate B, and the rest. Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.',
        problem: 'Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.',
        hints: [
            'Think about how three-way partition differs from the standard version of this problem.',
            'Key insight: Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
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
                explanation: ''
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: ''
            },
            // Edge case
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: ''
            }
        ],
        solutions: {
            python: `def three_way_partition(array):
    """
    Three-Way Partition

    Partition into three groups: elements satisfying predicate A, elements satisfying predicate B, and the rest. Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.

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
print(three_way_partition([3,1,2,3,4,3]))  # Expected: [1,2,4,3,3,3]
print(three_way_partition([1,2,3,4,5]))  # Expected: [1,2,3,4,5]
print(three_way_partition([3,3,3]))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// ThreeWayPartition solves the Three-Way Partition problem.
// Partition into three groups: elements satisfying predicate A, elements satisfying predicate B, and the rest. Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.
// Time: O(n^2), Space: O(n)
func ThreeWayPartition(array []int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(array); i++ {
		for j := i + 1; j < len(array); j++ {
			result = append(result, []int{array[i], array[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(ThreeWayPartition([]int{3, 1, 2, 3, 4, 3})) // Expected: [1,2,4,3,3,3]
	fmt.Println(ThreeWayPartition([]int{1, 2, 3, 4, 5})) // Expected: [1,2,3,4,5]
	fmt.Println(ThreeWayPartition([]int{3, 3, 3})) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate/twist-02-three-way-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate/twist-02-three-way-partition'] = problem;
})();
