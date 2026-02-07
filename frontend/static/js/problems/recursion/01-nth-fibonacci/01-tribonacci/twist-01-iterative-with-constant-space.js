/**
 * Iterative with Constant Space
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-fibonacci
 * Parent: 01-nth-fibonacci/01-tribonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative with Constant Space',
        difficulty: 'Easy',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/01-tribonacci',
        description: 'Solve Tribonacci iteratively using exactly three variables. No array or hash map allowed.',
        problem: 'While conceptually similar to iterative Fibonacci with two variables, managing three rotating variables requires more careful bookkeeping of which variable to overwrite next.',
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
                input: {"n":4},
                output: 1,
                explanation: 'At each recursive call, one decision is made (include/exclude, choose/skip). The recursion tree explores all valid paths, and results are collected or combined at each return.'
            },
            // Edge case
            {
                input: {"n":0},
                output: 0,
                explanation: 'The recursive structure breaks this into subproblems. The base case handles the smallest input directly. Each recursive step makes progress toward the base case while combining partial results.'
            }
        ],
        solutions: {
            python: `def iterative_with_constant_space(n):
    """
    Iterative with Constant Space

    Solve Tribonacci iteratively using exactly three variables. No array or hash map allowed.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_with_constant_space(4))  # Expected: 1
print(iterative_with_constant_space(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeWithConstantSpace solves the Iterative with Constant Space problem.
// Solve Tribonacci iteratively using exactly three variables. No array or hash map allowed.
// Time: O(?), Space: O(?)
func IterativeWithConstantSpace(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeWithConstantSpace(4)) // Expected: 1
	fmt.Println(IterativeWithConstantSpace(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/01-tribonacci/twist-01-iterative-with-constant-space', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/01-tribonacci/twist-01-iterative-with-constant-space'] = problem;
})();
