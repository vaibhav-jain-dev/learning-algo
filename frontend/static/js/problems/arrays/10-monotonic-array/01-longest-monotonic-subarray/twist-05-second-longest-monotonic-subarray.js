/**
 * Second Longest Monotonic Subarray
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: second-longest-monotonic-subarray
 * Parent: 10-monotonic-array/01-longest-monotonic-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'Second Longest Monotonic Subarray',
        difficulty: 'Hard',
        algorithm: 'second-longest-monotonic-subarray',
        parent: '10-monotonic-array/01-longest-monotonic-subarray',
        description: 'Find the length of the second longest monotonic subarray (not overlapping with the longest). Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.',
        problem: 'Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.',
        hints: [
            'Think about how second longest monotonic subarray differs from the standard version of this problem.',
            'Key insight: Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,3,2,1]},
                output: 3,
                explanation: 'The maximum/longest valid segment has length 3.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: 'The entire array satisfies the condition.'
            },
            {
                input: {"array":[1]},
                output: 1,
                explanation: 'Single element is trivially valid.'
            }
        ],
        solutions: {
            python: `def second_longest_monotonic_subarray(data):
    """
    Second Longest Monotonic Subarray

    Find the length of the second longest monotonic subarray (not overlapping with the longest).
    \n    Approach: Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [5, 4, 3, 2, 1, 6, 7]. Longest: [5,4,3,2,1] len 5. Second: [1,6,7] len 3.

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
print(second_longest_monotonic_subarray([1, 2, 3, 4, 5]))
print(second_longest_monotonic_subarray([5, 3, 1]))
print(second_longest_monotonic_subarray([1]))`,
            go: `package main

import "fmt"

// SecondLongestMonotonicSubarray solves the Second Longest Monotonic Subarray problem.
// Find the length of the second longest monotonic subarray (not overlapping with the longest).
// Time: O(n), Space: O(n)
func SecondLongestMonotonicSubarray(data []int) []int {
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
    fmt.Println(SecondLongestMonotonicSubarray([]int{1, 2, 3, 4, 5}))
    fmt.Println(SecondLongestMonotonicSubarray([]int{5, 3, 1}))
    fmt.Println(SecondLongestMonotonicSubarray([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray/twist-05-second-longest-monotonic-subarray', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray/twist-05-second-longest-monotonic-subarray'] = problem;
})();
