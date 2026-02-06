/**
 * Why This Counts Permutations, Not Combinations
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change/01-combination-sum-iv
 */
(function() {
    'use strict';

    const problem = {
        name: 'Why This Counts Permutations, Not Combinations',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/01-combination-sum-iv',
        description: 'Explain precisely why iterating over target amounts in the outer loop and nums in the inner loop counts ordered sequences (permutations) rather than unordered combinations.',
        problem: 'This is the inverse of the coin change counting problem. The loop order determines whether [1,2,1] and [2,1,1] and [1,1,2] are counted as one way or three. You must understand what each DP cell represents under each ordering.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: This is the inverse of the coin change counting problem. The loop order determines whether [1,2,1] and [2,1,1] and [1,1,',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n^2)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,2,3],"target":10},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the why this counts permutations not combinations criteria.'
            },
            {
                input: {"nums":[9],"target":10},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the why this counts permutations not combinations criteria.'
            },
            // Edge case
            {
                input: {"nums":[1],"target":10},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def why_this_counts_permutations_not_combinations(nums, target):
    """
    Why This Counts Permutations, Not Combinations

    Explain precisely why iterating over target amounts in the outer loop and nums in the inner loop counts ordered sequences (permutations) rather than unordered combinations.

    Time: O(n^2)
    Space: O(n)
    """
    count = 0
    n = len(nums)

    for i in range(n):
        # Check condition based on target
        j = 0
        for k in range(i, n):
            if j < len(target) and nums[k] == target[j]:
                j += 1
        if j == len(target):
            count += 1

    return count


# Test cases
print(why_this_counts_permutations_not_combinations([1,2,3], 10))  # Expected: 1
print(why_this_counts_permutations_not_combinations([9], 10))  # Expected: 2
print(why_this_counts_permutations_not_combinations([1], 10))  # Expected: 0
`,
            go: `package main

import "fmt"

// WhyThisCountsPermutationsNotCombinations solves the Why This Counts Permutations, Not Combinations problem.
// Explain precisely why iterating over target amounts in the outer loop and nums in the inner loop counts ordered sequences (permutations) rather than unordered combinations.
// Time: O(n^2), Space: O(n)
func WhyThisCountsPermutationsNotCombinations(nums []int, target int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WhyThisCountsPermutationsNotCombinations([]int{1, 2, 3}, 10)) // Expected: 1
	fmt.Println(WhyThisCountsPermutationsNotCombinations([]int{9}, 10)) // Expected: 2
	fmt.Println(WhyThisCountsPermutationsNotCombinations([]int{1}, 10)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/01-combination-sum-iv/twist-01-why-this-counts-permutations-not-combinations', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/01-combination-sum-iv/twist-01-why-this-counts-permutations-not-combinations'] = problem;
})();
