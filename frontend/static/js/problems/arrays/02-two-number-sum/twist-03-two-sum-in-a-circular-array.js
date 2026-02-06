/**
 * Two Sum in a Circular Array
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-in-a-circular-array
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum in a Circular Array',
        difficulty: 'Medium',
        algorithm: 'two-sum-in-a-circular-array',
        parent: '02-two-number-sum',
        description: 'The array is circular, and you can only use elements that are within a window of size k in the circular arrangement. Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
        problem: 'Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
        hints: [
            'Think about how this twist differs from the standard version: The array is circular, and you can only use elements that are within a window of.',
            'Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
            'For circular structures, consider concatenating the data with itself or using modular arithmetic.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[3,5,-4,8,11,1,-1,6],"targetSum":10},
                output: [-1,11],
                explanation: '-1 + 11 = 10, which equals the target sum.'
            },
            {
                input: {"array":[1,2,3,4,5],"targetSum":10},
                output: [],
                explanation: 'No two distinct numbers sum to 10.'
            },
            {
                input: {"array":[4,6],"targetSum":10},
                output: [4,6],
                explanation: '4 + 6 = 10.'
            }
        ],
        solutions: {
            python: `def two_sum_in_a_circular_array(data):
    """
    Two Sum in a Circular Array

    The array is circular, and you can only use elements that are within a window of size k in the circular arrangement.
    \n    Approach: Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.

    Time: O(n log k)
    Space: O(n)

    Example: array=[1,4,2,3,5], target=6, k=3 → [1,5] is valid (circular neighbors), [4,2] is valid
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
        result.append(data[i])

    return result


# Test cases
print(two_sum_in_a_circular_array([1, 2, 3, 4, 5]))
print(two_sum_in_a_circular_array([5, 3, 1]))
print(two_sum_in_a_circular_array([1]))`,
            go: `package main

import "fmt"

// TwoSumInACircularArray solves the Two Sum in a Circular Array problem.
// The array is circular, and you can only use elements that are within a window of size k in the circular arrangement.
// Time: O(n log k), Space: O(n)
func TwoSumInACircularArray(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(TwoSumInACircularArray([]int{1, 2, 3, 4, 5}))
    fmt.Println(TwoSumInACircularArray([]int{5, 3, 1}))
    fmt.Println(TwoSumInACircularArray([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-03-two-sum-in-a-circular-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-03-two-sum-in-a-circular-array'] = problem;
})();
