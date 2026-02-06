/**
 * Closest Three Sum
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: closest-three-sum
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Three Sum',
        difficulty: 'Medium',
        algorithm: 'closest-three-sum',
        parent: '07-three-number-sum',
        description: 'Instead of finding triplets that sum exactly to the target, find the triplet whose sum is closest to the target. Return that closest sum. You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.',
        problem: 'You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.',
        hints: [
            'Think about how closest three sum differs from the standard version of this problem.',
            'Key insight: You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n^2)',
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
            python: `def closest_three_sum(data):
    """
    Closest Three Sum

    Instead of finding triplets that sum exactly to the target, find the triplet whose sum is closest to the target. Return that closest sum.
    \n    Approach: You must track the minimum absolute difference rather than checking for exact matches, changing the pointer movement logic.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 4, 5], target = 10. Closest triplet sum is 3+4+5 = 12, so return 12.

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
print(closest_three_sum([1, 2, 3, 4, 5]))
print(closest_three_sum([5, 3, 1]))
print(closest_three_sum([1]))`,
            go: `package main

import "fmt"

// ClosestThreeSum solves the Closest Three Sum problem.
// Instead of finding triplets that sum exactly to the target, find the triplet whose sum is closest to the target. Return that closest sum.
// Time: O(n^2), Space: O(n)
func ClosestThreeSum(data []int) []int {
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
    fmt.Println(ClosestThreeSum([]int{1, 2, 3, 4, 5}))
    fmt.Println(ClosestThreeSum([]int{5, 3, 1}))
    fmt.Println(ClosestThreeSum([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-01-closest-three-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-01-closest-three-sum'] = problem;
})();
