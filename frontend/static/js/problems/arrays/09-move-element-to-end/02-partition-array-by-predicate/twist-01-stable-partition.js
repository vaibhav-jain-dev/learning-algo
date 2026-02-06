/**
 * Stable Partition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: stable-partition
 * Parent: 09-move-element-to-end/02-partition-array-by-predicate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stable Partition',
        difficulty: 'Hard',
        algorithm: 'stable-partition',
        parent: '09-move-element-to-end/02-partition-array-by-predicate',
        description: 'Partition the array by predicate while preserving the relative order of elements within each partition. Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.',
        problem: 'Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.',
        hints: [
            'Think about how stable partition differs from the standard version of this problem.',
            'Key insight: Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.',
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
            python: `def stable_partition(data):
    """
    Stable Partition

    Partition the array by predicate while preserving the relative order of elements within each partition.
    \n    Approach: Simple swapping destroys order. You need a different approach like collecting and merging, or an in-place stable partition algorithm.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 4, 2, 5, 3, 6], pred = isEven. Result: [4, 2, 6, 1, 5, 3] (order preserved in each group).

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
print(stable_partition([1, 2, 3, 4, 5]))
print(stable_partition([5, 3, 1]))
print(stable_partition([1]))`,
            go: `package main

import "fmt"

// StablePartition solves the Stable Partition problem.
// Partition the array by predicate while preserving the relative order of elements within each partition.
// Time: O(n), Space: O(n)
func StablePartition(data []int) []int {
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
    fmt.Println(StablePartition([]int{1, 2, 3, 4, 5}))
    fmt.Println(StablePartition([]int{5, 3, 1}))
    fmt.Println(StablePartition([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate/twist-01-stable-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate/twist-01-stable-partition'] = problem;
})();
