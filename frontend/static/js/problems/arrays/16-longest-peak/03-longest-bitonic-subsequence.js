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
