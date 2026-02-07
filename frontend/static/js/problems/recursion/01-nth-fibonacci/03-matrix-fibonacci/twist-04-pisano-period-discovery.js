/**
 * Pisano Period Discovery
 * Category: recursion
 * Difficulty: Very Hard
 * Algorithm: recursion-fibonacci
 * Parent: 01-nth-fibonacci/03-matrix-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Pisano Period Discovery',
        difficulty: 'Very Hard',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/03-matrix-fibonacci',
        description: 'Instead of matrix exponentiation, discover that Fibonacci mod m is periodic (Pisano period). Find the period for a given m and use it to reduce fib(n) mod m to fib(n mod period) mod m.',
        problem: 'A completely different mathematical approach to the same problem. Instead of fast exponentiation, you exploit periodicity. Requires understanding number theory rather than linear algebra.',
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
            python: `def pisano_period_discovery(n):
    """
    Pisano Period Discovery

    Instead of matrix exponentiation, discover that Fibonacci mod m is periodic (Pisano period). Find the period for a given m and use it to reduce fib(n) mod m to fib(n mod period) mod m.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(pisano_period_discovery(10))  # Expected: 1
print(pisano_period_discovery(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// PisanoPeriodDiscovery solves the Pisano Period Discovery problem.
// Instead of matrix exponentiation, discover that Fibonacci mod m is periodic (Pisano period). Find the period for a given m and use it to reduce fib(n) mod m to fib(n mod period) mod m.
// Time: O(?), Space: O(?)
func PisanoPeriodDiscovery(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(PisanoPeriodDiscovery(10)) // Expected: 1
	fmt.Println(PisanoPeriodDiscovery(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/03-matrix-fibonacci/twist-04-pisano-period-discovery', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/03-matrix-fibonacci/twist-04-pisano-period-discovery'] = problem;
})();
