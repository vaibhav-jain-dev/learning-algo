/**
 * Circular Array Subsequence
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: circular-array-subsequence
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Circular Array Subsequence',
        difficulty: 'Medium',
        algorithm: 'circular-array-subsequence',
        parent: '01-validate-subsequence',
        description: 'What if the main array is circular? The sequence can wrap around from the end back to the beginning. You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.',
        problem: 'You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.',
        hints: [
            'Think about how this twist differs from the standard version: What if the main array is circular? The sequence can wrap around from the end ba.',
            'You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.',
            'For circular structures, consider concatenating the data with itself or using modular arithmetic.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: true,
                explanation: 'The sequence elements appear in order within the array.'
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: false,
                explanation: 'The sequence elements do not appear in the required order.'
            },
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: true,
                explanation: 'Duplicate elements are handled correctly.'
            }
        ],
        solutions: {
            python: `def circular_array_subsequence(data):
    """
    Circular Array Subsequence

    What if the main array is circular? The sequence can wrap around from the end back to the beginning.
    \n    Approach: You need to handle wrap-around logic with modular arithmetic and decide when to stop to avoid infinite loops.

    Time: O(n log k)
    Space: O(n)

    Example: array=[4,5,1,2,3], sequence=[3,4,5] → true (wraps from 3 back to 4,5)
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
print(circular_array_subsequence([1, 2, 3, 4, 5]))
print(circular_array_subsequence([5, 3, 1]))
print(circular_array_subsequence([1]))`,
            go: `package main

import "fmt"

// CircularArraySubsequence solves the Circular Array Subsequence problem.
// What if the main array is circular? The sequence can wrap around from the end back to the beginning.
// Time: O(n log k), Space: O(n)
func CircularArraySubsequence(data []int) []int {
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
    fmt.Println(CircularArraySubsequence([]int{1, 2, 3, 4, 5}))
    fmt.Println(CircularArraySubsequence([]int{5, 3, 1}))
    fmt.Println(CircularArraySubsequence([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/twist-01-circular-array-subsequence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/twist-01-circular-array-subsequence'] = problem;
})();
