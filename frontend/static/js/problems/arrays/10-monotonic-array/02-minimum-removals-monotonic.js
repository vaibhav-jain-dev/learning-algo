/**
 * Minimum Removals Monotonic
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Removals Monotonic',
        difficulty: 'Hard',
        algorithm: 'linear-scan',
        parent: '10-monotonic-array',
        description: 'Given an array of integers, find the minimum number of elements that must be removed to make the array monotonic (either entirely non-increasing or entirely non-decreasing). This is equivalent to finding the **Longest Monotonic Subsequence** and subtracting from array length.',
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
            3,
            2,
            4,
            5,
            3
          ]
        },
        output: "2\nExplanation: Remove 3 and 3 to get [1, 2, 4, 5] (non-decreasing)\n             Or remove 1, 2, 5 to get [3, 4, 3] - wait, that's not monotonic\n             Best: Remove 2 elements for [1, 2, 4, 5]",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Remove 3 and 3 to get [1, 2, 4, 5] (non-decreasing)\n             Or remove 1, 2, 5 to get [3, 4, 3] - wait, that\'s not monotonic\n             Best: Remove 2 elements for [1, 2, 4, 5]'
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
        output: "0\nExplanation: Already monotonic (non-increasing)",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: Already monotonic (non-increasing)'
    },
    {
        input: {
          "array": [
            1,
            2,
            1,
            2,
            1
          ]
        },
        output: "2\nExplanation: Remove two 1s to get [1, 2, 2] or remove 2s to get [1, 1, 1]",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Remove two 1s to get [1, 2, 2] or remove 2s to get [1, 1, 1]'
    }
        ],
        solutions: {
            python: `import bisect

def minimumRemovalsMonotonic(array):
    """
    Minimum Removals Monotonic - Find minimum removals to make array monotonic.
    Equivalent to: len(array) - Longest Increasing/Decreasing Subsequence

    Time: O(n log n) - Using binary search for LIS
    Space: O(n) - Store tails array
    """
    if len(array) <= 1:
        return 0

    def longestNonDecreasingSubseq(arr):
        # Find LIS (non-decreasing) using patience sort with binary search
        tails = []
        for num in arr:
            # Use bisect_right for non-decreasing (allows equal elements)
            pos = bisect.bisect_right(tails, num)
            if pos == len(tails):
                tails.append(num)
            else:
                tails[pos] = num
        return len(tails)

    def longestNonIncreasingSubseq(arr):
        # Reverse and negate to convert to LIS problem
        return longestNonDecreasingSubseq([-x for x in arr])

    # Find longest monotonic subsequence (either direction)
    lisLen = longestNonDecreasingSubseq(array)
    ldsLen = longestNonIncreasingSubseq(array)

    longestMonotonic = max(lisLen, ldsLen)
    return len(array) - longestMonotonic


# Test
if __name__ == "__main__":
    print(minimumRemovalsMonotonic([1, 3, 2, 4, 5, 3]))
    # Output: 2 (remove to get [1, 2, 4, 5])
    print(minimumRemovalsMonotonic([5, 4, 3, 2, 1]))
    # Output: 0 (already monotonic)
    print(minimumRemovalsMonotonic([1, 2, 1, 2, 1]))
    # Output: 2 (remove to get [1, 1, 1] or [1, 2, 2])`,
            go: `package main

import (
    "fmt"
    "sort"
)

// MinimumRemovalsMonotonic finds minimum removals to make array monotonic.
// Time: O(n log n), Space: O(n)
func MinimumRemovalsMonotonic(array []int) int {
    if len(array) <= 1 {
        return 0
    }

    // Find longest non-decreasing subsequence using binary search
    longestNonDecreasing := func(arr []int) int {
        tails := []int{}
        for _, num := range arr {
            // Use sort.SearchInts for lower bound (strictly increasing)
            // For non-decreasing, find position where num would be inserted
            pos := sort.Search(len(tails), func(i int) bool {
                return tails[i] > num
            })
            if pos == len(tails) {
                tails = append(tails, num)
            } else {
                tails[pos] = num
            }
        }
        return len(tails)
    }

    // Find longest non-increasing subsequence
    longestNonIncreasing := func(arr []int) int {
        reversed := make([]int, len(arr))
        for i, v := range arr {
            reversed[i] = -v
        }
        return longestNonDecreasing(reversed)
    }

    lisLen := longestNonDecreasing(array)
    ldsLen := longestNonIncreasing(array)

    longestMonotonic := lisLen
    if ldsLen > longestMonotonic {
        longestMonotonic = ldsLen
    }

    return len(array) - longestMonotonic
}

func main() {
    fmt.Println(MinimumRemovalsMonotonic([]int{1, 3, 2, 4, 5, 3}))
    // Output: 2
    fmt.Println(MinimumRemovalsMonotonic([]int{5, 4, 3, 2, 1}))
    // Output: 0
    fmt.Println(MinimumRemovalsMonotonic([]int{1, 2, 1, 2, 1}))
    // Output: 2
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 10-monotonic-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/02-minimum-removals-monotonic', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/02-minimum-removals-monotonic'] = problem;

})();
