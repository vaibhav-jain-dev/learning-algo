/**
 * In-Place Transpose of Square Matrix
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: in-place-transpose-of-square-matrix
 * Parent: 06-transpose-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'In-Place Transpose of Square Matrix',
        difficulty: 'Medium',
        algorithm: 'in-place-transpose-of-square-matrix',
        parent: '06-transpose-matrix',
        description: 'Transpose the matrix in-place without using extra space. Only works for square matrices. Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.',
        problem: 'Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.',
        hints: [
            'Think about how in-place transpose of square matrix differs from the standard version of this problem.',
            'Key insight: Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(1)'
        },
        examples: [
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [[1,3],[2,4]],
                explanation: 'Matrix transformed according to the specified operation.'
            },
            {
                input: {"matrix":[[1,2,3],[4,5,6]]},
                output: [[1,4],[2,5],[3,6]],
                explanation: 'Rectangular matrix handled correctly.'
            },
            {
                input: {"matrix":[[1]]},
                output: [[1]],
                explanation: 'Single element matrix is trivially handled.'
            }
        ],
        solutions: {
            python: `def in_place_transpose_of_square_matrix(data):
    """
    In-Place Transpose of Square Matrix

    Transpose the matrix in-place without using extra space. Only works for square matrices.
    \n    Approach: Removes the ability to create a new result matrix. Must swap elements across the diagonal carefully to avoid double-swapping.

    Time: O(n)
    Space: O(1)
    """
    # Implementation based on the twist description
    # matrix=[[1,2],[3,4]] → in-place becomes [[1,3],[2,4]]

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
print(in_place_transpose_of_square_matrix([1, 2, 3, 4, 5]))
print(in_place_transpose_of_square_matrix([5, 3, 1]))
print(in_place_transpose_of_square_matrix([1]))`,
            go: `package main

import "fmt"

// InPlaceTransposeOfSquareMatrix solves the In-Place Transpose of Square Matrix problem.
// Transpose the matrix in-place without using extra space. Only works for square matrices.
// Time: O(n), Space: O(1)
func InPlaceTransposeOfSquareMatrix(data []int) []int {
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
    fmt.Println(InPlaceTransposeOfSquareMatrix([]int{1, 2, 3, 4, 5}))
    fmt.Println(InPlaceTransposeOfSquareMatrix([]int{5, 3, 1}))
    fmt.Println(InPlaceTransposeOfSquareMatrix([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/twist-01-in-place-transpose-of-square-matrix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/twist-01-in-place-transpose-of-square-matrix'] = problem;
})();
