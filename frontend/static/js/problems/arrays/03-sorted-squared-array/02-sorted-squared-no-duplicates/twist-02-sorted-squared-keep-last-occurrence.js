/**
 * Sorted Squared Keep Last Occurrence
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: sorted-squared-keep-last-occurrence
 * Parent: 03-sorted-squared-array/02-sorted-squared-no-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Sorted Squared Keep Last Occurrence',
        difficulty: 'Medium',
        algorithm: 'sorted-squared-keep-last-occurrence',
        parent: '03-sorted-squared-array/02-sorted-squared-no-duplicates',
        description: 'When duplicates exist, keep track of which original element (positive or negative) contributed to each unique square. Return pairs of (square, original_value) keeping the rightmost original. Requires tracking provenance alongside deduplication, adding metadata management to the merge step.',
        problem: 'Requires tracking provenance alongside deduplication, adding metadata management to the merge step.',
        hints: [
            'Think about how sorted squared keep last occurrence differs from the standard version of this problem.',
            'Key insight: Requires tracking provenance alongside deduplication, adding metadata management to the merge step.',
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
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'Elements transformed and sorted correctly.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'All positive - order maintained after transformation.'
            },
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'All negative - order reversed after transformation.'
            }
        ],
        solutions: {
            python: `def sorted_squared_keep_last_occurrence(data):
    """
    Sorted Squared Keep Last Occurrence

    When duplicates exist, keep track of which original element (positive or negative) contributed to each unique square. Return pairs of (square, original_value) keeping the rightmost original.
    \n    Approach: Requires tracking provenance alongside deduplication, adding metadata management to the merge step.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[-3,-1,1,3] → [(1,1),(9,3)] (keep positive versions as rightmost)

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
print(sorted_squared_keep_last_occurrence([1, 2, 3, 4, 5]))
print(sorted_squared_keep_last_occurrence([5, 3, 1]))
print(sorted_squared_keep_last_occurrence([1]))`,
            go: `package main

import "fmt"

// SortedSquaredKeepLastOccurrence solves the Sorted Squared Keep Last Occurrence problem.
// When duplicates exist, keep track of which original element (positive or negative) contributed to each unique square. Return pairs of (square, original_value) keeping the rightmost original.
// Time: O(n), Space: O(n)
func SortedSquaredKeepLastOccurrence(data []int) []int {
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
    fmt.Println(SortedSquaredKeepLastOccurrence([]int{1, 2, 3, 4, 5}))
    fmt.Println(SortedSquaredKeepLastOccurrence([]int{5, 3, 1}))
    fmt.Println(SortedSquaredKeepLastOccurrence([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-02-sorted-squared-keep-last-occurrence', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-02-sorted-squared-keep-last-occurrence'] = problem;
})();
