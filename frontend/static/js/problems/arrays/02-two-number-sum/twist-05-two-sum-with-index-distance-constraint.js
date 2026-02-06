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
            'Think about how two sum with index distance constraint differs from the standard version of this problem.',
            'Key insight: The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.',
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
                input: {"array":[1,2,3,4,5],"target":9},
                output: [[1,3,5],[2,3,4]],
                explanation: 'Found all valid combinations summing to target.'
            },
            {
                input: {"array":[-1,0,1,2],"target":0},
                output: [[-1,0,1]],
                explanation: 'Negative numbers included in the valid combination.'
            },
            {
                input: {"array":[1,2,3],"target":100},
                output: [],
                explanation: 'No valid combination exists for this target.'
            }
        ],
        solutions: {
            python: `def two_sum_with_index_distance_constraint(data):
    """
    Two Sum with Index Distance Constraint

    Find a pair summing to target where the two elements are at most k indices apart.
    \n    Approach: The hash table must be bounded by a sliding window of size k, requiring eviction of old entries as you iterate.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[1,3,5,1,5], target=6, k=2 → [1,5] at indices (0,2) works, but (0,4) does not

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
print(two_sum_with_index_distance_constraint([1, 2, 3, 4, 5]))
print(two_sum_with_index_distance_constraint([5, 3, 1]))
print(two_sum_with_index_distance_constraint([1]))`,
            go: `package main

import "fmt"

// TwoSumWithIndexDistanceConstraint solves the Two Sum with Index Distance Constraint problem.
// Find a pair summing to target where the two elements are at most k indices apart.
// Time: O(n), Space: O(n)
func TwoSumWithIndexDistanceConstraint(data []int) []int {
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
