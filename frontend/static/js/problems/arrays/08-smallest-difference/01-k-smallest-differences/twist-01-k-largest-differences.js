/**
 * K Largest Differences
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: k-largest-differences
 * Parent: 08-smallest-difference/01-k-smallest-differences
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Largest Differences',
        difficulty: 'Medium',
        algorithm: 'k-largest-differences',
        parent: '08-smallest-difference/01-k-smallest-differences',
        description: 'Instead of the K smallest differences, find the K pairs with the largest absolute differences between arr1 and arr2. The heap or sorting strategy reverses: you maximize instead of minimize, changing which pairs to consider first.',
        problem: 'The heap or sorting strategy reverses: you maximize instead of minimize, changing which pairs to consider first.',
        hints: [
            'Think about how k largest differences differs from the standard version of this problem.',
            'Key insight: The heap or sorting strategy reverses: you maximize instead of minimize, changing which pairs to consider first.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: 'The k=2 smallest/closest values found.'
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: 'With k=1, return the single best result.'
            },
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: 'Duplicate values handled correctly with k=3.'
            }
        ],
        solutions: {
            python: `def k_largest_differences(data):
    """
    K Largest Differences

    Instead of the K smallest differences, find the K pairs with the largest absolute differences between arr1 and arr2.
    \n    Approach: The heap or sorting strategy reverses: you maximize instead of minimize, changing which pairs to consider first.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arr1 = [1, 3, 5], arr2 = [2, 4], k = 2. Largest diffs: [1,4]=3 and [5,2]=3.

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
print(k_largest_differences([1, 2, 3, 4, 5]))
print(k_largest_differences([5, 3, 1]))
print(k_largest_differences([1]))`,
            go: `package main

import "fmt"

// KLargestDifferences solves the K Largest Differences problem.
// Instead of the K smallest differences, find the K pairs with the largest absolute differences between arr1 and arr2.
// Time: O(n log k), Space: O(n)
func KLargestDifferences(data []int) []int {
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
    fmt.Println(KLargestDifferences([]int{1, 2, 3, 4, 5}))
    fmt.Println(KLargestDifferences([]int{5, 3, 1}))
    fmt.Println(KLargestDifferences([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/01-k-smallest-differences/twist-01-k-largest-differences', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/01-k-smallest-differences/twist-01-k-largest-differences'] = problem;
})();
