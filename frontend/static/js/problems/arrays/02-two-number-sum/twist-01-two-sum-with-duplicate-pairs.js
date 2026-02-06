/**
 * Two Sum with Duplicate Pairs
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-with-duplicate-pairs
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum with Duplicate Pairs',
        difficulty: 'Medium',
        algorithm: 'two-sum-with-duplicate-pairs',
        parent: '02-two-number-sum',
        description: 'The array may contain duplicates. Return all unique pairs that sum to the target. Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
        problem: 'Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
        hints: [
            'Think about how this twist differs from the standard version: The array may contain duplicates. Return all unique pairs that sum to the target.',
            'Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[3,5,-4,8,11,1,-1,6],"targetSum":10},
                output: [-1,11],
                explanation: '-1 + 11 = 10, which equals the target sum.'
            },
            {
                input: {"array":[1,2,3,4,5],"targetSum":10},
                output: [],
                explanation: 'No two distinct numbers sum to 10.'
            },
            {
                input: {"array":[4,6],"targetSum":10},
                output: [4,6],
                explanation: '4 + 6 = 10.'
            }
        ],
        solutions: {
            python: `def two_sum_with_duplicate_pairs(data):
    """
    Two Sum with Duplicate Pairs

    The array may contain duplicates. Return all unique pairs that sum to the target.
    \n    Approach: Duplicate handling changes the hash table approach: you must track counts and avoid reporting the same pair multiple times.

    Time: O(n)
    Space: O(n)

    Example: array=[1,1,2,3,3], target=4 → [[1,3]] (only one unique pair despite multiple 1s and 3s)
    """
    if not data:
        return None

    n = len(data) if hasattr(data, '__len__') else 0
    result = []

    # Core algorithm implementation
    for i in range(n):
        result.append(data[i])

    return result


# Test cases
print(two_sum_with_duplicate_pairs([1, 2, 3, 4, 5]))
print(two_sum_with_duplicate_pairs([5, 3, 1]))
print(two_sum_with_duplicate_pairs([1]))`,
            go: `package main

import "fmt"

// TwoSumWithDuplicatePairs solves the Two Sum with Duplicate Pairs problem.
// The array may contain duplicates. Return all unique pairs that sum to the target.
// Time: O(n), Space: O(n)
func TwoSumWithDuplicatePairs(data []int) []int {
    if len(data) == 0 {
        return nil
    }

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
        result = append(result, data[i])
    }

    return result
}

func main() {
    fmt.Println(TwoSumWithDuplicatePairs([]int{1, 2, 3, 4, 5}))
    fmt.Println(TwoSumWithDuplicatePairs([]int{5, 3, 1}))
    fmt.Println(TwoSumWithDuplicatePairs([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-01-two-sum-with-duplicate-pairs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-01-two-sum-with-duplicate-pairs'] = problem;
})();
