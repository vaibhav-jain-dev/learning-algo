/**
 * Shortest Unsorted With K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Shortest Unsorted With K',
        difficulty: 'Medium',
        algorithm: 'linear-scan',
        parent: '18-subarray-sort',
        description: 'Given an integer array, find the shortest contiguous subarray that, if sorted, would result in the whole array being sorted. Return the length of that subarray.',
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
            2,
            6,
            4,
            8,
            10,
            9,
            15
          ]
        },
        output: "5\nExplanation: Sort subarray [6, 4, 8, 10, 9] to get sorted array",
        explanation: 'Given the input, the algorithm processes it to produce 5\nExplanation: Sort subarray [6, 4, 8, 10, 9] to get sorted array'
    },
    {
        input: {
          "array": [
            1,
            2,
            3,
            4
          ]
        },
        output: "0\nExplanation: Already sorted",
        explanation: 'Given the input, the algorithm processes it to produce 0\nExplanation: Already sorted'
    }
        ],
        solutions: {
            python: `def shortestUnsortedWithK(array):
    """
    Shortest Unsorted Subarray

    Find the shortest contiguous subarray that, if sorted,
    would result in the whole array being sorted.

    Time: O(n)
    Space: O(1)
    """
    n = len(array)
    if n <= 1:
        return 0

    # Find the first element out of order from left
    left = 0
    while left < n - 1 and array[left] <= array[left + 1]:
        left += 1

    # Array is already sorted
    if left == n - 1:
        return 0

    # Find the first element out of order from right
    right = n - 1
    while right > 0 and array[right] >= array[right - 1]:
        right -= 1

    # Find min and max in the unsorted subarray
    sub_min = min(array[left:right + 1])
    sub_max = max(array[left:right + 1])

    # Extend left boundary if needed
    while left > 0 and array[left - 1] > sub_min:
        left -= 1

    # Extend right boundary if needed
    while right < n - 1 and array[right + 1] < sub_max:
        right += 1

    return right - left + 1


# Test
if __name__ == "__main__":
    print(shortestUnsortedWithK([2, 6, 4, 8, 10, 9, 15]))  # 5
    print(shortestUnsortedWithK([1, 2, 3, 4]))  # 0`,
            go: `package main

import "fmt"

// ShortestUnsortedWithK finds shortest subarray to sort.
// Time: O(n), Space: O(1)
func ShortestUnsortedWithK(array []int) int {
    n := len(array)
    if n <= 1 {
        return 0
    }

    // Find first element out of order from left
    left := 0
    for left < n-1 && array[left] <= array[left+1] {
        left++
    }

    // Array is already sorted
    if left == n-1 {
        return 0
    }

    // Find first element out of order from right
    right := n - 1
    for right > 0 && array[right] >= array[right-1] {
        right--
    }

    // Find min and max in unsorted subarray
    subMin, subMax := array[left], array[left]
    for i := left; i <= right; i++ {
        if array[i] < subMin {
            subMin = array[i]
        }
        if array[i] > subMax {
            subMax = array[i]
        }
    }

    // Extend left boundary if needed
    for left > 0 && array[left-1] > subMin {
        left--
    }

    // Extend right boundary if needed
    for right < n-1 && array[right+1] < subMax {
        right++
    }

    return right - left + 1
}

func main() {
    fmt.Println(ShortestUnsortedWithK([]int{2, 6, 4, 8, 10, 9, 15}))  // 5
    fmt.Println(ShortestUnsortedWithK([]int{1, 2, 3, 4}))  // 0
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 18-subarray-sort
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '18-subarray-sort/02-shortest-unsorted-with-k', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/18-subarray-sort/02-shortest-unsorted-with-k'] = problem;

})();
