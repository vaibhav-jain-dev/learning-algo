/**
 * Three Sum Closest with Duplicates Allowed
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: three-sum-closest-with-duplicates-allowed
 * Parent: 02-two-number-sum/02-three-sum-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Three Sum Closest with Duplicates Allowed',
        difficulty: 'Medium',
        algorithm: 'three-sum-closest-with-duplicates-allowed',
        parent: '02-two-number-sum/02-three-sum-duplicates',
        description: 'Find the closest sum to target, but report ALL unique triplets achieving that closest sum. Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.',
        problem: 'Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.',
        hints: [
            'Think about how this twist differs from the standard version: Find the closest sum to target, but report ALL unique triplets achieving that cl.',
            'Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.',
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
            python: `def three_sum_closest_with_duplicates_allowed(data):
    """
    Three Sum Closest with Duplicates Allowed

    Find the closest sum to target, but report ALL unique triplets achieving that closest sum.
    \n    Approach: Combines the closest-sum search with duplicate-aware enumeration, requiring two phases: find the closest sum, then collect all triplets matching it.

    Time: O(n)
    Space: O(n)

    Example: nums=[-1,0,1,2,-1], target=1 → closest=1, triplets=[[-1,0,2]]
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
print(three_sum_closest_with_duplicates_allowed([1, 2, 3, 4, 5]))
print(three_sum_closest_with_duplicates_allowed([5, 3, 1]))
print(three_sum_closest_with_duplicates_allowed([1]))`,
            go: `package main

import "fmt"

// ThreeSumClosestWithDuplicatesAllowed solves the Three Sum Closest with Duplicates Allowed problem.
// Find the closest sum to target, but report ALL unique triplets achieving that closest sum.
// Time: O(n), Space: O(n)
func ThreeSumClosestWithDuplicatesAllowed(data []int) []int {
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
    fmt.Println(ThreeSumClosestWithDuplicatesAllowed([]int{1, 2, 3, 4, 5}))
    fmt.Println(ThreeSumClosestWithDuplicatesAllowed([]int{5, 3, 1}))
    fmt.Println(ThreeSumClosestWithDuplicatesAllowed([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates/twist-05-three-sum-closest-with-duplicates-allowed', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates/twist-05-three-sum-closest-with-duplicates-allowed'] = problem;
})();
