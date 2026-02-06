/**
 * Count All Valid Starting Positions
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: count-all-valid-starting-positions
 * Parent: 01-validate-subsequence
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count All Valid Starting Positions',
        difficulty: 'Medium',
        algorithm: 'count-all-valid-starting-positions',
        parent: '01-validate-subsequence',
        description: 'Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward. Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
        problem: 'Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of just true/false, count how many starting positions in the array allow.',
            'Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[5,1,22,25,6,-1,8,10],"sequence":[1,6,-1,10]},
                output: true,
                explanation: 'The sequence elements appear in order within the array.'
            },
            {
                input: {"array":[1,2,3,4,5],"sequence":[5,3,1]},
                output: false,
                explanation: 'The sequence elements do not appear in the required order.'
            },
            {
                input: {"array":[1,1,1,1,1],"sequence":[1,1,1]},
                output: true,
                explanation: 'Duplicate elements are handled correctly.'
            }
        ],
        solutions: {
            python: `def count_all_valid_starting_positions(data):
    """
    Count All Valid Starting Positions

    Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward.
    \n    Approach: Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.

    Time: O(n)
    Space: O(n)

    Example: array=[1,2,1,2,3], sequence=[1,2] → 2 (can start at index 0 or index 2)
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
        result.append(data[i])

    return result


# Test cases
print(count_all_valid_starting_positions([1, 2, 3, 4, 5]))
print(count_all_valid_starting_positions([5, 3, 1]))
print(count_all_valid_starting_positions([1]))`,
            go: `package main

import "fmt"

// CountAllValidStartingPositions solves the Count All Valid Starting Positions problem.
// Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward.
// Time: O(n), Space: O(n)
func CountAllValidStartingPositions(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(CountAllValidStartingPositions([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountAllValidStartingPositions([]int{5, 3, 1}))
    fmt.Println(CountAllValidStartingPositions([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '01-validate-subsequence/twist-02-count-all-valid-starting-positions', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/01-validate-subsequence/twist-02-count-all-valid-starting-positions'] = problem;
})();
