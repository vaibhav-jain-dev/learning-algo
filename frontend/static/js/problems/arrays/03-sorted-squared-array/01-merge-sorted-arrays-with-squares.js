/**
 * Merge Sorted Arrays With Squares
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: general
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Sorted Arrays With Squares',
        difficulty: 'Medium',
        algorithm: 'two-pointer-sorted-squared',
        parent: '03-sorted-squared-array',
        description: 'Given two sorted arrays, square all elements and merge them into a single sorted array.',
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
          "arr1": [
            -3,
            -1,
            2
          ],
          "arr2": [
            -2,
            4
          ]
        },
        output: "[1, 4, 4, 9, 16]",
        explanation: 'Given the input, the algorithm processes it to produce [1, 4, 4, 9, 16]'
    },
    {
        input: {
          "arr1": [
            -5,
            0,
            3
          ],
          "arr2": [
            1,
            2,
            6
          ]
        },
        output: "[0, 1, 4, 9, 25, 36]",
        explanation: 'Given the input, the algorithm processes it to produce [0, 1, 4, 9, 25, 36]'
    }
        ],
        solutions: {
            python: `def mergeSortedArraysWithSquares(arr1, arr2):
    """
    Merge Sorted Arrays With Squares - Square elements and merge into sorted array.

    Time: O(n + m) where n, m are array lengths
    Space: O(n + m) for the result array
    """
    def getSortedSquares(arr):
        """Get sorted squared array using two-pointer technique."""
        n = len(arr)
        result = [0] * n
        left, right = 0, n - 1
        pos = n - 1  # Fill from the end (largest values)

        while left <= right:
            left_sq = arr[left] * arr[left]
            right_sq = arr[right] * arr[right]

            if left_sq > right_sq:
                result[pos] = left_sq
                left += 1
            else:
                result[pos] = right_sq
                right -= 1
            pos -= 1

        return result

    # Get sorted squares of both arrays
    sq1 = getSortedSquares(arr1) if arr1 else []
    sq2 = getSortedSquares(arr2) if arr2 else []

    # Merge two sorted arrays
    result = []
    i, j = 0, 0

    while i < len(sq1) and j < len(sq2):
        if sq1[i] <= sq2[j]:
            result.append(sq1[i])
            i += 1
        else:
            result.append(sq2[j])
            j += 1

    # Add remaining elements
    result.extend(sq1[i:])
    result.extend(sq2[j:])

    return result


# Test
if __name__ == "__main__":
    print(mergeSortedArraysWithSquares([-3, -1, 2], [-2, 4]))  # [1, 4, 4, 9, 16]
    print(mergeSortedArraysWithSquares([-5, 0, 3], [1, 2, 6]))  # [0, 1, 4, 9, 25, 36]`,
            go: `package main

import "fmt"

// MergeSortedArraysWithSquares squares elements and merges into sorted array.
// Time: O(n + m), Space: O(n + m)
func MergeSortedArraysWithSquares(arr1, arr2 []int) []int {
    // Get sorted squares of both arrays
    sq1 := getSortedSquares(arr1)
    sq2 := getSortedSquares(arr2)

    // Merge two sorted arrays
    result := make([]int, 0, len(sq1)+len(sq2))
    i, j := 0, 0

    for i < len(sq1) && j < len(sq2) {
        if sq1[i] <= sq2[j] {
            result = append(result, sq1[i])
            i++
        } else {
            result = append(result, sq2[j])
            j++
        }
    }

    // Add remaining elements
    result = append(result, sq1[i:]...)
    result = append(result, sq2[j:]...)

    return result
}

// getSortedSquares returns sorted squared array using two-pointer technique
func getSortedSquares(arr []int) []int {
    n := len(arr)
    if n == 0 {
        return []int{}
    }

    result := make([]int, n)
    left, right := 0, n-1
    pos := n - 1 // Fill from the end (largest values)

    for left <= right {
        leftSq := arr[left] * arr[left]
        rightSq := arr[right] * arr[right]

        if leftSq > rightSq {
            result[pos] = leftSq
            left++
        } else {
            result[pos] = rightSq
            right--
        }
        pos--
    }

    return result
}

func main() {
    fmt.Println(MergeSortedArraysWithSquares([]int{-3, -1, 2}, []int{-2, 4}))
    fmt.Println(MergeSortedArraysWithSquares([]int{-5, 0, 3}, []int{1, 2, 6}))
}`
        },
        twists: [
            {
                title: 'Merge K Sorted Arrays with Squares',
                difficulty: 'Hard',
                description: 'Given k sorted arrays instead of two, square all elements and merge into a single sorted array.',
                whyDifferent: 'Merging k arrays requires a min-heap approach instead of simple two-pointer merge, changing the complexity analysis.',
                example: 'arr1=[-3,1], arr2=[-2,4], arr3=[0,5] → [0,1,4,4,9,16,25]'
            },
            {
                title: 'Merge Sorted Squares with Duplicate Removal',
                difficulty: 'Medium',
                description: 'Merge two sorted arrays after squaring, but remove all duplicate squared values from the result.',
                whyDifferent: 'Adds deduplication during the merge phase, requiring comparison with the last added element at each merge step.',
                example: 'arr1=[-3,-1,2], arr2=[-2,1,3] → [1,4,9] (removes duplicate 1 from -1 and 1, duplicate 9 from -3 and 3)'
            },
            {
                title: 'Intersection of Squared Arrays',
                difficulty: 'Medium',
                description: 'Instead of merging, find the common elements between the two squared sorted arrays.',
                whyDifferent: 'Switches from union to intersection logic during the merge phase, requiring equality checks and synchronized pointer advancement.',
                example: 'arr1=[-3,-1,2], arr2=[-2,1,3] → [1,9] (both arrays contain 1 and 9 after squaring)'
            },
            {
                title: 'Merge Squares with Weighted Sum',
                difficulty: 'Hard',
                description: 'Each array has associated weights. Merge the squared values and for duplicates, sum their weights instead of including duplicates.',
                whyDifferent: 'Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.',
                example: 'arr1=[(-3,2),(-1,5),(2,1)], arr2=[(-2,3),(4,1)] → [(1,5),(4,4),(9,2),(16,1)] with merged weights'
            }
        ],
        similar: [

        ]
    };

    // Register with ProblemRenderer - as sub-problem of 03-sorted-squared-array
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/01-merge-sorted-arrays-with-squares', problem);
    }

    // Export for direct access
    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/01-merge-sorted-arrays-with-squares'] = problem;

})();
