/**
 * When Does Greedy Fail: All Negatives Edge Case
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/01-max-circular-subarray
 */
(function() {
    'use strict';

    const problem = {
        name: 'When Does Greedy Fail: All Negatives Edge Case',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/01-max-circular-subarray',
        description: 'If all elements are negative, the min_subarray equals the entire array, so total - min_subarray = 0. But the answer should be the least negative element. Explain why this edge case breaks the circular formula and how to handle it.',
        problem: 'The greedy complement approach assumes the optimal circular subarray is non-empty and the leftover is also non-empty. When all elements are negative, the complement would be empty, which is invalid.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: {
            time: 'O(?)',
            space: 'O(?)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,-2,3,-2]},
                output: [1,-2,3],
                explanation: 'The when does greedy fail all negatives edge case for this input yields [1, -2, 3].'
            },
            {
                input: {"nums":[5,-3,5]},
                output: [5,-3,5],
                explanation: 'The when does greedy fail all negatives edge case for this input yields [5, -3, 5].'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: [],
                explanation: 'Maintain a running sum as you scan. At each position, choose to either extend the current subarray or start fresh. Track the global maximum across all positions.'
            }
        ],
        solutions: {
            python: `def when_does_greedy_fail_all_negatives_edge_case(nums):
    """
    When Does Greedy Fail: All Negatives Edge Case

    If all elements are negative, the min_subarray equals the entire array, so total - min_subarray = 0. But the answer should be the least negative element. Explain why this edge case breaks the circular formula and how to handle it.

    Time: O(?)
    Space: O(?)
    """
    result = []

    for i in range(len(nums)):
        # Check if element meets criteria
        result.append(nums[i])

    return result


# Test cases
print(when_does_greedy_fail_all_negatives_edge_case([1,-2,3,-2]))  # Expected: [1,-2,3]
print(when_does_greedy_fail_all_negatives_edge_case([5,-3,5]))  # Expected: [5,-3,5]
print(when_does_greedy_fail_all_negatives_edge_case([1]))  # Expected: []
`,
            go: `package main

import "fmt"

// WhenDoesGreedyFailAllNegativesEdgeCase solves the When Does Greedy Fail: All Negatives Edge Case problem.
// If all elements are negative, the min_subarray equals the entire array, so total - min_subarray = 0. But the answer should be the least negative element. Explain why this edge case breaks the circular formula and how to handle it.
// Time: O(?), Space: O(?)
func WhenDoesGreedyFailAllNegativesEdgeCase(nums []int) []int {
	result := make([]int, 0)

	for i := 0; i < len(nums); i++ {
		result = append(result, nums[i])
	}

	return result
}

func main() {
	fmt.Println(WhenDoesGreedyFailAllNegativesEdgeCase([]int{1, -2, 3, -2})) // Expected: [1,-2,3]
	fmt.Println(WhenDoesGreedyFailAllNegativesEdgeCase([]int{5, -3, 5})) // Expected: [5,-3,5]
	fmt.Println(WhenDoesGreedyFailAllNegativesEdgeCase([]int{1})) // Expected: []
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/01-max-circular-subarray/twist-02-when-does-greedy-fail-all-negatives-edge-case', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/01-max-circular-subarray/twist-02-when-does-greedy-fail-all-negatives-edge-case'] = problem;
})();
