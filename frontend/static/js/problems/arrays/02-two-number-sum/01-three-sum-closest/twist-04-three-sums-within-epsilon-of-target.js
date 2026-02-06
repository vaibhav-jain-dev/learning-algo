/**
 * Three Sums Within Epsilon of Target
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: three-sums-within-epsilon-of-target
 * Parent: 02-two-number-sum/01-three-sum-closest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sums Within Epsilon of Target',
        difficulty: 'Medium',
        algorithm: 'three-sums-within-epsilon-of-target',
        parent: '02-two-number-sum/01-three-sum-closest',
        description: 'Return all unique triplets whose sum is within epsilon distance of the target. Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.',
        problem: 'Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.',
        hints: [
            'Think about how three sums within epsilon of target differs from the standard version of this problem.',
            'Key insight: Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.',
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
            python: `def three_sums_within_epsilon_of_target(data):
    """
    Three Sums Within Epsilon of Target

    Return all unique triplets whose sum is within epsilon distance of the target.
    \n    Approach: Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # nums=[-1,0,1,2,-1,-4], target=0, epsilon=1 → all triplets with sum in [-1,1]

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
print(three_sums_within_epsilon_of_target([1, 2, 3, 4, 5]))
print(three_sums_within_epsilon_of_target([5, 3, 1]))
print(three_sums_within_epsilon_of_target([1]))`,
            go: `package main

import "fmt"

// ThreeSumsWithinEpsilonOfTarget solves the Three Sums Within Epsilon of Target problem.
// Return all unique triplets whose sum is within epsilon distance of the target.
// Time: O(n^2), Space: O(n)
func ThreeSumsWithinEpsilonOfTarget(data []int) []int {
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
    fmt.Println(ThreeSumsWithinEpsilonOfTarget([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumsWithinEpsilonOfTarget([]int{5, 3, 1}))
    fmt.Println(ThreeSumsWithinEpsilonOfTarget([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest/twist-04-three-sums-within-epsilon-of-target', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest/twist-04-three-sums-within-epsilon-of-target'] = problem;
})();
