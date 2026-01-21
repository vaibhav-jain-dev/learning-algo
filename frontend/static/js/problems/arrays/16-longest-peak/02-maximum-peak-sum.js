/**
 * Maximum Peak Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Peak Sum',
        difficulty: 'Hard',
        algorithm: 'peak-expansion',
        parent: '16-longest-peak',
        description: 'Given an array of integers, find the peak with the maximum sum of elements. A peak consists of strictly increasing elements to a tip, then strictly decreasing. Return the sum of that peak.',
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
            10,
            2,
            100,
            50,
            1
          ]
        },
        output: "153\nExplanation: Peak [2, 100, 50, 1] has sum 153",
        explanation: 'Given the input, the algorithm processes it to produce 153\nExplanation: Peak [2, 100, 50, 1] has sum 153'
    },
    {
        input: {
          "array": [
            1,
            3,
            2
          ]
        },
        output: "6\nExplanation: Peak [1, 3, 2] has sum 6",
        explanation: 'Given the input, the algorithm processes it to produce 6\nExplanation: Peak [1, 3, 2] has sum 6'
    }
        ],
        solutions: {
            python: `def maximumPeakSum(array):
    """
    Maximum Peak Sum

    Find the peak with maximum sum. A peak consists of strictly
    increasing elements to a tip, then strictly decreasing.

    Time: O(n)
    Space: O(1)
    """
    if len(array) < 3:
        return 0

    max_sum = 0
    i = 1

    while i < len(array) - 1:
        # Check if this is a peak tip
        if array[i] > array[i - 1] and array[i] > array[i + 1]:
            # Found a peak tip, expand left and right
            left = i - 1
            right = i + 1

            # Expand left while strictly increasing
            while left > 0 and array[left - 1] < array[left]:
                left -= 1

            # Expand right while strictly decreasing
            while right < len(array) - 1 and array[right] > array[right + 1]:
                right += 1

            # Calculate sum of this peak
            peak_sum = sum(array[left:right + 1])
            max_sum = max(max_sum, peak_sum)

            # Move to the end of this peak
            i = right + 1
        else:
            i += 1

    return max_sum


# Test
if __name__ == "__main__":
    print(maximumPeakSum([1, 10, 2, 100, 50, 1]))  # 153
    print(maximumPeakSum([1, 3, 2]))  # 6`,
            go: `package main

import "fmt"

// MaximumPeakSum finds the peak with maximum sum.
// Time: O(n), Space: O(1)
func MaximumPeakSum(array []int) int {
    if len(array) < 3 {
        return 0
    }

    maxSum := 0
    i := 1

    for i < len(array)-1 {
        // Check if this is a peak tip
        if array[i] > array[i-1] && array[i] > array[i+1] {
            // Found a peak tip, expand left and right
            left := i - 1
            right := i + 1

            // Expand left while strictly increasing
            for left > 0 && array[left-1] < array[left] {
                left--
            }

            // Expand right while strictly decreasing
            for right < len(array)-1 && array[right] > array[right+1] {
                right++
            }

            // Calculate sum of this peak
            peakSum := 0
            for j := left; j <= right; j++ {
                peakSum += array[j]
            }
            if peakSum > maxSum {
                maxSum = peakSum
            }

            // Move to the end of this peak
            i = right + 1
        } else {
            i++
        }
    }

    return maxSum
}

func main() {
    fmt.Println(MaximumPeakSum([]int{1, 10, 2, 100, 50, 1}))  // 153
    fmt.Println(MaximumPeakSum([]int{1, 3, 2}))  // 6
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 16-longest-peak
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '16-longest-peak/02-maximum-peak-sum', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/16-longest-peak/02-maximum-peak-sum'] = problem;

})();
