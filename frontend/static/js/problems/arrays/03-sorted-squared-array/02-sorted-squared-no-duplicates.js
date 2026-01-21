/**
 * Sorted Squared No Duplicates
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared No Duplicates',
        difficulty: 'Medium',
        algorithm: 'general',
        parent: '03-sorted-squared-array',
        description: 'Given a sorted array of integers, square all elements and return a sorted array with duplicates removed.',
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
        "raw": "array = [-3, -2, -1, 1, 2, 3]"
},
        output: "[1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.",
        explanation: 'Given the input, the algorithm processes it to produce [1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.'
    },
    {
        input: {
        "raw": "array = [-5, -3, 0, 2, 3, 5]"
},
        output: "[0, 4, 9, 25]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 4, 9, 25]'
    }
        ],
        solutions: {
            python: `def sortedSquaredNoDuplicates(array):
    """
    Sorted Squared No Duplicates - Square sorted array and remove duplicates.

    Time: O(n)
    Space: O(n) for result array
    """
    if not array:
        return []

    n = len(array)
    squared = [0] * n
    left, right = 0, n - 1
    pos = n - 1  # Fill from the end (largest values)

    # Two-pointer to build sorted squared array
    while left <= right:
        left_sq = array[left] * array[left]
        right_sq = array[right] * array[right]

        if left_sq > right_sq:
            squared[pos] = left_sq
            left += 1
        else:
            squared[pos] = right_sq
            right -= 1
        pos -= 1

    # Remove duplicates from sorted array
    result = []
    for val in squared:
        if not result or result[-1] != val:
            result.append(val)

    return result


# Test
if __name__ == "__main__":
    print(sortedSquaredNoDuplicates([-3, -2, -1, 1, 2, 3]))  # [1, 4, 9]
    print(sortedSquaredNoDuplicates([-5, -3, 0, 2, 3, 5]))  # [0, 4, 9, 25]`,
            go: `package main

import "fmt"

// SortedSquaredNoDuplicates squares sorted array and removes duplicates.
// Time: O(n), Space: O(n)
func SortedSquaredNoDuplicates(array []int) []int {
    n := len(array)
    if n == 0 {
        return []int{}
    }

    squared := make([]int, n)
    left, right := 0, n-1
    pos := n - 1 // Fill from the end (largest values)

    // Two-pointer to build sorted squared array
    for left <= right {
        leftSq := array[left] * array[left]
        rightSq := array[right] * array[right]

        if leftSq > rightSq {
            squared[pos] = leftSq
            left++
        } else {
            squared[pos] = rightSq
            right--
        }
        pos--
    }

    // Remove duplicates from sorted array
    result := []int{}
    for _, val := range squared {
        if len(result) == 0 || result[len(result)-1] != val {
            result = append(result, val)
        }
    }

    return result
}

func main() {
    fmt.Println(SortedSquaredNoDuplicates([]int{-3, -2, -1, 1, 2, 3}))
    fmt.Println(SortedSquaredNoDuplicates([]int{-5, -3, 0, 2, 3, 5}))
}`
        },
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 03-sorted-squared-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates'] = problem;

})();
