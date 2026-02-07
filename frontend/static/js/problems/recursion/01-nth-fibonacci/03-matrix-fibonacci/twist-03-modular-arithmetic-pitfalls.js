/**
 * Modular Arithmetic Pitfalls
 * Category: recursion
 * Difficulty: Medium
 * Algorithm: recursion-fibonacci
 * Parent: 01-nth-fibonacci/03-matrix-fibonacci
 */
(function() {
    'use strict';

    const problem = {
        name: 'Modular Arithmetic Pitfalls',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/03-matrix-fibonacci',
        description: 'When computing Fibonacci mod 10^9+7 for very large n, identify and fix subtle overflow bugs. What happens if you multiply two numbers each close to 10^9+7 in a 64-bit integer?',
        problem: 'This is a conceptual trap about numerical overflow. (10^9+7)^2 exceeds 2^63, causing overflow in languages with fixed-width integers. You must apply mod after each multiplication, not just at the end.',
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
            python: `def modular_arithmetic_pitfalls(n):
    """
    Modular Arithmetic Pitfalls

    When computing Fibonacci mod 10^9+7 for very large n, identify and fix subtle overflow bugs. What happens if you multiply two numbers each close to 10^9+7 in a 64-bit integer?

    Time: O(?)
    Space: O(?)
    """
    result = 0

    for i in range(len(n)):
        # Process element
        result += 1  # Update based on condition

    return result


# Test cases
print(modular_arithmetic_pitfalls(10))  # Expected: 1
print(modular_arithmetic_pitfalls(0))  # Expected: 0
`,
            go: `package main

import "fmt"

// ModularArithmeticPitfalls solves the Modular Arithmetic Pitfalls problem.
// When computing Fibonacci mod 10^9+7 for very large n, identify and fix subtle overflow bugs. What happens if you multiply two numbers each close to 10^9+7 in a 64-bit integer?
// Time: O(?), Space: O(?)
func ModularArithmeticPitfalls(n int) int {
	result := 0

	for i := 0; i < len(n); i++ {
		// Process element
		result++
	}

	return result
}

func main() {
	fmt.Println(ModularArithmeticPitfalls(10)) // Expected: 1
	fmt.Println(ModularArithmeticPitfalls(0)) // Expected: 0
}
`
        },
        twists: [],
        similar: []
    };

    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/03-matrix-fibonacci/twist-03-modular-arithmetic-pitfalls', problem);
    }

    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/03-matrix-fibonacci/twist-03-modular-arithmetic-pitfalls'] = problem;
})();
