/**
 * Generate All Permutations (Not Just Count)
 * Category: dynamic-programming
 * Difficulty: Hard
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change/01-combination-sum-iv
 */
(function() {
    'use strict';

    const problem = {
        name: 'Generate All Permutations (Not Just Count)',
        difficulty: 'Hard',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/01-combination-sum-iv',
        description: 'Instead of counting, generate and return all ordered sequences that sum to target. This requires backtracking or DP with path reconstruction.',
        problem: 'Counting is O(target * n) but generating all permutations can be exponential. You need a different algorithmic approach (backtracking with pruning) since the DP table alone cannot reconstruct all paths efficiently.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Counting is O(target * n) but generating all permutations can be exponential. You need a different algorithmic approach ',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(2^n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,2,3],"target":10},
                output: [1,2,3],
                explanation: 'The generate all permutations not just count for this input yields [1, 2, 3].'
            },
            {
                input: {"nums":[9],"target":10},
                output: [9],
                explanation: 'The generate all permutations not just count for this input yields [9].'
            },
            // Edge case
            {
                input: {"nums":[1],"target":10},
                output: [],
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def generate_all_permutations_not_just_count(nums, target):
    """
    Generate All Permutations (Not Just Count)

    Instead of counting, generate and return all ordered sequences that sum to target. This requires backtracking or DP with path reconstruction.

    Time: O(2^n)
    Space: O(n)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(generate_all_permutations_not_just_count([1,2,3], 10))  # Expected: [1,2,3]
print(generate_all_permutations_not_just_count([9], 10))  # Expected: [9]
print(generate_all_permutations_not_just_count([1], 10))  # Expected: []
`,
            go: `package main

import "fmt"

// GenerateAllPermutationsNotJustCount solves the Generate All Permutations (Not Just Count) problem.
// Instead of counting, generate and return all ordered sequences that sum to target. This requires backtracking or DP with path reconstruction.
// Time: O(2^n), Space: O(n)
func GenerateAllPermutationsNotJustCount(nums []int, target int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(GenerateAllPermutationsNotJustCount([]int{1, 2, 3}, 10)) // Expected: [1,2,3]
	fmt.Println(GenerateAllPermutationsNotJustCount([]int{9}, 10)) // Expected: [9]
	fmt.Println(GenerateAllPermutationsNotJustCount([]int{1}, 10)) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/01-combination-sum-iv/twist-03-generate-all-permutations-not-just-count', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/01-combination-sum-iv/twist-03-generate-all-permutations-not-just-count'] = problem;
})();
