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
            {
                title: 'Proof of the Min-Subarray Complement',
                difficulty: 'Hard',
                description: 'Prove that the maximum circular subarray sum equals total_sum - min_subarray_sum when the result wraps around. Why does subtracting the minimum contiguous subarray from the total give the maximum wrap-around subarray?',
                whyDifferent: 'Forces you to reason about complementary subarrays. If the optimal subarray wraps around, the elements NOT in the subarray form a contiguous middle segment, which must have minimum sum.',
                example: 'Array [5, -3, 5]: total=7, min subarray=[-3]=-3, circular max=7-(-3)=10. The wrap-around subarray [5, 5] skips [-3].'
            },
            {
                title: 'When Does Greedy Fail: All Negatives Edge Case',
                difficulty: 'Medium',
                description: 'If all elements are negative, the min_subarray equals the entire array, so total - min_subarray = 0. But the answer should be the least negative element. Explain why this edge case breaks the circular formula and how to handle it.',
                whyDifferent: 'The greedy complement approach assumes the optimal circular subarray is non-empty and the leftover is also non-empty. When all elements are negative, the complement would be empty, which is invalid.',
                example: 'Array [-3, -5, -1]: total=-9, min subarray sum=-9. Circular formula gives -9-(-9)=0, but correct answer is -1. Must fall back to standard Kadane result.'
            },
            {
                title: 'Alternative: Doubled Array Approach',
                difficulty: 'Medium',
                description: 'Instead of the min-subarray trick, solve circular max subarray by concatenating the array with itself and running Kadane\'s on subarrays of length at most n. Compare the tradeoffs with the standard approach.',
                whyDifferent: 'This uses a completely different data structure concept (deque for sliding window max prefix sum) rather than the elegant complement trick. Forces thinking about window constraints.',
                example: 'Array [5, -3, 5] becomes [5, -3, 5, 5, -3, 5]. Run Kadane with window constraint: max subarray of length <= 3. Requires monotonic deque on prefix sums.'
            },
            {
                title: 'Online Streaming Circular',
                difficulty: 'Very Hard',
                description: 'Elements arrive in a stream but the array is known to be circular (the last element connects to the first). How would you maintain the maximum circular subarray sum as new elements arrive, before the circle is closed?',
                whyDifferent: 'You cannot compute the circular answer until you know the total sum, but you need to maintain partial results efficiently. Forces thinking about what information to accumulate for the eventual circular closure.',
                example: 'After seeing [5, -3, 5]: you know total=7, max_kadane=5, min_kadane=-3. When stream ends, circular_max = max(5, 7-(-3)) = 10.'
            },
            {
                title: 'Space-Time Tradeoff: Return Wrap Indices',
                difficulty: 'Hard',
                description: 'Return the actual indices of the maximum circular subarray. If the subarray wraps around, return [start, end] where start > end indicates wrapping (e.g., [4, 1] means elements at indices 4, 0, 1).',
                whyDifferent: 'Tracking indices for both the standard and circular cases simultaneously requires careful bookkeeping. The circular case needs you to track min subarray indices and invert them.',
                example: 'Array [5, -3, 5]: max circular subarray is [5, 5] at indices [2, 0] (wrapping). Must track both Kadane max indices and Kadane min indices.'
            }
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
