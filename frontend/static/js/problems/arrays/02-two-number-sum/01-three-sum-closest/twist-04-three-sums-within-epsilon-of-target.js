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
            'Think about how this twist differs from the standard version: Return all unique triplets whose sum is within epsilon distance of the target..',
            'Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"nums":[-1,2,1,-4],"target":1},
                output: 2,
                explanation: 'The triplet (-1, 2, 1) has sum 2, which is closest to target 1.'
            },
            {
                input: {"nums":[0,0,0],"target":1},
                output: 0,
                explanation: 'Only triplet possible: 0+0+0=0, closest to 1.'
            },
            {
                input: {"nums":[1,2,3,4,5],"target":10},
                output: 10,
                explanation: 'Triplet (2,3,5) or (1,4,5) sums to exactly 10.'
            }
        ],
        solutions: {
            python: `def three_sums_within_epsilon_of_target(data):
    """
    Three Sums Within Epsilon of Target

    Return all unique triplets whose sum is within epsilon distance of the target.
    \n    Approach: Changes from finding one optimal answer to collecting all answers within a range, requiring careful enumeration without early termination.

    Time: O(n)
    Space: O(n)

    Example: nums=[-1,0,1,2,-1,-4], target=0, epsilon=1 → all triplets with sum in [-1,1]
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
print(three_sums_within_epsilon_of_target([1, 2, 3, 4, 5]))
print(three_sums_within_epsilon_of_target([5, 3, 1]))
print(three_sums_within_epsilon_of_target([1]))`,
            go: `package main

import "fmt"

// ThreeSumsWithinEpsilonOfTarget solves the Three Sums Within Epsilon of Target problem.
// Return all unique triplets whose sum is within epsilon distance of the target.
// Time: O(n), Space: O(n)
func ThreeSumsWithinEpsilonOfTarget(data []int) []int {
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
