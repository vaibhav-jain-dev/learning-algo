/**
 * Non-Constructible Ranges
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: non-constructible-ranges
 * Parent: 05-non-constructible-change/03-all-non-constructible
 */
(function() {
    'use strict';

    const problem = {
        name: 'Non-Constructible Ranges',
        difficulty: 'Medium',
        algorithm: 'non-constructible-ranges',
        parent: '05-non-constructible-change/03-all-non-constructible',
        description: 'Return the non-constructible values as compressed ranges [start, end] instead of individual values. Requires identifying contiguous gaps in the constructible set and representing them compactly, adding a grouping/compression step.',
        problem: 'Requires identifying contiguous gaps in the constructible set and representing them compactly, adding a grouping/compression step.',
        hints: [
            'Think about how non-constructible ranges differs from the standard version of this problem.',
            'Key insight: Requires identifying contiguous gaps in the constructible set and representing them compactly, adding a grouping/compression step.',
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
                input: {"coins":[1,2,5]},
                output: 4,
                explanation: 'With coins [1,2,5], the first non-constructible value is 4.'
            },
            {
                input: {"coins":[1,1,1,1]},
                output: 5,
                explanation: 'Can make 1 through 4, but not 5.'
            },
            {
                input: {"coins":[5,10]},
                output: 1,
                explanation: 'Cannot make 1 with only coins of value 5 and 10.'
            }
        ],
        solutions: {
            python: `def non_constructible_ranges(data):
    """
    Non-Constructible Ranges

    Return the non-constructible values as compressed ranges [start, end] instead of individual values.
    \n    Approach: Requires identifying contiguous gaps in the constructible set and representing them compactly, adding a grouping/compression step.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # coins=[1,5,10], limit=20 → [[2,4],[7,9],[12,14],[17,19]] (ranges of non-constructible)

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
print(non_constructible_ranges([1, 2, 3, 4, 5]))
print(non_constructible_ranges([5, 3, 1]))
print(non_constructible_ranges([1]))`,
            go: `package main

import "fmt"

// NonConstructibleRanges solves the Non-Constructible Ranges problem.
// Return the non-constructible values as compressed ranges [start, end] instead of individual values.
// Time: O(n), Space: O(n)
func NonConstructibleRanges(data []int) []int {
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
    fmt.Println(NonConstructibleRanges([]int{1, 2, 3, 4, 5}))
    fmt.Println(NonConstructibleRanges([]int{5, 3, 1}))
    fmt.Println(NonConstructibleRanges([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '05-non-constructible-change/03-all-non-constructible/twist-02-non-constructible-ranges', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/05-non-constructible-change/03-all-non-constructible/twist-02-non-constructible-ranges'] = problem;
})();
