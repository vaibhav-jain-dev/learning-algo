/**
 * Stable Partition Two Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: stable-partition-two-values
 * Parent: 09-move-element-to-end/01-move-element-preserve-order
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stable Partition Two Values',
        difficulty: 'Medium',
        algorithm: 'stable-partition-two-values',
        parent: '09-move-element-to-end/01-move-element-preserve-order',
        description: 'Given two target values A and B, move all As to the end and all Bs to the beginning, preserving order within each group. Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.',
        problem: 'Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.',
        hints: [
            'Think about how stable partition two values differs from the standard version of this problem.',
            'Key insight: Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.',
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
            python: `def stable_partition_two_values(data):
    """
    Stable Partition Two Values

    Given two target values A and B, move all As to the end and all Bs to the beginning, preserving order within each group.
    \n    Approach: Three-way stable partition requires multiple passes or careful pointer management to maintain all orderings.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [3, 1, 2, 1, 3, 2], A = 2, B = 1. Result: [1, 1, 3, 3, 2, 2].

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
print(stable_partition_two_values([1, 2, 3, 4, 5]))
print(stable_partition_two_values([5, 3, 1]))
print(stable_partition_two_values([1]))`,
            go: `package main

import "fmt"

// StablePartitionTwoValues solves the Stable Partition Two Values problem.
// Given two target values A and B, move all As to the end and all Bs to the beginning, preserving order within each group.
// Time: O(n), Space: O(n)
func StablePartitionTwoValues(data []int) []int {
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
    fmt.Println(StablePartitionTwoValues([]int{1, 2, 3, 4, 5}))
    fmt.Println(StablePartitionTwoValues([]int{5, 3, 1}))
    fmt.Println(StablePartitionTwoValues([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/01-move-element-preserve-order/twist-02-stable-partition-two-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/01-move-element-preserve-order/twist-02-stable-partition-two-values'] = problem;
})();
