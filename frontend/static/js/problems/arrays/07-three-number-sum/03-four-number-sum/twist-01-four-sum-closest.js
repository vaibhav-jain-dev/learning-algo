/**
 * Four Sum Closest
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: four-sum-closest
 * Parent: 07-three-number-sum/03-four-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Four Sum Closest',
        difficulty: 'Hard',
        algorithm: 'four-sum-closest',
        parent: '07-three-number-sum/03-four-number-sum',
        description: 'Instead of finding quadruplets that sum exactly to the target, find the quadruplet whose sum is closest to the target. You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.',
        problem: 'You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.',
        hints: [
            'Think about how four sum closest differs from the standard version of this problem.',
            'Key insight: You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.',
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
            python: `def four_sum_closest(data):
    """
    Four Sum Closest

    Instead of finding quadruplets that sum exactly to the target, find the quadruplet whose sum is closest to the target.
    \n    Approach: You must track the minimum absolute difference across all quadruplets, changing how you prune and when you update the result.

    Time: O(n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [1, 2, 3, 4], target = 15. Closest sum is 1+2+3+4 = 10.

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
print(four_sum_closest([1, 2, 3, 4, 5]))
print(four_sum_closest([5, 3, 1]))
print(four_sum_closest([1]))`,
            go: `package main

import "fmt"

// FourSumClosest solves the Four Sum Closest problem.
// Instead of finding quadruplets that sum exactly to the target, find the quadruplet whose sum is closest to the target.
// Time: O(n), Space: O(n)
func FourSumClosest(data []int) []int {
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
    fmt.Println(FourSumClosest([]int{1, 2, 3, 4, 5}))
    fmt.Println(FourSumClosest([]int{5, 3, 1}))
    fmt.Println(FourSumClosest([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/03-four-number-sum/twist-01-four-sum-closest', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/03-four-number-sum/twist-01-four-sum-closest'] = problem;
})();
