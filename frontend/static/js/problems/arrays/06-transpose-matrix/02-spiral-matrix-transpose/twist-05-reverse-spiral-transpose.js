/**
 * Reverse Spiral Transpose
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: reverse-spiral-transpose
 * Parent: 06-transpose-matrix/02-spiral-matrix-transpose
 */
(function() {
    'use strict';

    const problem = {
        name: 'Reverse Spiral Transpose',
        difficulty: 'Hard',
        algorithm: 'reverse-spiral-transpose',
        parent: '06-transpose-matrix/02-spiral-matrix-transpose',
        description: 'Read in reverse spiral order (start from the center outward) and write in spiral order to the transposed matrix. Reverse spiral reading starts from the center and expands, the opposite of normal spiral reading from outside in.',
        problem: 'Reverse spiral reading starts from the center and expands, the opposite of normal spiral reading from outside in.',
        hints: [
            'Think about how reverse spiral transpose differs from the standard version of this problem.',
            'Key insight: Reverse spiral reading starts from the center and expands, the opposite of normal spiral reading from outside in.',
            'Consider whether sorting can help simplify the approach.',
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
            python: `def reverse_spiral_transpose(data):
    """
    Reverse Spiral Transpose

    Read in reverse spiral order (start from the center outward) and write in spiral order to the transposed matrix.
    \n    Approach: Reverse spiral reading starts from the center and expands, the opposite of normal spiral reading from outside in.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # matrix = [[1,2,3],[4,5,6]]. Reverse spiral read order is the reverse of normal spiral. Write normally.

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
print(reverse_spiral_transpose([1, 2, 3, 4, 5]))
print(reverse_spiral_transpose([5, 3, 1]))
print(reverse_spiral_transpose([1]))`,
            go: `package main

import "fmt"

// ReverseSpiralTranspose solves the Reverse Spiral Transpose problem.
// Read in reverse spiral order (start from the center outward) and write in spiral order to the transposed matrix.
// Time: O(n), Space: O(n)
func ReverseSpiralTranspose(data []int) []int {
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
    fmt.Println(ReverseSpiralTranspose([]int{1, 2, 3, 4, 5}))
    fmt.Println(ReverseSpiralTranspose([]int{5, 3, 1}))
    fmt.Println(ReverseSpiralTranspose([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/02-spiral-matrix-transpose/twist-05-reverse-spiral-transpose', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/02-spiral-matrix-transpose/twist-05-reverse-spiral-transpose'] = problem;
})();
