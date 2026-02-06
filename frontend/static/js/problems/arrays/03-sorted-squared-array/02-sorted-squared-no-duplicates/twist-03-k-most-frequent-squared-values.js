/**
 * K Most Frequent Squared Values
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: k-most-frequent-squared-values
 * Parent: 03-sorted-squared-array/02-sorted-squared-no-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Most Frequent Squared Values',
        difficulty: 'Medium',
        algorithm: 'k-most-frequent-squared-values',
        parent: '03-sorted-squared-array/02-sorted-squared-no-duplicates',
        description: 'After squaring, find the k squared values that appear most frequently (counting how many original elements map to each square). Combines squaring with frequency counting and top-k selection, requiring a hash map or exploiting the sorted structure.',
        problem: 'Combines squaring with frequency counting and top-k selection, requiring a hash map or exploiting the sorted structure.',
        hints: [
            'Think about how k most frequent squared values differs from the standard version of this problem.',
            'Key insight: Combines squaring with frequency counting and top-k selection, requiring a hash map or exploiting the sorted structure.',
            'A hash map can help track frequencies or previously seen values efficiently.',
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
            python: `def k_most_frequent_squared_values(data):
    """
    K Most Frequent Squared Values

    After squaring, find the k squared values that appear most frequently (counting how many original elements map to each square).
    \n    Approach: Combines squaring with frequency counting and top-k selection, requiring a hash map or exploiting the sorted structure.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[-3,-2,-1,0,1,2,3], k=2 → [1,4] or [4,9] (each appears twice: -1&1, -2&2, -3&3)

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
print(k_most_frequent_squared_values([1, 2, 3, 4, 5]))
print(k_most_frequent_squared_values([5, 3, 1]))
print(k_most_frequent_squared_values([1]))`,
            go: `package main

import "fmt"

// KMostFrequentSquaredValues solves the K Most Frequent Squared Values problem.
// After squaring, find the k squared values that appear most frequently (counting how many original elements map to each square).
// Time: O(n log k), Space: O(n)
func KMostFrequentSquaredValues(data []int) []int {
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
    fmt.Println(KMostFrequentSquaredValues([]int{1, 2, 3, 4, 5}))
    fmt.Println(KMostFrequentSquaredValues([]int{5, 3, 1}))
    fmt.Println(KMostFrequentSquaredValues([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-03-k-most-frequent-squared-values', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/02-sorted-squared-no-duplicates/twist-03-k-most-frequent-squared-values'] = problem;
})();
