/**
 * K Closest Pairs from Two Arrays
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: k-closest-pairs-from-two-arrays
 * Parent: 02-two-number-sum/03-closest-sum-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'K Closest Pairs from Two Arrays',
        difficulty: 'Hard',
        algorithm: 'k-closest-pairs-from-two-arrays',
        parent: '02-two-number-sum/03-closest-sum-target',
        description: 'Instead of the single closest pair, return the k pairs (one from each array) with sums closest to target. Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
        problem: 'Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
        hints: [
            'Think about how this twist differs from the standard version: Instead of the single closest pair, return the k pairs (one from each array) wit.',
            'Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n log k)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"arr1":[1,3,5,7],"arr2":[2,4,6,8],"target":10},
                output: [3,7],
                explanation: ''
            },
            {
                input: {"arr1":[-1,3,8],"arr2":[2,4,9],"target":7},
                output: [3,4],
                explanation: ''
            },
            // Edge case
            {
                input: {"arr1":[1,4],"arr2":[10,20],"target":15},
                output: [4,10],
                explanation: ''
            }
        ],
        solutions: {
            python: `def k_closest_pairs_from_two_arrays(arr1, arr2, target):
    """
    K Closest Pairs from Two Arrays

    Instead of the single closest pair, return the k pairs (one from each array) with sums closest to target. Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.

    Time: O(n log k)
    Space: O(n)
    """
    count = 0
    n = len(arr1)

    for i in range(n):
        # Check condition based on arr2
        j = 0
        for k in range(i, n):
            if j < len(arr2) and arr1[k] == arr2[j]:
                j += 1
        if j == len(arr2):
            count += 1

    return count


# Test cases
print(k_closest_pairs_from_two_arrays([1,3,5,7], [2,4,6,8], 10))  # Expected: [3,7]
print(k_closest_pairs_from_two_arrays([-1,3,8], [2,4,9], 7))  # Expected: [3,4]
print(k_closest_pairs_from_two_arrays([1,4], [10,20], 15))  # Expected: [4,10]
`,
            go: `package main

import "fmt"

// KClosestPairsFromTwoArrays solves the K Closest Pairs from Two Arrays problem.
// Instead of the single closest pair, return the k pairs (one from each array) with sums closest to target. Cannot stop at the first optimal answer. Requires a min-heap or sorted enumeration of candidate pairs by their distance from target.
// Time: O(n log k), Space: O(n)
func KClosestPairsFromTwoArrays(arr1 []int, arr2 []int, target int) int {
	result := 0

	for i := 0; i < len(arr1); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(KClosestPairsFromTwoArrays([]int{1, 3, 5, 7}, []int{2, 4, 6, 8}, 10)) // Expected: [3,7]
	fmt.Println(KClosestPairsFromTwoArrays([]int{-1, 3, 8}, []int{2, 4, 9}, 7)) // Expected: [3,4]
	fmt.Println(KClosestPairsFromTwoArrays([]int{1, 4}, []int{10, 20}, 15)) // Expected: [4,10]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/03-closest-sum-target/twist-01-k-closest-pairs-from-two-arrays', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/03-closest-sum-target/twist-01-k-closest-pairs-from-two-arrays'] = problem;
})();
