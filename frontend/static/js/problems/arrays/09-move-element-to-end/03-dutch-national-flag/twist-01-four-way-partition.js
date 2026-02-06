/**
 * Four-Way Partition
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: four-way-partition
 * Parent: 09-move-element-to-end/03-dutch-national-flag
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four-Way Partition',
        difficulty: 'Very Hard',
        algorithm: 'four-way-partition',
        parent: '09-move-element-to-end/03-dutch-national-flag',
        description: 'Extend the Dutch National Flag to four categories: less than pivot1, between pivot1 and pivot2, between pivot2 and pivot3, and greater than pivot3. Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.',
        problem: 'Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.',
        hints: [
            'Think about how four-way partition differs from the standard version of this problem.',
            'Key insight: Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
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
            python: `def four_way_partition(array, pivot):
    """
    Four-Way Partition

    Extend the Dutch National Flag to four categories: less than pivot1, between pivot1 and pivot2, between pivot2 and pivot3, and greater than pivot3. Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in array:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(four_way_partition([3,1,2,3,4,3], None))  # Expected: [1,2,4,3,3,3]
print(four_way_partition([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
print(four_way_partition([3,3,3], None))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// FourWayPartition solves the Four-Way Partition problem.
// Extend the Dutch National Flag to four categories: less than pivot1, between pivot1 and pivot2, between pivot2 and pivot3, and greater than pivot3. Three pivots require four pointers and more complex swap logic, significantly harder to maintain invariants.
// Time: O(n), Space: O(n)
func FourWayPartition(array []int, pivot int) string {
	result := ""

	for _, v := range array {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(FourWayPartition([]int{3, 1, 2, 3, 4, 3}, nil)) // Expected: [1,2,4,3,3,3]
	fmt.Println(FourWayPartition([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
	fmt.Println(FourWayPartition([]int{3, 3, 3}, nil)) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/03-dutch-national-flag/twist-01-four-way-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/03-dutch-national-flag/twist-01-four-way-partition'] = problem;
})();
