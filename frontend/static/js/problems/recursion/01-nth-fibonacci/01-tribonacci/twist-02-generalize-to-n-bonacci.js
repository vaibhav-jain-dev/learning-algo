/**
 * Generalize to N-bonacci
 * Category: recursion
 * Difficulty: Medium
 * Parent: 01-nth-fibonacci/01-tribonacci
 */
(function() {
    'use strict';
    const problem = {
        name: 'Generalize to N-bonacci',
        difficulty: 'Medium',
        algorithm: 'recursion-fibonacci',
        parent: '01-nth-fibonacci/01-tribonacci',
        description: 'Extend the solution to compute the k-th element of an N-bonacci sequence, where each term is the sum of the previous N terms. Tribonacci is the special case N=3.',
        problem: 'Requires parameterizing the number of tracked previous values, using a sliding window or circular buffer instead of fixed variables. The generalization reveals the pattern behind Fibonacci/Tribonacci.',
        hints: [
            'Consider how this twist changes the core problem structure.',
            'Think about what data structures or techniques apply to this variation.',
            'Identify the key difference from the parent problem and how it affects the approach.',
            'Work through the example to build intuition before coding.'
        ],
        complexity: { time: 'O(?)', space: 'O(?)' },
        examples: [
            {
                input: { raw: 'For N=4 (Tetranacci): T(0)=0, T(1)=T(2)=T(3)=1. T(4)=0+1+1+1=3, T(5)=1+1+1+3=6.' },
                output: 'See example',
                explanation: 'For N=4 (Tetranacci): T(0)=0, T(1)=T(2)=T(3)=1. T(4)=0+1+1+1=3, T(5)=1+1+1+3=6.'
            }
        ],
        solutions: {
            python: `# Generalize to N-bonacci
# Category: recursion
# Difficulty: Medium
# Parent: 01-nth-fibonacci/01-tribonacci

def solve():
    """
    Extend the solution to compute the k-th element of an N-bonacci sequence, where each term is the sum of the previous N terms. Tribonacci is the special case N=3.

    Key insight: Requires parameterizing the number of tracked previous values, using a sliding window or circular buffer instead of fixed variables. The generalization reveals the pattern behind Fibonacci/Tribonacci.
    """
    # TODO: Implement solution
    pass


# Test
if __name__ == "__main__":
    print(solve())
`,
            go: `package main

import "fmt"

// Solve solves the Generalize to N-bonacci problem.
// Extend the solution to compute the k-th element of an N-bonacci sequence, where each term is the sum of the previous N terms. Tribonacci is the special case N=3.
// Key insight: Requires parameterizing the number of tracked previous values, using a sliding window or circular buffer instead of fixed variables. The generalization reveals the pattern behind Fibonacci/Tribonacci.
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
        window.ProblemRenderer.register('recursion', '01-nth-fibonacci/01-tribonacci/twist-02-generalize-to-n-bonacci', problem);
    }
    window.Problems = window.Problems || {};
    window.Problems['recursion/01-nth-fibonacci/01-tribonacci/twist-02-generalize-to-n-bonacci'] = problem;
})();
