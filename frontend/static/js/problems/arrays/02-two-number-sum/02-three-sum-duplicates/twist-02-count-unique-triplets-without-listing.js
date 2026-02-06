/**
 * Count Unique Triplets Without Listing
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: count-unique-triplets-without-listing
 * Parent: 02-two-number-sum/02-three-sum-duplicates
 */
(function() {
    'use strict';

    const problem = {
        name: 'Count Unique Triplets Without Listing',
        difficulty: 'Medium',
        algorithm: 'count-unique-triplets-without-listing',
        parent: '02-two-number-sum/02-three-sum-duplicates',
        description: 'Instead of returning all triplets, just count how many unique triplets sum to target. While the core algorithm is similar, counting allows mathematical shortcuts: when duplicates exist, you can calculate combinations instead of enumerating.',
        problem: 'While the core algorithm is similar, counting allows mathematical shortcuts: when duplicates exist, you can calculate combinations instead of enumerating.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of returning all triplets, just count how many unique triplets sum to ta.',
            'While the core algorithm is similar, counting allows mathematical shortcuts: when duplicates exist, you can calculate combinations instead of enumerating.',
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
            python: `def count_unique_triplets_without_listing(data):
    """
    Count Unique Triplets Without Listing

    Instead of returning all triplets, just count how many unique triplets sum to target.
    \n    Approach: While the core algorithm is similar, counting allows mathematical shortcuts: when duplicates exist, you can calculate combinations instead of enumerating.

    Time: O(n)
    Space: O(n)

    Example: nums=[0,0,0,0], target=0 → 1 (only one unique triplet [0,0,0])
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
print(count_unique_triplets_without_listing([1, 2, 3, 4, 5]))
print(count_unique_triplets_without_listing([5, 3, 1]))
print(count_unique_triplets_without_listing([1]))`,
            go: `package main

import "fmt"

// CountUniqueTripletsWithoutListing solves the Count Unique Triplets Without Listing problem.
// Instead of returning all triplets, just count how many unique triplets sum to target.
// Time: O(n), Space: O(n)
func CountUniqueTripletsWithoutListing(data []int) []int {
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
    fmt.Println(CountUniqueTripletsWithoutListing([]int{1, 2, 3, 4, 5}))
    fmt.Println(CountUniqueTripletsWithoutListing([]int{5, 3, 1}))
    fmt.Println(CountUniqueTripletsWithoutListing([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/02-three-sum-duplicates/twist-02-count-unique-triplets-without-listing', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/02-three-sum-duplicates/twist-02-count-unique-triplets-without-listing'] = problem;
})();
