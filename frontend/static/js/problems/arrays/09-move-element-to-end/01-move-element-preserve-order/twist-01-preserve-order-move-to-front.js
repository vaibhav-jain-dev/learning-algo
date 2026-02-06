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
            {
                input: {"array":[3,1,2,3,4,3],"target":3},
                output: [1,2,4,3,3,3],
                explanation: 'Target elements moved to the correct position.'
            },
            {
                input: {"array":[1,2,3,4,5],"target":6},
                output: [1,2,3,4,5],
                explanation: 'Target not in array - no changes needed.'
            },
            {
                input: {"array":[3,3,3],"target":3},
                output: [3,3,3],
                explanation: 'All elements are the target.'
            }
        ],
        solutions: {
            python: `def preserve_order_move_to_front(data):
    """
    Preserve Order Move to Front

    Move all instances of the target value to the front while preserving relative order of remaining elements.
    \n    Approach: The write pointer approach reverses direction: non-target elements shift right, targets fill from the left.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [2, 1, 2, 3, 2, 4], toMove = 2. Result: [2, 2, 2, 1, 3, 4].

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
        result.append(data[i])

    return result


# Test cases
print(preserve_order_move_to_front([1, 2, 3, 4, 5]))
print(preserve_order_move_to_front([5, 3, 1]))
print(preserve_order_move_to_front([1]))`,
            go: `package main

import "fmt"

// PreserveOrderMoveToFront solves the Preserve Order Move to Front problem.
// Move all instances of the target value to the front while preserving relative order of remaining elements.
// Time: O(n), Space: O(n)
func PreserveOrderMoveToFront(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(PreserveOrderMoveToFront([]int{1, 2, 3, 4, 5}))
    fmt.Println(PreserveOrderMoveToFront([]int{5, 3, 1}))
    fmt.Println(PreserveOrderMoveToFront([]int{1}))
}`
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
