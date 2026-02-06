/**
 * Maximum Sum Circular Subarray
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum Circular Subarray',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Given a circular integer array nums, find the maximum possible sum of a non-empty subarray. A circular array means the end of the array connects to the beginning.',
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
        "nums": [
                1,
                -2,
                3,
                -2
        ]
},
        output: 3,
        explanation: 'Processing the input data produces the output. For input nums=[1, -2, 3, -2], the result is 3.'
    },
    {
        input: {
        "nums": [
                5,
                -3,
                5
        ]
},
        output: 10,
        explanation: 'Processing the input data produces the output. For input nums=[5, -3, 5], the result is 10.'
    }
        ],
        solutions: {
            python: `def maxSubarraySumCircular(nums):
    """
    Maximum Sum Circular Subarray

    Key insight: The answer is either:
    1. Maximum subarray sum (normal Kadane's)
    2. Total sum - minimum subarray sum (wrapping case)

    Time: O(n)
    Space: O(1)
    """
    if not nums:
        return 0

    # Standard Kadane's for max subarray
    max_sum = nums[0]
    current_max = nums[0]

    # Kadane's for min subarray
    min_sum = nums[0]
    current_min = nums[0]

    total = nums[0]

    for i in range(1, len(nums)):
        num = nums[i]
        total += num

        # Max subarray ending at i
        current_max = max(num, current_max + num)
        max_sum = max(max_sum, current_max)

        # Min subarray ending at i
        current_min = min(num, current_min + num)
        min_sum = min(min_sum, current_min)

    # If all elements are negative, return max_sum
    # Otherwise, compare normal max with circular max (total - min_sum)
    if max_sum < 0:
        return max_sum

    return max(max_sum, total - min_sum)


# Test
if __name__ == "__main__":
    print(maxSubarraySumCircular([1, -2, 3, -2]))  # Output: 3
    print(maxSubarraySumCircular([5, -3, 5]))      # Output: 10`,
            go: `package main

import "fmt"

// MaxSubarraySumCircular finds the maximum sum of a circular subarray.
// Time: O(n), Space: O(1)
func MaxSubarraySumCircular(nums []int) int {
    if len(nums) == 0 {
        return 0
    }

    maxSum := nums[0]
    currentMax := nums[0]
    minSum := nums[0]
    currentMin := nums[0]
    total := nums[0]

    for i := 1; i < len(nums); i++ {
        num := nums[i]
        total += num

        // Max subarray ending at i
        if currentMax + num > num {
            currentMax = currentMax + num
        } else {
            currentMax = num
        }
        if currentMax > maxSum {
            maxSum = currentMax
        }

        // Min subarray ending at i
        if currentMin + num < num {
            currentMin = currentMin + num
        } else {
            currentMin = num
        }
        if currentMin < minSum {
            minSum = currentMin
        }
    }

    // If all elements are negative
    if maxSum < 0 {
        return maxSum
    }

    // Compare normal max with circular max
    circularMax := total - minSum
    if circularMax > maxSum {
        return circularMax
    }
    return maxSum
}

func main() {
    fmt.Println(MaxSubarraySumCircular([]int{1, -2, 3, -2})) // Output: 3
    fmt.Println(MaxSubarraySumCircular([]int{5, -3, 5}))     // Output: 10
}`
        },
        twists: [
            { id: '01-kadanes-algorithm/01-max-circular-subarray/twist-01-proof-of-the-min-subarray-complement', name: 'Proof of the Min-Subarray Complement', difficulty: 'Hard' },
            { id: '01-kadanes-algorithm/01-max-circular-subarray/twist-02-when-does-greedy-fail-all-negatives-edge-case', name: 'When Does Greedy Fail: All Negatives Edge Case', difficulty: 'Medium' },
            { id: '01-kadanes-algorithm/01-max-circular-subarray/twist-03-alternative-doubled-array-approach', name: 'Alternative: Doubled Array Approach', difficulty: 'Medium' },
            { id: '01-kadanes-algorithm/01-max-circular-subarray/twist-04-online-streaming-circular', name: 'Online Streaming Circular', difficulty: 'Very Hard' },
            { id: '01-kadanes-algorithm/01-max-circular-subarray/twist-05-space-time-tradeoff-return-wrap-indices', name: 'Space-Time Tradeoff: Return Wrap Indices', difficulty: 'Hard' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/01-max-circular-subarray', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/01-max-circular-subarray'] = problem;

})();
