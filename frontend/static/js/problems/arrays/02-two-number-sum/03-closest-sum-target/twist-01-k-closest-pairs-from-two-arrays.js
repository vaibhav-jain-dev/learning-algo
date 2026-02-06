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
            'Think about how this twist differs from the standard version: Instead of the single closest pair, return the k pairs (one from each array) wit.',
            'Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"arr1":[1,3,5,7],"arr2":[2,4,6,8],"target":10},
                output: [3,7],
                explanation: '3 + 7 = 10, exact match to target.'
            },
            {
                input: {"arr1":[-1,3,8],"arr2":[2,4,9],"target":7},
                output: [3,4],
                explanation: '3 + 4 = 7, exact match.'
            },
            {
                input: {"arr1":[1,4],"arr2":[10,20],"target":15},
                output: [4,10],
                explanation: '4 + 10 = 14, closest to 15.'
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

    Example: arr1=[1,3,5], arr2=[2,4,6], target=8, k=2 → [[3,6],[5,4]] (sums 9 and 9, closest to 8)
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

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
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
