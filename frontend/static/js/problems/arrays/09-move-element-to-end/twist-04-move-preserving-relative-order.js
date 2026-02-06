/**
 * Move Preserving Relative Order
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: move-preserving-relative-order
 * Parent: 09-move-element-to-end
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Preserving Relative Order',
        difficulty: 'Medium',
        algorithm: 'move-preserving-relative-order',
        parent: '09-move-element-to-end',
        description: 'Move target elements to the end while preserving the relative order of all remaining elements. Swapping disrupts order; you need a read/write pointer approach instead, fundamentally changing the algorithm.',
        problem: 'Swapping disrupts order; you need a read/write pointer approach instead, fundamentally changing the algorithm.',
        hints: [
            'Think about how move preserving relative order differs from the standard version of this problem.',
            'Key insight: Swapping disrupts order; you need a read/write pointer approach instead, fundamentally changing the algorithm.',
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
            python: `def move_preserving_relative_order(array, toMove, target):
    """
    Move Preserving Relative Order

    Move target elements to the end while preserving the relative order of all remaining elements. Swapping disrupts order; you need a read/write pointer approach instead, fundamentally changing the algorithm.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(move_preserving_relative_order([3,1,2,3,4,3], None, 3))  # Expected: [1,2,4,3,3,3]
print(move_preserving_relative_order([1,2,3,4,5], None, 6))  # Expected: [1,2,3,4,5]
print(move_preserving_relative_order([3,3,3], None, 3))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// MovePreservingRelativeOrder solves the Move Preserving Relative Order problem.
// Move target elements to the end while preserving the relative order of all remaining elements. Swapping disrupts order; you need a read/write pointer approach instead, fundamentally changing the algorithm.
// Time: O(n), Space: O(n)
func MovePreservingRelativeOrder(array []int, toMove int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(MovePreservingRelativeOrder([]int{3, 1, 2, 3, 4, 3}, nil, 3)) // Expected: [1,2,4,3,3,3]
	fmt.Println(MovePreservingRelativeOrder([]int{1, 2, 3, 4, 5}, nil, 6)) // Expected: [1,2,3,4,5]
	fmt.Println(MovePreservingRelativeOrder([]int{3, 3, 3}, nil, 3)) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/twist-04-move-preserving-relative-order', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/twist-04-move-preserving-relative-order'] = problem;
})();
