/**
 * Tail Recursion Refactor
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-fibonacci
 * Parent: 01-nth-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Tail Recursion Refactor',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Convert the recursive Fibonacci into a tail-recursive version by passing accumulator parameters. The recursive call must be the very last operation.',
        problem: 'Requires rethinking the function signature to carry forward partial results, turning tree recursion into linear recursion that compilers can optimize into a loop.',
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
                explanation: 'For this input, there is 1 valid position that satisfy the tail recursion refactor criteria.'
            },
            // Edge case
            {
                input: {"n":0},
                output: 0,
                explanation: 'Edge case: minimal input.'
            }
        ],
        solutions: {
            python: `def tail_recursion_refactor(n):
    """
    Tail Recursion Refactor

    Convert the recursive Fibonacci into a tail-recursive version by passing accumulator parameters. The recursive call must be the very last operation.

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(tail_recursion_refactor(6))  # Expected: 1
print(tail_recursion_refactor(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// TailRecursionRefactor solves the Tail Recursion Refactor problem.
// Convert the recursive Fibonacci into a tail-recursive version by passing accumulator parameters. The recursive call must be the very last operation.
// Time: O(?), Space: O(?)
func TailRecursionRefactor(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(TailRecursionRefactor(6)) // Expected: 1
	fmt.Println(TailRecursionRefactor(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-02-tail-recursion-refactor', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-02-tail-recursion-refactor'] = problem;
})();
