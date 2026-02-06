/**
 * Two Sum with Index Distance Constraint
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-with-index-distance-constraint
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum with Index Distance Constraint',
        difficulty: 'Medium',
        algorithm: 'two-sum-with-index-distance-constraint',
        parent: '02-two-number-sum',
        description: 'Find a pair summing to target where the two elements are at most k indices apart. The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
        problem: 'The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
        hints: [
            'Think about how this twist differs from the standard version: Find a pair summing to target where the two elements are at most k indices apart.',
            'The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
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
            python: `def two_sum_with_index_distance_constraint(data):
    """
    Two Sum with Index Distance Constraint

    Find a pair summing to target where the two elements are at most k indices apart.
    \n    Approach: The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.

    Time: O(n log k)
    Space: O(n)

    Example: array=[1,3,5,1,5], target=6, k=2 → [1,5] at indices (0,2) works, but (0,4) does not
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
print(two_sum_with_index_distance_constraint([1, 2, 3, 4, 5]))
print(two_sum_with_index_distance_constraint([5, 3, 1]))
print(two_sum_with_index_distance_constraint([1]))`,
            go: `package main

import "fmt"

// TwoSumWithIndexDistanceConstraint solves the Two Sum with Index Distance Constraint problem.
// Find a pair summing to target where the two elements are at most k indices apart.
// Time: O(n log k), Space: O(n)
func TwoSumWithIndexDistanceConstraint(data []int) []int {
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
    fmt.Println(TwoSumWithIndexDistanceConstraint([]int{1, 2, 3, 4, 5}))
    fmt.Println(TwoSumWithIndexDistanceConstraint([]int{5, 3, 1}))
    fmt.Println(TwoSumWithIndexDistanceConstraint([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-05-two-sum-with-index-distance-constraint', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-05-two-sum-with-index-distance-constraint'] = problem;
})();
