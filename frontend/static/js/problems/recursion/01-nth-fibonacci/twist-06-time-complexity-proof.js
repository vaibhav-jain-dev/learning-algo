/**
 * Time Complexity Proof
 * Category: recursion
 * Difficulty: Hard
 * Parent: 01-nth-fibonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Time Complexity Proof',
        difficulty: 'Hard',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci',
        description: 'Prove that the naive recursive Fibonacci is O(2^n) but more precisely O(phi^n) where phi is the golden ratio. Why is 2^n an overestimate?',
        problem: 'Requires mathematical reasoning about the recursion tree rather than coding. You must analyze the asymmetric branching where fib(n-1) and fib(n-2) create an unbalanced tree.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'The exact base of the exponential is phi=(1+sqrt(5))/2 ~= 1.618, not 2. This is because each call branches into fib(n-1) and fib(n-2), and the characteristic equation x^2=x+1 gives x=phi.' },
                output: 'See example',
                explanation: 'The exact base of the exponential is phi=(1+sqrt(5))/2 ~= 1.618, not 2. This is because each call branches into fib(n-1) and fib(n-2), and the characteristic equation x^2=x+1 gives x=phi.'
            }
        ],
        solutions: {
            python: `# Time Complexity Proof
# Category: recursion
# Difficulty: Hard
# Parent: 01-nth-fibonacci

def solve():
    """
    Prove that the naive recursive Fibonacci is O(2^n) but more precisely O(phi^n) where phi is the golden ratio. Why is 2^n an overestimate?

    Key insight: Requires mathematical reasoning about the recursion tree rather than coding. You must analyze the asymmetric branching where fib(n-1) and fib(n-2) create an unbalanced tree.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Time Complexity Proof problem.
// Prove that the naive recursive Fibonacci is O(2^n) but more precisely O(phi^n) where phi is the golden ratio. Why is 2^n an overestimate?
// Key insight: Requires mathematical reasoning about the recursion tree rather than coding. You must analyze the asymmetric branching where fib(n-1) and fib(n-2) create an unbalanced tree.
func Solve() interface{} {
    // TODO: Implement solution
    return nil
}

func main() {
    fmt.Println(Solve())
}
`
        },
        twists: [],
        similar: []
    };
    if (window.ProblemRenderer) {
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-06-time-complexity-proof', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-06-time-complexity-proof'] = problem;
})();
