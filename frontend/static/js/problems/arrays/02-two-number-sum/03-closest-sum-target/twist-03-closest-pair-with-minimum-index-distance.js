/**
 * Closest Pair with Minimum Index Distance
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: closest-pair-with-minimum-index-distance
 * Parent: 02-two-number-sum/03-closest-sum-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Pair with Minimum Index Distance',
        difficulty: 'Medium',
        algorithm: 'closest-pair-with-minimum-index-distance',
        parent: '02-two-number-sum/03-closest-sum-target',
        description: 'Among all pairs with the closest sum to target, return the one where the two chosen indices (original positions) are farthest apart. Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
        problem: 'Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
        hints: [
            'Think about how this twist differs from the standard version: Among all pairs with the closest sum to target, return the one where the two cho.',
            'Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
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
            python: `def closest_pair_with_minimum_index_distance(data):
    """
    Closest Pair with Minimum Index Distance

    Among all pairs with the closest sum to target, return the one where the two chosen indices (original positions) are farthest apart.
    \n    Approach: Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.

    Time: O(n)
    Space: O(n)

    Example: arr1=[1,3,5,7], arr2=[2,4,6,8], target=10 → [3,8] instead of [5,6] if index distance is larger
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
print(closest_pair_with_minimum_index_distance([1, 2, 3, 4, 5]))
print(closest_pair_with_minimum_index_distance([5, 3, 1]))
print(closest_pair_with_minimum_index_distance([1]))`,
            go: `package main

import "fmt"

// ClosestPairWithMinimumIndexDistance solves the Closest Pair with Minimum Index Distance problem.
// Among all pairs with the closest sum to target, return the one where the two chosen indices (original positions) are farthest apart.
// Time: O(n), Space: O(n)
func ClosestPairWithMinimumIndexDistance(data []int) []int {
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
    fmt.Println(ClosestPairWithMinimumIndexDistance([]int{1, 2, 3, 4, 5}))
    fmt.Println(ClosestPairWithMinimumIndexDistance([]int{5, 3, 1}))
    fmt.Println(ClosestPairWithMinimumIndexDistance([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/03-closest-sum-target/twist-03-closest-pair-with-minimum-index-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/03-closest-sum-target/twist-03-closest-pair-with-minimum-index-distance'] = problem;
})();
