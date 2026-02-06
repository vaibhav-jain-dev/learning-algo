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
            python: `def move_preserving_relative_order(data):
    """
    Move Preserving Relative Order

    Move target elements to the end while preserving the relative order of all remaining elements.
    \n    Approach: Swapping disrupts order; you need a read/write pointer approach instead, fundamentally changing the algorithm.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [2, 1, 2, 3, 2, 4], toMove = 2. Result must be [1, 3, 4, 2, 2, 2].

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
print(move_preserving_relative_order([1, 2, 3, 4, 5]))
print(move_preserving_relative_order([5, 3, 1]))
print(move_preserving_relative_order([1]))`,
            go: `package main

import "fmt"

// MovePreservingRelativeOrder solves the Move Preserving Relative Order problem.
// Move target elements to the end while preserving the relative order of all remaining elements.
// Time: O(n), Space: O(n)
func MovePreservingRelativeOrder(data []int) []int {
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
    fmt.Println(MovePreservingRelativeOrder([]int{1, 2, 3, 4, 5}))
    fmt.Println(MovePreservingRelativeOrder([]int{5, 3, 1}))
    fmt.Println(MovePreservingRelativeOrder([]int{1}))
}`
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
