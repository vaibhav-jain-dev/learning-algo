/**
 * Longest Bitonic Subsequence
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Bitonic Subsequence',
        difficulty: 'Hard',
        algorithm: 'peak-expansion',
        parent: '16-longest-peak',
        description: 'Given an array of integers, find the length of the longest bitonic subsequence. A bitonic subsequence first increases then decreases (not necessarily contiguous).',
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
            11,
            2,
            10,
            4,
            5,
            2,
            1
          ]
        },
        output: "6\nExplanation: [1, 2, 10, 4, 2, 1] or [1, 2, 4, 5, 2, 1]",
        explanation: 'Given the input, the algorithm processes it to produce 6\nExplanation: [1, 2, 10, 4, 2, 1] or [1, 2, 4, 5, 2, 1]'
    },
    {
        input: {
          "array": [
            1,
            2,
            3,
            4,
            5
          ]
        },
        output: "5\nExplanation: Entire array is increasing (degenerate bitonic)",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: Entire array is increasing (degenerate bitonic)'
    }
        ],
        solutions: {
            python: `def longestBitonicSubsequence(array):
    """
    Longest Bitonic Subsequence

    A bitonic subsequence first increases then decreases.
    Use DP to find LIS from left and LIS from right.

    Time: O(n^2)
    Space: O(n)
    """
    n = len(array)
    if n == 0:
        return 0

    # LIS ending at each index (left to right)
    lis = [1] * n
    for i in range(1, n):
        for j in range(i):
            if array[j] < array[i]:
                lis[i] = max(lis[i], lis[j] + 1)

    # LIS starting at each index (right to left, decreasing)
    lds = [1] * n
    for i in range(n - 2, -1, -1):
        for j in range(n - 1, i, -1):
            if array[i] > array[j]:
                lds[i] = max(lds[i], lds[j] + 1)

    # Find maximum bitonic length
    max_len = 0
    for i in range(n):
        # lis[i] + lds[i] - 1 because peak element is counted twice
        max_len = max(max_len, lis[i] + lds[i] - 1)

    return max_len


# Test
if __name__ == "__main__":
    print(longestBitonicSubsequence([1, 11, 2, 10, 4, 5, 2, 1]))  # 6
    print(longestBitonicSubsequence([1, 2, 3, 4, 5]))  # 5`,
            go: `package main

import "fmt"

// LongestBitonicSubsequence finds the longest bitonic subsequence.
// Time: O(n^2), Space: O(n)
func LongestBitonicSubsequence(array []int) int {
    n := len(array)
    if n == 0 {
        return 0
    }

    // LIS ending at each index (left to right)
    lis := make([]int, n)
    for i := range lis {
        lis[i] = 1
    }
    for i := 1; i < n; i++ {
        for j := 0; j < i; j++ {
            if array[j] < array[i] && lis[j]+1 > lis[i] {
                lis[i] = lis[j] + 1
            }
        }
    }

    // LIS starting at each index (right to left, decreasing)
    lds := make([]int, n)
    for i := range lds {
        lds[i] = 1
    }
    for i := n - 2; i >= 0; i-- {
        for j := n - 1; j > i; j-- {
            if array[i] > array[j] && lds[j]+1 > lds[i] {
                lds[i] = lds[j] + 1
            }
        }
    }

    // Find maximum bitonic length
    maxLen := 0
    for i := 0; i < n; i++ {
        if lis[i]+lds[i]-1 > maxLen {
            maxLen = lis[i] + lds[i] - 1
        }
    }

    return maxLen
}

func main() {
    fmt.Println(LongestBitonicSubsequence([]int{1, 11, 2, 10, 4, 5, 2, 1}))  // 6
    fmt.Println(LongestBitonicSubsequence([]int{1, 2, 3, 4, 5}))  // 5
}`
        },
        twists: [
            { name: 'Longest Bitonic Subarray', difficulty: 'Medium', description: 'Find the longest contiguous subarray (not subsequence) that is bitonic: strictly increases then strictly decreases.', whyDifferent: 'Contiguous constraint makes it simpler in some ways but requires linear scan tracking current bitonic run length.', example: 'array = [1, 11, 2, 10, 4, 5, 2, 1]. Longest bitonic subarray: [2, 10, 4] or [4, 5, 2, 1] length 4.' },
            { name: 'Count Bitonic Subsequences', difficulty: 'Very Hard', description: 'Count the total number of distinct bitonic subsequences of length at least 3.', whyDifferent: 'Counting instead of finding the longest requires DP counting at each position, a multiplicative rather than max operation.', example: 'array = [1, 3, 2]. Only one bitonic subsequence: [1, 3, 2]. Count = 1.' },
            { name: 'Longest V-Shaped Subsequence', difficulty: 'Hard', description: 'Find the longest subsequence that first decreases then increases (the opposite of bitonic).', whyDifferent: 'Reverse the DP: compute longest decreasing subsequence from left and longest increasing from right, then combine.', example: 'array = [5, 3, 1, 4, 7]. V-shaped: [5, 3, 1, 4, 7] length 5.' },
            { name: 'Bitonic Sort Verification', difficulty: 'Medium', description: 'Given an array, determine if it is a bitonic sequence (increases then decreases) and find the peak index.', whyDifferent: 'Decision problem plus peak-finding. Can be done with binary search on the direction change point.', example: 'array = [1, 3, 5, 4, 2]. Bitonic with peak at index 2 (value 5). Return true and index 2.' },
            { name: 'Minimum Additions for Bitonic', difficulty: 'Very Hard', description: 'Find the minimum number of elements to insert into the array to make the entire array a bitonic sequence.', whyDifferent: 'The complement of longest bitonic subsequence: n - LBS gives removals, but insertions to make the full array bitonic is different.', example: 'array = [1, 5, 2, 4, 3]. Insert elements to make fully bitonic like [1, 2, 4, 5, 4, 3, 2].' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 16-longest-peak
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak/03-longest-bitonic-subsequence', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak/03-longest-bitonic-subsequence'] = problem;

})();
