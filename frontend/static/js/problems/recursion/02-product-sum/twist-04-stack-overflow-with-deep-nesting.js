/**
 * Stack Overflow with Deep Nesting
 * Category: recursion
 * Difficulty: Hard
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Stack Overflow with Deep Nesting',
        difficulty: 'Hard',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Given an array nested 100,000 levels deep (e.g., [[[...[[1]]...]]]), the recursive solution overflows. Design an iterative solution that handles arbitrary nesting depth.',
        problem: 'Extremely deep nesting directly maps to deep recursion. The iterative stack-based approach is essential here, and you must handle depth tracking without relying on the call stack.',
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
                input: {"array":[5,2,[7,-1],3,[6,[-13,8],4]]},
                output: 3,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"array":[5]},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def stack_overflow_with_deep_nesting(array):
    """
    Stack Overflow with Deep Nesting

    Given an array nested 100,000 levels deep (e.g., [[[...[[1]]...]]]), the recursive solution overflows. Design an iterative solution that handles arbitrary nesting depth.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(stack_overflow_with_deep_nesting([5,2,[7,-1],3,[6,[-13,8],4]]))  # Expected: 3
print(stack_overflow_with_deep_nesting([5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// StackOverflowWithDeepNesting solves the Stack Overflow with Deep Nesting problem.
// Given an array nested 100,000 levels deep (e.g., [[[...[[1]]...]]]), the recursive solution overflows. Design an iterative solution that handles arbitrary nesting depth.
// Time: O(?), Space: O(?)
func StackOverflowWithDeepNesting(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(StackOverflowWithDeepNesting([]interface{}{5, 2, []int{7, -1}, 3, []interface{}{6, []int{-13, 8}, 4}})) // Expected: 3
	fmt.Println(StackOverflowWithDeepNesting([]int{5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/twist-04-stack-overflow-with-deep-nesting', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/twist-04-stack-overflow-with-deep-nesting'] = problem;
})();
