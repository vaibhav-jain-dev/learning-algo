/**
 * Closest Sum Target (Two Arrays)
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: two-pointer-two-arrays
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Sum Target',
        difficulty: 'Hard',
        algorithm: 'two-pointer-two-arrays',
        parent: '02-two-number-sum',
        description: 'Given two sorted arrays arr1 and arr2, find one element from each array such that their sum is closest to a given target value. Return the pair of elements. If there are multiple pairs with the same closest sum, return any one of them. This problem combines concepts from Two Sum and binary search.',
        problem: 'Sort both arrays if not already sorted. Use two pointers: one starting at the beginning of arr1 (left) and one at the end of arr2 (right). Calculate sum = arr1[left] + arr2[right]. If sum < target, move left pointer right to increase sum. If sum > target, move right pointer left to decrease sum. Track the minimum absolute difference and the corresponding pair throughout.',
        hints: [
            'Sorting both arrays enables the two-pointer approach.',
            'Start with pointers at opposite ends: arr1[0] and arr2[n-1].',
            'Moving left pointer right increases sum; moving right pointer left decreases sum.',
            'Track both the minimum difference AND the pair that achieved it.'
        ],
        complexity: {
            time: 'O(n log n + m log m)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {
                    "arr1": [1, 3, 5, 7],
                    "arr2": [2, 4, 6, 8],
                    "target": 10
                },
                output: [3, 7],
                explanation: 'Pairs and their sums: 3+7=10 (exact match!). We found a pair that sums exactly to target.'
            },
            {
                input: {
                    "arr1": [-1, 3, 8, 12],
                    "arr2": [2, 4, 9, 15],
                    "target": 7
                },
                output: [3, 4],
                explanation: 'Multiple pairs close to 7: -1+9=8, 3+4=7 (exact!), 8+2=10. The pair [3,4] gives sum=7 which equals target.'
            },
            {
                input: {
                    "arr1": [1, 4, 5, 7],
                    "arr2": [10, 20, 30, 40],
                    "target": 32
                },
                output: [1, 30],
                explanation: 'Checking pairs: 7+30=37, 5+30=35, 4+30=34, 1+30=31. Closest to 32 is either [1,30]=31 or [4,30]=34. Return [1,30] with diff=1.'
            },
            {
                input: {
                    "arr1": [-5, -2, 0, 3],
                    "arr2": [-3, 1, 4, 8],
                    "target": 1
                },
                output: [0, 1],
                explanation: 'Pairs near target 1: 0+1=1 (exact match!), -2+3=1 would need 3 in arr2 but its not there. Return [0,1].'
            }
        ],
        solutions: {
            python: `def closestSumTarget(arr1, arr2, target):
    """
    Closest Sum Target - Find pair from two sorted arrays closest to target.

    Time: O(n + m) where n, m are array lengths (assuming sorted)
    Space: O(1)
    """
    # Ensure arrays are sorted
    arr1.sort()
    arr2.sort()

    left = 0              # Start of arr1
    right = len(arr2) - 1  # End of arr2

    min_diff = float('inf')
    result = [arr1[0], arr2[0]]

    while left < len(arr1) and right >= 0:
        current_sum = arr1[left] + arr2[right]
        current_diff = abs(current_sum - target)

        # Update result if we found a closer pair
        if current_diff < min_diff:
            min_diff = current_diff
            result = [arr1[left], arr2[right]]

        # Exact match found
        if current_sum == target:
            return result
        elif current_sum < target:
            # Need larger sum, move left pointer right
            left += 1
        else:
            # Need smaller sum, move right pointer left
            right -= 1

    return result


# Test
if __name__ == "__main__":
    print(closestSumTarget([1, 3, 5, 7], [2, 4, 6, 8], 10))  # [3, 7] or [5, 5] etc
    print(closestSumTarget([-1, 3, 8, 12], [2, 4, 9, 15], 7))  # [3, 4]
    print(closestSumTarget([1, 4, 5, 7], [10, 20, 30, 40], 32))  # [1, 30] or [4, 30]`,
            go: `package main

import (
    "fmt"
    "sort"
)

// ClosestSumTarget finds pair from two sorted arrays closest to target.
// Time: O(n + m), Space: O(1)
func ClosestSumTarget(arr1, arr2 []int, target int) []int {
    // Ensure arrays are sorted
    sort.Ints(arr1)
    sort.Ints(arr2)

    left := 0
    right := len(arr2) - 1

    minDiff := int(^uint(0) >> 1) // Max int
    result := []int{arr1[0], arr2[0]}

    for left < len(arr1) && right >= 0 {
        currentSum := arr1[left] + arr2[right]
        currentDiff := abs(currentSum - target)

        // Update result if we found a closer pair
        if currentDiff < minDiff {
            minDiff = currentDiff
            result = []int{arr1[left], arr2[right]}
        }

        // Exact match found
        if currentSum == target {
            return result
        } else if currentSum < target {
            // Need larger sum, move left pointer right
            left++
        } else {
            // Need smaller sum, move right pointer left
            right--
        }
    }

    return result
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}

func main() {
    fmt.Println(ClosestSumTarget([]int{1, 3, 5, 7}, []int{2, 4, 6, 8}, 10))
    fmt.Println(ClosestSumTarget([]int{-1, 3, 8, 12}, []int{2, 4, 9, 15}, 7))
    fmt.Println(ClosestSumTarget([]int{1, 4, 5, 7}, []int{10, 20, 30, 40}, 32))
}`
        },
        twists: [
            {
                title: 'K Closest Pairs from Two Arrays',
                difficulty: 'Hard',
                description: 'Instead of the single closest pair, return the k pairs (one from each array) with sums closest to target.',
                whyDifferent: 'Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
                example: 'arr1=[1,3,5], arr2=[2,4,6], target=8, k=2 → [[3,6],[5,4]] (sums 9 and 9, closest to 8)'
            },
            {
                title: 'Closest Sum from Three Arrays',
                difficulty: 'Hard',
                description: 'Given three sorted arrays, pick one element from each to minimize the distance of their sum to target.',
                whyDifferent: 'Extends from two-pointer on two arrays to three arrays, where a simple two-pointer approach does not directly apply. Requires fixing one element and applying two-pointer to the other two.',
                example: 'arr1=[1,3], arr2=[2,5], arr3=[4,6], target=12 → [3,5,4]=12 (exact)'
            },
            {
                title: 'Closest Pair with Minimum Index Distance',
                difficulty: 'Medium',
                description: 'Among all pairs with the closest sum to target, return the one where the two chosen indices (original positions) are farthest apart.',
                whyDifferent: 'Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
                example: 'arr1=[1,3,5,7], arr2=[2,4,6,8], target=10 → [3,8] instead of [5,6] if index distance is larger'
            },
            {
                title: 'Closest Sum with Exclusion List',
                difficulty: 'Medium',
                description: 'Find the closest pair sum to target, but certain sum values are forbidden and must be skipped.',
                whyDifferent: 'The two-pointer approach must skip over forbidden sums, potentially passing the optimal answer and requiring backtracking or maintaining multiple candidates.',
                example: 'arr1=[1,3,5], arr2=[2,4,6], target=8, forbidden=[8] → next closest is 7 or 9'
            },
            {
                title: 'Dynamic Closest Sum with Array Updates',
                difficulty: 'Very Hard',
                description: 'Support insert/delete operations on both arrays and query the closest sum pair after each update.',
                whyDifferent: 'Static two-pointer no longer works. Requires balanced BSTs or augmented data structures to maintain sorted order and efficiently find closest pairs after modifications.',
                example: 'arr1=[1,5], arr2=[3,7], target=8 → [1,7]. Insert 4 into arr1 → [4,3] is now closer'
            }
        ],
        similar: []
    };

    // Register with ProblemRenderer - as sub-problem of 02-two-number-sum
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/03-closest-sum-target', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/03-closest-sum-target'] = problem;

})();
