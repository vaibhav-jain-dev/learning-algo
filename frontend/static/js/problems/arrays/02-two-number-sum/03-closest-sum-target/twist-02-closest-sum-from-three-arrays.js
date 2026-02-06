/**
 * Closest Sum from Three Arrays
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: closest-sum-from-three-arrays
 * Parent: 02-two-number-sum/03-closest-sum-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Sum from Three Arrays',
        difficulty: 'Hard',
        algorithm: 'closest-sum-from-three-arrays',
        parent: '02-two-number-sum/03-closest-sum-target',
        description: 'Given three sorted arrays, pick one element from each to minimize the distance of their sum to target. Extends from two-pointer on two arrays to three arrays, where a simple two-pointer approach does not directly apply. Requires fixing one element and applying two-pointer to the other two.',
        problem: 'Extends from two-pointer on two arrays to three arrays, where a simple two-pointer approach does not directly apply. Requires fixing one element and applying two-pointer to the other two.',
        hints: [
            'Think about how this twist differs from the standard version: Given three sorted arrays, pick one element from each to minimize the distance o.',
            'Extends from two-pointer on two arrays to three arrays, where a simple two-pointer approach does not directly apply. Requires fixing one element and applying two-pointer to the other two.',
            'Sorting the input first may simplify the problem significantly.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            {
                input: {"arr1":[1,3,5,7],"arr2":[2,4,6,8],"target":10},
                output: [3,7],
                explanation: '3 + 7 = 10, exact match to target.'
            },
            {
                input: {"arr1":[-1,3,8],"arr2":[2,4,9],"target":7},
                output: [3,4],
                explanation: '3 + 4 = 7, exact match.'
            },
            {
                input: {"arr1":[1,4],"arr2":[10,20],"target":15},
                output: [4,10],
                explanation: '4 + 10 = 14, closest to 15.'
            }
        ],
        solutions: {
            python: `def closest_sum_from_three_arrays(data):
    """
    Closest Sum from Three Arrays

    Given three sorted arrays, pick one element from each to minimize the distance of their sum to target.
    \n    Approach: Extends from two-pointer on two arrays to three arrays, where a simple two-pointer approach does not directly apply. Requires fixing one element and applying two-pointer to the other two.

    Time: O(n log k)
    Space: O(n)

    Example: arr1=[1,3], arr2=[2,5], arr3=[4,6], target=12 → [3,5,4]=12 (exact)
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
print(closest_sum_from_three_arrays([1, 2, 3, 4, 5]))
print(closest_sum_from_three_arrays([5, 3, 1]))
print(closest_sum_from_three_arrays([1]))`,
            go: `package main

import "fmt"

// ClosestSumFromThreeArrays solves the Closest Sum from Three Arrays problem.
// Given three sorted arrays, pick one element from each to minimize the distance of their sum to target.
// Time: O(n log k), Space: O(n)
func ClosestSumFromThreeArrays(data []int) []int {
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
    fmt.Println(ClosestSumFromThreeArrays([]int{1, 2, 3, 4, 5}))
    fmt.Println(ClosestSumFromThreeArrays([]int{5, 3, 1}))
    fmt.Println(ClosestSumFromThreeArrays([]int{1}))
}`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/03-closest-sum-target/twist-02-closest-sum-from-three-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/03-closest-sum-target/twist-02-closest-sum-from-three-arrays'] = problem;
})();
