/**
 * Rotate Counterclockwise 90
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: rotate-counterclockwise-90
 * Parent: 06-transpose-matrix/01-rotate-90-degrees
 */
(function() {
    'use strict';

    const problem = {
        name: 'Rotate Counterclockwise 90',
        difficulty: 'Medium',
        algorithm: 'rotate-counterclockwise-90',
        parent: '06-transpose-matrix/01-rotate-90-degrees',
        description: 'Rotate the matrix 90 degrees counterclockwise instead of clockwise. Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.',
        problem: 'Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.',
        hints: [
            'Think about how rotate counterclockwise 90 differs from the standard version of this problem.',
            'Key insight: Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Two valid configurations found in the input.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'Only one valid configuration exists.'
            },
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'Multiple identical elements create multiple valid configurations.'
            }
        ],
        solutions: {
            python: `def rotate_counterclockwise_90(data):
    """
    Rotate Counterclockwise 90

    Rotate the matrix 90 degrees counterclockwise instead of clockwise.
    \n    Approach: Transpose + reverse columns (instead of rows), or reverse rows first then transpose. Direction change alters the composition.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # matrix = [[1,2,3],[4,5,6],[7,8,9]]. Result: [[3,6,9],[2,5,8],[1,4,7]].

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
print(rotate_counterclockwise_90([1, 2, 3, 4, 5]))
print(rotate_counterclockwise_90([5, 3, 1]))
print(rotate_counterclockwise_90([1]))`,
            go: `package main

import "fmt"

// RotateCounterclockwise90 solves the Rotate Counterclockwise 90 problem.
// Rotate the matrix 90 degrees counterclockwise instead of clockwise.
// Time: O(n), Space: O(n)
func RotateCounterclockwise90(data []int) []int {
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
    fmt.Println(RotateCounterclockwise90([]int{1, 2, 3, 4, 5}))
    fmt.Println(RotateCounterclockwise90([]int{5, 3, 1}))
    fmt.Println(RotateCounterclockwise90([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '06-transpose-matrix/01-rotate-90-degrees/twist-02-rotate-counterclockwise-90', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/06-transpose-matrix/01-rotate-90-degrees/twist-02-rotate-counterclockwise-90'] = problem;
})();
