/**
 * Iterative vs Recursive Matrix Power
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-fibonacci
 * Parent: 01-nth-fibonacci/03-matrix-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative vs Recursive Matrix Power',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/03-matrix-fibonacci',
        description: 'Implement matrix exponentiation using both iterative binary exponentiation and recursive divide-and-conquer. Compare stack usage for n=10^18.',
        problem: 'The recursive version uses O(log n) stack frames while the iterative version uses O(1) extra space. For n=10^18, log2(n)~60 frames, which is fine, but understanding the trade-off matters.',
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
                input: {"n":10},
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
            python: `def iterative_vs_recursive_matrix_power(n):
    """
    Iterative vs Recursive Matrix Power

    Implement matrix exponentiation using both iterative binary exponentiation and recursive divide-and-conquer. Compare stack usage for n=10^18.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_vs_recursive_matrix_power(10))  # Expected: 1
print(iterative_vs_recursive_matrix_power(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeVsRecursiveMatrixPower solves the Iterative vs Recursive Matrix Power problem.
// Implement matrix exponentiation using both iterative binary exponentiation and recursive divide-and-conquer. Compare stack usage for n=10^18.
// Time: O(?), Space: O(?)
func IterativeVsRecursiveMatrixPower(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeVsRecursiveMatrixPower(10)) // Expected: 1
	fmt.Println(IterativeVsRecursiveMatrixPower(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/03-matrix-fibonacci/twist-02-iterative-vs-recursive-matrix-power', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/03-matrix-fibonacci/twist-02-iterative-vs-recursive-matrix-power'] = problem;
})();
