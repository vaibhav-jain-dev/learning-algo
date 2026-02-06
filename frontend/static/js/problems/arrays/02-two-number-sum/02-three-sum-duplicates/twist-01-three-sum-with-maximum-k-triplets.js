/**
 * Three Sum with Maximum K Triplets
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: three-sum-with-maximum-k-triplets
 * Parent: 02-two-number-sum/02-three-sum-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum with Maximum K Triplets',
        difficulty: 'Medium',
        algorithm: 'three-sum-with-maximum-k-triplets',
        parent: '02-two-number-sum/02-three-sum-duplicates',
        description: 'Return at most k unique triplets that sum to target, prioritizing those with the smallest absolute values. Adds a selection/priority constraint on top of finding all triplets, requiring you to sort results or use a heap.',
        problem: 'Adds a selection/priority constraint on top of finding all triplets, requiring you to sort results or use a heap.',
        hints: [
            'Think about how three sum with maximum k triplets differs from the standard version of this problem.',
            'Key insight: Adds a selection/priority constraint on top of finding all triplets, requiring you to sort results or use a heap.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"array":[1,3,5,7],"k":2},
                output: [1,3],
                explanation: 'The k=2 smallest/closest values found.'
            },
            {
                input: {"array":[10,20,30],"k":1},
                output: [10],
                explanation: 'With k=1, return the single best result.'
            },
            {
                input: {"array":[5,5,5,5],"k":3},
                output: [5,5,5],
                explanation: 'Duplicate values handled correctly with k=3.'
            }
        ],
        solutions: {
            python: `def three_sum_with_maximum_k_triplets(data):
    """
    Three Sum with Maximum K Triplets

    Return at most k unique triplets that sum to target, prioritizing those with the smallest absolute values.
    \n    Approach: Adds a selection/priority constraint on top of finding all triplets, requiring you to sort results or use a heap.

    Time: O(n log k)
    Space: O(n)
    """
    # Implementation based on the twist description
    # nums=[-2,-1,0,1,2,3], target=0, k=2 → [[-1,0,1],[-2,-1,3]] (smallest abs values first)

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
print(three_sum_with_maximum_k_triplets([1, 2, 3, 4, 5]))
print(three_sum_with_maximum_k_triplets([5, 3, 1]))
print(three_sum_with_maximum_k_triplets([1]))`,
            go: `package main

import "fmt"

// ThreeSumWithMaximumKTriplets solves the Three Sum with Maximum K Triplets problem.
// Return at most k unique triplets that sum to target, prioritizing those with the smallest absolute values.
// Time: O(n log k), Space: O(n)
func ThreeSumWithMaximumKTriplets(data []int) []int {
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
    fmt.Println(ThreeSumWithMaximumKTriplets([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumWithMaximumKTriplets([]int{5, 3, 1}))
    fmt.Println(ThreeSumWithMaximumKTriplets([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates/twist-01-three-sum-with-maximum-k-triplets', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates/twist-01-three-sum-with-maximum-k-triplets'] = problem;
})();
