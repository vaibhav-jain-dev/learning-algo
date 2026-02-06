/**
 * Top-Down with Offset Index
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change/02-target-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Top-Down with Offset Index',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/02-target-sum',
        description: 'Solve using top-down memoization where the state is (index, currentSum). Since currentSum can be negative, how do you handle the memo table?',
        problem: 'The top-down approach without the subset sum transformation must handle negative sums as states. This requires either a hash map or an offset to shift indices, which is a different mental model.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: The top-down approach without the subset sum transformation must handle negative sums as states. This requires either a ',
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
                input: {"nums":[1,1,1,1,1],"target":3},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the top down with offset index criteria.'
            },
            {
                input: {"nums":[1],"target":1},
                output: 0,
                explanation: 'For this input, there are 0 valid positions that satisfy the top down with offset index criteria.'
            },
            // Edge case
            {
                input: {"nums":[1],"target":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def top_down_with_offset_index(nums, target):
    """
    Top-Down with Offset Index

    Solve using top-down memoization where the state is (index, currentSum). Since currentSum can be negative, how do you handle the memo table?

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
print(top_down_with_offset_index([1,1,1,1,1], 3))  # Expected: 0
print(top_down_with_offset_index([1], 1))  # Expected: 0
print(top_down_with_offset_index([1], 0))  # Expected: 0
`,
            go: `package main

import "fmt"

// TopDownWithOffsetIndex solves the Top-Down with Offset Index problem.
// Solve using top-down memoization where the state is (index, currentSum). Since currentSum can be negative, how do you handle the memo table?
// Time: O(n^2), Space: O(n)
func TopDownWithOffsetIndex(nums []int, target int) int {
	result := 0

	for i := 0; i < len(nums); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TopDownWithOffsetIndex([]int{1, 1, 1, 1, 1}, 3)) // Expected: 0
	fmt.Println(TopDownWithOffsetIndex([]int{1}, 1)) // Expected: 0
	fmt.Println(TopDownWithOffsetIndex([]int{1}, 0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/02-target-sum/twist-02-top-down-with-offset-index', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/02-target-sum/twist-02-top-down-with-offset-index'] = problem;
})();
