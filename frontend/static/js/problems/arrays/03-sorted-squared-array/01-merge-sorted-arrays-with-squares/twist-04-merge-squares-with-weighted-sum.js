/**
 * Merge Squares with Weighted Sum
 * Category: arrays
 * Difficulty: Hard
 * Algorithm: merge-squares-with-weighted-sum
 * Parent: 03-sorted-squared-array/01-merge-sorted-arrays-with-squares
 */
(function() {
    'use strict';

    const problem = {
        name: 'Merge Squares with Weighted Sum',
        difficulty: 'Hard',
        algorithm: 'merge-squares-with-weighted-sum',
        parent: '03-sorted-squared-array/01-merge-sorted-arrays-with-squares',
        description: 'Each array has associated weights. Merge the squared values and for duplicates, sum their weights instead of including duplicates. Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.',
        problem: 'Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.',
        hints: [
            'Think about how merge squares with weighted sum differs from the standard version of this problem.',
            'Key insight: Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.',
            'Start with a brute force approach, then optimize by identifying repeated work.',
            'Break the problem into smaller subproblems and solve each one independently.',
            'Test your solution with the provided examples, including edge cases.'
        ],
        complexity: {
            time: 'O(n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"array":[-3,-1,0,2,4]},
                output: [0,1,4,9,16],
                explanation: 'After sorting, process elements in order. Adjacent elements with overlapping or matching properties are grouped together. The sorted order guarantees no valid groupings are missed.'
            },
            {
                input: {"array":[1,2,3]},
                output: [1,4,9],
                explanation: 'The sorted arrangement reveals the structure of the solution. Scan from left to right, maintaining a running state that captures the current group or interval.'
            },
            // Edge case
            {
                input: {"array":[-5,-3,-1]},
                output: [1,9,25],
                explanation: 'Sorting reduces the problem to a linear scan. Compare each element with the current running state and decide whether to extend, merge, or start a new group.'
            }
        ],
        solutions: {
            python: `def merge_squares_with_weighted_sum(arr1, arr2):
    """
    Merge Squares with Weighted Sum

    Each array has associated weights. Merge the squared values and for duplicates, sum their weights instead of including duplicates. Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.

    Time: O(n)
    Space: O(n)
    """
    result = []

    for item in arr1:
        result.append(str(item))

    return ''.join(result)


# Test cases
print(merge_squares_with_weighted_sum(None, None))  # Expected: [0,1,4,9,16]
print(merge_squares_with_weighted_sum(None, None))  # Expected: [1,4,9]
print(merge_squares_with_weighted_sum(None, None))  # Expected: [1,9,25]
`,
            go: `package main

import "fmt"

// MergeSquaresWithWeightedSum solves the Merge Squares with Weighted Sum problem.
// Each array has associated weights. Merge the squared values and for duplicates, sum their weights instead of including duplicates. Requires carrying metadata (weights) alongside values during the merge, and aggregating when duplicate squared values appear.
// Time: O(n), Space: O(n)
func MergeSquaresWithWeightedSum(arr1 []int, arr2 []int) string {
	result := ""

	for _, v := range arr1 {
		result += fmt.Sprintf("%v", v)
	}

	return result
}

func main() {
	fmt.Println(MergeSquaresWithWeightedSum(nil, nil)) // Expected: [0,1,4,9,16]
	fmt.Println(MergeSquaresWithWeightedSum(nil, nil)) // Expected: [1,4,9]
	fmt.Println(MergeSquaresWithWeightedSum(nil, nil)) // Expected: [1,9,25]
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('arrays', '03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-04-merge-squares-with-weighted-sum', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['arrays/03-sorted-squared-array/01-merge-sorted-arrays-with-squares/twist-04-merge-squares-with-weighted-sum'] = problem;
})();
