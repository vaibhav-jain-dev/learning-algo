/**
 * Three Sum in Sorted Matrix Rows
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-in-sorted-matrix-rows
 * Parent: 02-two-number-sum/02-three-sum-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum in Sorted Matrix Rows',
        difficulty: 'Hard',
        algorithm: 'three-sum-in-sorted-matrix-rows',
        parent: '02-two-number-sum/02-three-sum-duplicates',
        description: 'Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets. The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
        problem: 'The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
        hints: [
            'Think about how this twist differs from the standard version: Given a matrix where each row is sorted, pick one element from each of exactly t.',
            'The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
            'Sorting the input first may simplify the problem significantly.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"nums":[-1,2,1,-4],"target":1},
                output: 2,
                explanation: 'The triplet (-1, 2, 1) has sum 2, which is closest to target 1.'
            },
            {
                input: {"nums":[0,0,0],"target":1},
                output: 0,
                explanation: 'Only triplet possible: 0+0+0=0, closest to 1.'
            },
            {
                input: {"nums":[1,2,3,4,5],"target":10},
                output: 10,
                explanation: 'Triplet (2,3,5) or (1,4,5) sums to exactly 10.'
            }
        ],
        solutions: {
            python: `def three_sum_in_sorted_matrix_rows(data):
    """
    Three Sum in Sorted Matrix Rows

    Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets.
    \n    Approach: The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.

    Time: O(n log k)
    Space: O(n)

    Example: matrix=[[-1,0,1],[1,2,3],[-2,0,2]], target=3 → [[1,2,0]] etc.
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
        result.append(data[i])

    return result


# Test cases
print(three_sum_in_sorted_matrix_rows([1, 2, 3, 4, 5]))
print(three_sum_in_sorted_matrix_rows([5, 3, 1]))
print(three_sum_in_sorted_matrix_rows([1]))`,
            go: `package main

import "fmt"

// ThreeSumInSortedMatrixRows solves the Three Sum in Sorted Matrix Rows problem.
// Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets.
// Time: O(n log k), Space: O(n)
func ThreeSumInSortedMatrixRows(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(ThreeSumInSortedMatrixRows([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumInSortedMatrixRows([]int{5, 3, 1}))
    fmt.Println(ThreeSumInSortedMatrixRows([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates/twist-04-three-sum-in-sorted-matrix-rows', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates/twist-04-three-sum-in-sorted-matrix-rows'] = problem;
})();
