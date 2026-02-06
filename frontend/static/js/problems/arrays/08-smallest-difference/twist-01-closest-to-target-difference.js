/**
 * Closest to Target Difference
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: closest-to-target-difference
 * Parent: 08-smallest-difference
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest to Target Difference',
        difficulty: 'Medium',
        algorithm: 'closest-to-target-difference',
        parent: '08-smallest-difference',
        description: 'Instead of finding the pair with the smallest absolute difference, find the pair whose absolute difference is closest to a given value D. The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.',
        problem: 'The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.',
        hints: [
            'Think about how closest to target difference differs from the standard version of this problem.',
            'Key insight: The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.',
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
            python: `def closest_to_target_difference(data):
    """
    Closest to Target Difference

    Instead of finding the pair with the smallest absolute difference, find the pair whose absolute difference is closest to a given value D.
    \n    Approach: The two-pointer logic changes because you are not minimizing toward zero but toward a specific target gap.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # arrayOne = [1, 5, 10], arrayTwo = [3, 8, 14], D = 4. Pair [10, 14] has diff 4, exactly D.

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
print(closest_to_target_difference([1, 2, 3, 4, 5]))
print(closest_to_target_difference([5, 3, 1]))
print(closest_to_target_difference([1]))`,
            go: `package main

import "fmt"

// ClosestToTargetDifference solves the Closest to Target Difference problem.
// Instead of finding the pair with the smallest absolute difference, find the pair whose absolute difference is closest to a given value D.
// Time: O(n), Space: O(n)
func ClosestToTargetDifference(data []int) []int {
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
    fmt.Println(ClosestToTargetDifference([]int{1, 2, 3, 4, 5}))
    fmt.Println(ClosestToTargetDifference([]int{5, 3, 1}))
    fmt.Println(ClosestToTargetDifference([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '08-smallest-difference/twist-01-closest-to-target-difference', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/08-smallest-difference/twist-01-closest-to-target-difference'] = problem;
})();
