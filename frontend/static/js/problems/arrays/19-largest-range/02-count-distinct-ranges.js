/**
 * Count Distinct Ranges
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorting
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Distinct Ranges',
        difficulty: 'Medium',
        algorithm: 'sorting',
        parent: '19-largest-range',
        description: 'Given an unsorted array of integers, count the number of distinct consecutive ranges. A consecutive range is a sequence of consecutive integers. For example, [1, 2, 3] forms one range, [5, 6] forms another range.',
        problem: 'Analyze the problem structure and identify the optimal approach. Consider the constraints and edge cases. Build the solution incrementally, testing with small examples.',
        complexity: {
            time: 'O(n log n)',
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
                2,
                3,
                5,
                6,
                8,
                10,
                11,
                12
        ]
},
        output: 4,
        explanation: 'After sorting, process elements in order. Adjacent elements with overlapping or matching properties are grouped together. The sorted order guarantees no valid groupings are missed.'
    }
        ],
        solutions: {
            python: `def countDistinctRanges(nums):
    """
    Count Distinct Ranges

    Count the number of distinct consecutive ranges in array.
    A consecutive range is a sequence of consecutive integers.

    Time: O(n log n)
    Space: O(n)
    """
    if not nums:
        return 0

    # Remove duplicates and sort
    sorted_nums = sorted(set(nums))

    if len(sorted_nums) == 0:
        return 0

    ranges = 1  # At least one range

    for i in range(1, len(sorted_nums)):
        # If current element is not consecutive to previous
        if sorted_nums[i] != sorted_nums[i - 1] + 1:
            ranges += 1

    return ranges


# Test
if __name__ == "__main__":
    print(countDistinctRanges([1, 2, 3, 5, 6, 8, 10, 11, 12]))  # 4
    print(countDistinctRanges([1, 2, 3, 4, 5]))  # 1
    print(countDistinctRanges([1, 3, 5, 7]))  # 4`,
            go: `package main

import (
    "fmt"
    "sort"
)

// CountDistinctRanges counts distinct consecutive ranges.
// Time: O(n log n), Space: O(n)
func CountDistinctRanges(nums []int) int {
    if len(nums) == 0 {
        return 0
    }

    // Remove duplicates
    unique := make(map[int]bool)
    for _, v := range nums {
        unique[v] = true
    }

    sortedNums := []int{}
    for v := range unique {
        sortedNums = append(sortedNums, v)
    }
    sort.Ints(sortedNums)

    if len(sortedNums) == 0 {
        return 0
    }

    ranges := 1

    for i := 1; i < len(sortedNums); i++ {
        // If not consecutive to previous
        if sortedNums[i] != sortedNums[i-1]+1 {
            ranges++
        }
    }

    return ranges
}

func main() {
    fmt.Println(CountDistinctRanges([]int{1, 2, 3, 5, 6, 8, 10, 11, 12}))  // 4
    fmt.Println(CountDistinctRanges([]int{1, 2, 3, 4, 5}))  // 1
    fmt.Println(CountDistinctRanges([]int{1, 3, 5, 7}))  // 4
}`
        },
        twists: [
            { name: 'Count Ranges Without Sorting', difficulty: 'Hard', description: 'Count distinct consecutive ranges without sorting the array. Use a hash set approach.', whyDifferent: 'Forces O(n) solution using hash sets to identify range starts, avoiding the O(n log n) sort step.', example: 'nums = [5, 6, 1, 2, 3, 8]. Three ranges: [1,2,3], [5,6], [8]. Count = 3. Found via hash set.' },
            { name: 'List All Ranges', difficulty: 'Medium', description: 'Instead of just counting, return the actual ranges as [start, end] pairs sorted by start.', whyDifferent: 'Must track both endpoints of each range, not just count transitions. Requires collecting range boundaries.', example: 'nums = [1, 2, 3, 5, 6, 8]. Ranges: [[1,3], [5,6], [8,8]].' },
            { name: 'Average Range Length', difficulty: 'Medium', description: 'Compute the average length of all distinct consecutive ranges in the array.', whyDifferent: 'Must compute both the count and total length of ranges, then divide. Requires tracking range sizes.', example: 'nums = [1, 2, 3, 5, 6, 8, 10, 11, 12]. Ranges lengths: 3, 2, 1, 3. Average = 9/4 = 2.25.' },
            { name: 'Minimum Ranges After K Additions', difficulty: 'Hard', description: 'You can add at most K values to the array. Find the minimum number of distinct ranges after optimal additions.', whyDifferent: 'Greedy: use additions to bridge the smallest gaps between ranges first, reducing the range count maximally.', example: 'nums = [1, 2, 3, 5, 6, 8], K = 1. Add 4: bridge [1,3] and [5,6] into [1,6]. Ranges: [1,6], [8]. Min = 2.' },
            { name: 'Ranges with Tolerance', difficulty: 'Medium', description: 'Count ranges where consecutive means within gap T (not strictly +1). Two values are consecutive if their difference is at most T.', whyDifferent: 'Relaxed consecutiveness creates larger, overlapping ranges. Sorting and scanning with a gap threshold changes boundary detection.', example: 'nums = [1, 3, 5, 10, 12], T = 2. Ranges: [1,3,5] (gaps <= 2), [10, 12]. Count = 2.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 19-largest-range
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '19-largest-range/02-count-distinct-ranges', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/19-largest-range/02-count-distinct-ranges'] = problem;

})();
