/**
 * Spiral with Skip
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: spiral-matrix
 * Parent: 11-spiral-traverse
 */
(function() {
    'use strict';

    const problem = {
        name: 'Spiral with Skip',
        difficulty: 'Medium',
        algorithm: 'spiral-matrix',
        parent: '11-spiral-traverse',
        description: 'Given an n x m two-dimensional array and an integer K, traverse the matrix in spiral order but skip every K-th element. Return only the non-skipped elements. The counter starts at 1 for the first element in spiral order.',
        problem: 'Perform standard spiral traversal but maintain a counter. When the counter is a multiple of K, skip that element instead of adding it to the result. This adds state tracking to the traversal.',
        hints: [
            'Use the standard spiral traversal algorithm with boundary tracking.',
            'Keep a counter that increments for every element encountered in spiral order.',
            'When counter % K == 0, skip the element (do not add to result).',
            'The skipping does not affect the traversal path, only what gets collected.'
        ],
        complexity: { time: 'O(m*n)', space: 'O(m*n)' },
        examples: [
            {
                input: { matrix: [[1,2,3],[4,5,6]], k: 2 },
                output: [1, 3, 5],
                explanation: 'Spiral order: [1,2,3,6,5,4]. Skip every 2nd: keep 1, skip 2, keep 3, skip 6, keep 5, skip 4.'
            },
            {
                input: { matrix: [[1,2,3],[4,5,6],[7,8,9]], k: 3 },
                output: [1, 2, 4, 5, 8, 9],
                explanation: 'Spiral: [1,2,3,6,9,8,7,4,5]. Every 3rd skipped: keep 1,2, skip 3, keep 6,9, skip 8, keep 7,4, skip 5. Result: [1,2,6,9,7,4].'
            },
            {
                input: { matrix: [[1,2],[3,4]], k: 1 },
                output: [],
                explanation: 'K=1 means skip every element. Result is empty.'
            }
        ],
        solutions: {
            python: `def spiral_with_skip(matrix, k):
    """
    Traverse matrix in spiral order, skipping every K-th element.
    Time: O(m*n), Space: O(m*n)
    """
    if not matrix or not matrix[0] or k < 1:
        return []

    result = []
    rows, cols = len(matrix), len(matrix[0])
    top, bottom = 0, rows - 1
    left, right = 0, cols - 1
    counter = 0

    while top <= bottom and left <= right:
        # Right
        for col in range(left, right + 1):
            counter += 1
            if counter % k != 0:
                result.append(matrix[top][col])
        top += 1

        # Down
        for row in range(top, bottom + 1):
            counter += 1
            if counter % k != 0:
                result.append(matrix[row][right])
        right -= 1

        # Left
        if top <= bottom:
            for col in range(right, left - 1, -1):
                counter += 1
                if counter % k != 0:
                    result.append(matrix[bottom][col])
            bottom -= 1

        # Up
        if left <= right:
            for row in range(bottom, top - 1, -1):
                counter += 1
                if counter % k != 0:
                    result.append(matrix[row][left])
            left += 1

    return result


# Tests
if __name__ == "__main__":
    print(spiral_with_skip([[1,2,3],[4,5,6]], 2))
    # [1, 3, 5]
    print(spiral_with_skip([[1,2,3],[4,5,6],[7,8,9]], 3))
    # [1, 2, 6, 9, 7, 4]
    print(spiral_with_skip([[1,2],[3,4]], 1))
    # []`,
            go: `package main

import "fmt"

func spiralWithSkip(matrix [][]int, k int) []int {
    if len(matrix) == 0 || len(matrix[0]) == 0 || k < 1 {
        return []int{}
    }

    result := []int{}
    top, bottom := 0, len(matrix)-1
    left, right := 0, len(matrix[0])-1
    counter := 0

    for top <= bottom && left <= right {
        for col := left; col <= right; col++ {
            counter++
            if counter%k != 0 {
                result = append(result, matrix[top][col])
            }
        }
        top++

        for row := top; row <= bottom; row++ {
            counter++
            if counter%k != 0 {
                result = append(result, matrix[row][right])
            }
        }
        right--

        if top <= bottom {
            for col := right; col >= left; col-- {
                counter++
                if counter%k != 0 {
                    result = append(result, matrix[bottom][col])
                }
            }
            bottom--
        }

        if left <= right {
            for row := bottom; row >= top; row-- {
                counter++
                if counter%k != 0 {
                    result = append(result, matrix[row][left])
                }
            }
            left++
        }
    }

    return result
}

func main() {
    fmt.Println(spiralWithSkip([][]int{{1,2,3},{4,5,6}}, 2))
    // [1 3 5]
    fmt.Println(spiralWithSkip([][]int{{1,2,3},{4,5,6},{7,8,9}}, 3))
    // [1 2 6 9 7 4]
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '11-spiral-traverse/twist-05-spiral-with-skip', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['arrays/11-spiral-traverse/twist-05-spiral-with-skip'] = problem;
})();
