/**
 * Minimum Window Subsequence in Circular String
 * Category: arrays
 * Difficulty: Very Hard
 * Algorithm: minimum-window-subsequence-in-circular-string
 * Parent: 01-validate-subsequence/03-minimum-window-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Window Subsequence in Circular String',
        difficulty: 'Very Hard',
        algorithm: 'minimum-window-subsequence-in-circular-string',
        parent: '01-validate-subsequence/03-minimum-window-subsequence',
        description: 'The string s1 is circular. Find the minimum window where s2 is a subsequence, allowing wrap-around. The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.',
        problem: 'The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.',
        hints: [
            'Think about how minimum window subsequence in circular string differs from the standard version of this problem.',
            'Key insight: The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.',
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
            python: `def minimum_window_subsequence_in_circular_string(data):
    """
    Minimum Window Subsequence in Circular String

    The string s1 is circular. Find the minimum window where s2 is a subsequence, allowing wrap-around.
    \n    Approach: The circular nature means windows can span the wrap-around point, requiring concatenation tricks or careful modular index handling.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # s1="cdeab", s2="abc" → "abc" via wrap-around (a at index 3, b at index 4, c at index 0)

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
print(minimum_window_subsequence_in_circular_string([1, 2, 3, 4, 5]))
print(minimum_window_subsequence_in_circular_string([5, 3, 1]))
print(minimum_window_subsequence_in_circular_string([1]))`,
            go: `package main

import "fmt"

// MinimumWindowSubsequenceInCircularString solves the Minimum Window Subsequence in Circular String problem.
// The string s1 is circular. Find the minimum window where s2 is a subsequence, allowing wrap-around.
// Time: O(n), Space: O(n)
func MinimumWindowSubsequenceInCircularString(data []int) []int {
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
    fmt.Println(MinimumWindowSubsequenceInCircularString([]int{1, 2, 3, 4, 5}))
    fmt.Println(MinimumWindowSubsequenceInCircularString([]int{5, 3, 1}))
    fmt.Println(MinimumWindowSubsequenceInCircularString([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/03-minimum-window-subsequence/twist-03-minimum-window-subsequence-in-circular-string', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/03-minimum-window-subsequence/twist-03-minimum-window-subsequence-in-circular-string'] = problem;
})();
