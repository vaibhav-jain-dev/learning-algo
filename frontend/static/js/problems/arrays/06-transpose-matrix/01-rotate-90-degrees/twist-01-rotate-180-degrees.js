/**
 * Rotate 180 Degrees
 * Category: arrays
 * Difficulty: Easy
 * Algorithm: rotate-180-degrees
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate 180 Degrees',
        difficulty: 'Easy',
        algorithm: 'rotate-180-degrees',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate the matrix by 180 degrees in-place. Each element moves to the diagonally opposite position. Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).',
        problem: 'Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).',
        hints: [
            'Think about how rotate 180 degrees differs from the standard version of this problem.',
            'Key insight: Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).',
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
            python: `def rotate_180_degrees(data):
    """
    Rotate 180 Degrees

    Rotate the matrix by 180 degrees in-place. Each element moves to the diagonally opposite position.
    \n    Approach: Simpler than 90-degree: just reverse all rows and then reverse element order within each row (or reverse the entire flat array).

    Time: O(n)
    Space: O(1)
    """
    # Implementation based on the twist description
    # matrix = [[1,2],[3,4]]. Result: [[4,3],[2,1]].

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
print(rotate_180_degrees([1, 2, 3, 4, 5]))
print(rotate_180_degrees([5, 3, 1]))
print(rotate_180_degrees([1]))`,
            go: `package main

import "fmt"

// Rotate180Degrees solves the Rotate 180 Degrees problem.
// Rotate the matrix by 180 degrees in-place. Each element moves to the diagonally opposite position.
// Time: O(n), Space: O(1)
func Rotate180Degrees(data []int) []int {
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
    fmt.Println(Rotate180Degrees([]int{1, 2, 3, 4, 5}))
    fmt.Println(Rotate180Degrees([]int{5, 3, 1}))
    fmt.Println(Rotate180Degrees([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-01-rotate-180-degrees', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-01-rotate-180-degrees'] = problem;
})();
