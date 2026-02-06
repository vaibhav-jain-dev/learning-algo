/**
 * Maximum Sum with at Least K Elements
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Sum with at Least K Elements',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm',
        description: 'Given an array of integers and an integer k, find the maximum sum of a subarray that contains at least k elements.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
                -1,
                5
        ],
        "k": 2
},
        output: 7,
        explanation: 'Processing the input data produces the output. For input nums=[1, -2, 3, -1, 5], k=2, the result is 7.'
    },
    {
        input: {
        "nums": [
                -1,
                -2,
                -3
        ],
        "k": 2
},
        output: -3,
        explanation: 'Processing the input data produces the output. For input nums=[-1, -2, -3], k=2, the result is -3.'
    }
        ],
        solutions: {
            python: `def maxSumWithAtLeastK(nums, k):
    """
    Maximum Sum with at Least K Elements

    Key insight: Use prefix sums and track the maximum sum
    we can extend from previous positions.

    Time: O(n)
    Space: O(n)
    """
    n = len(nums)
    if n < k:
        return 0

    # Compute prefix sums
    prefix = [0] * (n + 1)
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    # Sum of first k elements
    result = prefix[k]

    # maxPrefixSum[i] = max sum we can add before position i-k
    # This represents the best positive extension we can add
    max_extension = 0

    for i in range(k, n):
        # Window of exactly k elements ending at i
        window_sum = prefix[i + 1] - prefix[i + 1 - k]

        # Best extension we can add (from elements before the window)
        # max_extension is the max of (prefix[j] - prefix[i-k]) for all valid j
        max_extension = max(max_extension, prefix[i + 1 - k] - prefix[i - k])

        # Update result: window + optional positive extension
        result = max(result, window_sum + max_extension)

    return result


# Test
if __name__ == "__main__":
    print(maxSumWithAtLeastK([1, -2, 3, -1, 5], 2))  # Output: 7
    print(maxSumWithAtLeastK([-1, -2, -3], 2))       # Output: -3`,
            go: `package main

import "fmt"

// MaxSumWithAtLeastK finds max sum of subarray with at least k elements.
// Time: O(n), Space: O(n)
func MaxSumWithAtLeastK(nums []int, k int) int {
    n := len(nums)
    if n < k {
        return 0
    }

    // Compute prefix sums
    prefix := make([]int, n+1)
    for i := 0; i < n; i++ {
        prefix[i+1] = prefix[i] + nums[i]
    }

    // Sum of first k elements
    result := prefix[k]

    // Track best extension we can add
    maxExtension := 0

    for i := k; i < n; i++ {
        // Window of exactly k elements ending at i
        windowSum := prefix[i+1] - prefix[i+1-k]

        // Update max extension
        ext := prefix[i+1-k] - prefix[i-k]
        if ext > maxExtension {
            maxExtension = ext
        }

        // Update result
        total := windowSum + maxExtension
        if total > result {
            result = total
        }
    }

    return result
}

func main() {
    fmt.Println(MaxSumWithAtLeastK([]int{1, -2, 3, -1, 5}, 2)) // Output: 7
    fmt.Println(MaxSumWithAtLeastK([]int{-1, -2, -3}, 2))      // Output: -3
}`
        },
        twists: [
            {
                title: 'Proof of the Sliding Window Extension',
                difficulty: 'Hard',
                description: 'Prove that the optimal subarray of at least k elements consists of a mandatory window of exactly k elements plus an optional positive-sum prefix extension. Why is it sufficient to only consider extending leftward from the window?',
                whyDifferent: 'Forces formal reasoning about why decomposing into "fixed k-window + optional extension" covers all possible subarrays of length >= k without missing any cases.',
                example: 'For [1, -2, 3, -1, 5] with k=2: window [3,-1]=2, extend left with max(0, 1+(-2))=0, so just window. Window [-1,5]=4, extend left with max(0, 3)=3, total=7.'
            },
            {
                title: 'When Greedy Fails: Exactly K Elements',
                difficulty: 'Medium',
                description: 'Modify the problem to find the maximum sum subarray of EXACTLY k elements (not at least k). The greedy extension no longer applies. What approach works for exactly k?',
                whyDifferent: 'The "at least k" solution extends greedily when profitable. With "exactly k", you cannot extend, making it a pure sliding window problem. The greedy extension heuristic is now wrong.',
                example: 'Array [1, -2, 3, -1, 5], k=3. At-least-k answer: 7 (indices 2-4). Exactly-k answer: max of [1,-2,3]=2, [-2,3,-1]=0, [3,-1,5]=7. Same here but logic differs.'
            },
            {
                title: 'Alternative: Prefix Sum + Monotonic Deque',
                difficulty: 'Hard',
                description: 'Solve the "at least k" problem using prefix sums and a monotonic deque. For each position i, you want the minimum prefix[j] where j <= i-k. Maintain a deque of candidate j values.',
                whyDifferent: 'Completely different data structure approach. Instead of the window+extension decomposition, directly optimizes prefix[i] - prefix[j] subject to i - j >= k using a sliding minimum on prefix sums.',
                example: 'Array [1, -2, 3, -1, 5], prefix = [0, 1, -1, 2, 1, 6]. For i=4 (prefix=6), find min prefix[j] for j<=2: min(0,1,-1)=-1. Sum = 6-(-1) = 7.'
            },
            {
                title: 'Amortized Analysis',
                difficulty: 'Hard',
                description: 'The solution scans the array once maintaining a running max extension. Prove that the total work is O(n) amortized. What is the amortized cost per element, and why does the max extension computation not add hidden cost?',
                whyDifferent: 'Forces analysis of why the algorithm is truly linear. Each element participates in the prefix sum, the window sum, and the extension update - each O(1) - but you must argue no hidden loops exist.',
                example: 'Each of the n-k iterations does O(1) work: one prefix subtraction for window, one comparison for max extension, one comparison for result. Total: O(n) with constant factors.'
            },
            {
                title: 'Output Prediction',
                difficulty: 'Medium',
                description: 'Without running the algorithm, predict the output for: nums = [10, -20, 5, 5, 5, -30, 15, 15], k = 3. Trace through all possible windows and extensions manually.',
                whyDifferent: 'Forces manual simulation of the algorithm to build intuition. You must consider every possible starting point and extension, not just the obvious candidates.',
                example: 'Key windows of size 3: [5,5,5]=15, [5,-30,15]=-10, [-30,15,15]=0, [15,15,_]. Extension from [5,5,5]: extend left with max(0, -20+10)=0. Best: [5,5,5]=15 or [15,15]+extend. Answer: 30 from [15,15] with k=3 not valid, need [5,-30,15,15]=5 or [5,5,5]=15. Answer: 15.'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements'] = problem;

})();
