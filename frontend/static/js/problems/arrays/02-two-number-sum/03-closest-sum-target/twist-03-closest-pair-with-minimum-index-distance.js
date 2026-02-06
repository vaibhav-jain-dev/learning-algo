/**
 * Closest Pair with Minimum Index Distance
 * Category: arrays
 * Difficulty: Medium
 * Algorithm: closest-pair-with-minimum-index-distance
 * Parent: 02-two-number-sum/03-closest-sum-target
 */
(function() {
    'use strict';

    const problem = {
        name: 'Closest Pair with Minimum Index Distance',
        difficulty: 'Medium',
        algorithm: 'closest-pair-with-minimum-index-distance',
        parent: '02-two-number-sum/03-closest-sum-target',
        description: 'Among all pairs with the closest sum to target, return the one where the two chosen indices (original positions) are farthest apart. Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
        problem: 'Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
        hints: [
            'Think about how this twist differs from the standard version: Among all pairs with the closest sum to target, return the one where the two cho.',
            'Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Test your solution with edge cases: empty input, single element, all identical values.'
        ],
        complexity: {
            time: 'O(n)',
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
            python: `def closest_pair_with_minimum_index_distance(arr1, arr2, target):
    """
    Closest Pair with Minimum Index Distance

    Among all pairs with the closest sum to target, return the one where the two chosen indices (original positions) are farthest apart. Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for i in range(len(arr1)):
        # Check if element meets criteria
        result.append(arr1[i])

    return result


# Test cases
print(closest_pair_with_minimum_index_distance([1,3,5,7], [2,4,6,8], 10))  # Expected: [3,7]
print(closest_pair_with_minimum_index_distance([-1,3,8], [2,4,9], 7))  # Expected: [3,4]
print(closest_pair_with_minimum_index_distance([1,4], [10,20], 15))  # Expected: [4,10]
`,
            go: `package main

import "fmt"

// ClosestPairWithMinimumIndexDistance solves the Closest Pair with Minimum Index Distance problem.
// Among all pairs with the closest sum to target, return the one where the two chosen indices (original positions) are farthest apart. Adds a secondary optimization criterion, requiring you to track not just the closest sum but also index positions from the original arrays.
// Time: O(n), Space: O(n)
func ClosestPairWithMinimumIndexDistance(arr1 []int, arr2 []int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(arr1); i++ {
		result = append(result, arr1[i])
	}

	return result
}

func main() {
	fmt.Println(ClosestPairWithMinimumIndexDistance([]int{1, 3, 5, 7}, []int{2, 4, 6, 8}, 10)) // Expected: [3,7]
	fmt.Println(ClosestPairWithMinimumIndexDistance([]int{-1, 3, 8}, []int{2, 4, 9}, 7)) // Expected: [3,4]
	fmt.Println(ClosestPairWithMinimumIndexDistance([]int{1, 4}, []int{10, 20}, 15)) // Expected: [4,10]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '02-two-number-sum/03-closest-sum-target/twist-03-closest-pair-with-minimum-index-distance', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/02-two-number-sum/03-closest-sum-target/twist-03-closest-pair-with-minimum-index-distance'] = problem;
})();
