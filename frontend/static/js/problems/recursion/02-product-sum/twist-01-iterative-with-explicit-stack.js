/**
 * Iterative with Explicit Stack
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-product-sum
 * Parent: 02-product-sum
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative with Explicit Stack',
        difficulty: 'Medium',
        algorithm: 'recursion-product-sum',
        parent: '02-product-sum',
        description: 'Solve product sum without recursion by using an explicit stack. Each stack entry must track both the element and its current depth.',
        problem: 'Converting nested recursion to an iterative stack-based approach requires explicitly managing depth state that recursion handles implicitly. You must decide how to encode depth alongside array elements.',
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
            python: `def iterative_with_explicit_stack(array):
    """
    Iterative with Explicit Stack

    Solve product sum without recursion by using an explicit stack. Each stack entry must track both the element and its current depth.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(array)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_with_explicit_stack([5,2,[7,-1],3,[6,[-13,8],4]]))  # Expected: 3
print(iterative_with_explicit_stack([5]))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeWithExplicitStack solves the Iterative with Explicit Stack problem.
// Solve product sum without recursion by using an explicit stack. Each stack entry must track both the element and its current depth.
// Time: O(?), Space: O(?)
func IterativeWithExplicitStack(array []int) int {
	result := 0

	for i := 0; i < len(array); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeWithExplicitStack([]interface{}{5, 2, []int{7, -1}, 3, []interface{}{6, []int{-13, 8}, 4}})) // Expected: 3
	fmt.Println(IterativeWithExplicitStack([]int{5})) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '02-product-sum/twist-01-iterative-with-explicit-stack', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/02-product-sum/twist-01-iterative-with-explicit-stack'] = problem;
})();
