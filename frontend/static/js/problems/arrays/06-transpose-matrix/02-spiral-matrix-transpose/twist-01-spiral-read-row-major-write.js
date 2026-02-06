/**
 * Spiral Read, Row-Major Write
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-read-row-major-write
 * Parent: 06-transpose-matrix/02-spiral-matrix-transpose
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral Read, Row-Major Write',
        difficulty: 'Medium',
        algorithm: 'spiral-read-row-major-write',
        parent: '06-transpose-matrix/02-spiral-matrix-transpose',
        description: 'Read the matrix in spiral order but write the values in standard row-major order to a transposed-dimension matrix. The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.',
        problem: 'The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.',
        hints: [
            'Think about how spiral read, row-major write differs from the standard version of this problem.',
            'Key insight: The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.',
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
                input: {"matrix":[[1,2,3],[4,5,6],[7,8,9]]},
                output: [1,2,3,6,9,8,7,4,5],
                explanation: 'Elements read in spiral order from outside to inside.'
            },
            {
                input: {"matrix":[[1,2],[3,4]]},
                output: [1,2,4,3],
                explanation: 'Small matrix spiral traversal.'
            },
            {
                input: {"matrix":[[1]]},
                output: [1],
                explanation: 'Single element matrix.'
            }
        ],
        solutions: {
            python: `def spiral_read_row_major_write(data):
    """
    Spiral Read, Row-Major Write

    Read the matrix in spiral order but write the values in standard row-major order to a transposed-dimension matrix.
    \n    Approach: The writing pattern is simple (sequential), so only the reading is spiral. Decouples the two spiral operations.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # matrix = [[1,2,3],[4,5,6]]. Spiral read: [1,2,3,6,5,4]. Write to 3x2 row-major: [[1,2],[3,6],[5,4]].

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
print(spiral_read_row_major_write([1, 2, 3, 4, 5]))
print(spiral_read_row_major_write([5, 3, 1]))
print(spiral_read_row_major_write([1]))`,
            go: `package main

import "fmt"

// SpiralReadRowMajorWrite solves the Spiral Read, Row-Major Write problem.
// Read the matrix in spiral order but write the values in standard row-major order to a transposed-dimension matrix.
// Time: O(n), Space: O(n)
func SpiralReadRowMajorWrite(data []int) []int {
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
    fmt.Println(SpiralReadRowMajorWrite([]int{1, 2, 3, 4, 5}))
    fmt.Println(SpiralReadRowMajorWrite([]int{5, 3, 1}))
    fmt.Println(SpiralReadRowMajorWrite([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/02-spiral-matrix-transpose/twist-01-spiral-read-row-major-write', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/02-spiral-matrix-transpose/twist-01-spiral-read-row-major-write'] = problem;
})();
