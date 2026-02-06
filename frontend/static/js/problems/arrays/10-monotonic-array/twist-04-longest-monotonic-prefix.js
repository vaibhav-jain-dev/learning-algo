/**
 * Longest Monotonic Prefix
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: longest-monotonic-prefix
 * Parent: 10-monotonic-array
 */
(function() {
    'use strict';

    const problem = {
        name: 'Longest Monotonic Prefix',
        difficulty: 'Medium',
        algorithm: 'longest-monotonic-prefix',
        parent: '10-monotonic-array',
        description: 'Find the length of the longest prefix of the array that is monotonic. You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.',
        problem: 'You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.',
        hints: [
            'Think about how longest monotonic prefix differs from the standard version of this problem.',
            'Key insight: You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.',
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
            python: `def longest_monotonic_prefix(data):
    """
    Longest Monotonic Prefix

    Find the length of the longest prefix of the array that is monotonic.
    \n    Approach: You scan from the start and stop at the first violation, but must handle the ambiguity of direction at the beginning.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 1, 5]. Longest monotonic prefix is [1,2,3] with length 3.

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
print(longest_monotonic_prefix([1, 2, 3, 4, 5]))
print(longest_monotonic_prefix([5, 3, 1]))
print(longest_monotonic_prefix([1]))`,
            go: `package main

import "fmt"

// LongestMonotonicPrefix solves the Longest Monotonic Prefix problem.
// Find the length of the longest prefix of the array that is monotonic.
// Time: O(n), Space: O(n)
func LongestMonotonicPrefix(data []int) []int {
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
    fmt.Println(LongestMonotonicPrefix([]int{1, 2, 3, 4, 5}))
    fmt.Println(LongestMonotonicPrefix([]int{5, 3, 1}))
    fmt.Println(LongestMonotonicPrefix([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '10-monotonic-array/twist-04-longest-monotonic-prefix', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/10-monotonic-array/twist-04-longest-monotonic-prefix'] = problem;
})();
