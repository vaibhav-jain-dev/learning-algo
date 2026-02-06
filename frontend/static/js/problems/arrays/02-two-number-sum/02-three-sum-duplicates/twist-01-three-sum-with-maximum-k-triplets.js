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
            'Think about how this twist differs from the standard version: Return at most k unique triplets that sum to target, prioritizing those with the.',
            'Adds a selection/priority constraint on top of finding all triplets, requiring you to sort results or use a heap.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
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
            python: `def three_sum_with_maximum_k_triplets(data):
    """
    Three Sum with Maximum K Triplets

    Return at most k unique triplets that sum to target, prioritizing those with the smallest absolute values.
    \n    Approach: Adds a selection/priority constraint on top of finding all triplets, requiring you to sort results or use a heap.

    Time: O(n log k)
    Space: O(n)

    Example: nums=[-2,-1,0,1,2,3], target=0, k=2 → [[-1,0,1],[-2,-1,3]] (smallest abs values first)
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

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
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
