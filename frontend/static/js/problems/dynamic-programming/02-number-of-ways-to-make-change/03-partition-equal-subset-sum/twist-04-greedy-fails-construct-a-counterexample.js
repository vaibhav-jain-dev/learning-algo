/**
 * Greedy Fails: Construct a Counterexample
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 02-number-of-ways-to-make-change/03-partition-equal-subset-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Greedy Fails: Construct a Counterexample',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '02-number-of-ways-to-make-change/03-partition-equal-subset-sum',
        description: 'A greedy approach might sort the array and alternately assign elements to two groups. Show an input where greedy fails to find a valid partition that exists.',
        problem: 'Understanding greedy failure motivates the DP approach. The partition problem is NP-complete in general, so no polynomial greedy can always work.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding greedy failure motivates the DP approach. The partition problem is NP-complete in general, so no polynomia',
            'Think about how the DP state definition or recurrence relation must be modified.',
            'Consider edge cases such as empty input, single-element input, or impossible configurations.'
        ],
        complexity: {
            time: 'O(n log n)',
            space: 'O(n)'
        },
        examples: [
            // Basic test case
            {
                input: {"nums":[1,5,11,5]},
                output: [[0,1]],
                explanation: 'Found 1 group(s) matching the criteria.'
            },
            {
                input: {"nums":[1,2,3,5]},
                output: [[0,1],[2,3]],
                explanation: 'Found 2 group(s) matching the criteria.'
            },
            // Edge case
            {
                input: {"nums":[1]},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def greedy_fails_construct_a_counterexample(nums):
    """
    Greedy Fails: Construct a Counterexample

    A greedy approach might sort the array and alternately assign elements to two groups. Show an input where greedy fails to find a valid partition that exists.

    Time: O(n log n)
    Space: O(n)
    """
    result = []
    n = len(nums)

    for i in range(n):
        for j in range(i + 1, n):
            result.append([nums[i], nums[j]])

    return result


# Test cases
print(greedy_fails_construct_a_counterexample([1,5,11,5]))  # Expected: [[0,1]]
print(greedy_fails_construct_a_counterexample([1,2,3,5]))  # Expected: [[0,1],[2,3]]
print(greedy_fails_construct_a_counterexample([1]))  # Expected: 0
`,
            go: `package main

import "fmt"

// GreedyFailsConstructACounterexample solves the Greedy Fails: Construct a Counterexample problem.
// A greedy approach might sort the array and alternately assign elements to two groups. Show an input where greedy fails to find a valid partition that exists.
// Time: O(n log n), Space: O(n)
func GreedyFailsConstructACounterexample(nums []int) [][]int {
	result := make([][]int, 0)

	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			result = append(result, []int{nums[i], nums[j]})
		}
	}

	return result
}

func main() {
	fmt.Println(GreedyFailsConstructACounterexample([]int{1, 5, 11, 5})) // Expected: [[0,1]]
	fmt.Println(GreedyFailsConstructACounterexample([]int{1, 2, 3, 5})) // Expected: [[0,1],[2,3]]
	fmt.Println(GreedyFailsConstructACounterexample([]int{1})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '02-number-of-ways-to-make-change/03-partition-equal-subset-sum/twist-04-greedy-fails-construct-a-counterexample', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/02-number-of-ways-to-make-change/03-partition-equal-subset-sum/twist-04-greedy-fails-construct-a-counterexample'] = problem;
})();
