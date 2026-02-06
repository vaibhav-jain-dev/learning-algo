/**
 * Three Sum Closest
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-three-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest',
        difficulty: 'Medium',
        algorithm: 'two-pointer-three-sum',
        parent: '02-two-number-sum',
        description: 'Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution. The key insight is that after sorting the array, you can use two pointers to efficiently search for the closest sum.',
        problem: 'Sort the array first. For each element, use two pointers (left and right) to find the pair that makes the sum closest to target. Track the minimum difference between current sum and target. If sum < target, move left pointer right to increase sum. If sum > target, move right pointer left to decrease sum. If sum equals target exactly, return immediately.',
        hints: [
            'Sorting the array enables efficient two-pointer traversal.',
            'For each fixed element, the problem reduces to finding two numbers closest to (target - fixed element).',
            'Track the closest sum found so far by comparing absolute differences.',
            'Move pointers based on whether current sum is less or greater than target.'
        ],
        complexity: {
            time: 'O(n²)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {
                    "nums": [-1, 2, 1, -4],
                    "target": 1
                },
                output: 2,
                explanation: 'The sum closest to target 1 is 2. We get 2 from -1 + 2 + 1 = 2. Other combinations: -1 + 2 + (-4) = -3, -1 + 1 + (-4) = -4, 2 + 1 + (-4) = -1. The difference |2-1| = 1 is smallest.'
            },
            {
                input: {
                    "nums": [0, 0, 0],
                    "target": 1
                },
                output: 0,
                explanation: 'Only one triplet exists: 0 + 0 + 0 = 0. This is the closest sum to target 1.'
            },
            {
                input: {
                    "nums": [1, 1, 1, 0],
                    "target": -100
                },
                output: 2,
                explanation: 'The smallest possible sum is 0 + 1 + 1 = 2. Even though -100 is far away, 2 is the closest we can get with these numbers.'
            },
            {
                input: {
                    "nums": [4, 0, 5, -5, 3, 3, 0, -4, -5],
                    "target": -2
                },
                output: -2,
                explanation: 'We can find an exact match: 0 + 3 + (-5) = -2 equals the target exactly.'
            }
        ],
        solutions: {
            python: `def threeSumClosest(nums: list[int], target: int) -> int:
    """
    Find three numbers whose sum is closest to target.

    Time: O(n²) - sort + two-pointer for each element
    Space: O(1) - sorting in place
    """
    nums.sort()
    n = len(nums)
    closest = float('inf')

    for i in range(n - 2):
        # Skip duplicates for optimization
        if i > 0 and nums[i] == nums[i-1]:
            continue

        left, right = i + 1, n - 1

        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]

            # Update closest if this sum is better
            if abs(current_sum - target) < abs(closest - target):
                closest = current_sum

            # Early exit if exact match found
            if current_sum == target:
                return target
            elif current_sum < target:
                left += 1
            else:
                right -= 1

    return closest


# Test
print(threeSumClosest([-1, 2, 1, -4], 1))  # 2
print(threeSumClosest([0, 0, 0], 1))        # 0`,
            go: `package main

import (
    "fmt"
    "math"
    "sort"
)

// threeSumClosest finds three numbers whose sum is closest to target.
// Time: O(n²), Space: O(1)
func threeSumClosest(nums []int, target int) int {
    sort.Ints(nums)
    n := len(nums)
    closest := math.MaxInt32

    for i := 0; i < n-2; i++ {
        // Skip duplicates
        if i > 0 && nums[i] == nums[i-1] {
            continue
        }

        left, right := i+1, n-1

        for left < right {
            sum := nums[i] + nums[left] + nums[right]

            if abs(sum-target) < abs(closest-target) {
                closest = sum
            }

            if sum == target {
                return target
            } else if sum < target {
                left++
            } else {
                right--
            }
        }
    }
    return closest
}

func abs(x int) int {
    if x < 0 { return -x }
    return x
}

func main() {
    fmt.Println(threeSumClosest([]int{-1, 2, 1, -4}, 1)) // 2
    fmt.Println(threeSumClosest([]int{0, 0, 0}, 1))      // 0
}`
        },
        twists: [
            { id: '02-two-number-sum/01-three-sum-closest/twist-01-k-sum-closest', name: 'K-Sum Closest', difficulty: 'Hard' },
            { id: '02-two-number-sum/01-three-sum-closest/twist-02-three-sum-closest-with-no-sorting-allowed', name: 'Three Sum Closest with No Sorting Allowed', difficulty: 'Hard' },
            { id: '02-two-number-sum/01-three-sum-closest/twist-03-three-sum-closest-with-element-reuse', name: 'Three Sum Closest with Element Reuse', difficulty: 'Medium' },
            { id: '02-two-number-sum/01-three-sum-closest/twist-04-three-sums-within-epsilon-of-target', name: 'Three Sums Within Epsilon of Target', difficulty: 'Medium' },
            { id: '02-two-number-sum/01-three-sum-closest/twist-05-online-three-sum-closest', name: 'Online Three Sum Closest', difficulty: 'Very Hard' }
        ],
        similar: []
    };

    // Register with ProblemRenderer - as sub-problem of 02-two-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest'] = problem;

})();
