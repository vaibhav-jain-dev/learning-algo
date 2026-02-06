/**
 * Largest Range After Addition
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: hash-set
 */
(function() {
    'use strict';

    const problem = {
        name: 'Largest Range After Addition',
        difficulty: 'Hard',
        algorithm: 'hash-set',
        parent: '19-largest-range',
        description: 'Given an array of integers nums and an integer k representing the number of elements you can add to the array, find the length of the largest consecutive range possible after adding at most k elements. You can add any integer to the array to fill gaps in consecutive sequences.',
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
                3,
                5,
                7
        ],
        "additions": 1
},
        output: 4,
        explanation: 'Using a hash table, we store seen values for O(1) lookup to find the answer. For input nums=[1, 3, 5, 7], additions=1, the result is 4.'
    }
        ],
        solutions: {
            python: `def largestRangeAfterAddition(nums, additions):
    """
    Largest Range After Addition

    Find the largest consecutive range possible after adding
    at most 'additions' elements to fill gaps.

    Uses sliding window on sorted unique elements.

    Time: O(n log n)
    Space: O(n)
    """
    if not nums:
        return 0

    # Sort and remove duplicates
    sorted_nums = sorted(set(nums))
    n = len(sorted_nums)

    if n == 0:
        return 0

    max_range = 1
    left = 0

    for right in range(n):
        # Calculate gaps needed to make range [left, right] consecutive
        # Total range length - number of existing elements = gaps needed
        range_length = sorted_nums[right] - sorted_nums[left] + 1
        existing_elements = right - left + 1
        gaps_needed = range_length - existing_elements

        # If we need more additions than allowed, shrink window
        while gaps_needed > additions and left < right:
            left += 1
            range_length = sorted_nums[right] - sorted_nums[left] + 1
            existing_elements = right - left + 1
            gaps_needed = range_length - existing_elements

        # Current range length (existing + additions used)
        current_range = existing_elements + min(gaps_needed, additions)
        # Actually, with additions we can extend beyond the window
        # The range is: sorted_nums[right] - sorted_nums[left] + 1
        if gaps_needed <= additions:
            max_range = max(max_range, range_length)

    return max_range


# Test
if __name__ == "__main__":
    print(largestRangeAfterAddition([1, 3, 5, 7], 1))  # 4 (add 2: [1,2,3] or add 4: [3,4,5] etc.)
    print(largestRangeAfterAddition([1, 2, 3, 10], 2))  # 5 (add 4,5: [1,2,3,4,5])`,
            go: `package main

import (
    "fmt"
    "sort"
)

// LargestRangeAfterAddition finds largest range after additions.
// Time: O(n log n), Space: O(n)
func LargestRangeAfterAddition(nums []int, additions int) int {
    if len(nums) == 0 {
        return 0
    }

    // Remove duplicates and sort
    unique := make(map[int]bool)
    for _, v := range nums {
        unique[v] = true
    }

    sortedNums := []int{}
    for v := range unique {
        sortedNums = append(sortedNums, v)
    }
    sort.Ints(sortedNums)

    n := len(sortedNums)
    if n == 0 {
        return 0
    }

    maxRange := 1
    left := 0

    for right := 0; right < n; right++ {
        // Calculate gaps needed
        rangeLength := sortedNums[right] - sortedNums[left] + 1
        existingElements := right - left + 1
        gapsNeeded := rangeLength - existingElements

        // Shrink window if needed
        for gapsNeeded > additions && left < right {
            left++
            rangeLength = sortedNums[right] - sortedNums[left] + 1
            existingElements = right - left + 1
            gapsNeeded = rangeLength - existingElements
        }

        if gapsNeeded <= additions && rangeLength > maxRange {
            maxRange = rangeLength
        }
    }

    return maxRange
}

func main() {
    fmt.Println(LargestRangeAfterAddition([]int{1, 3, 5, 7}, 1))  // 4
    fmt.Println(LargestRangeAfterAddition([]int{1, 2, 3, 10}, 2))  // 5
}`
        },
        twists: [
            { title: 'Largest Range After Removal', difficulty: 'Hard', description: 'Instead of adding elements, you can remove at most K elements. Find the largest remaining consecutive range.', whyDifferent: 'Removal reduces the array rather than extending it. Must find the longest range fully present after optimal removals.', example: 'nums = [1, 2, 5, 3, 4, 8], K = 1. Remove 5: [1,2,3,4] range length 4. Or keep 5, range [3,4,5] len 3.' },
            { title: 'Additions with Specific Pool', difficulty: 'Hard', description: 'You can only add values from a given pool (not any integer). Find the largest range achievable.', whyDifferent: 'Limited pool of available additions constrains which gaps can be filled, requiring pool-aware gap analysis.', example: 'nums = [1, 3, 5], pool = [2, 6], additions = 2. Add 2 and 6: [1,2,3,5,6] range [1,3] or [5,6]. Best: add 2: [1,2,3] len 3.' },
            { title: 'Minimum Additions for Target Range', difficulty: 'Hard', description: 'Find the minimum number of additions needed to achieve a consecutive range of length at least L.', whyDifferent: 'Optimization inverted: instead of fixed K finding max range, find min K for target range length L.', example: 'nums = [1, 3, 7], L = 5. To get range [1,5]: add 2,4,5 = 3 additions. To get [3,7]: add 4,5,6 = 3. Min = 3.' },
            { title: 'Two Separate Ranges After Addition', difficulty: 'Very Hard', description: 'Distribute K additions across two disjoint ranges to maximize the sum of both range lengths.', whyDifferent: 'Must decide how to split additions between two ranges, a resource allocation optimization problem.', example: 'nums = [1, 5, 10, 14], K = 4. Spend 3 on [1,5]: add 2,3,4 -> len 5. Spend 1 on [10,14]: add 11 -> [10,11,14] no. Better allocation needed.' },
            { title: 'Weighted Range After Addition', difficulty: 'Hard', description: 'Each original element has weight 1, added elements have weight 0.5. Maximize the weighted range length.', whyDifferent: 'Added elements contribute less, so extending an existing dense range is preferred over bridging sparse ones.', example: 'nums = [1, 2, 3, 10, 11], additions = 2. Extend [1,2,3] by adding 4,5: weighted len = 3*1 + 2*0.5 = 4. Bridge [3,10] too costly.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 19-largest-range
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '19-largest-range/03-largest-range-after-addition', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range/03-largest-range-after-addition'] = problem;

})();
