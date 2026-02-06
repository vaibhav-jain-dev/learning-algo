/**
 * Three Sum With Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-pointer-dedup
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum With Duplicates',
        difficulty: 'Medium',
        algorithm: 'two-pointer-dedup',
        parent: '02-two-number-sum',
        description: 'Given an integer array nums that may contain duplicates, return all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == target. The solution set must not contain duplicate triplets. This is a classic problem that combines sorting, two-pointer technique, and duplicate handling.',
        problem: 'Sort the array first. Iterate through each element as the first number of the triplet. For each first number, use two pointers to find pairs that sum to (target - first). Skip duplicate values to avoid duplicate triplets: skip duplicate first numbers, and when a valid triplet is found, skip duplicate second and third numbers.',
        hints: [
            'Sorting helps both with the two-pointer approach and identifying duplicates.',
            'After finding a valid triplet, skip all duplicate values for both pointers.',
            'When iterating the first element, also skip duplicates to avoid repeated triplets.',
            'The key insight: if nums[i] == nums[i-1], skip it since we already processed that value.'
        ],
        complexity: {
            time: 'O(n²)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {
                    "nums": [1, 1, 1, 2, 2, 3],
                    "target": 6
                },
                output: [[1, 2, 3]],
                explanation: 'Only one unique triplet sums to 6: 1 + 2 + 3 = 6. Even though there are multiple 1s and 2s, we only report [1, 2, 3] once.'
            },
            {
                input: {
                    "nums": [-1, 0, 1, 2, -1, -4],
                    "target": 0
                },
                output: [[-1, -1, 2], [-1, 0, 1]],
                explanation: 'Two unique triplets sum to 0: (-1) + (-1) + 2 = 0 and (-1) + 0 + 1 = 0.'
            },
            {
                input: {
                    "nums": [0, 0, 0, 0],
                    "target": 0
                },
                output: [[0, 0, 0]],
                explanation: 'Only one unique triplet possible: 0 + 0 + 0 = 0. Even with four zeros, we report it once.'
            },
            {
                input: {
                    "nums": [-2, 0, 0, 2, 2],
                    "target": 0
                },
                output: [[-2, 0, 2]],
                explanation: 'One unique triplet: (-2) + 0 + 2 = 0. Although there are multiple 0s and 2s, only one unique combination.'
            }
        ],
        solutions: {
            python: `def threeSumWithDuplicates(nums, target):
    """
    Three Sum With Duplicates - Find all unique triplets summing to target.

    Time: O(n^2) - sorting O(n log n) + nested two-pointer O(n^2)
    Space: O(1) - excluding output array
    """
    nums.sort()
    result = []
    n = len(nums)

    for i in range(n - 2):
        # Skip duplicate first elements
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        # Two-pointer approach for remaining sum
        left, right = i + 1, n - 1
        remaining = target - nums[i]

        while left < right:
            current_sum = nums[left] + nums[right]

            if current_sum == remaining:
                result.append([nums[i], nums[left], nums[right]])

                # Skip duplicates for left pointer
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                # Skip duplicates for right pointer
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1

                left += 1
                right -= 1
            elif current_sum < remaining:
                left += 1
            else:
                right -= 1

    return result


# Test
if __name__ == "__main__":
    print(threeSumWithDuplicates([1, 1, 1, 2, 2, 3], 6))  # [[1, 2, 3]]
    print(threeSumWithDuplicates([-1, 0, 1, 2, -1, -4], 0))  # [[-1, -1, 2], [-1, 0, 1]]
    print(threeSumWithDuplicates([0, 0, 0, 0], 0))  # [[0, 0, 0]]`,
            go: `package main

import (
    "fmt"
    "sort"
)

// ThreeSumWithDuplicates finds all unique triplets that sum to target.
// Time: O(n^2), Space: O(1) excluding output
func ThreeSumWithDuplicates(nums []int, target int) [][]int {
    sort.Ints(nums)
    result := [][]int{}
    n := len(nums)

    for i := 0; i < n-2; i++ {
        // Skip duplicate first elements
        if i > 0 && nums[i] == nums[i-1] {
            continue
        }

        left, right := i+1, n-1
        remaining := target - nums[i]

        for left < right {
            currentSum := nums[left] + nums[right]

            if currentSum == remaining {
                result = append(result, []int{nums[i], nums[left], nums[right]})

                // Skip duplicates for left pointer
                for left < right && nums[left] == nums[left+1] {
                    left++
                }
                // Skip duplicates for right pointer
                for left < right && nums[right] == nums[right-1] {
                    right--
                }

                left++
                right--
            } else if currentSum < remaining {
                left++
            } else {
                right--
            }
        }
    }

    return result
}

func main() {
    fmt.Println(ThreeSumWithDuplicates([]int{1, 1, 1, 2, 2, 3}, 6))
    fmt.Println(ThreeSumWithDuplicates([]int{-1, 0, 1, 2, -1, -4}, 0))
    fmt.Println(ThreeSumWithDuplicates([]int{0, 0, 0, 0}, 0))
}`
        },
        twists: [
            { id: '02-two-number-sum/02-three-sum-duplicates/twist-01-three-sum-with-maximum-k-triplets', name: 'Three Sum with Maximum K Triplets', difficulty: 'Medium' },
            { id: '02-two-number-sum/02-three-sum-duplicates/twist-02-count-unique-triplets-without-listing', name: 'Count Unique Triplets Without Listing', difficulty: 'Medium' },
            { id: '02-two-number-sum/02-three-sum-duplicates/twist-03-three-sum-with-forbidden-pairs', name: 'Three Sum with Forbidden Pairs', difficulty: 'Hard' },
            { id: '02-two-number-sum/02-three-sum-duplicates/twist-04-three-sum-in-sorted-matrix-rows', name: 'Three Sum in Sorted Matrix Rows', difficulty: 'Hard' },
            { id: '02-two-number-sum/02-three-sum-duplicates/twist-05-three-sum-closest-with-duplicates-allowed', name: 'Three Sum Closest with Duplicates Allowed', difficulty: 'Medium' }
        ],
        similar: []
    };

    // Register with ProblemRenderer - as sub-problem of 02-two-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates'] = problem;

})();
