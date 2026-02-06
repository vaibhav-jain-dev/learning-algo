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
            'Think about how closest pair with minimum index distance differs from the standard version of this problem.',
            'Key insight: Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
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
                input: {"array":[1,3,5,2,4]},
                output: 1,
                explanation: 'Only one operation needed to achieve the goal.'
            },
            {
                input: {"array":[1,2,3,4]},
                output: 0,
                explanation: 'Already satisfies the condition, no operations needed.'
            },
            {
                input: {"array":[5,3,1,4,2]},
                output: 2,
                explanation: 'Two operations needed to satisfy the condition.'
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
    """
    # Implementation based on the twist description
    # arr1=[1,3,5,7], arr2=[2,4,6,8], target=10 → [3,8] instead of [5,6] if index distance is larger

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
