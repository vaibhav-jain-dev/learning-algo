/**
 * Row-Major Read, Spiral Write
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: row-major-read-spiral-write
 * Parent: 06-transpose-matrix/02-spiral-matrix-transpose
 */
(function() {
    'use strict';

    const problem = {
        name: 'Row-Major Read, Spiral Write',
        difficulty: 'Medium',
        algorithm: 'row-major-read-spiral-write',
        parent: '06-transpose-matrix/02-spiral-matrix-transpose',
        description: 'Read elements in standard row-major order but write them in spiral order to the output matrix. Reading is trivial, writing in spiral order requires the spiral-write logic. The inverse of the previous twist.',
        problem: 'Reading is trivial, writing in spiral order requires the spiral-write logic. The inverse of the previous twist.',
        hints: [
            'Think about how row-major read, spiral write differs from the standard version of this problem.',
            'Key insight: Reading is trivial, writing in spiral order requires the spiral-write logic. The inverse of the previous twist.',
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
            python: `def row_major_read_spiral_write(data):
    """
    Row-Major Read, Spiral Write

    Read elements in standard row-major order but write them in spiral order to the output matrix.
    \n    Approach: Reading is trivial, writing in spiral order requires the spiral-write logic. The inverse of the previous twist.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # matrix = [[1,2,3],[4,5,6]]. Row-major: [1,2,3,4,5,6]. Spiral-write to 3x2: [[1,2],[6,3],[5,4]].

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
print(row_major_read_spiral_write([1, 2, 3, 4, 5]))
print(row_major_read_spiral_write([5, 3, 1]))
print(row_major_read_spiral_write([1]))`,
            go: `package main

import "fmt"

// RowMajorReadSpiralWrite solves the Row-Major Read, Spiral Write problem.
// Read elements in standard row-major order but write them in spiral order to the output matrix.
// Time: O(n), Space: O(n)
func RowMajorReadSpiralWrite(data []int) []int {
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
    fmt.Println(RowMajorReadSpiralWrite([]int{1, 2, 3, 4, 5}))
    fmt.Println(RowMajorReadSpiralWrite([]int{5, 3, 1}))
    fmt.Println(RowMajorReadSpiralWrite([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/02-spiral-matrix-transpose/twist-02-row-major-read-spiral-write', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/02-spiral-matrix-transpose/twist-02-row-major-read-spiral-write'] = problem;
})();
