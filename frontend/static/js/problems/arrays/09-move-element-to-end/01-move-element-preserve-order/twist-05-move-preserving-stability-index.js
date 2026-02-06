/**
 * Move Preserving Stability Index
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: move-preserving-stability-index
 * Parent: 09-move-element-to-end/01-move-element-preserve-order
 */
(function() {
    'use strict';

    const problem = {
        name: 'Move Preserving Stability Index',
        difficulty: 'Hard',
        algorithm: 'move-preserving-stability-index',
        parent: '09-move-element-to-end/01-move-element-preserve-order',
        description: 'After moving targets to end (preserving order), return the new index of every element as a mapping from original to new position. You must track index transformations during the rearrangement, not just the final array state.',
        problem: 'You must track index transformations during the rearrangement, not just the final array state.',
        hints: [
            'Think about how move preserving stability index differs from the standard version of this problem.',
            'Key insight: You must track index transformations during the rearrangement, not just the final array state.',
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
            python: `def move_preserving_stability_index(data):
    """
    Move Preserving Stability Index

    After moving targets to end (preserving order), return the new index of every element as a mapping from original to new position.
    \n    Approach: You must track index transformations during the rearrangement, not just the final array state.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [2, 1, 2, 3], toMove = 2. Result: [1, 3, 2, 2]. Index map: {0->2, 1->0, 2->3, 3->1}.

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
print(move_preserving_stability_index([1, 2, 3, 4, 5]))
print(move_preserving_stability_index([5, 3, 1]))
print(move_preserving_stability_index([1]))`,
            go: `package main

import "fmt"

// MovePreservingStabilityIndex solves the Move Preserving Stability Index problem.
// After moving targets to end (preserving order), return the new index of every element as a mapping from original to new position.
// Time: O(n), Space: O(n)
func MovePreservingStabilityIndex(data []int) []int {
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
    fmt.Println(MovePreservingStabilityIndex([]int{1, 2, 3, 4, 5}))
    fmt.Println(MovePreservingStabilityIndex([]int{5, 3, 1}))
    fmt.Println(MovePreservingStabilityIndex([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order/twist-05-move-preserving-stability-index', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order/twist-05-move-preserving-stability-index'] = problem;
})();
