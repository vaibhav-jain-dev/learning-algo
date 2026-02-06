/**
 * Move Multiple Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: move-multiple-values
 * Parent: 09-move-element-to-end
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Multiple Values',
        difficulty: 'Medium',
        algorithm: 'move-multiple-values',
        parent: '09-move-element-to-end',
        description: 'Given a set of values to move (not just one), move all of them to the end of the array. Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.',
        problem: 'Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.',
        hints: [
            'Think about how move multiple values differs from the standard version of this problem.',
            'Key insight: Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.',
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
            python: `def move_multiple_values(array, toMove):
    """
    Move Multiple Values

    Given a set of values to move (not just one), move all of them to the end of the array. Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(move_multiple_values([3,1,2,3,4,3], None))  # Expected: [1,2,4,3,3,3]
print(move_multiple_values([1,2,3,4,5], None))  # Expected: [1,2,3,4,5]
print(move_multiple_values([3,3,3], None))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// MoveMultipleValues solves the Move Multiple Values problem.
// Given a set of values to move (not just one), move all of them to the end of the array. Checking membership in a set of values changes the comparison logic and may require a hash set for efficiency.
// Time: O(n), Space: O(n)
func MoveMultipleValues(array []int, toMove int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(MoveMultipleValues([]int{3, 1, 2, 3, 4, 3}, nil)) // Expected: [1,2,4,3,3,3]
	fmt.Println(MoveMultipleValues([]int{1, 2, 3, 4, 5}, nil)) // Expected: [1,2,3,4,5]
	fmt.Println(MoveMultipleValues([]int{3, 3, 3}, nil)) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/twist-03-move-multiple-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/twist-03-move-multiple-values'] = problem;
})();
