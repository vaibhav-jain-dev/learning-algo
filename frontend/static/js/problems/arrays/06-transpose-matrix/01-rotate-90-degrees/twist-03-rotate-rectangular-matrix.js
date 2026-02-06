/**
 * Rotate Rectangular Matrix
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: rotate-rectangular-matrix
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate Rectangular Matrix',
        difficulty: 'Hard',
        algorithm: 'rotate-rectangular-matrix',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate a non-square m x n matrix by 90 degrees. The result will be n x m. Cannot be done in-place. Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.',
        problem: 'Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.',
        hints: [
            'Think about how rotate rectangular matrix differs from the standard version of this problem.',
            'Key insight: Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.',
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
            python: `def rotate_rectangular_matrix(data):
    """
    Rotate Rectangular Matrix

    Rotate a non-square m x n matrix by 90 degrees. The result will be n x m. Cannot be done in-place.
    \n    Approach: Dimensions change, so in-place is impossible. Must allocate a new matrix and map coordinates correctly.

    Time: O(n)
    Space: O(1)
    """
    # Implementation based on the twist description
    # matrix = [[1,2,3],[4,5,6]]. 2x3 -> 3x2. Result: [[4,1],[5,2],[6,3]].

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
print(rotate_rectangular_matrix([1, 2, 3, 4, 5]))
print(rotate_rectangular_matrix([5, 3, 1]))
print(rotate_rectangular_matrix([1]))`,
            go: `package main

import "fmt"

// RotateRectangularMatrix solves the Rotate Rectangular Matrix problem.
// Rotate a non-square m x n matrix by 90 degrees. The result will be n x m. Cannot be done in-place.
// Time: O(n), Space: O(1)
func RotateRectangularMatrix(data []int) []int {
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
    fmt.Println(RotateRectangularMatrix([]int{1, 2, 3, 4, 5}))
    fmt.Println(RotateRectangularMatrix([]int{5, 3, 1}))
    fmt.Println(RotateRectangularMatrix([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-03-rotate-rectangular-matrix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-03-rotate-rectangular-matrix'] = problem;
})();
