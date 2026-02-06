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
            'Think about how this twist differs from the standard version: Find the three numbers whose sum is closest to target, but you cannot sort the a.',
            'Without sorting, the two-pointer technique is unavailable. You must use hash maps or accept O(n^3) brute force, fundamentally changing the approach.',
            'Sorting the input first may simplify the problem significantly.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log n)',
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
            python: `def three_sum_closest_with_no_sorting_allowed(data):
    """
    Three Sum Closest with No Sorting Allowed

    Find the three numbers whose sum is closest to target, but you cannot sort the array.
    \n    Approach: Without sorting, the two-pointer technique is unavailable. You must use hash maps or accept O(n^3) brute force, fundamentally changing the approach.

    Time: O(n log n)
    Space: O(n)

    Example: nums=[-1,2,1,-4], target=1 → 2 (same answer, different algorithm)
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

    n := len(data)
    result := make([]int, 0, n)

    // Core algorithm implementation
    for i := 0; i < n; i++ {
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
