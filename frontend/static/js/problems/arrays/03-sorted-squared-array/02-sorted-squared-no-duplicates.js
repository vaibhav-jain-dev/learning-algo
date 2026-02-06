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
        algorithm: 'two-pointer-sorted-squared',
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
          "array": [
            -3,
            -2,
            -1,
            1,
            2,
            3
          ]
        },
        output: "[1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.",
        explanation: 'Given the input, the algorithm processes it to produce [1, 4, 9]\nExplanation: -1 and 1 both give 1, -2 and 2 both give 4, etc.'
    },
    {
        input: {
          "array": [
            -5,
            -3,
            0,
            2,
            3,
            5
          ]
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
        twists: [
            {
                title: 'Count Unique Squared Values',
                difficulty: 'Easy',
                description: 'Instead of returning the deduplicated array, just return the count of unique squared values.',
                whyDifferent: 'Simplifies output but allows for a more efficient approach: use absolute value comparisons with two pointers without building the result array.',
                example: 'array=[-3,-2,-1,1,2,3] → 3 (unique squares: 1, 4, 9)'
            },
            {
                title: 'Sorted Squared Keep Last Occurrence',
                difficulty: 'Medium',
                description: 'When duplicates exist, keep track of which original element (positive or negative) contributed to each unique square. Return pairs of (square, original_value) keeping the rightmost original.',
                whyDifferent: 'Requires tracking provenance alongside deduplication, adding metadata management to the merge step.',
                example: 'array=[-3,-1,1,3] → [(1,1),(9,3)] (keep positive versions as rightmost)'
            },
            {
                title: 'K Most Frequent Squared Values',
                difficulty: 'Medium',
                description: 'After squaring, find the k squared values that appear most frequently (counting how many original elements map to each square).',
                whyDifferent: 'Combines squaring with frequency counting and top-k selection, requiring a hash map or exploiting the sorted structure.',
                example: 'array=[-3,-2,-1,0,1,2,3], k=2 → [1,4] or [4,9] (each appears twice: -1&1, -2&2, -3&3)'
            },
            {
                title: 'Deduplicated Squares in Reverse Order',
                difficulty: 'Easy',
                description: 'Return unique squared values in descending order instead of ascending.',
                whyDifferent: 'Changes the fill direction of the two-pointer approach: instead of filling from the end and then deduplicating, you can deduplicate as you fill from the start.',
                example: 'array=[-5,-3,0,2,3,5] → [25,9,4,0]'
            },
            {
                title: 'Sorted Squared No Duplicates with Original Indices',
                difficulty: 'Hard',
                description: 'Return unique squared values along with all original indices that contributed to each value.',
                whyDifferent: 'Requires maintaining index lists while deduplicating, turning a simple merge into a grouping operation.',
                example: 'array=[-3,-1,1,3] → [{val:1, indices:[1,2]}, {val:9, indices:[0,3]}]'
            }
        ],
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
