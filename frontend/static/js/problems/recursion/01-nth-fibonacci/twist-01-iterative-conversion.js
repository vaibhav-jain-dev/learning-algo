/**
 * Iterative Conversion
 * Category: recursion
 * Difficulty: Easy
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
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'fib(6) using only a for-loop and two variables prev=0, curr=1, iterating and swapping until reaching n.' },
                output: 'See example',
                explanation: 'fib(6) using only a for-loop and two variables prev=0, curr=1, iterating and swapping until reaching n.'
            }
        ],
        solutions: {
            python: `# Iterative Conversion
# Category: recursion
# Difficulty: Easy
# Parent: 01-nth-fibonacci

def solve():
    """
    Rewrite the naive recursive Fibonacci using a simple loop with two variables. No recursion allowed.

    Key insight: Forces you to think about how recursive state maps to loop variables and how the call stack is replaced by explicit variable updates.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Iterative Conversion problem.
// Rewrite the naive recursive Fibonacci using a simple loop with two variables. No recursion allowed.
// Key insight: Forces you to think about how recursive state maps to loop variables and how the call stack is replaced by explicit variable updates.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/twist-01-iterative-conversion', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/twist-01-iterative-conversion'] = problem;
})();
