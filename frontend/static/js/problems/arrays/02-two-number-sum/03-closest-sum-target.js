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
            { id: '02-two-number-sum/03-closest-sum-target/twist-01-k-closest-pairs-from-two-arrays', name: 'K Closest Pairs from Two Arrays', difficulty: 'Hard' },
            { id: '02-two-number-sum/03-closest-sum-target/twist-02-closest-sum-from-three-arrays', name: 'Closest Sum from Three Arrays', difficulty: 'Hard' },
            { id: '02-two-number-sum/03-closest-sum-target/twist-03-closest-pair-with-minimum-index-distance', name: 'Closest Pair with Minimum Index Distance', difficulty: 'Medium' },
            { id: '02-two-number-sum/03-closest-sum-target/twist-04-closest-sum-with-exclusion-list', name: 'Closest Sum with Exclusion List', difficulty: 'Medium' },
            { id: '02-two-number-sum/03-closest-sum-target/twist-05-dynamic-closest-sum-with-array-updates', name: 'Dynamic Closest Sum with Array Updates', difficulty: 'Very Hard' }
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
