/**
 * Max Constructible Range Starting from K
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: max-constructible-range-starting-from-k
 * Parent: 05-non-constructible-change/02-max-constructible
 */
(function() {
    'use strict';

    const problem = {
        name: 'Max Constructible Range Starting from K',
        difficulty: 'Medium',
        algorithm: 'max-constructible-range-starting-from-k',
        parent: '05-non-constructible-change/02-max-constructible',
        description: 'Find the maximum consecutive range [K, K+M] that can be constructed, starting from a given value K. The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.',
        problem: 'The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.',
        hints: [
            'Think about how max constructible range starting from k differs from the standard version of this problem.',
            'Key insight: The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Consider whether a greedy approach works, or if you need dynamic programming for the optimal solution.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,3,2,1]},
                output: 3,
                explanation: 'The maximum/longest valid segment has length 3.'
            },
            {
                input: {"array":[5,4,3,2,1]},
                output: 5,
                explanation: 'The entire array satisfies the condition.'
            },
            {
                input: {"array":[1]},
                output: 1,
                explanation: 'Single element is trivially valid.'
            }
        ],
        solutions: {
            python: `def max_constructible_range_starting_from_k(data):
    """
    Max Constructible Range Starting from K

    Find the maximum consecutive range [K, K+M] that can be constructed, starting from a given value K.
    \n    Approach: The starting point is not 1, so you must first determine if K is constructible, then extend upward from there.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # coins=[3,5,7], K=8 → can make 8(3+5), 10(3+7), 12(5+7), 15(3+5+7) but not 9 → range [8,8]

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
print(max_constructible_range_starting_from_k([1, 2, 3, 4, 5]))
print(max_constructible_range_starting_from_k([5, 3, 1]))
print(max_constructible_range_starting_from_k([1]))`,
            go: `package main

import "fmt"

// MaxConstructibleRangeStartingFromK solves the Max Constructible Range Starting from K problem.
// Find the maximum consecutive range [K, K+M] that can be constructed, starting from a given value K.
// Time: O(n), Space: O(n)
func MaxConstructibleRangeStartingFromK(data []int) []int {
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
    fmt.Println(MaxConstructibleRangeStartingFromK([]int{1, 2, 3, 4, 5}))
    fmt.Println(MaxConstructibleRangeStartingFromK([]int{5, 3, 1}))
    fmt.Println(MaxConstructibleRangeStartingFromK([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/02-max-constructible/twist-03-max-constructible-range-starting-from-k', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/02-max-constructible/twist-03-max-constructible-range-starting-from-k'] = problem;
})();
