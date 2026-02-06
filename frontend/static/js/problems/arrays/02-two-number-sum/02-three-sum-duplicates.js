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
            {
                title: 'Three Sum with Maximum K Triplets',
                difficulty: 'Medium',
                description: 'Return at most k unique triplets that sum to target, prioritizing those with the smallest absolute values.',
                whyDifferent: 'Adds a selection/priority constraint on top of finding all triplets, requiring you to sort results or use a heap.',
                example: 'nums=[-2,-1,0,1,2,3], target=0, k=2 → [[-1,0,1],[-2,-1,3]] (smallest abs values first)'
            },
            {
                title: 'Count Unique Triplets Without Listing',
                difficulty: 'Medium',
                description: 'Instead of returning all triplets, just count how many unique triplets sum to target.',
                whyDifferent: 'While the core algorithm is similar, counting allows mathematical shortcuts: when duplicates exist, you can calculate combinations instead of enumerating.',
                example: 'nums=[0,0,0,0], target=0 → 1 (only one unique triplet [0,0,0])'
            },
            {
                title: 'Three Sum with Forbidden Pairs',
                difficulty: 'Hard',
                description: 'Find unique triplets summing to target, but certain pairs of indices cannot both appear in the same triplet.',
                whyDifferent: 'Forbidden pairs add a constraint graph on top of the sum problem, requiring you to check pair compatibility during enumeration.',
                example: 'nums=[-1,0,1,2,-1], target=0, forbidden=[(0,4)] → cannot use indices 0 and 4 together'
            },
            {
                title: 'Three Sum in Sorted Matrix Rows',
                difficulty: 'Hard',
                description: 'Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets.',
                whyDifferent: 'The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
                example: 'matrix=[[-1,0,1],[1,2,3],[-2,0,2]], target=3 → [[1,2,0]] etc.'
            },
            {
                title: 'Three Sum Closest with Duplicates Allowed',
                difficulty: 'Medium',
                description: 'Find the closest sum to target, but report ALL unique triplets achieving that closest sum.',
                whyDifferent: 'Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.',
                example: 'nums=[-1,0,1,2,-1], target=1 → closest=1, triplets=[[-1,0,2]]'
            }
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
