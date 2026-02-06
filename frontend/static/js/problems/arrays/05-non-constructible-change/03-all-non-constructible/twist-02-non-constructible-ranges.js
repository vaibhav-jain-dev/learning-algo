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
            // Basic test case
            {
                input: {"coins":[1,2,5]},
                output: 4,
                explanation: ''
            },
            {
                input: {"coins":[1,1,1,1]},
                output: 5,
                explanation: ''
            },
            // Edge case
            {
                input: {"coins":[5,10]},
                output: 1,
                explanation: ''
            }
        ],
        solutions: {
            python: `def non_constructible_ranges(coins, limit):
    """
    Non-Constructible Ranges

    Return the non-constructible values as compressed ranges [start, end] instead of individual values. Requires identifying contiguous gaps in the constructible set and representing them compactly, adding a grouping/compression step.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in coins:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(non_constructible_ranges([1,2,5], None))  # Expected: 4
print(non_constructible_ranges([1,1,1,1], None))  # Expected: 5
print(non_constructible_ranges([5,10], None))  # Expected: 1
`,
            go: `package main

import "fmt"

// NonConstructibleRanges solves the Non-Constructible Ranges problem.
// Return the non-constructible values as compressed ranges [start, end] instead of individual values. Requires identifying contiguous gaps in the constructible set and representing them compactly, adding a grouping/compression step.
// Time: O(n), Space: O(n)
func NonConstructibleRanges(coins []int, limit int) string {
	result := ""

	for _, v := range coins {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(NonConstructibleRanges([]int{1, 2, 5}, nil)) // Expected: 4
	fmt.Println(NonConstructibleRanges([]int{1, 1, 1, 1}, nil)) // Expected: 5
	fmt.Println(NonConstructibleRanges([]int{5, 10}, nil)) // Expected: 1
}
`
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
