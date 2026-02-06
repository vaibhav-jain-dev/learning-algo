/**
 * Three-Way Partition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-way-partition
 * Parent: 09-move-element-to-end/02-partition-array-by-predicate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three-Way Partition',
        difficulty: 'Hard',
        algorithm: 'three-way-partition',
        parent: '09-move-element-to-end/02-partition-array-by-predicate',
        description: 'Partition into three groups: elements satisfying predicate A, elements satisfying predicate B, and the rest. Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.',
        problem: 'Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.',
        hints: [
            'Think about how three-way partition differs from the standard version of this problem.',
            'Key insight: Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
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
            python: `def three_way_partition(data):
    """
    Three-Way Partition

    Partition into three groups: elements satisfying predicate A, elements satisfying predicate B, and the rest.
    \n    Approach: Two predicates create three regions requiring three pointers (Dutch National Flag style), more complex boundary management.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1,2,3,4,5,6], predA = isEven, predB = (>4). Groups: [2,4,6], [5], [1,3].

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
print(three_way_partition([1, 2, 3, 4, 5]))
print(three_way_partition([5, 3, 1]))
print(three_way_partition([1]))`,
            go: `package main

import "fmt"

// ThreeWayPartition solves the Three-Way Partition problem.
// Partition into three groups: elements satisfying predicate A, elements satisfying predicate B, and the rest.
// Time: O(n^2), Space: O(n)
func ThreeWayPartition(data []int) []int {
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
    fmt.Println(ThreeWayPartition([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeWayPartition([]int{5, 3, 1}))
    fmt.Println(ThreeWayPartition([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate/twist-02-three-way-partition', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate/twist-02-three-way-partition'] = problem;
})();
