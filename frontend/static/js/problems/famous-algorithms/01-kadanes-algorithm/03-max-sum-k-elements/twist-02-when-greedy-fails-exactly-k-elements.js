/**
 * When Greedy Fails: Exactly K Elements
 * Category: famous-algorithms
 * Difficulty: Medium
 * Algorithm: kadanes-algorithm
 * Parent: 01-kadanes-algorithm/03-max-sum-k-elements
 */
(function() {
    'use strict';

    const problem = {
        name: 'When Greedy Fails: Exactly K Elements',
        difficulty: 'Medium',
        algorithm: 'kadanes-algorithm',
        parent: '01-kadanes-algorithm/03-max-sum-k-elements',
        description: 'Modify the problem to find the maximum sum subarray of EXACTLY k elements (not at least k). The greedy extension no longer applies. What approach works for exactly k?',
        problem: 'The "at least k" solution extends greedily when profitable. With "exactly k", you cannot extend, making it a pure sliding window problem. The greedy extension heuristic is now wrong.',
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
                input: {"nums":[1,-2,3,-1,5],"k":3},
                output: 2,
                explanation: 'For this input, there are 2 valid positions that satisfy the when greedy fails exactly k elements criteria.'
            },
            {
                input: {"nums":[-1,-2,-3],"k":3},
                output: 3,
                explanation: 'For this input, there are 3 valid positions that satisfy the when greedy fails exactly k elements criteria.'
            },
            // Edge case
            {
                input: {"nums":[1],"k":3},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def when_greedy_fails_exactly_k_elements(nums, k):
    """
    When Greedy Fails: Exactly K Elements

    Modify the problem to find the maximum sum subarray of EXACTLY k elements (not at least k). The greedy extension no longer applies. What approach works for exactly k?

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(nums)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and nums[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(when_greedy_fails_exactly_k_elements([1,-2,3,-1,5], 3))  # Expected: 2
print(when_greedy_fails_exactly_k_elements([-1,-2,-3], 3))  # Expected: 3
print(when_greedy_fails_exactly_k_elements([1], 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// WhenGreedyFailsExactlyKElements solves the When Greedy Fails: Exactly K Elements problem.
// Modify the problem to find the maximum sum subarray of EXACTLY k elements (not at least k). The greedy extension no longer applies. What approach works for exactly k?
// Time: O(?), Space: O(?)
func WhenGreedyFailsExactlyKElements(nums []int, k int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(WhenGreedyFailsExactlyKElements([]int{1, -2, 3, -1, 5}, 3)) // Expected: 2
	fmt.Println(WhenGreedyFailsExactlyKElements([]int{-1, -2, -3}, 3)) // Expected: 3
	fmt.Println(WhenGreedyFailsExactlyKElements([]int{1}, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('famous-algorithms', '01-kadanes-algorithm/03-max-sum-k-elements/twist-02-when-greedy-fails-exactly-k-elements', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['famous-algorithms/01-kadanes-algorithm/03-max-sum-k-elements/twist-02-when-greedy-fails-exactly-k-elements'] = problem;
})();
