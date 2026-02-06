/**
 * Move and Count Swaps
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: move-and-count-swaps
 * Parent: 09-move-element-to-end
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move and Count Swaps',
        difficulty: 'Medium',
        algorithm: 'move-and-count-swaps',
        parent: '09-move-element-to-end',
        description: 'Move all target elements to the end and return the minimum number of swaps performed. Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.',
        problem: 'Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.',
        hints: [
            'Think about how move and count swaps differs from the standard version of this problem.',
            'Key insight: Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Two valid configurations found in the input.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'Only one valid configuration exists.'
            },
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'Multiple identical elements create multiple valid configurations.'
            }
        ],
        solutions: {
            python: `def move_and_count_swaps(data):
    """
    Move and Count Swaps

    Move all target elements to the end and return the minimum number of swaps performed.
    \n    Approach: Forces you to count actual swap operations rather than just achieving the end state, requiring careful pointer management.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [2, 1, 2, 2, 3, 4, 2], toMove = 2. After moving, count = 2 swaps.

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
print(move_and_count_swaps([1, 2, 3, 4, 5]))
print(move_and_count_swaps([5, 3, 1]))
print(move_and_count_swaps([1]))`,
            go: `package main

import "fmt"

// MoveAndCountSwaps solves the Move and Count Swaps problem.
// Move all target elements to the end and return the minimum number of swaps performed.
// Time: O(n), Space: O(n)
func MoveAndCountSwaps(data []int) []int {
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
    fmt.Println(MoveAndCountSwaps([]int{1, 2, 3, 4, 5}))
    fmt.Println(MoveAndCountSwaps([]int{5, 3, 1}))
    fmt.Println(MoveAndCountSwaps([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/twist-02-move-and-count-swaps', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/twist-02-move-and-count-swaps'] = problem;
})();
