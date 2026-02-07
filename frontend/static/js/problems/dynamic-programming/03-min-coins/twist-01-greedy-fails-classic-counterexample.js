/**
 * Greedy Fails: Classic Counterexample
 * Category: dynamic-programming
 * Difficulty: Medium
 * Algorithm: dp-coin-change
 * Parent: 03-min-coins
 */
(function() {
    'use strict';

    const problem = {
        name: 'Greedy Fails: Classic Counterexample',
        difficulty: 'Medium',
        algorithm: 'dp-coin-change',
        parent: '03-min-coins',
        description: 'The greedy approach always picks the largest coin that fits. Construct a specific input where greedy gives more coins than the DP optimal. Explain why the greedy property fails for arbitrary denominations.',
        problem: 'Understanding when greedy fails is fundamental to recognizing coin change as a DP problem. Greedy works for specific denomination systems (like US coins) but fails in general.',
        hints: [
            'Start with the base problem solution and identify what assumption changes for this twist.',
            'Key difference from the base problem: Understanding when greedy fails is fundamental to recognizing coin change as a DP problem. Greedy works for specific den',
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
                input: {"n":7,"denoms":[1,5,10]},
                output: 1,
                explanation: 'Build the DP table row by row. At each cell, the recurrence relation combines results from previous subproblems. The optimal choice at each step propagates through to the final answer.'
            },
            {
                input: {"n":6,"denoms":[1,2,4]},
                output: 2,
                explanation: 'The DP state transition handles this case by comparing the include vs. exclude options. Each cell represents the best achievable result for the corresponding subproblem size.'
            },
            {
                input: {"n":3,"denoms":[2]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            },
            // Edge case
            {
                input: {"n":0,"denoms":[1]},
                output: 0,
                explanation: 'Initialize the DP table with base cases. For each entry, choose the optimal sub-solution: either include the current element (adding its value to the diagonal/previous state) or skip it (carrying forward the best seen so far). The final cell contains the answer.'
            }
        ],
        solutions: {
            python: `def greedy_fails_classic_counterexample(n, denoms):
    """
    Greedy Fails: Classic Counterexample

    The greedy approach always picks the largest coin that fits. Construct a specific input where greedy gives more coins than the DP optimal. Explain why the greedy property fails for arbitrary denominations.

    Time: O(n log n)
    Space: O(n)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on denoms
        j = 0
        for k in range(i, n):
            if j < len(denoms) and n[k] == denoms[j]:
                j += 1
        if j == len(denoms):
            count += 1

    return count


# Test cases
print(greedy_fails_classic_counterexample(7, [1,5,10]))  # Expected: 1
print(greedy_fails_classic_counterexample(6, [1,2,4]))  # Expected: 2
print(greedy_fails_classic_counterexample(3, [2]))  # Expected: 0
`,
            go: `package main

import "fmt"

// GreedyFailsClassicCounterexample solves the Greedy Fails: Classic Counterexample problem.
// The greedy approach always picks the largest coin that fits. Construct a specific input where greedy gives more coins than the DP optimal. Explain why the greedy property fails for arbitrary denominations.
// Time: O(n log n), Space: O(n)
func GreedyFailsClassicCounterexample(n int, denoms []int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(GreedyFailsClassicCounterexample(7, []int{1, 5, 10})) // Expected: 1
	fmt.Println(GreedyFailsClassicCounterexample(6, []int{1, 2, 4})) // Expected: 2
	fmt.Println(GreedyFailsClassicCounterexample(3, []int{2})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('dynamic-programming', '03-min-coins/twist-01-greedy-fails-classic-counterexample', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['dynamic-programming/03-min-coins/twist-01-greedy-fails-classic-counterexample'] = problem;
})();
