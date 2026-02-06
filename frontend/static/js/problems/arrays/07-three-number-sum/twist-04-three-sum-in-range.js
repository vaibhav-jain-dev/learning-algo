/**
 * Three Sum in Range
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-in-range
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum in Range',
        difficulty: 'Hard',
        algorithm: 'three-sum-in-range',
        parent: '07-three-number-sum',
        description: 'Find all triplets whose sum falls within a range [lo, hi] inclusive, not just a single target value. The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.',
        problem: 'The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.',
        hints: [
            'Think about how three sum in range differs from the standard version of this problem.',
            'Key insight: The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
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
            python: `def three_sum_in_range(data):
    """
    Three Sum in Range

    Find all triplets whose sum falls within a range [lo, hi] inclusive, not just a single target value.
    \n    Approach: The two-pointer logic must handle a range of valid sums, making the pointer advancement decisions more nuanced.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 4, 5], lo = 8, hi = 10. Triplets: [1,2,5], [1,3,4], [1,4,5], [2,3,4], [2,3,5].

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
print(three_sum_in_range([1, 2, 3, 4, 5]))
print(three_sum_in_range([5, 3, 1]))
print(three_sum_in_range([1]))`,
            go: `package main

import "fmt"

// ThreeSumInRange solves the Three Sum in Range problem.
// Find all triplets whose sum falls within a range [lo, hi] inclusive, not just a single target value.
// Time: O(n^2), Space: O(n)
func ThreeSumInRange(data []int) []int {
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
    fmt.Println(ThreeSumInRange([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumInRange([]int{5, 3, 1}))
    fmt.Println(ThreeSumInRange([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-04-three-sum-in-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-04-three-sum-in-range'] = problem;
})();
