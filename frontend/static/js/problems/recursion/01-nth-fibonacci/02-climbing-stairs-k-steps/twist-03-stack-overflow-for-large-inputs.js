/**
 * Stack Overflow for Large Inputs
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-staircase
 * Parent: 01-nth-fibonacci/02-climbing-stairs-k-steps
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stack Overflow for Large Inputs',
        difficulty: 'Medium',
        algorithm: 'recursion-staircase',
        parent: '01-nth-fibonacci/02-climbing-stairs-k-steps',
        description: 'The naive recursive solution fails for n=100000. Design an iterative solution using the sliding window technique that handles arbitrarily large n with O(k) space.',
        problem: 'Forces the transition from recursive thinking to iterative sliding window. You must maintain a running sum and efficiently remove the element leaving the window, which is a different mental model than recursion.',
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
                input: {"n":4,"k":3},
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"n":0,"k":3},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def stack_overflow_for_large_inputs(n, k):
    """
    Stack Overflow for Large Inputs

    The naive recursive solution fails for n=100000. Design an iterative solution using the sliding window technique that handles arbitrarily large n with O(k) space.

    Time: O(?)
    Space: O(?)
    """
    count = 0
    n = len(n)

    for i in range(n):
        # Check condition based on k
        j = 0
        for k in range(i, n):
            if j < len(k) and n[k] == k[j]:
                j += 1
        if j == len(k):
            count += 1

    return count


# Test cases
print(stack_overflow_for_large_inputs(4, 3))  # Expected: 1
print(stack_overflow_for_large_inputs(0, 3))  # Expected: 0
`,
            go: `package main

import "fmt"

// StackOverflowForLargeInputs solves the Stack Overflow for Large Inputs problem.
// The naive recursive solution fails for n=100000. Design an iterative solution using the sliding window technique that handles arbitrarily large n with O(k) space.
// Time: O(?), Space: O(?)
func StackOverflowForLargeInputs(n int, k int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(StackOverflowForLargeInputs(4, 3)) // Expected: 1
	fmt.Println(StackOverflowForLargeInputs(0, 3)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/02-climbing-stairs-k-steps/twist-03-stack-overflow-for-large-inputs', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/02-climbing-stairs-k-steps/twist-03-stack-overflow-for-large-inputs'] = problem;
})();
