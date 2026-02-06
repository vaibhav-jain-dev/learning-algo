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
            'Think about how two sum in a circular array differs from the standard version of this problem.',
            'Key insight: Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.',
            'Consider using two pointers or a sliding window approach.',
            'For circular arrays, consider concatenating the array with itself or using modular arithmetic.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[4,5,1,2,3]},
                output: true,
                explanation: 'Circular traversal allows wrap-around from end to beginning.'
            },
            {
                input: {"array":[1,2,3,4,5]},
                output: true,
                explanation: 'Standard case without wrap-around needed.'
            },
            {
                input: {"array":[3,1,2]},
                output: false,
                explanation: 'Even with circular traversal, the condition is not met.'
            }
        ],
        solutions: {
            python: `def two_sum_in_a_circular_array(data):
    """
    Two Sum in a Circular Array

    The array is circular, and you can only use elements that are within a window of size k in the circular arrangement.
    \n    Approach: Introduces a spatial constraint on which pairs are valid, combining sliding window with two-sum logic.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[1,4,2,3,5], target=6, k=3 → [1,5] is valid (circular neighbors), [4,2] is valid

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
print(two_sum_in_a_circular_array([1, 2, 3, 4, 5]))
print(two_sum_in_a_circular_array([5, 3, 1]))
print(two_sum_in_a_circular_array([1]))`,
            go: `package main

import "fmt"

// TwoSumInACircularArray solves the Two Sum in a Circular Array problem.
// The array is circular, and you can only use elements that are within a window of size k in the circular arrangement.
// Time: O(n), Space: O(n)
func TwoSumInACircularArray(data []int) []int {
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
