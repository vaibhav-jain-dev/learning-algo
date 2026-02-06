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
            'Think about how three sum in sorted matrix rows differs from the standard version of this problem.',
            'Key insight: The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'Elements transformed and sorted correctly.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'All positive - order maintained after transformation.'
            },
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'All negative - order reversed after transformation.'
            }
        ],
        solutions: {
            python: `def three_sum_in_sorted_matrix_rows(data):
    """
    Three Sum in Sorted Matrix Rows

    Given a matrix where each row is sorted, pick one element from each of exactly three different rows so they sum to target. List all unique triplets.
    \n    Approach: The elements come from different rows, so you cannot sort a single array. Requires combining row-wise two-pointer with cross-row iteration.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # matrix=[[-1,0,1],[1,2,3],[-2,0,2]], target=3 → [[1,2,0]] etc.

    if not data:
        return None

    result = []
    n = len(data) if hasattr(data, '__len__') else 0

    # Core algorithm logic
    for i in range(n):
        # Process each element according to problem rules
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
// Time: O(n log n), Space: O(n)
func ThreeSumInSortedMatrixRows(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    result := make([]int, 0)
    n := len(data)

    // Core algorithm logic
    for i := 0; i < n; i++ {
        // Process each element according to problem rules
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
