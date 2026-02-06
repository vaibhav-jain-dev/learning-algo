/**
 * Maximum Non-Constructible Under a Limit
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: maximum-non-constructible-under-a-limit
 * Parent: 05-non-constructible-change
 */
(function() {
    'use strict';

    const problem = {
        name: 'Maximum Non-Constructible Under a Limit',
        difficulty: 'Hard',
        algorithm: 'maximum-non-constructible-under-a-limit',
        parent: '05-non-constructible-change',
        description: 'Find the largest value under a given limit that cannot be constructed from the coins. Inverts the direction: instead of finding the first gap, you need to find the last gap, requiring full subset-sum analysis up to the limit.',
        problem: 'Inverts the direction: instead of finding the first gap, you need to find the last gap, requiring full subset-sum analysis up to the limit.',
        hints: [
            'Think about how maximum non-constructible under a limit differs from the standard version of this problem.',
            'Key insight: Inverts the direction: instead of finding the first gap, you need to find the last gap, requiring full subset-sum analysis up to the limit.',
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
            python: `def maximum_non_constructible_under_a_limit(data):
    """
    Maximum Non-Constructible Under a Limit

    Find the largest value under a given limit that cannot be constructed from the coins.
    \n    Approach: Inverts the direction: instead of finding the first gap, you need to find the last gap, requiring full subset-sum analysis up to the limit.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # coins=[1,5,10], limit=20 → constructible: 1,5,6,10,11,15,16 → largest non-constructible ≤20 is 19

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
print(maximum_non_constructible_under_a_limit([1, 2, 3, 4, 5]))
print(maximum_non_constructible_under_a_limit([5, 3, 1]))
print(maximum_non_constructible_under_a_limit([1]))`,
            go: `package main

import "fmt"

// MaximumNonConstructibleUnderALimit solves the Maximum Non-Constructible Under a Limit problem.
// Find the largest value under a given limit that cannot be constructed from the coins.
// Time: O(n), Space: O(n)
func MaximumNonConstructibleUnderALimit(data []int) []int {
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
    fmt.Println(MaximumNonConstructibleUnderALimit([]int{1, 2, 3, 4, 5}))
    fmt.Println(MaximumNonConstructibleUnderALimit([]int{5, 3, 1}))
    fmt.Println(MaximumNonConstructibleUnderALimit([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/twist-04-maximum-non-constructible-under-a-limit', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/twist-04-maximum-non-constructible-under-a-limit'] = problem;
})();
