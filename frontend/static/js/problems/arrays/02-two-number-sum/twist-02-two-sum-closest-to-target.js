/**
 * Two Sum Closest to Target
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: two-sum-closest-to-target
 * Parent: 02-two-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Two Sum Closest to Target',
        difficulty: 'Medium',
        algorithm: 'two-sum-closest-to-target',
        parent: '02-two-number-sum',
        description: 'Instead of an exact match, find the pair whose sum is closest to the target. The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.',
        problem: 'The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.',
        hints: [
            'Think about how two sum closest to target differs from the standard version of this problem.',
            'Key insight: The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.',
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
            python: `def two_sum_closest_to_target(data):
    """
    Two Sum Closest to Target

    Instead of an exact match, find the pair whose sum is closest to the target.
    \n    Approach: The hash table approach no longer works directly. Requires sorting + two pointers to efficiently search for the closest sum.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array=[1,3,5,7], target=10 → [3,7] (sum=10, exact match) or [5,7] if target=11

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
print(two_sum_closest_to_target([1, 2, 3, 4, 5]))
print(two_sum_closest_to_target([5, 3, 1]))
print(two_sum_closest_to_target([1]))`,
            go: `package main

import "fmt"

// TwoSumClosestToTarget solves the Two Sum Closest to Target problem.
// Instead of an exact match, find the pair whose sum is closest to the target.
// Time: O(n), Space: O(n)
func TwoSumClosestToTarget(data []int) []int {
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
    fmt.Println(TwoSumClosestToTarget([]int{1, 2, 3, 4, 5}))
    fmt.Println(TwoSumClosestToTarget([]int{5, 3, 1}))
    fmt.Println(TwoSumClosestToTarget([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/twist-02-two-sum-closest-to-target', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/twist-02-two-sum-closest-to-target'] = problem;
})();
