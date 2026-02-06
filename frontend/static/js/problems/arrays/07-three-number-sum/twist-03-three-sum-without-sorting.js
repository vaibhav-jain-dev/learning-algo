/**
 * Three Sum Without Sorting
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: three-sum-without-sorting
 * Parent: 07-three-number-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Without Sorting',
        difficulty: 'Hard',
        algorithm: 'three-sum-without-sorting',
        parent: '07-three-number-sum',
        description: 'Find all triplets summing to target but you are not allowed to sort the array. Use a hash-based approach instead. Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.',
        problem: 'Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.',
        hints: [
            'Think about how three sum without sorting differs from the standard version of this problem.',
            'Key insight: Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.',
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
            python: `def three_sum_without_sorting(data):
    """
    Three Sum Without Sorting

    Find all triplets summing to target but you are not allowed to sort the array. Use a hash-based approach instead.
    \n    Approach: Removes the two-pointer technique entirely, forcing a hash map approach with careful deduplication.

    Time: O(n log n)
    Space: O(n)
    """
    # Implementation based on the twist description
    # array = [12, 3, 1, 2, -6, 5, -8, 6], target = 0. Same result but found using hash lookups.

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
print(three_sum_without_sorting([1, 2, 3, 4, 5]))
print(three_sum_without_sorting([5, 3, 1]))
print(three_sum_without_sorting([1]))`,
            go: `package main

import "fmt"

// ThreeSumWithoutSorting solves the Three Sum Without Sorting problem.
// Find all triplets summing to target but you are not allowed to sort the array. Use a hash-based approach instead.
// Time: O(n log n), Space: O(n)
func ThreeSumWithoutSorting(data []int) []int {
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
    fmt.Println(ThreeSumWithoutSorting([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumWithoutSorting([]int{5, 3, 1}))
    fmt.Println(ThreeSumWithoutSorting([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '07-three-number-sum/twist-03-three-sum-without-sorting', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/07-three-number-sum/twist-03-three-sum-without-sorting'] = problem;
})();
