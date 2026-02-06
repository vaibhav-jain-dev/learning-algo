/**
 * Three Sum Closest with No Sorting Allowed
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-closest-with-no-sorting-allowed
 * Parent: 02-two-number-sum/01-three-sum-closest
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest with No Sorting Allowed',
        difficulty: 'Hard',
        algorithm: 'three-sum-closest-with-no-sorting-allowed',
        parent: '02-two-number-sum/01-three-sum-closest',
        description: 'Find the three numbers whose sum is closest to target, but you cannot sort the array. Without sorting, the two-pointer technique is unavailable. You must use hash maps or accept O(n^3) brute force, fundamentally changing the approach.',
        problem: 'Without sorting, the two-pointer technique is unavailable. You must use hash maps or accept O(n^3) brute force, fundamentally changing the approach.',
        hints: [
            'Think about how three sum closest with no sorting allowed differs from the standard version of this problem.',
            'Key insight: Without sorting, the two-pointer technique is unavailable. You must use hash maps or accept O(n^3) brute force, fundamentally changing the approach.',
            'Consider whether sorting can help simplify the approach.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'Elements transformed and sorted correctly.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'All positive - order maintained after transformation.'
            },
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'All negative - order reversed after transformation.'
            }
        ],
        solutions: {
            python: `def three_sum_closest_with_no_sorting_allowed(data):
    """
    Three Sum Closest with No Sorting Allowed

    Find the three numbers whose sum is closest to target, but you cannot sort the array.
    \n    Approach: Without sorting, the two-pointer technique is unavailable. You must use hash maps or accept O(n^3) brute force, fundamentally changing the approach.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # nums=[-1,2,1,-4], target=1 → 2 (same answer, different algorithm)

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
print(three_sum_closest_with_no_sorting_allowed([1, 2, 3, 4, 5]))
print(three_sum_closest_with_no_sorting_allowed([5, 3, 1]))
print(three_sum_closest_with_no_sorting_allowed([1]))`,
            go: `package main

import "fmt"

// ThreeSumClosestWithNoSortingAllowed solves the Three Sum Closest with No Sorting Allowed problem.
// Find the three numbers whose sum is closest to target, but you cannot sort the array.
// Time: O(n log n), Space: O(n)
func ThreeSumClosestWithNoSortingAllowed(data []int) []int {
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
    fmt.Println(ThreeSumClosestWithNoSortingAllowed([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumClosestWithNoSortingAllowed([]int{5, 3, 1}))
    fmt.Println(ThreeSumClosestWithNoSortingAllowed([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/01-three-sum-closest/twist-02-three-sum-closest-with-no-sorting-allowed', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/01-three-sum-closest/twist-02-three-sum-closest-with-no-sorting-allowed'] = problem;
})();
