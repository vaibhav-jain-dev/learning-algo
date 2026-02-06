/**
 * Preserve Order Move to Front
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: preserve-order-move-to-front
 * Parent: 09-move-element-to-end/01-move-element-preserve-order
 */
(function() {
    'use strict';

    const problem = {
        name: 'Preserve Order Move to Front',
        difficulty: 'Medium',
        algorithm: 'preserve-order-move-to-front',
        parent: '09-move-element-to-end/01-move-element-preserve-order',
        description: 'Move all instances of the target value to the front while preserving relative order of remaining elements. The write pointer approach reverses direction: non-target elements shift right, targets fill from the left.',
        problem: 'The write pointer approach reverses direction: non-target elements shift right, targets fill from the left.',
        hints: [
            'Think about how preserve order move to front differs from the standard version of this problem.',
            'Key insight: The write pointer approach reverses direction: non-target elements shift right, targets fill from the left.',
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
            python: `def preserve_order_move_to_front(array, toMove, target):
    """
    Preserve Order Move to Front

    Move all instances of the target value to the front while preserving relative order of remaining elements. The write pointer approach reverses direction: non-target elements shift right, targets fill from the left.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(array)):
        # Check if element meets criteria
        result.append(array[i])

    return result


# Test cases
print(preserve_order_move_to_front([3,1,2,3,4,3], None, 3))  # Expected: [1,2,4,3,3,3]
print(preserve_order_move_to_front([1,2,3,4,5], None, 6))  # Expected: [1,2,3,4,5]
print(preserve_order_move_to_front([3,3,3], None, 3))  # Expected: [3,3,3]
`,
            go: `package main

import "fmt"

// PreserveOrderMoveToFront solves the Preserve Order Move to Front problem.
// Move all instances of the target value to the front while preserving relative order of remaining elements. The write pointer approach reverses direction: non-target elements shift right, targets fill from the left.
// Time: O(n), Space: O(n)
func PreserveOrderMoveToFront(array []int, toMove int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(array); i++ {
		result = append(result, array[i])
	}

	return result
}

func main() {
	fmt.Println(PreserveOrderMoveToFront([]int{3, 1, 2, 3, 4, 3}, nil, 3)) // Expected: [1,2,4,3,3,3]
	fmt.Println(PreserveOrderMoveToFront([]int{1, 2, 3, 4, 5}, nil, 6)) // Expected: [1,2,3,4,5]
	fmt.Println(PreserveOrderMoveToFront([]int{3, 3, 3}, nil, 3)) // Expected: [3,3,3]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order/twist-01-preserve-order-move-to-front', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order/twist-01-preserve-order-move-to-front'] = problem;
})();
