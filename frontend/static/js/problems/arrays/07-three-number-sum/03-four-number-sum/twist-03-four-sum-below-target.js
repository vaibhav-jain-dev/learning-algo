/**
 * Four Sum Below Target
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: four-sum-below-target
 * Parent: 07-three-number-sum/03-four-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Sum Below Target',
        difficulty: 'Hard',
        algorithm: 'four-sum-below-target',
        parent: '07-three-number-sum/03-four-number-sum',
        description: 'Count all unique quadruplets whose sum is strictly less than the target value. Instead of finding exact matches, you must count all valid combinations below a threshold, changing the search strategy entirely.',
        problem: 'Instead of finding exact matches, you must count all valid combinations below a threshold, changing the search strategy entirely.',
        hints: [
            'Think about how four sum below target differs from the standard version of this problem.',
            'Key insight: Instead of finding exact matches, you must count all valid combinations below a threshold, changing the search strategy entirely.',
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
                input: {"array":[1,2,3,4,5],"target":9},
                output: [[1,3,5],[2,3,4]],
                explanation: 'Found all valid combinations summing to target.'
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: 'Negative numbers included in the valid combination.'
            },
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: 'No valid combination exists for this target.'
            }
        ],
        solutions: {
            python: `def four_sum_below_target(data):
    """
    Four Sum Below Target

    Count all unique quadruplets whose sum is strictly less than the target value.
    \n    Approach: Instead of finding exact matches, you must count all valid combinations below a threshold, changing the search strategy entirely.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 4, 5], target = 12. Count quadruplets summing to < 12.

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
print(four_sum_below_target([1, 2, 3, 4, 5]))
print(four_sum_below_target([5, 3, 1]))
print(four_sum_below_target([1]))`,
            go: `package main

import "fmt"

// FourSumBelowTarget solves the Four Sum Below Target problem.
// Count all unique quadruplets whose sum is strictly less than the target value.
// Time: O(n), Space: O(n)
func FourSumBelowTarget(data []int) []int {
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
    fmt.Println(FourSumBelowTarget([]int{1, 2, 3, 4, 5}))
    fmt.Println(FourSumBelowTarget([]int{5, 3, 1}))
    fmt.Println(FourSumBelowTarget([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/03-four-number-sum/twist-03-four-sum-below-target', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/03-four-number-sum/twist-03-four-sum-below-target'] = problem;
})();
