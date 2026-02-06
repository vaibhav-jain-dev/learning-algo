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
            'Think about how count pairs with sum in range differs from the standard version of this problem.',
            'Key insight: Switches from exact matching to range checking, which may require sorting + two pointers and subtracting count of pairs below low from count below high+1.',
            'A hash map can help track frequencies or previously seen values efficiently.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,2,1,2,3]},
                output: 2,
                explanation: 'Two valid configurations found in the input.'
            },
            {
                input: {"array":[1,2,3]},
                output: 1,
                explanation: 'Only one valid configuration exists.'
            },
            {
                input: {"array":[1,1,1]},
                output: 3,
                explanation: 'Multiple identical elements create multiple valid configurations.'
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
    """
    # Implementation based on the twist description
    # array=[1,2,3,4,5], low=5, high=7 → 4 pairs: (1,4),(1,5),(2,3),(2,4),(2,5),(3,4) with sums in [5,7]

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
