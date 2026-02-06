/**
 * Iterative Conversion
 * Category: recursion
 * Difficulty: Easy
 * Algorithm: recursion-fibonacci
 * Parent: 01-nth-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Iterative Conversion',
        difficulty: 'Easy',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Rewrite the naive recursive Fibonacci using a simple loop with two variables. No recursion allowed.',
        problem: 'Forces you to think about how recursive state maps to loop variables and how the call stack is replaced by explicit variable updates.',
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
                input: {"n":6},
                output: 1,
                explanation: 'For this input, there is 1 valid position that satisfy the iterative conversion criteria.'
            },
            // Edge case
            {
                input: {"n":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def iterative_conversion(n):
    """
    Iterative Conversion

    Rewrite the naive recursive Fibonacci using a simple loop with two variables. No recursion allowed.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(iterative_conversion(6))  # Expected: 1
print(iterative_conversion(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// IterativeConversion solves the Iterative Conversion problem.
// Rewrite the naive recursive Fibonacci using a simple loop with two variables. No recursion allowed.
// Time: O(?), Space: O(?)
func IterativeConversion(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(IterativeConversion(6)) // Expected: 1
	fmt.Println(IterativeConversion(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-01-iterative-conversion', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-01-iterative-conversion'] = problem;
})();
