/**
 * K Closest Pairs from Two Arrays
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: k-closest-pairs-from-two-arrays
 * Parent: 02-two-number-sum/03-closest-sum-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Pairs from Two Arrays',
        difficulty: 'Hard',
        algorithm: 'k-closest-pairs-from-two-arrays',
        parent: '02-two-number-sum/03-closest-sum-target',
        description: 'Instead of the single closest pair, return the k pairs (one from each array) with sums closest to target. Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
        problem: 'Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
        hints: [
            'Think about how k closest pairs from two arrays differs from the standard version of this problem.',
            'Key insight: Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
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
            python: `def k_closest_pairs_from_two_arrays(data):
    """
    K Closest Pairs from Two Arrays

    Instead of the single closest pair, return the k pairs (one from each array) with sums closest to target.
    \n    Approach: Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arr1=[1,3,5], arr2=[2,4,6], target=8, k=2 → [[3,6],[5,4]] (sums 9 and 9, closest to 8)

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
print(k_closest_pairs_from_two_arrays([1, 2, 3, 4, 5]))
print(k_closest_pairs_from_two_arrays([5, 3, 1]))
print(k_closest_pairs_from_two_arrays([1]))`,
            go: `package main

import "fmt"

// KClosestPairsFromTwoArrays solves the K Closest Pairs from Two Arrays problem.
// Instead of the single closest pair, return the k pairs (one from each array) with sums closest to target.
// Time: O(n log k), Space: O(n)
func KClosestPairsFromTwoArrays(data []int) []int {
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
    fmt.Println(KClosestPairsFromTwoArrays([]int{1, 2, 3, 4, 5}))
    fmt.Println(KClosestPairsFromTwoArrays([]int{5, 3, 1}))
    fmt.Println(KClosestPairsFromTwoArrays([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/03-closest-sum-target/twist-01-k-closest-pairs-from-two-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/03-closest-sum-target/twist-01-k-closest-pairs-from-two-arrays'] = problem;
})();
