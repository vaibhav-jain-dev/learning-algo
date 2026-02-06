/**
 * Minimum Swaps To Sort
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Minimum Swaps To Sort',
        difficulty: 'Hard',
        algorithm: 'linear-scan',
        parent: '18-subarray-sort',
        description: 'Find the minimum number of swaps needed to sort an array of distinct integers.',
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
          "array": [
            4,
            3,
            2,
            1
          ]
        },
        output: "2\nExplanation: Swap 4<->1, then 3<->2",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Swap 4<->1, then 3<->2'
    },
    {
        input: {
          "array": [
            1,
            5,
            4,
            3,
            2
          ]
        },
        output: "2\nExplanation: Swap 5<->2, then 4<->3",
        explanation: 'Given the input, the algorithm processes it to produce 2\nExplanation: Swap 5<->2, then 4<->3'
    }
        ],
        solutions: {
            python: `def minimumSwapsToSort(array):
    """
    Minimum Swaps To Sort

    Find minimum swaps to sort array of distinct integers.
    Use cycle detection - each cycle of length k needs k-1 swaps.

    Time: O(n log n)
    Space: O(n)
    """
    n = len(array)

    # Create array of (value, original_index) and sort by value
    arr_pos = [(val, idx) for idx, val in enumerate(array)]
    arr_pos.sort(key=lambda x: x[0])

    visited = [False] * n
    swaps = 0

    for i in range(n):
        # Skip if already visited or already in correct position
        if visited[i] or arr_pos[i][1] == i:
            continue

        # Find cycle length
        cycle_length = 0
        j = i

        while not visited[j]:
            visited[j] = True
            # Move to the index where current element should go
            j = arr_pos[j][1]
            cycle_length += 1

        # A cycle of length k requires k-1 swaps
        if cycle_length > 1:
            swaps += cycle_length - 1

    return swaps


# Test
if __name__ == "__main__":
    print(minimumSwapsToSort([4, 3, 2, 1]))  # 2
    print(minimumSwapsToSort([1, 5, 4, 3, 2]))  # 2`,
            go: `package main

import (
    "fmt"
    "sort"
)

// MinimumSwapsToSort finds minimum swaps to sort array.
// Time: O(n log n), Space: O(n)
func MinimumSwapsToSort(array []int) int {
    n := len(array)

    // Create array of (value, original_index)
    type pair struct {
        val, idx int
    }
    arrPos := make([]pair, n)
    for i, v := range array {
        arrPos[i] = pair{v, i}
    }

    // Sort by value
    sort.Slice(arrPos, func(i, j int) bool {
        return arrPos[i].val < arrPos[j].val
    })

    visited := make([]bool, n)
    swaps := 0

    for i := 0; i < n; i++ {
        // Skip if already visited or in correct position
        if visited[i] || arrPos[i].idx == i {
            continue
        }

        // Find cycle length
        cycleLength := 0
        j := i

        for !visited[j] {
            visited[j] = true
            j = arrPos[j].idx
            cycleLength++
        }

        // A cycle of length k requires k-1 swaps
        if cycleLength > 1 {
            swaps += cycleLength - 1
        }
    }

    return swaps
}

func main() {
    fmt.Println(MinimumSwapsToSort([]int{4, 3, 2, 1}))  // 2
    fmt.Println(MinimumSwapsToSort([]int{1, 5, 4, 3, 2}))  // 2
}`
        },
        twists: [
            { title: 'Minimum Swaps with Duplicates', difficulty: 'Very Hard', description: 'Find minimum swaps to sort an array that may contain duplicate values.', whyDifferent: 'Duplicates break the unique position mapping. Multiple valid sorted positions exist for each value, complicating cycle detection.', example: 'array = [2, 1, 2, 1]. Could be sorted as [1,1,2,2]. Minimum swaps = 1 (swap index 0 and 1).' },
            { title: 'Minimum Adjacent Swaps', difficulty: 'Hard', description: 'Only adjacent element swaps are allowed. Find the minimum number of adjacent swaps to sort the array.', whyDifferent: 'Adjacent-only swaps equivalent to counting inversions, requiring merge sort or BIT-based approach instead of cycle detection.', example: 'array = [3, 1, 2]. Adjacent swaps: swap(3,1)->1,3,2, swap(3,2)->1,2,3. Total = 2.' },
            { title: 'Minimum Swaps to Reverse', difficulty: 'Hard', description: 'Find the minimum number of swaps to reverse the array (make it sorted in descending order).', whyDifferent: 'Target permutation is the reverse, not the identity. Cycle decomposition uses the reverse mapping.', example: 'array = [1, 2, 3, 4]. Reverse to [4, 3, 2, 1]. Minimum swaps = 2.' },
            { title: 'Constrained Swaps', difficulty: 'Very Hard', description: 'You can only swap elements that are at most K positions apart. Find minimum swaps to sort, or determine if it is impossible.', whyDifferent: 'Distance constraint limits which swaps are possible, potentially making sorting impossible or requiring more swaps.', example: 'array = [3, 1, 2], K = 1. Only adjacent swaps. Possible: 2 swaps. If K = 0, impossible.' },
            { title: 'Swap to Partial Sort', difficulty: 'Hard', description: 'Find minimum swaps so that the first K elements of the array are the K smallest values (in any order).', whyDifferent: 'Only the first K positions matter. Elements outside K positions that belong inside must be swapped in, creating targeted cycles.', example: 'array = [4, 3, 2, 1], K = 2. Need 1,2 in first two positions: swap 4<->1, swap 3<->2. Min = 2.' }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 18-subarray-sort
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '18-subarray-sort/01-minimum-swaps-to-sort', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/18-subarray-sort/01-minimum-swaps-to-sort'] = problem;

})();
