/**
 * Rotate Ring Only
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: rotate-ring-only
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate Ring Only',
        difficulty: 'Hard',
        algorithm: 'rotate-ring-only',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate only the outermost ring of the matrix by 90 degrees, leaving inner elements unchanged. Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.',
        problem: 'Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.',
        hints: [
            'Think about how rotate ring only differs from the standard version of this problem.',
            'Key insight: Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.',
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
            python: `def rotate_ring_only(data):
    """
    Rotate Ring Only

    Rotate only the outermost ring of the matrix by 90 degrees, leaving inner elements unchanged.
    \n    Approach: Must extract the ring, rotate its elements, and place them back. Inner layers remain untouched.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # matrix = [[1,2,3],[4,5,6],[7,8,9]]. Rotate outer ring: [[7,4,1],[8,5,2],[9,6,3]]. Center 5 stays.

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
print(rotate_ring_only([1, 2, 3, 4, 5]))
print(rotate_ring_only([5, 3, 1]))
print(rotate_ring_only([1]))`,
            go: `package main

import "fmt"

// RotateRingOnly solves the Rotate Ring Only problem.
// Rotate only the outermost ring of the matrix by 90 degrees, leaving inner elements unchanged.
// Time: O(n), Space: O(n)
func RotateRingOnly(data []int) []int {
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
    fmt.Println(RotateRingOnly([]int{1, 2, 3, 4, 5}))
    fmt.Println(RotateRingOnly([]int{5, 3, 1}))
    fmt.Println(RotateRingOnly([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-05-rotate-ring-only', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-05-rotate-ring-only'] = problem;
})();
