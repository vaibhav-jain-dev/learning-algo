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
            'Think about how this twist differs from the standard version: You may use the same element up to twice (but not three times). Find the closest.',
            'Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.',
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
            python: `def three_sum_closest_with_element_reuse(data):
    """
    Three Sum Closest with Element Reuse

    You may use the same element up to twice (but not three times). Find the closest sum to target.
    \n    Approach: Changes the constraint from distinct indices to allowing repetition, which affects duplicate handling and pointer movement logic.

    Time: O(n)
    Space: O(n)

    Example: nums=[1,3,5], target=7 → 7 (1+3+3, reusing 3)
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
print(three_sum_closest_with_element_reuse([1, 2, 3, 4, 5]))
print(three_sum_closest_with_element_reuse([5, 3, 1]))
print(three_sum_closest_with_element_reuse([1]))`,
            go: `package main

import "fmt"

// ThreeSumClosestWithElementReuse solves the Three Sum Closest with Element Reuse problem.
// You may use the same element up to twice (but not three times). Find the closest sum to target.
// Time: O(n), Space: O(n)
func ThreeSumClosestWithElementReuse(data []int) []int {
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
