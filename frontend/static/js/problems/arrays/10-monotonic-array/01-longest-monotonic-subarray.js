/**
 * Longest Monotonic Subarray
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Monotonic Subarray',
        difficulty: 'Medium',
        algorithm: 'linear-scan',
        parent: '10-monotonic-array',
        description: 'Given an array of integers, find the length of the longest **contiguous** subarray that is monotonic (either entirely non-increasing or entirely non-decreasing).',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        hints: [
            'Start by understanding what the problem is asking.',
            'Consider the input constraints and edge cases.',
            'Think about which data structures would be helpful.',
            'Break down the problem into smaller subproblems.',
            'Verify your solution with the given examples.'
        ],
        examples: [
    {
        input: {
          "array": [
            1,
            4,
            3,
            2,
            5,
            6,
            7
          ]
        },
        output: "4\nExplanation: Subarray [2, 5, 6, 7] is non-decreasing with length 4",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Subarray [2, 5, 6, 7] is non-decreasing with length 4'
    },
    {
        input: {
          "array": [
            5,
            4,
            3,
            2,
            1
          ]
        },
        output: "5\nExplanation: The entire array is non-increasing",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: The entire array is non-increasing'
    },
    {
        input: {
          "array": [
            1,
            2,
            2,
            3,
            1
          ]
        },
        output: "4\nExplanation: Subarray [1, 2, 2, 3] is non-decreasing",
        explanation: 'Given the input, the algorithm processes it to produce 4\nExplanation: Subarray [1, 2, 2, 3] is non-decreasing'
    }
        ],
        solutions: {
            python: `def longestMonotonicSubarray(array):
    """
    Longest Monotonic Subarray - Find length of longest contiguous subarray
    that is either non-increasing or non-decreasing.

    Time: O(n) - Single pass tracking both increasing and decreasing lengths
    Space: O(1) - Only store counters
    """
    if len(array) <= 1:
        return len(array)

    maxLen = 1
    incLen = 1  # Length of current non-decreasing subarray
    decLen = 1  # Length of current non-increasing subarray

    for i in range(1, len(array)):
        if array[i] >= array[i - 1]:
            incLen += 1
        else:
            incLen = 1

        if array[i] <= array[i - 1]:
            decLen += 1
        else:
            decLen = 1

        maxLen = max(maxLen, incLen, decLen)

    return maxLen


# Test
if __name__ == "__main__":
    print(longestMonotonicSubarray([1, 4, 3, 2, 5, 6, 7]))
    # Output: 4 (subarray [2, 5, 6, 7] or [4, 3, 2])
    print(longestMonotonicSubarray([5, 4, 3, 2, 1]))
    # Output: 5 (entire array is non-increasing)
    print(longestMonotonicSubarray([1, 2, 2, 3, 1]))
    # Output: 4 (subarray [1, 2, 2, 3])`,
            go: `package main

import "fmt"

// LongestMonotonicSubarray finds length of longest contiguous subarray
// that is either non-increasing or non-decreasing.
// Time: O(n), Space: O(1)
func LongestMonotonicSubarray(array []int) int {
    if len(array) <= 1 {
        return len(array)
    }

    maxLen := 1
    incLen := 1 // Length of current non-decreasing subarray
    decLen := 1 // Length of current non-increasing subarray

    for i := 1; i < len(array); i++ {
        if array[i] >= array[i-1] {
            incLen++
        } else {
            incLen = 1
        }

        if array[i] <= array[i-1] {
            decLen++
        } else {
            decLen = 1
        }

        if incLen > maxLen {
            maxLen = incLen
        }
        if decLen > maxLen {
            maxLen = decLen
        }
    }

    return maxLen
}

func main() {
    fmt.Println(LongestMonotonicSubarray([]int{1, 4, 3, 2, 5, 6, 7}))
    // Output: 4
    fmt.Println(LongestMonotonicSubarray([]int{5, 4, 3, 2, 1}))
    // Output: 5
    fmt.Println(LongestMonotonicSubarray([]int{1, 2, 2, 3, 1}))
    // Output: 4
}`
        },
        twists: [
            { title: 'Longest Strictly Monotonic Subarray', difficulty: 'Medium', description: 'Find the longest contiguous subarray that is strictly increasing or strictly decreasing (no equal adjacent elements).', whyDifferent: 'Equal elements break the monotonic run, so your tracking must reset when arr[i] == arr[i-1].', example: 'array = [1, 2, 2, 3, 4]. Longest strict: [2, 3, 4] length 3, not [1,2,2,3,4].' },
            { title: 'Longest Alternating Subarray', difficulty: 'Medium', description: 'Find the longest contiguous subarray that alternates between increasing and decreasing (zigzag pattern).', whyDifferent: 'Instead of one direction, each consecutive pair must switch direction, a completely different scan pattern.', example: 'array = [1, 3, 2, 4, 1, 5]. Alternating: [1,3,2,4,1,5] length 6.' },
            { title: 'All Longest Monotonic Subarrays', difficulty: 'Medium', description: 'Return the starting indices of ALL contiguous subarrays that achieve the maximum monotonic length.', whyDifferent: 'After finding the max length, you must track all positions where that length is achieved, not just one.', example: 'array = [1, 2, 3, 5, 4, 3]. Longest increasing [1,2,3] at 0, longest decreasing [5,4,3] at 3. Both length 3.' },
            { title: 'Longest Monotonic with K Exceptions', difficulty: 'Hard', description: 'Find the longest contiguous subarray that is monotonic if you are allowed to skip at most K elements.', whyDifferent: 'Requires a sliding window approach tracking violations, fundamentally different from simple linear scan.', example: 'array = [1, 5, 2, 3, 4], K = 1. Skip 5: [1, 2, 3, 4] length 4.' },
            { title: 'Second Longest Monotonic Subarray', difficulty: 'Hard', description: 'Find the length of the second longest monotonic subarray (not overlapping with the longest).', whyDifferent: 'Must track multiple candidates and handle overlapping runs, requiring more complex bookkeeping.', example: 'array = [5, 4, 3, 2, 1, 6, 7]. Longest: [5,4,3,2,1] len 5. Second: [1,6,7] len 3.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 10-monotonic-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/01-longest-monotonic-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/01-longest-monotonic-subarray'] = problem;

})();
