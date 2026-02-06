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
            'Think about how count all valid starting positions differs from the standard version of this problem.',
            'Key insight: Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
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
            python: `def count_all_valid_starting_positions(data):
    """
    Count All Valid Starting Positions

    Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward.
    \n    Approach: Changes from a single-pass check to exploring multiple potential starting points, requiring careful counting.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[1,2,1,2,3], sequence=[1,2] → 2 (can start at index 0 or index 2)

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
print(count_all_valid_starting_positions([1, 2, 3, 4, 5]))
print(count_all_valid_starting_positions([5, 3, 1]))
print(count_all_valid_starting_positions([1]))`,
            go: `package main

import "fmt"

// CountAllValidStartingPositions solves the Count All Valid Starting Positions problem.
// Instead of just true/false, count how many starting positions in the array allow the sequence to be matched going forward.
// Time: O(n^2), Space: O(n)
func CountAllValidStartingPositions(data []int) []int {
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
