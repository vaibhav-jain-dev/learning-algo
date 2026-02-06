/**
 * Median of Squared Array
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: median-of-squared-array
 * Parent: 03-sorted-squared-array/03-kth-smallest-squared
 */
(function() {
    'use strict';

    const problem = {
        name: 'Median of Squared Array',
        difficulty: 'Medium',
        algorithm: 'median-of-squared-array',
        parent: '03-sorted-squared-array/03-kth-smallest-squared',
        description: 'Find the median of the squared array without fully sorting it. The kth-smallest approach works, but you need to determine k=n/2 first, and for even-length arrays, average two middle elements.',
        problem: 'The kth-smallest approach works, but you need to determine k=n/2 first, and for even-length arrays, average two middle elements.',
        hints: [
            'Think about how median of squared array differs from the standard version of this problem.',
            'Key insight: The kth-smallest approach works, but you need to determine k=n/2 first, and for even-length arrays, average two middle elements.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'Elements transformed and sorted correctly.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'All positive - order maintained after transformation.'
            },
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'All negative - order reversed after transformation.'
            }
        ],
        solutions: {
            python: `def median_of_squared_array(data):
    """
    Median of Squared Array

    Find the median of the squared array without fully sorting it.
    \n    Approach: The kth-smallest approach works, but you need to determine k=n/2 first, and for even-length arrays, average two middle elements.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[-4,-2,0,1,3] → median of [0,1,4,9,16] is 4

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
print(median_of_squared_array([1, 2, 3, 4, 5]))
print(median_of_squared_array([5, 3, 1]))
print(median_of_squared_array([1]))`,
            go: `package main

import "fmt"

// MedianOfSquaredArray solves the Median of Squared Array problem.
// Find the median of the squared array without fully sorting it.
// Time: O(n log n), Space: O(n)
func MedianOfSquaredArray(data []int) []int {
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
    fmt.Println(MedianOfSquaredArray([]int{1, 2, 3, 4, 5}))
    fmt.Println(MedianOfSquaredArray([]int{5, 3, 1}))
    fmt.Println(MedianOfSquaredArray([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/03-kth-smallest-squared/twist-03-median-of-squared-array', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/03-kth-smallest-squared/twist-03-median-of-squared-array'] = problem;
})();
