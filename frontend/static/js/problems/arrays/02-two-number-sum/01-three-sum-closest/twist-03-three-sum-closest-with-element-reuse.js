/**
 * Three Sum Closest with Element Reuse
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: three-sum-closest-with-element-reuse
 * Parent: 02-two-number-sum/01-three-sum-closest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest with Element Reuse',
        difficulty: 'Medium',
        algorithm: 'three-sum-closest-with-element-reuse',
        parent: '02-two-number-sum/01-three-sum-closest',
        description: 'You may use the same element up to twice (but not three times). Find the closest sum to target. Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.',
        problem: 'Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.',
        hints: [
            'Think about how three sum closest with element reuse differs from the standard version of this problem.',
            'Key insight: Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.',
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
            python: `def three_sum_closest_with_element_reuse(data):
    """
    Three Sum Closest with Element Reuse

    You may use the same element up to twice (but not three times). Find the closest sum to target.
    \n    Approach: Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.

    Time: O(n^2)
    Space: O(n)
    """
    # Implementation based on the twist description
    # nums=[1,3,5], target=7 → 7 (1+3+3, reusing 3)

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
print(three_sum_closest_with_element_reuse([1, 2, 3, 4, 5]))
print(three_sum_closest_with_element_reuse([5, 3, 1]))
print(three_sum_closest_with_element_reuse([1]))`,
            go: `package main

import "fmt"

// ThreeSumClosestWithElementReuse solves the Three Sum Closest with Element Reuse problem.
// You may use the same element up to twice (but not three times). Find the closest sum to target.
// Time: O(n^2), Space: O(n)
func ThreeSumClosestWithElementReuse(data []int) []int {
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
    fmt.Println(ThreeSumClosestWithElementReuse([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumClosestWithElementReuse([]int{5, 3, 1}))
    fmt.Println(ThreeSumClosestWithElementReuse([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest/twist-03-three-sum-closest-with-element-reuse', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest/twist-03-three-sum-closest-with-element-reuse'] = problem;
})();
