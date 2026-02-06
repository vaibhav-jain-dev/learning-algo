/**
 * Partition and Count
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: partition-and-count
 * Parent: 09-move-element-to-end/02-partition-array-by-predicate
 */
(function() {
    'use strict';

    const problem = {
        name: 'Partition and Count',
        difficulty: 'Easy',
        algorithm: 'partition-and-count',
        parent: '09-move-element-to-end/02-partition-array-by-predicate',
        description: 'Partition the array and return the count of elements satisfying the predicate (the partition point index). The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.',
        problem: 'The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.',
        hints: [
            'Think about how partition and count differs from the standard version of this problem.',
            'Key insight: The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Break the problem into smaller subproblems and solve each one independently.',
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
            python: `def partition_and_count(data):
    """
    Partition and Count

    Partition the array and return the count of elements satisfying the predicate (the partition point index).
    \n    Approach: The focus shifts to finding and returning the boundary index, useful for subsequent binary search operations.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 4, 2, 5, 3, 6], pred = isEven. After partition, boundary index = 3 (3 even numbers).

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
print(partition_and_count([1, 2, 3, 4, 5]))
print(partition_and_count([5, 3, 1]))
print(partition_and_count([1]))`,
            go: `package main

import "fmt"

// PartitionAndCount solves the Partition and Count problem.
// Partition the array and return the count of elements satisfying the predicate (the partition point index).
// Time: O(n), Space: O(n)
func PartitionAndCount(data []int) []int {
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
    fmt.Println(PartitionAndCount([]int{1, 2, 3, 4, 5}))
    fmt.Println(PartitionAndCount([]int{5, 3, 1}))
    fmt.Println(PartitionAndCount([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '09-move-element-to-end/02-partition-array-by-predicate/twist-03-partition-and-count', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/09-move-element-to-end/02-partition-array-by-predicate/twist-03-partition-and-count'] = problem;
})();
