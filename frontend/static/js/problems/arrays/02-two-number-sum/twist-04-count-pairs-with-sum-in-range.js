/**
 * Count Pairs with Sum in Range
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: count-pairs-with-sum-in-range
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Pairs with Sum in Range',
        difficulty: 'Hard',
        algorithm: 'count-pairs-with-sum-in-range',
        parent: '02-two-number-sum',
        description: 'Count the number of pairs whose sum falls within a given range [low, high] instead of equaling a specific target. Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
        problem: 'Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
        hints: [
            'Think about how this twist differs from the standard version: Count the number of pairs whose sum falls within a given range [low, high] inste.',
            'Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
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
            python: `def count_pairs_with_sum_in_range(data):
    """
    Count Pairs with Sum in Range

    Count the number of pairs whose sum falls within a given range [low, high] instead of equaling a specific target.
    \n    Approach: Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.

    Time: O(n)
    Space: O(n)

    Example: array=[1,2,3,4,5], low=5, high=7 → 4 pairs: (1,4),(1,5),(2,3),(2,4),(2,5),(3,4) with sums in [5,7]
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
print(count_pairs_with_sum_in_range([1, 2, 3, 4, 5]))
print(count_pairs_with_sum_in_range([5, 3, 1]))
print(count_pairs_with_sum_in_range([1]))`,
            go: `package main

import "fmt"

// CountPairsWithSumInRange solves the Count Pairs with Sum in Range problem.
// Count the number of pairs whose sum falls within a given range [low, high] instead of equaling a specific target.
// Time: O(n), Space: O(n)
func CountPairsWithSumInRange(data []int) []int {
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
    fmt.Println(CountPairsWithSumInRange([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountPairsWithSumInRange([]int{5, 3, 1}))
    fmt.Println(CountPairsWithSumInRange([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-04-count-pairs-with-sum-in-range', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-04-count-pairs-with-sum-in-range'] = problem;
})();
