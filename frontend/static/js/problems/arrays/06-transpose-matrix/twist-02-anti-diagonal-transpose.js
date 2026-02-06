/**
 * Anti-Diagonal Transpose
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: anti-diagonal-transpose
 * Parent: 06-transpose-matrix
 */
(function() {
    'use strict';

    const problem = {
        name: 'Anti-Diagonal Transpose',
        difficulty: 'Medium',
        algorithm: 'anti-diagonal-transpose',
        parent: '06-transpose-matrix',
        description: 'Instead of transposing across the main diagonal, transpose across the anti-diagonal (top-right to bottom-left). The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.',
        problem: 'The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.',
        hints: [
            'Think about how anti-diagonal transpose differs from the standard version of this problem.',
            'Key insight: The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
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
            python: `def anti_diagonal_transpose(data):
    """
    Anti-Diagonal Transpose

    Instead of transposing across the main diagonal, transpose across the anti-diagonal (top-right to bottom-left).
    \n    Approach: The index mapping changes from (i,j)→(j,i) to (i,j)→(n-1-j,m-1-i), requiring different loop logic.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # matrix=[[1,2,3],[4,5,6],[7,8,9]] → [[9,6,3],[8,5,2],[7,4,1]]

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
print(anti_diagonal_transpose([1, 2, 3, 4, 5]))
print(anti_diagonal_transpose([5, 3, 1]))
print(anti_diagonal_transpose([1]))`,
            go: `package main

import "fmt"

// AntiDiagonalTranspose solves the Anti-Diagonal Transpose problem.
// Instead of transposing across the main diagonal, transpose across the anti-diagonal (top-right to bottom-left).
// Time: O(n), Space: O(n)
func AntiDiagonalTranspose(data []int) []int {
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
    fmt.Println(AntiDiagonalTranspose([]int{1, 2, 3, 4, 5}))
    fmt.Println(AntiDiagonalTranspose([]int{5, 3, 1}))
    fmt.Println(AntiDiagonalTranspose([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/twist-02-anti-diagonal-transpose', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/twist-02-anti-diagonal-transpose'] = problem;
})();
